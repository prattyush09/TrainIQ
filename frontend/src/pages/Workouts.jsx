import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import workoutProgram from "../data/Workouts";import "../styles/Workouts.css";

function Workouts() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState({});

  useEffect(() => {
    const loadProgress = () => {
      const savedProgress = {};

      workoutProgram.forEach((workout) => {
        const saved = localStorage.getItem(
          `trainiq-workout-progress-${workout.id}`
        );

        if (saved) {
          try {
            savedProgress[workout.id] = JSON.parse(saved);
          } catch {
            console.error(
              `Invalid progress data for workout ${workout.id}`
            );
          }
        }
      });

      setProgress(savedProgress);
    };

    loadProgress();

    window.addEventListener("storage", loadProgress);

    return () => {
      window.removeEventListener("storage", loadProgress);
    };
  }, []);

  const getWorkoutStatus = (workout) => {
    const saved = progress[workout.id];

    if (!saved) {
      return "not-started";
    }

    if (saved.completed) {
      return "completed";
    }

    const completedSets = Array.isArray(
      saved.completedSets
    )
      ? saved.completedSets.reduce(
          (total, sets) => total + sets,
          0
        )
      : 0;

    if (completedSets > 0) {
      return "in-progress";
    }

    return "not-started";
  };

  const getProgressPercentage = (workout) => {
    const saved = progress[workout.id];

    if (!saved || !Array.isArray(saved.completedSets)) {
      return 0;
    }

    const totalSets = workout.exercises.reduce(
      (total, exercise) => total + exercise.sets,
      0
    );

    if (totalSets === 0) {
      return 0;
    }

    const completedSets = saved.completedSets.reduce(
      (total, sets) => total + sets,
      0
    );

    return Math.min(
      Math.round((completedSets / totalSets) * 100),
      100
    );
  };

  const currentWorkout = workoutProgram.find(
    (workout) =>
      getWorkoutStatus(workout) !== "completed"
  );

  const upcomingWorkouts = workoutProgram.filter(
    (workout) =>
      workout.id !== currentWorkout?.id
  );

  const currentStatus = currentWorkout
    ? getWorkoutStatus(currentWorkout)
    : null;

  const handleWorkoutClick = (workout) => {
    navigate(`/workouts/${workout.id}`);
  };

  return (
    <div className="workouts-page">
      <h1>Workout Program</h1>

      <p>
        Stay consistent. Complete your next workout
        to progress.
      </p>

      {/* NEXT WORKOUT */}

      {currentWorkout ? (
        <div className="next-workout-card">
          <h2>
            {currentStatus === "in-progress"
              ? "Continue Workout"
              : "Next Workout"}
          </h2>

          <h3>{currentWorkout.name}</h3>

          <p>{currentWorkout.focus}</p>

          <p>
            {currentWorkout.exercises.length}{" "}
            Exercises
          </p>

          {currentStatus === "in-progress" && (
            <>
              <p>
                Progress:{" "}
                {getProgressPercentage(
                  currentWorkout
                )}
                %
              </p>

              <div className="workout-progress-bar">
                <div
                  className="workout-progress-fill"
                  style={{
                    width: `${getProgressPercentage(
                      currentWorkout
                    )}%`,
                  }}
                />
              </div>
            </>
          )}

          <button
            onClick={() =>
              handleWorkoutClick(currentWorkout)
            }
          >
            {currentStatus === "in-progress"
              ? "Continue Workout"
              : "Start Workout"}
          </button>
        </div>
      ) : (
        <div className="next-workout-card">
          <h2>All Workouts Completed!</h2>

          <p>
            You completed your entire workout
            program.
          </p>
        </div>
      )}

      {/* UPCOMING WORKOUTS */}

      <h2 className="section-title">
        Workout Program
      </h2>

      <div className="workout-grid">
        {upcomingWorkouts.map((workout) => {
          const status =
            getWorkoutStatus(workout);

          const percentage =
            getProgressPercentage(workout);

          return (
            <div
              className="workout-card"
              key={workout.id}
            >
              <div className="workout-card-header">
                <h3>{workout.name}</h3>

                {status === "completed" && (
                  <span className="workout-status completed">
                    Completed
                  </span>
                )}

                {status === "in-progress" && (
                  <span className="workout-status in-progress">
                    In Progress
                  </span>
                )}

                {status === "not-started" && (
                  <span className="workout-status not-started">
                    Not Started
                  </span>
                )}
              </div>

              <p>{workout.focus}</p>

              <p>
                {workout.exercises.length} Exercises
              </p>

              {status === "in-progress" && (
                <>
                  <p>
                    Progress: {percentage}%
                  </p>

                  <div className="workout-progress-bar">
                    <div
                      className="workout-progress-fill"
                      style={{
                        width: `${percentage}%`,
                      }}
                    />
                  </div>
                </>
              )}

              {status === "completed" ? (
                <button
                  onClick={() =>
                    handleWorkoutClick(workout)
                  }
                >
                  View Workout
                </button>
              ) : status === "in-progress" ? (
                <button
                  onClick={() =>
                    handleWorkoutClick(workout)
                  }
                >
                  Continue
                </button>
              ) : (
                <button
                  onClick={() =>
                    handleWorkoutClick(workout)
                  }
                >
                  Start Workout
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Workouts;
