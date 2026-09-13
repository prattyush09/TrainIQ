import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, doc, setDoc } from "firebase/firestore";
import workoutProgram from "../data/Workouts";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import "../styles/Workouts.css";

function Workouts() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) return;
      
      const savedProgress = {};
      
      try {
        const progressSnapshot = await getDocs(
          collection(db, "users", user.uid, "workoutProgress")
        );
        
        progressSnapshot.forEach((docSnap) => {
          savedProgress[docSnap.id] = docSnap.data();
        });

        // Migration from localStorage
        for (const workout of workoutProgram) {
          const localKey = `trainiq-workout-progress-${workout.id}`;
          const savedLocal = localStorage.getItem(localKey);
          if (savedLocal) {
            try {
              const parsed = JSON.parse(savedLocal);
              if (!savedProgress[workout.id]) {
                await setDoc(doc(db, "users", user.uid, "workoutProgress", workout.id), parsed, { merge: true });
                savedProgress[workout.id] = parsed;
              }
              localStorage.removeItem(localKey);
            } catch {
              console.error(`Migration failed for ${workout.id}`);
            }
          }
        }
        
        setProgress(savedProgress);
      } catch (err) {
        console.error("Error loading workout progress", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
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

      {loading ? (
        <div style={{ padding: '40px 0', textAlign: 'center', color: 'var(--text-muted)' }}>
          Loading your program...
        </div>
      ) : error ? (
        <div style={{ padding: '40px 0', textAlign: 'center' }}>
          <h2 style={{ marginBottom: '8px' }}>Couldn't load workouts</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '16px' }}>Check your connection and try again.</p>
          <Button variant="primary" onClick={() => window.location.reload()}>Retry</Button>
        </div>
      ) : (
        <>
          {/* NEXT WORKOUT */}

      {currentWorkout ? (
        <Card className="next-workout-card bg-surface-card border-primary/50 border rounded-2xl p-5 mb-8">
          <div className="flex justify-between items-start mb-2">
            <h2 className="text-sm font-semibold text-primary uppercase tracking-wider">
              {currentStatus === "in-progress" ? "Continue" : "Up Next"}
            </h2>
            <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full font-medium">
              {currentWorkout.exercises.length} Exercises
            </span>
          </div>

          <h3 className="text-xl font-bold mb-1">{currentWorkout.name}</h3>
          <p className="text-sm text-muted-foreground mb-4">{currentWorkout.focus}</p>

          {currentStatus === "in-progress" && (
            <div className="mb-4">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-medium">{getProgressPercentage(currentWorkout)}%</span>
              </div>
              <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary"
                  style={{ width: `${getProgressPercentage(currentWorkout)}%` }}
                />
              </div>
            </div>
          )}

          <Button
            variant={currentStatus === "in-progress" ? "default" : "default"}
            className="w-full"
            onClick={() => handleWorkoutClick(currentWorkout)}
          >
            {currentStatus === "in-progress" ? "Continue Workout" : "Start Workout"}
          </Button>
        </Card>
      ) : (
        <Card className="next-workout-card bg-surface-card border-none rounded-2xl p-6 text-center mb-8">
          <div className="text-4xl mb-3">🎉</div>
          <h2 className="text-xl font-bold mb-2">All Completed!</h2>
          <p className="text-muted-foreground">You completed your entire workout program.</p>
        </Card>
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
            <Card
              className="bg-surface-card border-none rounded-2xl p-4 flex flex-col cursor-pointer hover:bg-surface-card/80 transition-colors"
              key={workout.id}
              onClick={() => handleWorkoutClick(workout)}
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg">{workout.name}</h3>
                {status === "completed" && (
                  <span className="text-xs bg-success/20 text-success px-2 py-1 rounded-full font-medium">Completed</span>
                )}
                {status === "in-progress" && (
                  <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full font-medium">In Progress</span>
                )}
              </div>

              <div className="flex text-sm text-muted-foreground mb-3 gap-2">
                <span>{workout.focus}</span>
                <span>•</span>
                <span>{workout.exercises.length} Exercises</span>
              </div>

              {status === "in-progress" && (
                <div className="mt-auto">
                  <div className="h-1 w-full bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              )}
            </Card>
          );
        })}
      </div>
      </>
      )}
    </div>
  );
}

export default Workouts;
