import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, deleteDoc } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import EmptyState from "@/components/ui/EmptyState";
import workoutProgram from "../data/Workouts";
import { Barbell, Trash } from "@phosphor-icons/react";
import "../styles/WorkoutProgress.css";

function WorkoutProgress() {
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setLoading(false);
        return;
      }

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
      } finally {
        setLoading(false);
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
          <span className="workout-progress-eyebrow">TRAINING LOG</span>
          <h1>Workout History</h1>
          <p className="workout-progress-sub">Review completed sessions and performance metrics.</p>
        </div>

        {history.length > 0 && (
          <Button
            variant="ghost"
            onClick={handleClearHistory}
            className="clear-history-btn"
          >
            <Trash size={16} />
            <span>Clear</span>
          </Button>
        )}
      </div>

      <div className="progress-stats">
        <div className="progress-stat-card">
          <span className="stat-card-label">SESSIONS</span>
          <h2>{totalWorkouts}</h2>
        </div>

        <div className="progress-stat-card">
          <span className="stat-card-label">COMPLETED</span>
          <h2>{completedWorkouts}</h2>
        </div>

        <div className="progress-stat-card">
          <span className="stat-card-label">EXERCISES</span>
          <h2>{totalExercises}</h2>
        </div>

        <div className="progress-stat-card">
          <span className="stat-card-label">TOTAL SETS</span>
          <h2>{totalSets}</h2>
        </div>
      </div>

      <div className="workout-history">
        <div className="history-header">
          <span className="section-label">PAST SESSIONS</span>
        </div>

        {loading ? (
          <div className="workout-progress-loading">
            <p>Loading session logs...</p>
          </div>
        ) : history.length === 0 ? (
          <EmptyState
            icon={<Barbell size={28} />}
            title="No workout progress yet"
            description="Complete your first training session to start building your streak and performance log."
            action={{
              label: "Go to Workouts",
              variant: "primary",
              onClick: () => navigate("/workouts"),
            }}
          />
        ) : (
          <div className="history-cards-list">
            {history.map((workout, index) => {
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
                    (workout.completedSets[index] || 0) >= exercise.sets
                );

              return (
                <Card
                  className="history-card"
                  key={workout.workoutId || workout.savedAt || `history-${index}`}
                >
                  <div className="history-card-header">
                    <div>
                      <h3>{workout.workoutName || "Workout Session"}</h3>
                      <p>{formatDate(workout.savedAt)}</p>
                    </div>

                    <span className={`history-status-pill ${isCompleted ? "completed" : "partial"}`}>
                      {isCompleted ? "Completed" : `${progress}%`}
                    </span>
                  </div>

                  <div className="history-progress-track">
                    <div
                      className="history-progress-fill"
                      style={{
                        width: `${progress}%`,
                      }}
                    />
                  </div>

                  <div className="history-details">
                    <span>
                      <strong>{exercisesCompleted}</strong> exercises
                    </span>
                    <span className="bullet-sep">•</span>
                    <span>
                      <strong>{setsCompleted}</strong> sets finished
                    </span>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default WorkoutProgress;