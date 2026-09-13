import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, deleteDoc } from "firebase/firestore";
import Button from "../components/ui/Button/Button";
import workoutProgram from "../data/Workouts";
import "../styles/WorkoutProgress.css";

function WorkoutProgress() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) return;
      
      try {
        const progressSnapshot = await getDocs(
          collection(db, "users", user.uid, "workoutProgress")
        );
        
        const savedHistory = [];
        progressSnapshot.forEach((docSnap) => {
          const progress = docSnap.data();
          savedHistory.push({
            ...progress,
            completedSets: Array.isArray(progress.completedSets) ? progress.completedSets : [],
          });
        });
        
        savedHistory.sort((a, b) => {
          return new Date(b.savedAt || 0) - new Date(a.savedAt || 0);
        });
        
        setHistory(savedHistory);
      } catch (err) {
        console.error("Error loading workout history", err);
      }
    });

    return () => unsubscribe();
  }, []);

  const totalWorkouts = history.length;

  const totalExercises = history.reduce(
    (total, workout) => {
      return (
        total +
        workout.completedSets.filter(
          (sets) => sets > 0
        ).length
      );
    },
    0
  );

  const totalSets = history.reduce(
    (total, workout) => {
      return (
        total +
        workout.completedSets.reduce(
          (sum, sets) => sum + sets,
          0
        )
      );
    },
    0
  );

  const completedWorkouts = history.filter(
    (workout) => {
      const originalWorkout = workoutProgram.find(
        (item) => item.id === workout.workoutId
      );

      if (!originalWorkout) return false;

      return originalWorkout.exercises.every(
        (exercise, index) =>
          (workout.completedSets[index] || 0) >=
          exercise.sets
      );
    }
  ).length;

  const getProgressPercentage = (workout) => {
    const originalWorkout = workoutProgram.find(
      (item) => item.id === workout.workoutId
    );

    if (
      !originalWorkout ||
      originalWorkout.exercises.length === 0
    ) {
      return 0;
    }

    const totalPossibleSets =
      originalWorkout.exercises.reduce(
        (total, exercise) =>
          total + exercise.sets,
        0
      );

    const completedSets =
      workout.completedSets.reduce(
        (total, sets) => total + sets,
        0
      );

    if (totalPossibleSets === 0) return 0;

    return Math.min(
      Math.round(
        (completedSets / totalPossibleSets) * 100
      ),
      100
    );
  };

  const formatDate = (date) => {
    if (!date) return "Unknown date";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "Unknown date";
    }

    return parsedDate.toLocaleDateString(
      "en-IN",
      {
        day: "numeric",
        month: "short",
        year: "numeric",
      }
    );
  };

  const handleClearHistory = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to clear all workout progress?"
    );

    if (!confirmed) return;

    const user = auth.currentUser;
    if (user) {
      try {
        const progressSnapshot = await getDocs(
          collection(db, "users", user.uid, "workoutProgress")
        );
        await Promise.all(
          progressSnapshot.docs.map((d) => deleteDoc(d.ref))
        );
        setHistory([]);
      } catch (err) {
        console.error("Failed to clear history", err);
      }
    }
  };

  return (
    <div className="workout-progress">
      <div className="workout-progress-header">
        <div>
          <h1>Workout Progress</h1>
          <p>Track your training activity</p>
        </div>

        {history.length > 0 && (
          <Button
            variant="danger"
            onClick={handleClearHistory}
          >
            Clear Progress
          </Button>
        )}
      </div>

      <div className="progress-stats">
        <div className="progress-stat-card">
          <h2>{totalWorkouts}</h2>
          <p>Workouts</p>
        </div>

        <div className="progress-stat-card">
          <h2>{completedWorkouts}</h2>
          <p>Completed</p>
        </div>

        <div className="progress-stat-card">
          <h2>{totalExercises}</h2>
          <p>Exercises</p>
        </div>

        <div className="progress-stat-card">
          <h2>{totalSets}</h2>
          <p>Sets Completed</p>
        </div>
      </div>

      <div className="workout-history">
        <div className="history-header">
          <h2>Workout History</h2>
        </div>

        {history.length === 0 ? (
          <div className="empty-progress">
            <h3>No workout progress yet</h3>

            <p>
              Complete a workout to see your
              progress here.
            </p>
          </div>
        ) : (
          history.map((workout) => {
            const originalWorkout =
              workoutProgram.find(
                (item) =>
                  item.id === workout.workoutId
              );

            const progress =
              getProgressPercentage(workout);

            const exercisesCompleted =
              workout.completedSets.filter(
                (sets) => sets > 0
              ).length;

            const setsCompleted =
              workout.completedSets.reduce(
                (sum, sets) => sum + sets,
                0
              );

            const isCompleted =
              originalWorkout &&
              originalWorkout.exercises.every(
                (exercise, index) =>
                  (workout.completedSets[index] ||
                    0) >= exercise.sets
              );

            return (
              <div
                className="history-card"
                key={workout.workoutId}
              >
                <div className="history-card-header">
                  <div>
                    <h3>
                      {workout.workoutName}
                    </h3>

                    <p>
                      {formatDate(
                        workout.savedAt
                      )}
                    </p>
                  </div>

                  <span>
                    {isCompleted
                      ? "Completed"
                      : `${progress}%`}
                  </span>
                </div>

                <div className="history-progress">
                  <div
                    className="history-progress-fill"
                    style={{
                      width: `${progress}%`,
                    }}
                  />
                </div>

                <div className="history-details">
                  <p>
                    <strong>
                      {exercisesCompleted}
                    </strong>{" "}
                    exercises completed
                  </p>

                  <p>
                    <strong>
                      {setsCompleted}
                    </strong>{" "}
                    sets completed
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default WorkoutProgress;
