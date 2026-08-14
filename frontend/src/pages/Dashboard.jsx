import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button/Button";
import workoutProgram from "../data/workouts";
import "../styles/Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  const [foodLog, setFoodLog] = useState([]);
  const [calorieTarget, setCalorieTarget] = useState(2500);
  const [proteinTarget, setProteinTarget] = useState(120);
  const [workoutHistory, setWorkoutHistory] = useState([]);

  useEffect(() => {
    const loadDashboardData = () => {
      const savedFood = localStorage.getItem(
        "trainiq-food-log"
      );

      const savedCalories = localStorage.getItem(
        "trainiq-calorie-target"
      );

      const savedProtein = localStorage.getItem(
        "trainiq-protein-target"
      );

      setFoodLog(
        savedFood ? JSON.parse(savedFood) : []
      );

      setCalorieTarget(
        Number(savedCalories) || 2500
      );

      setProteinTarget(
        Number(savedProtein) || 120
      );

      const history = [];

      workoutProgram.forEach((workout) => {
        const saved = localStorage.getItem(
          `trainiq-workout-progress-${workout.id}`
        );

        if (saved) {
          try {
            const progress = JSON.parse(saved);

            if (progress.completed) {
              history.push(progress);
            }
          } catch {
            console.error(
              "Invalid workout progress data"
            );
          }
        }
      });

      history.sort(
        (a, b) =>
          new Date(b.completedAt || b.savedAt || 0) -
          new Date(a.completedAt || a.savedAt || 0)
      );

      setWorkoutHistory(history);
    };

    loadDashboardData();

    window.addEventListener(
      "storage",
      loadDashboardData
    );

    return () => {
      window.removeEventListener(
        "storage",
        loadDashboardData
      );
    };
  }, []);

  const totalCalories = foodLog.reduce(
    (total, food) =>
      total + Number(food.calories || 0),
    0
  );

  const totalProtein = foodLog.reduce(
    (total, food) =>
      total + Number(food.protein || 0),
    0
  );

  const totalCarbs = foodLog.reduce(
    (total, food) =>
      total + Number(food.carbs || 0),
    0
  );

  const totalFats = foodLog.reduce(
    (total, food) =>
      total + Number(food.fats || 0),
    0
  );

  const caloriesRemaining = Math.max(
    calorieTarget - totalCalories,
    0
  );

  const proteinRemaining = Math.max(
    proteinTarget - totalProtein,
    0
  );

  const calorieProgress = Math.min(
    (totalCalories / calorieTarget) * 100,
    100
  );

  const proteinProgress = Math.min(
    (totalProtein / proteinTarget) * 100,
    100
  );

  const currentWorkout =
    workoutProgram.find((workout) => {
      const saved = localStorage.getItem(
        `trainiq-workout-progress-${workout.id}`
      );

      if (!saved) return true;

      try {
        const progress = JSON.parse(saved);
        return !progress.completed;
      } catch {
        return true;
      }
    }) || workoutProgram[0];

  const currentWorkoutProgress = (() => {
    const saved = localStorage.getItem(
      `trainiq-workout-progress-${currentWorkout.id}`
    );

    if (!saved) return 0;

    try {
      const progress = JSON.parse(saved);

      const totalSets = currentWorkout.exercises.reduce(
        (total, exercise) =>
          total + exercise.sets,
        0
      );

      const completedSets =
        progress.completedSets?.reduce(
          (total, sets) =>
            total + Number(sets || 0),
          0
        ) || 0;

      if (totalSets === 0) return 0;

      return Math.min(
        Math.round(
          (completedSets / totalSets) * 100
        ),
        100
      );
    } catch {
      return 0;
    }
  })();

  const recentActivity =
    workoutHistory.slice(0, 3);

  const weeklyTarget = 6;

  const weeklyProgress = Math.min(
    workoutHistory.length,
    weeklyTarget
  );

  return (
    <div className="main-content">

      {/* WELCOME */}

      <div className="welcome">
        <h1>Welcome Back</h1>

        <p>
          Ready to crush today's workout?
        </p>
      </div>

      {/* STATS */}

      <div className="stats">

        <div className="stat-card">
          <h3>Calories</h3>

          <h2>
            {Math.round(totalCalories)}
          </h2>

          <p>
            / {calorieTarget} kcal
          </p>
        </div>

        <div className="stat-card">
          <h3>Protein</h3>

          <h2>
            {Math.round(totalProtein)}g
          </h2>

          <p>
            / {proteinTarget}g
          </p>
        </div>

        <div className="stat-card">
          <h3>Water</h3>

          <h2>3L</h2>

          <p>
            Daily target
          </p>
        </div>

        <div className="stat-card">
          <h3>Workouts</h3>

          <h2>
            {workoutHistory.length}
          </h2>

          <p>
            Completed
          </p>
        </div>

      </div>

      {/* MAIN CARDS */}

      <div className="cards">

        {/* TODAY'S WORKOUT */}

        <div className="card">
          <h2>Today's Workout</h2>

          <p>
            {currentWorkout.name}
          </p>

          <p>
            {currentWorkout.focus}
          </p>

          <p>
            {currentWorkout.exercises.length}{" "}
            exercises
          </p>

          {currentWorkoutProgress > 0 && (
            <>
              <p>
                Progress:{" "}
                {currentWorkoutProgress}%
              </p>

              <div
                style={{
                  width: "100%",
                  height: "8px",
                  background: "#2a2a2a",
                  borderRadius: "10px",
                  overflow: "hidden",
                  marginBottom: "15px",
                }}
              >
                <div
                  style={{
                    width: `${currentWorkoutProgress}%`,
                    height: "100%",
                    background: "#00ff88",
                    borderRadius: "10px",
                  }}
                />
              </div>
            </>
          )}

          <Button
            variant="primary"
            onClick={() =>
              navigate(
                `/workouts/${currentWorkout.id}`
              )
            }
          >
            {currentWorkoutProgress > 0
              ? "Continue Workout"
              : "Start Workout"}
          </Button>
        </div>

        {/* NUTRITION */}

        <div className="card">
          <h2>Nutrition</h2>

          <p>
            Calories Remaining
          </p>

          <h3>
            {Math.round(
              caloriesRemaining
            )}{" "}
            kcal
          </h3>

          <p>
            Protein Remaining
          </p>

          <h3>
            {Math.round(
              proteinRemaining
            )}{" "}
            g
          </h3>

          <p>
            {Math.round(totalCarbs)}g
            {" "}Carbs •{" "}
            {Math.round(totalFats)}g
            {" "}Fats
          </p>

          <Button
            variant="primary"
            onClick={() =>
              navigate("/diet")
            }
          >
            Open Diet Tracker
          </Button>
        </div>

        {/* RECENT ACTIVITY */}

        <div className="card">
          <h2>Recent Activity</h2>

          {recentActivity.length === 0 ? (
            <>
              <p>
                No workouts completed yet.
              </p>

              <p>
                Start your first workout!
              </p>
            </>
          ) : (
            recentActivity.map(
              (workout) => (
                <p
                  key={workout.workoutId}
                >
                  ✔{" "}
                  {workout.workoutName}
                </p>
              )
            )
          )}

          {workoutHistory.length > 0 && (
            <Button
              variant="primary"
              onClick={() =>
                navigate("/progress")
              }
            >
              View Progress
            </Button>
          )}
        </div>

        {/* GOAL */}

        <div className="card">
          <h2>Goal</h2>

          <p>
            Current Goal
          </p>

          <h3>
            Muscle Gain
          </h3>

          <p>
            Weekly Target
          </p>

          <h3>
            {weeklyTarget} Workouts
          </h3>

          <p>
            Progress:{" "}
            {weeklyProgress} /{" "}
            {weeklyTarget}
          </p>

          <div
            style={{
              width: "100%",
              height: "8px",
              background: "#2a2a2a",
              borderRadius: "10px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${
                  (weeklyProgress /
                    weeklyTarget) *
                  100
                }%`,
                height: "100%",
                background: "#00ff88",
                borderRadius: "10px",
              }}
            />
          </div>
        </div>

      </div>

    </div>
  );
}

export default Dashboard;