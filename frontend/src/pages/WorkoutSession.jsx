import Button from "../components/ui/Button/Button";
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
          variant="primary"
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

    await saveProgress(
      updatedSets,
      exerciseIndex
    );

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

        setTimeout(() => {
          setExerciseIndex(nextIndex);

          saveProgress(
            updatedSets,
            nextIndex
          );
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

          setTimeout(() => {
            setWorkoutCompleted(true);
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
    navigate("/progress");
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
          variant="success"
          onClick={handleFinishWorkout}
        >
          View Workout Progress
        </Button>
      </div>
    );
  }

  return (
    <div className="workout-session">
      <h1>{workout.name}</h1>

      <h2>{exercise.name}</h2>

      <p>
        Exercise {exerciseIndex + 1} of{" "}
        {workout.exercises.length}
      </p>

      <p>
        {exercise.sets} Sets ×{" "}
        {exercise.reps}
      </p>

      <p>
        Completed Sets:{" "}
        {completedSets[exerciseIndex]} /{" "}
        {exercise.sets}
      </p>

      <Button
        variant="success"
        onClick={handleCompleteSet}
      >
        {completedSets[exerciseIndex] >=
        exercise.sets
          ? "Exercise Complete"
          : "Complete Set"}
      </Button>

      <div className="workout-navigation">
        <Button
          variant="primary"
          disabled={exerciseIndex === 0}
          onClick={handlePreviousExercise}
        >
          Previous Exercise
        </Button>

        <Button
          variant="primary"
          disabled={
            exerciseIndex ===
            workout.exercises.length - 1
          }
          onClick={handleNextExercise}
        >
          Next Exercise
        </Button>
      </div>

      <Button
        variant="danger"
        onClick={() =>
          setShowQuitModal(true)
        }
      >
        Quit Workout
      </Button>

      {showQuitModal && (
        <div className="quit-modal-overlay">
          <div className="quit-modal">
            <h2>Quit Workout?</h2>

            <p>
              You are currently on exercise{" "}
              {exerciseIndex + 1} of{" "}
              {workout.exercises.length}.
            </p>

            <p>
              Your progress can be saved so
              you can continue later.
            </p>

            <Button
              variant="success"
              onClick={() =>
                setShowQuitModal(false)
              }
            >
              Continue Workout
            </Button>

            <Button
              variant="primary"
              onClick={handleSaveAndExit}
            >
              Save & Exit
            </Button>

            <Button
              variant="danger"
              onClick={handleDiscard}
            >
              Discard Workout
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default WorkoutSession;
