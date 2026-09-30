import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, doc, getDoc, setDoc } from "firebase/firestore";
import workoutProgram from "../data/Workouts";
import { recommendationEngine } from "../services/recommendationEngine";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import "../styles/Workouts.css";

function Workouts() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState({});
  const [workoutHistory, setWorkoutHistory] = useState([]);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) return;
      
      const savedProgress = {};
      const historyList = [];
      
      try {
        const [progressSnapshot, userSnap] = await Promise.all([
          getDocs(collection(db, "users", user.uid, "workoutProgress")),
          getDoc(doc(db, "users", user.uid))
        ]);

        if (userSnap.exists()) {
          setUserProfile(userSnap.data());
        }
        
        progressSnapshot.forEach((docSnap) => {
          const data = docSnap.data();
          savedProgress[docSnap.id] = data;
          if (data.completed) {
            historyList.push({
              ...data,
              workoutId: data.workoutId || docSnap.id,
            });
          }
        });

        // Migration from localStorage (preserves existing migration flow)
        for (const workout of workoutProgram) {
          const localKey = `trainiq-workout-progress-${workout.id}`;
          const savedLocal = localStorage.getItem(localKey);
          if (savedLocal) {
            try {
              const parsed = JSON.parse(savedLocal);
              if (!savedProgress[workout.id]) {
                await setDoc(doc(db, "users", user.uid, "workoutProgress", String(workout.id)), parsed, { merge: true });
                savedProgress[workout.id] = parsed;
              }
              localStorage.removeItem(localKey);
            } catch {
              console.error(`Migration failed for ${workout.id}`);
            }
          }
        }
        
        historyList.sort(
          (a, b) => new Date(b.completedAt || b.savedAt || 0) - new Date(a.completedAt || a.savedAt || 0)
        );

        setProgress(savedProgress);
        setWorkoutHistory(historyList);
      } catch (err) {
        console.error("Error loading workout progress", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  // Deterministically select ONE recommended workout for today
  const recommendation = recommendationEngine.getRecommendedWorkout({
    workouts: workoutProgram,
    workoutHistory,
    progressMap: progress,
    userProfile,
  }) || {
    workout: workoutProgram[0],
    workoutId: workoutProgram[0].id,
    name: workoutProgram[0].name,
    focus: workoutProgram[0].focus,
    exercises: workoutProgram[0].exercises,
    exerciseCount: workoutProgram[0].exercises.length,
    status: "ready",
    progressPercent: 0,
    reason: `Start your training progression with ${workoutProgram[0].name}.`,
    isCompletedToday: false,
  };

  const workout = recommendation.workout;

  const handleStartWorkout = () => {
    navigate(`/workouts/${workout.id}`);
  };

  return (
    <div className="workouts-page">
      <div className="workouts-header">
        <h1>Workouts</h1>
        <p className="workouts-subtitle">
          TrainIQ selected your workout for today. Complete it to stay on track with your progression.
        </p>
      </div>

      {loading ? (
        <div className="workouts-loading">
          <p className="animate-pulse">Loading today's recommendation...</p>
        </div>
      ) : error ? (
        <div className="workouts-error">
          <h2>Couldn't load workouts</h2>
          <p>Check your connection and try again.</p>
          <Button variant="primary" onClick={() => window.location.reload()}>Retry</Button>
        </div>
      ) : (
        <div className="today-workout-container">
          <div className="today-workout-eyebrow-row">
            <h2 className="section-title">Today's Workout</h2>
            <span className={`workout-status-badge ${recommendation.status}`}>
              {recommendation.isCompletedToday
                ? "COMPLETED TODAY"
                : recommendation.status === "in-progress"
                ? "IN PROGRESS"
                : "RECOMMENDED"}
            </span>
          </div>

          <Card className="today-workout-card">
            <div className="card-top">
              <span className="card-tag">
                {recommendation.status === "in-progress"
                  ? "SESSION IN PROGRESS"
                  : "TRAINIQ RECOMMENDATION"}
              </span>
              <span className="exercise-count-pill">
                {workout.exercises.length} Exercises
              </span>
            </div>

            <h3 className="workout-name">{workout.name}</h3>
            <p className="workout-focus">{workout.focus}</p>

            <div className="workout-reason-box">
              <span className="reason-label">Why today:</span>
              <p className="workout-reason">{recommendation.reason}</p>
            </div>

            <div className="workout-meta-grid">
              <div className="meta-card">
                <span className="meta-label">EXERCISES</span>
                <span className="meta-value">{workout.exercises.length}</span>
              </div>
              <div className="meta-card">
                <span className="meta-label">EST. TIME</span>
                <span className="meta-value">~45–60 min</span>
              </div>
              <div className="meta-card">
                <span className="meta-label">INTENSITY</span>
                <span className="meta-value">Optimal</span>
              </div>
            </div>

            {recommendation.status === "in-progress" && recommendation.progressPercent > 0 && (
              <div className="workout-progress-section">
                <div className="progress-labels">
                  <span>Workout progress</span>
                  <span>{recommendation.progressPercent}%</span>
                </div>
                <div className="progress-track">
                  <div
                    className="progress-fill"
                    style={{ width: `${recommendation.progressPercent}%` }}
                  />
                </div>
              </div>
            )}

            <div className="exercise-preview-section">
              <h4 className="preview-title">Workout Overview</h4>
              <div className="exercise-preview-list">
                {workout.exercises.map((exercise, index) => (
                  <div key={index} className="exercise-preview-item">
                    <span className="exercise-num">{index + 1}</span>
                    <div className="exercise-info">
                      <span className="exercise-title">{exercise.name}</span>
                      <span className="exercise-meta">{exercise.sets} sets × {exercise.reps}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Button
              className="start-workout-btn"
              onClick={handleStartWorkout}
            >
              {recommendation.isCompletedToday
                ? "View Workout Details"
                : recommendation.status === "in-progress"
                ? "Continue Workout"
                : "Start Workout"}
            </Button>
          </Card>
        </div>
      )}
    </div>
  );
}

export default Workouts;

