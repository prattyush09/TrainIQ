import Button from "../components/ui/Button/Button";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import workoutProgram from "../data/workouts";
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

  /* LOAD SAVED PROGRESS */

  useEffect(() => {
    if (!workout) return;

    const saved = localStorage.getItem(
      `trainiq-workout-progress-${workout.id}`
    );

    if (!saved) return;

    try {
      const progress = JSON.parse(saved);

      if (progress.completed) {
        setCompletedSets(
          Array.isArray(progress.completedSets)
            ? progress.completedSets
            : workout.exercises.map(() => 0)
        );

        setExerciseIndex(
          Math.min(
            progress.exerciseIndex || 0,
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
    } catch {
      console.error(
        "Failed to load workout progress."
      );
    }
  }, [workout]);

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

  const saveProgress = (
    sets = completedSets,
    currentExercise = exerciseIndex
  ) => {
    const progress = {
      workoutId: workout.id,
      workoutName: workout.name,
      completedSets: sets,
      exerciseIndex: currentExercise,
      completed: false,
      savedAt: new Date().toISOString(),
    };

    localStorage.setItem(
      `trainiq-workout-progress-${workout.id}`,
      JSON.stringify(progress)
    );
  };

  const handleCompleteSet = () => {
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

        const completedProgress = {
          workoutId: workout.id,
          workoutName: workout.name,
          completedSets: updatedSets,
          exerciseIndex,
          completed: true,
          completedAt:
            new Date().toISOString(),
          savedAt:
            new Date().toISOString(),
        };

        localStorage.setItem(
          `trainiq-workout-progress-${workout.id}`,
          JSON.stringify(completedProgress)
        );

        setTimeout(() => {
          setWorkoutCompleted(true);
        }, 500);
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

  const handleSaveAndExit = () => {
    saveProgress();

    navigate("/dashboard");
  };

  const handleDiscard = () => {
    localStorage.removeItem(
      `trainiq-workout-progress-${workout.id}`
    );

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