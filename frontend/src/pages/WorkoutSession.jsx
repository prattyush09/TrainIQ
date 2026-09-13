import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import {
  deleteDoc,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import workoutProgram from "../data/Workouts";
import { auth, db } from "../firebase";
import { X } from "lucide-react";
import "../styles/WorkoutSession.css";

function WorkoutSession() {
  const { id } = useParams();
  const navigate = useNavigate();

  const workout = workoutProgram.find(
    (w) => w.id === Number(id)
  );

  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [workoutCompleted, setWorkoutCompleted] = useState(false);
  const [showQuitModal, setShowQuitModal] = useState(false);
  const [isAdvancing, setIsAdvancing] = useState(false);

  const [completedSets, setCompletedSets] = useState(() =>
    workout ? workout.exercises.map(() => 0) : []
  );

  /* LOAD SAVED PROGRESS FROM FIREBASE */

  useEffect(() => {
    if (!workout) return;

    let unsubscribe;

    const loadProgress = () => {
      unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (!user) {
          navigate("/login");
          return;
        }

        try {
          const progressRef = doc(
            db,
            "users",
            user.uid,
            "workoutProgress",
            String(workout.id)
          );

          const progressSnapshot = await getDoc(progressRef);

          if (!progressSnapshot.exists()) return;

          const progress = progressSnapshot.data();

          if (progress.completed) {
            setCompletedSets(
              Array.isArray(progress.completedSets)
                ? workout.exercises.map(
                    (_, index) =>
                      progress.completedSets[index] || 0
                  )
                : workout.exercises.map(() => 0)
            );

            setExerciseIndex(
              Math.min(
                typeof progress.exerciseIndex === "number"
                  ? progress.exerciseIndex
                  : 0,
                workout.exercises.length - 1
              )
            );

            setWorkoutCompleted(true);
            return;
          }

          if (Array.isArray(progress.completedSets)) {
            setCompletedSets(
              workout.exercises.map(
                (_, index) =>
                  progress.completedSets[index] || 0
              )
            );
          }

          if (
            typeof progress.exerciseIndex === "number"
          ) {
            setExerciseIndex(
              Math.min(
                Math.max(progress.exerciseIndex, 0),
                workout.exercises.length - 1
              )
            );
          }
        } catch (error) {
          console.error(
            "Failed to load workout progress from Firebase:",
            error
          );
        }
      });
    };

    loadProgress();

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [workout, navigate]);

  if (!workout) {
    return (
      <div className="workout-session">
        <h1>Workout Not Found</h1>

        <Button
          variant="default"
          onClick={() => navigate("/workouts")}
        >
          Back to Workouts
        </Button>
      </div>
    );
  }

  const exercise = workout.exercises[exerciseIndex];

  /* SAVE PROGRESS TO FIREBASE */

  const saveProgress = async (
    sets = completedSets,
    currentExercise = exerciseIndex
  ) => {
    const user = auth.currentUser;

    if (!user) {
      navigate("/login");
      return;
    }

    const progress = {
      workoutId: workout.id,
      workoutName: workout.name,
      completedSets: sets,
      exerciseIndex: currentExercise,
      completed: false,
      savedAt: new Date().toISOString(),
    };

    try {
      await setDoc(
        doc(
          db,
          "users",
          user.uid,
          "workoutProgress",
          String(workout.id)
        ),
        progress,
        { merge: true }
      );

      console.log(
        "Workout progress saved:",
        workout.id
      );
    } catch (error) {
      console.error(
        "Failed to save workout progress:",
        error
      );
    }
  };

  const handleCompleteSet = async () => {
    if (isAdvancing) return;
    if (
      completedSets[exerciseIndex] >=
      exercise.sets
    ) {
      return;
    }

    const updatedSets = [...completedSets];

    updatedSets[exerciseIndex] += 1;

    setCompletedSets(updatedSets);

    /* SAVE SET PROGRESS IMMEDIATELY */
    saveProgress(
      updatedSets,
      exerciseIndex
    ).catch(error => console.error("Failed to save progress:", error));

    /* EXERCISE COMPLETED */

    if (
      updatedSets[exerciseIndex] ===
      exercise.sets
    ) {
      if (
        exerciseIndex <
        workout.exercises.length - 1
      ) {
        const nextIndex =
          exerciseIndex + 1;
        setIsAdvancing(true);
        setTimeout(() => {
          setExerciseIndex(nextIndex);
          setIsAdvancing(false);
          saveProgress(
            updatedSets,
            nextIndex
          ).catch(error => console.error("Failed to save progress:", error));
        }, 500);
      } else {
        /* ENTIRE WORKOUT COMPLETED */

        const user = auth.currentUser;

        if (!user) {
          navigate("/login");
          return;
        }

        const completedAt =
          new Date().toISOString();

        const completedProgress = {
          workoutId: workout.id,
          workoutName: workout.name,
          completedSets: updatedSets,
          exerciseIndex,
          completed: true,
          completedAt,
          savedAt: completedAt,
        };

        try {
          await setDoc(
            doc(
              db,
              "users",
              user.uid,
              "workoutProgress",
              String(workout.id)
            ),
            completedProgress,
            { merge: true }
          );

          console.log(
            "Workout completed:",
            workout.id
          );

          setIsAdvancing(true);
          setTimeout(() => {
            setWorkoutCompleted(true);
            setIsAdvancing(false);
          }, 500);
        } catch (error) {
          console.error(
            "Failed to save completed workout:",
            error
          );
        }
      }
    }
  };

  const handleNextExercise = () => {
    if (
      exerciseIndex <
      workout.exercises.length - 1
    ) {
      const nextIndex =
        exerciseIndex + 1;

      setExerciseIndex(nextIndex);

      saveProgress(
        completedSets,
        nextIndex
      );
    }
  };

  const handlePreviousExercise = () => {
    if (exerciseIndex > 0) {
      const previousIndex =
        exerciseIndex - 1;

      setExerciseIndex(previousIndex);

      saveProgress(
        completedSets,
        previousIndex
      );
    }
  };

  const handleSaveAndExit = async () => {
    await saveProgress();

    navigate("/dashboard");
  };

  const handleDiscard = async () => {
    const user = auth.currentUser;

    if (user) {
      try {
        await deleteDoc(
          doc(
            db,
            "users",
            user.uid,
            "workoutProgress",
            String(workout.id)
          )
        );

        console.log(
          "Workout progress discarded:",
          workout.id
        );
      } catch (error) {
        console.error(
          "Failed to discard workout progress:",
          error
        );
      }
    }

    navigate("/workouts");
  };

  const handleFinishWorkout = () => {
    navigate("/dashboard");
  };

  if (workoutCompleted) {
    return (
      <div className="workout-session">
        <h1>Workout Completed!</h1>

        <h2>{workout.name}</h2>

        <p>
          You completed all{" "}
          {workout.exercises.length} exercises.
        </p>

        <Button
          variant="default"
          onClick={handleFinishWorkout}
        >
          Return to Dashboard
        </Button>
      </div>
    );
  }

  return (
    <div className="workout-session">
      <div className="workout-session-header">
        <h1>{workout.name}</h1>
        <Button 
          variant="danger" 
          onClick={() => setShowQuitModal(true)}
          style={{ padding: '8px 12px', minWidth: 'auto' }}
        >
          <X size={20} />
        </Button>
      </div>

      <div className="exercise-info">
        <div className="exercise-progress-text">
          Exercise {exerciseIndex + 1} of {workout.exercises.length}
        </div>
        <h2>{exercise.name}</h2>
      </div>

      <Card className="workout-metrics-card bg-surface-card border-none rounded-2xl p-6 mb-8 flex justify-around">
        <div className="metric-box flex flex-col items-center">
          <span className="metric-label text-sm text-muted-foreground mb-1">Sets</span>
          <span className="metric-value text-2xl font-bold">{exercise.sets}</span>
        </div>
        
        <div className="metric-box flex flex-col items-center">
          <span className="metric-label text-sm text-muted-foreground mb-1">Reps</span>
          <span className="metric-value text-2xl font-bold">{exercise.reps}</span>
        </div>
        
        <div className="metric-box flex flex-col items-center">
          <span className="metric-label text-sm text-muted-foreground mb-1">Done</span>
          <span className="metric-value text-2xl font-bold text-primary">
            {completedSets[exerciseIndex]}
          </span>
        </div>
      </Card>

      <Button
        variant={completedSets[exerciseIndex] >= exercise.sets ? "secondary" : "default"}
        className="complete-set-btn w-full mb-8 py-6 text-lg"
        onClick={handleCompleteSet}
        disabled={isAdvancing || completedSets[exerciseIndex] >= exercise.sets}
      >
        {completedSets[exerciseIndex] >= exercise.sets
          ? "Exercise Complete"
          : "Complete Set"}
      </Button>

      <div className="workout-navigation flex gap-4">
        <Button
          variant="secondary"
          disabled={exerciseIndex === 0}
          onClick={handlePreviousExercise}
          className="flex-1 py-6"
        >
          Previous
        </Button>

        <Button
          variant="secondary"
          disabled={exerciseIndex === workout.exercises.length - 1}
          onClick={handleNextExercise}
          className="flex-1 py-6"
        >
          Next
        </Button>
      </div>

      <Dialog open={showQuitModal} onOpenChange={setShowQuitModal}>
        <DialogContent className="sm:max-w-[425px] bg-surface-card border-border">
          <DialogHeader>
            <DialogTitle>Quit Workout?</DialogTitle>
          </DialogHeader>
          <div className="py-4 flex flex-col gap-4">
            <p className="text-sm text-muted-foreground">
              You are currently on exercise{" "}
              {exerciseIndex + 1} of{" "}
              {workout.exercises.length}.
            </p>

            <p className="text-sm text-muted-foreground mb-4">
              Your progress can be saved so
              you can continue later.
            </p>

            <Button
              variant="default"
              onClick={() => setShowQuitModal(false)}
            >
              Continue Workout
            </Button>

            <Button
              variant="secondary"
              onClick={handleSaveAndExit}
            >
              Save & Exit
            </Button>

            <Button
              variant="destructive"
              onClick={handleDiscard}
            >
              Discard Workout
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default WorkoutSession;
