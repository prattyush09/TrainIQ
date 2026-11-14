import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import workoutProgram from "../data/Workouts";
import { recommendationEngine, parseDate } from "../services/recommendationEngine";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Lightning, ArrowRight, CheckCircle } from "@phosphor-icons/react";
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
        for (const w of workoutProgram) {
          const storageKey = `trainiq-workout-progress-${w.id}`;
          const local = localStorage.getItem(storageKey);
          if (local && !savedProgress[w.id]) {
            try {
              const parsed = JSON.parse(local);
              savedProgress[w.id] = parsed;
              if (parsed.completed) {
                historyList.push({ ...parsed, workoutId: w.id });
              }
            } catch (e) {
              console.warn("Failed to parse localStorage workout progress", e);
            }
          }
        }

        setProgress(savedProgress);
        setWorkoutHistory(historyList);
      } catch (e) {
        console.error("Error loading workout progress", e);
        setError(true);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="workouts-page">
        <div className="workouts-header">
          <span className="workouts-eyebrow">DAILY TRAINING</span>
          <h1>Workouts</h1>
          <p className="workouts-subtitle">
            Intelligent progression tailored to your recovery and training history.
          </p>
        </div>
        <div className="workouts-loading">
          <div className="loading-spinner-ring" />
          <p>Analyzing training schedule...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="workouts-page">
        <div className="workouts-header">
          <span className="workouts-eyebrow">DAILY TRAINING</span>
          <h1>Workouts</h1>
          <p className="workouts-subtitle">
            Intelligent progression tailored to your recovery and training history.
          </p>
        </div>
        <div className="workouts-error">
          <h2>Couldn't load workouts</h2>
          <p>Check your connection and try again.</p>
          <Button variant="default" onClick={() => window.location.reload()}>Retry</Button>
        </div>
      </div>
    );
  }

  // Generate recommendation
  const recommendation = recommendationEngine.getRecommendedWorkout({
    workouts: workoutProgram,
    workoutHistory,
    progressMap: progress,
    userProfile,
  });

  // Determine if a workout was completed today using local calendar date
  const completedTodayWorkout = recommendation.completedTodayWorkout || workoutHistory.find((w) => {
    if (!w || !w.completed) return false;
    const ts = w.completedAt || w.savedAt;
    if (!ts) return false;
    const d = parseDate(ts);
    if (!d) return false;
    const now = new Date();
    return (
      d.getFullYear() === now.getFullYear() &&
      d.getMonth() === now.getMonth() &&
      d.getDate() === now.getDate()
    );
  });

  const isCompletedToday = Boolean(completedTodayWorkout);
  const completedWorkoutId = completedTodayWorkout ? Number(completedTodayWorkout.workoutId ?? completedTodayWorkout.id) : null;
  const originalCompletedWorkout = completedWorkoutId ? workoutProgram.find((w) => w.id === completedWorkoutId) : null;
  const completedName = completedTodayWorkout?.workoutName || originalCompletedWorkout?.name || "Today's Workout";
  const completedFocus = originalCompletedWorkout?.focus || "Daily Training Session";

  const formatCompletionTime = (timestamp) => {
    if (!timestamp) return null;
    const d = parseDate(timestamp);
    if (!d) return null;
    return d.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  };

  const completionTime = formatCompletionTime(completedTodayWorkout?.completedAt || completedTodayWorkout?.savedAt);
  const durationMinutes = completedTodayWorkout?.elapsedTime ? Math.round(completedTodayWorkout.elapsedTime / 60) : null;

  const workout = recommendation.workout;

  const handleStartWorkout = () => {
    navigate(`/workouts/${workout.id}`);
  };

  return (
    <div className="workouts-page">
      <div className="workouts-header">
        <span className="workouts-eyebrow">DAILY TRAINING</span>
        <h1>Workouts</h1>
        <p className="workouts-subtitle">
          Intelligent progression tailored to your recovery and training history.
        </p>
      </div>

      {loading ? (
        <div className="workouts-loading">
          <div className="loading-spinner-ring" />
          <p>Analyzing training schedule...</p>
        </div>
      ) : error ? (
        <div className="workouts-error">
          <h2>Couldn't load workouts</h2>
          <p>Check your connection and try again.</p>
          <Button variant="default" onClick={() => window.location.reload()}>Retry</Button>
        </div>
      ) : isCompletedToday ? (
        <div className="today-workout-container">
          <div className="today-workout-eyebrow-row">
            <span className="section-label">TODAY'S SESSION</span>
            <span className="workout-status-badge completed-today">
              COMPLETED TODAY
            </span>
          </div>

          <Card className="today-workout-card workout-completed-card">
            <div className="card-top">
              <span className="card-tag card-tag-completed">
                <CheckCircle size={16} weight="fill" className="card-tag-icon text-[var(--color-success)]" />
                SESSION COMPLETE
              </span>
              {completionTime && (
                <span className="completed-time-pill">
                  {completionTime}
                </span>
              )}
            </div>

            <h2 className="workout-name">{completedName}</h2>
            <p className="workout-focus">{completedFocus}</p>

            <div className="workout-reason-box workout-completed-box">
              <span className="reason-label">Daily Training Complete</span>
              <p className="workout-reason">
                You've successfully finished today's workout. Rest, refuel adequately, and let your body recover. Your next session will be recommended tomorrow.
              </p>
            </div>

            <div className="workout-meta-grid">
              <div className="meta-card">
                <span className="meta-label">STATUS</span>
                <span className="meta-value text-[var(--color-success)]">Completed</span>
              </div>
              <div className="meta-card">
                <span className="meta-label">COMPLETED AT</span>
                <span className="meta-value">{completionTime || "Today"}</span>
              </div>
              <div className="meta-card">
                <span className="meta-label">DURATION</span>
                <span className="meta-value">
                  {durationMinutes ? `${durationMinutes} min` : "Logged"}
                </span>
              </div>
            </div>

            {originalCompletedWorkout && originalCompletedWorkout.exercises && (
              <div className="exercise-preview-section">
                <h3 className="preview-title">Completed Exercises ({originalCompletedWorkout.exercises.length})</h3>
                <div className="exercise-preview-list">
                  {originalCompletedWorkout.exercises.map((exercise, index) => (
                    <div key={index} className="exercise-preview-item exercise-preview-completed">
                      <CheckCircle size={16} weight="fill" className="text-[var(--color-success)] flex-shrink-0" />
                      <div className="exercise-info">
                        <span className="exercise-title">{exercise.name}</span>
                        <span className="exercise-meta">{exercise.sets} sets × {exercise.reps} reps</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="completed-actions-group">
              <Button
                variant="outline"
                className="view-history-btn"
                onClick={() => navigate("/progress")}
              >
                View Training Progress <ArrowRight size={16} weight="bold" />
              </Button>
            </div>
          </Card>
        </div>
      ) : (
        <div className="today-workout-container">
          <div className="today-workout-eyebrow-row">
            <span className="section-label">TODAY'S SESSION</span>
            <span className={`workout-status-badge ${recommendation.status}`}>
              {recommendation.status === "in-progress"
                ? "IN PROGRESS"
                : "RECOMMENDED"}
            </span>
          </div>

          <Card className="today-workout-card">
            <div className="card-top">
              <span className="card-tag">
                <Lightning size={14} weight="fill" className="card-tag-icon" />
                {recommendation.status === "in-progress"
                  ? "SESSION IN PROGRESS"
                  : "TRAINIQ TARGET"}
              </span>
              <span className="exercise-count-pill">
                {workout.exercises.length} Exercises
              </span>
            </div>

            <h2 className="workout-name">{workout.name}</h2>
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
                <span className="meta-label">EST. DURATION</span>
                <span className="meta-value">45–60 min</span>
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
                  <span className="progress-pct">{recommendation.progressPercent}%</span>
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
              <h3 className="preview-title">Workout Overview</h3>
              <div className="exercise-preview-list">
                {workout.exercises.map((exercise, index) => (
                  <div key={index} className="exercise-preview-item">
                    <span className="exercise-num">{String(index + 1).padStart(2, "0")}</span>
                    <div className="exercise-info">
                      <span className="exercise-title">{exercise.name}</span>
                      <span className="exercise-meta">{exercise.sets} sets × {exercise.reps} reps</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Button
              className="start-workout-btn"
              onClick={handleStartWorkout}
            >
              {recommendation.status === "in-progress" ? (
                <>Continue Workout <ArrowRight size={18} weight="bold" /></>
              ) : (
                <>Start Workout <ArrowRight size={18} weight="bold" /></>
              )}
            </Button>
          </Card>
        </div>
      )}
    </div>
  );
}

export default Workouts;