import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button/Button";
import workoutProgram from "../data/Workouts";
import "../styles/Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  // ==========================================
  // STATE
  // ==========================================

  const [foodLog, setFoodLog] = useState([]);
  const [calorieTarget, setCalorieTarget] = useState(2500);
  const [proteinTarget, setProteinTarget] = useState(120);
  const [workoutHistory, setWorkoutHistory] = useState([]);
  const [workoutProgressMap, setWorkoutProgressMap] = useState({});

  // Water
  const [waterIntake, setWaterIntake] = useState(0);
  const [waterTarget, setWaterTarget] = useState(3000);
  const [customWater, setCustomWater] = useState("");
  const [waterHistory, setWaterHistory] = useState({});

  // Water target modal
  const [showWaterTarget, setShowWaterTarget] = useState(false);
  const [newWaterTarget, setNewWaterTarget] = useState(3000);

  // ==========================================
  // DATE
  // ==========================================

  const getToday = () =>
    new Date().toISOString().split("T")[0];

  // ==========================================
  // LOAD DASHBOARD DATA FROM FIREBASE
  // ==========================================

  useEffect(() => {
    let unsubscribe;
    let focusCleanup;

    const loadDashboardData = async (uid) => {
      try {
        const today = getToday();
        const userRef = doc(db, "users", uid);

        // ========================================
        // USER TARGETS
        // ========================================

        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const userData = userSnap.data();

          const calories = Number(userData.calorieTarget) || 2500;
          const protein = Number(userData.proteinTarget) || 120;
          const target = Number(userData.waterTarget) || 3000;

          setCalorieTarget(calories);
          setProteinTarget(protein);
          setWaterTarget(target);
          setNewWaterTarget(target);
        } else {
          setCalorieTarget(2500);
          setProteinTarget(120);
          setWaterTarget(3000);
          setNewWaterTarget(3000);
        }

        // ========================================
        // FOOD - TODAY'S DIET LOG
        // ========================================

        const dietRef = doc(
          db,
          "users",
          uid,
          "dietLogs",
          today
        );

        const dietSnap = await getDoc(dietRef);
        let todaysFood = [];

        if (dietSnap.exists()) {
          const dietData = dietSnap.data();

          ["Breakfast", "Lunch", "Dinner", "Snacks"].forEach(
            (meal) => {
              if (Array.isArray(dietData[meal])) {
                todaysFood.push(...dietData[meal]);
              }
            }
          );
        }

        setFoodLog(todaysFood);

        // ========================================
        // WATER HISTORY
        // ========================================

        const waterSnapshot = await getDocs(
          collection(db, "users", uid, "waterLogs")
        );

        const loadedHistory = {};

        waterSnapshot.forEach((waterDoc) => {
          const data = waterDoc.data();
          loadedHistory[waterDoc.id] = Number(data.amount) || 0;
        });

        const todaysWater = Number(loadedHistory[today]) || 0;

        setWaterHistory(loadedHistory);
        setWaterIntake(todaysWater);

        // ========================================
        // WORKOUT PROGRESS / HISTORY
        // ========================================

        const workoutSnapshot = await getDocs(
          collection(db, "users", uid, "workoutProgress")
        );

        const progressMap = {};
        const history = [];

        workoutSnapshot.forEach((workoutDoc) => {
          const progress = workoutDoc.data();
          progressMap[workoutDoc.id] = progress;

          if (progress.completed) {
            history.push({
              ...progress,
              workoutId: progress.workoutId || workoutDoc.id,
            });
          }
        });

        history.sort(
          (a, b) =>
            new Date(b.completedAt || b.savedAt || 0) -
            new Date(a.completedAt || a.savedAt || 0)
        );

        setWorkoutProgressMap(progressMap);
        setWorkoutHistory(history);
      } catch (error) {
        console.error(
          "Error loading TrainIQ dashboard data:",
          error
        );
      }
    };

    unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/login");
        return;
      }

      loadDashboardData(user.uid);

      const handleFocus = () => {
        loadDashboardData(user.uid);
      };

      if (focusCleanup) {
        focusCleanup();
      }

      window.addEventListener("focus", handleFocus);
      focusCleanup = () => {
        window.removeEventListener("focus", handleFocus);
      };
    });

    return () => {
      if (focusCleanup) {
        focusCleanup();
      }
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [navigate]);

  // ==========================================
  // WATER
  // ==========================================

  const saveWaterData = async (
    amount,
    target = waterTarget
  ) => {
    const user = auth.currentUser;

    if (!user) {
      navigate("/login");
      return;
    }

    const today = getToday();
    const safeAmount = Math.max(Number(amount) || 0, 0);

    const updatedHistory = {
      ...waterHistory,
      [today]: safeAmount,
    };

    setWaterHistory(updatedHistory);
    setWaterIntake(safeAmount);

    try {
      await setDoc(
        doc(db, "users", user.uid, "waterLogs", today),
        {
          date: today,
          amount: safeAmount,
          target: Number(target) || 3000,
        },
        { merge: true }
      );

      console.log(`Water saved: ${today}`);
    } catch (error) {
      console.error("Error saving water data:", error);
    }
  };

  const addWater = (amount) => {
    const value = Number(amount);

    if (!Number.isFinite(value) || value <= 0) {
      return;
    }

    saveWaterData(
      Math.min(
        waterIntake + value,
        waterTarget
      )
    );
  };

  const removeWater = (amount) => {
    const value = Number(amount);

    if (!Number.isFinite(value) || value <= 0) {
      return;
    }

    saveWaterData(
      Math.max(waterIntake - value, 0)
    );
  };

  const addCustomWater = () => {
    const value = Number(customWater);

    if (!Number.isFinite(value) || value <= 0) {
      return;
    }

    addWater(value);
    setCustomWater("");
  };

  const resetWater = () => {
    saveWaterData(0);
  };

  const saveWaterTarget = async () => {
    const user = auth.currentUser;
    const target = Number(newWaterTarget);

    if (!user || !Number.isFinite(target) || target <= 0) {
      return;
    }

    setWaterTarget(target);

    try {
      await setDoc(
        doc(db, "users", user.uid),
        { waterTarget: target },
        { merge: true }
      );

      await setDoc(
        doc(db, "users", user.uid, "waterLogs", getToday()),
        {
          date: getToday(),
          amount: waterIntake,
          target,
        },
        { merge: true }
      );

      setShowWaterTarget(false);
      console.log("Water target saved to Firebase");
    } catch (error) {
      console.error("Error saving water target:", error);
    }
  };

  const waterProgress =
    waterTarget > 0
      ? Math.min(
          (waterIntake / waterTarget) * 100,
          100
        )
      : 0;

  const waterRemaining = Math.max(
    waterTarget - waterIntake,
    0
  );

  // ==========================================
  // WATER HISTORY
  // ==========================================

  const getLastSevenDays = () => {
    const days = [];

    for (let i = 6; i >= 0; i--) {
      const date = new Date();

      date.setDate(
        date.getDate() - i
      );

      days.push(
        date.toISOString().split("T")[0]
      );
    }

    return days;
  };

  const lastSevenDays =
    getLastSevenDays();

  const formatHistoryDate = (dateString) => {
    const date = new Date(
      `${dateString}T00:00:00`
    );

    return date.toLocaleDateString(
      "en-IN",
      {
        weekday: "short",
        day: "numeric",
      }
    );
  };

  // ==========================================
  // NUTRITION
  // ==========================================

  const getNutritionValue = (
    food,
    totalKey,
    baseKey
  ) => {
    if (food[totalKey] !== undefined) {
      return Number(food[totalKey]) || 0;
    }

    return (
      Number(food[baseKey] || 0) *
      (Number(food.quantity) || 1)
    );
  };

  const totalCalories = foodLog.reduce(
    (total, food) =>
      total +
      getNutritionValue(
        food,
        "totalCalories",
        "calories"
      ),
    0
  );

  const totalProtein = foodLog.reduce(
    (total, food) =>
      total +
      getNutritionValue(
        food,
        "totalProtein",
        "protein"
      ),
    0
  );

  const totalCarbs = foodLog.reduce(
    (total, food) =>
      total +
      getNutritionValue(
        food,
        "totalCarbs",
        "carbs"
      ),
    0
  );

  const totalFats = foodLog.reduce(
    (total, food) =>
      total +
      getNutritionValue(
        food,
        "totalFats",
        "fats"
      ),
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

  const calorieProgress =
    calorieTarget > 0
      ? Math.min(
          (totalCalories / calorieTarget) *
            100,
          100
        )
      : 0;

  const proteinProgress =
    proteinTarget > 0
      ? Math.min(
          (totalProtein / proteinTarget) *
            100,
          100
        )
      : 0;

  // ==========================================
  // CURRENT WORKOUT
  // ==========================================

  const currentWorkout =
    workoutProgram.find(
      (workout) => !workoutProgressMap[workout.id]?.completed
    ) || workoutProgram[0];

  const currentWorkoutProgress = (() => {
    if (!currentWorkout) return 0;

    const progress =
      workoutProgressMap[currentWorkout.id];

    if (!progress) return 0;

    const totalSets = currentWorkout.exercises.reduce(
      (total, exercise) =>
        total + Number(exercise.sets || 0),
      0
    );

    const completedSets = Array.isArray(
      progress.completedSets
    )
      ? progress.completedSets.reduce(
          (total, sets) => total + Number(sets || 0),
          0
        )
      : 0;

    if (!totalSets) return 0;

    return Math.min(
      Math.round((completedSets / totalSets) * 100),
      100
    );
  })();

  // ==========================================
  // ACTIVITY
  // ==========================================

  const recentActivity =
    workoutHistory.slice(0, 3);

  // ==========================================
  // GOAL
  // ==========================================

  const weeklyTarget = 6;

  const weeklyProgress = Math.min(
    workoutHistory.filter((workout) => {
      const completedAt = workout.completedAt || workout.savedAt;
      if (!completedAt) return false;

      const completedDate = new Date(completedAt);
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
      sevenDaysAgo.setHours(0, 0, 0, 0);

      return completedDate >= sevenDaysAgo;
    }).length,
    weeklyTarget
  );

  // ==========================================
  // RENDER
  // ==========================================

  return (
    <div className="main-content">

      {/* ======================================
          HEADER
      ====================================== */}

      <div className="dashboard-header">
        <div>
          <span className="dashboard-eyebrow">
            TRAINIQ DASHBOARD
          </span>

          <h1>
            Welcome Back
          </h1>

          <p>
            Ready to crush today's workout?
          </p>
        </div>

        <div className="header-date">
          <span>Today</span>

          <strong>
            {new Date().toLocaleDateString(
              "en-IN",
              {
                weekday: "long",
                day: "numeric",
                month: "long",
              }
            )}
          </strong>
        </div>
      </div>

      {/* ======================================
          STATS
      ====================================== */}

      <div className="stats">

        <div className="stat-card">
          <div className="stat-icon">
            🔥
          </div>

          <div>
            <span>Calories</span>

            <strong>
              {Math.round(totalCalories)}
            </strong>

            <small>
              / {calorieTarget} kcal
            </small>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            💪
          </div>

          <div>
            <span>Protein</span>

            <strong>
              {Math.round(totalProtein)}g
            </strong>

            <small>
              / {proteinTarget}g
            </small>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            💧
          </div>

          <div>
            <span>Water</span>

            <strong>
              {(waterIntake / 1000).toFixed(2)}L
            </strong>

            <small>
              / {(waterTarget / 1000).toFixed(1)}L
            </small>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            🏋️
          </div>

          <div>
            <span>Workouts</span>

            <strong>
              {workoutHistory.length}
            </strong>

            <small>Completed</small>
          </div>
        </div>

      </div>

      {/* ======================================
          DASHBOARD GRID
      ====================================== */}

      <div className="dashboard-grid">

        {/* ====================================
            WORKOUT
        ==================================== */}

        <div className="dashboard-card workout-card">

          <div>
            <div className="card-top">
              <div>
                <span className="card-label">
                  TODAY'S SESSION
                </span>

                <h2>
                  Today's Workout
                </h2>
              </div>

              <span className="workout-badge">
                {currentWorkoutProgress > 0
                  ? "IN PROGRESS"
                  : "READY"}
              </span>
            </div>

            {currentWorkout ? (
              <>
                <p className="workout-focus">
                  {currentWorkout.name}
                </p>

                <div className="workout-meta">
                  <span>
                    {currentWorkout.focus}
                  </span>

                  <span>•</span>

                  <span>
                    {
                      currentWorkout.exercises
                        .length
                    }{" "}
                    exercises
                  </span>
                </div>

                {currentWorkoutProgress >
                  0 && (
                  <div className="workout-progress">

                    <div className="progress-label">
                      <span>
                        Workout progress
                      </span>

                      <span>
                        {
                          currentWorkoutProgress
                        }%
                      </span>
                    </div>

                    <div className="progress-track">
                      <div
                        className="progress-fill"
                        style={{
                          width: `${currentWorkoutProgress}%`,
                        }}
                      />
                    </div>

                  </div>
                )}
              </>
            ) : (
              <p>
                No workout available.
              </p>
            )}
          </div>

          {currentWorkout && (
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
          )}

        </div>

        {/* ====================================
            NUTRITION
        ==================================== */}

        <div className="dashboard-card nutrition-card">

          <div className="card-top">
            <div>
              <span className="card-label">
                DAILY NUTRITION
              </span>

              <h2>
                Nutrition
              </h2>
            </div>
          </div>

          <div className="nutrition-main">

            <div>
              <span>
                Calories remaining
              </span>

              <strong>
                {Math.round(
                  caloriesRemaining
                )}
              </strong>

              <small> kcal</small>
            </div>

            <div>
              <span>
                Protein remaining
              </span>

              <strong>
                {Math.round(
                  proteinRemaining
                )}
              </strong>

              <small> g</small>
            </div>

          </div>

          <div className="macro-row">
            <span>
              Carbs{" "}
              <strong>
                {Math.round(totalCarbs)}g
              </strong>
            </span>

            <span>
              Fats{" "}
              <strong>
                {Math.round(totalFats)}g
              </strong>
            </span>
          </div>

          <div className="nutrition-progress">

            <div className="progress-label">
              <span>
                Calories
              </span>

              <span>
                {Math.round(
                  calorieProgress
                )}%
              </span>
            </div>

            <div className="progress-track">
              <div
                className="progress-fill"
                style={{
                  width: `${calorieProgress}%`,
                }}
              />
            </div>

            <div className="progress-label">
              <span>
                Protein
              </span>

              <span>
                {Math.round(
                  proteinProgress
                )}%
              </span>
            </div>

            <div className="progress-track">
              <div
                className="progress-fill"
                style={{
                  width: `${proteinProgress}%`,
                }}
              />
            </div>

          </div>

          <Button
            variant="primary"
            onClick={() =>
              navigate("/diet")
            }
          >
            Open Diet Tracker
          </Button>

        </div>

        {/* ====================================
            WATER
        ==================================== */}

        <div className="dashboard-card water-card">

          <div className="card-top">
            <div>
              <span className="card-label">
                HYDRATION
              </span>

              <h2>
                Water Intake
              </h2>
            </div>

            <button
              className="settings-button"
              onClick={() => {
                setNewWaterTarget(
                  waterTarget
                );

                setShowWaterTarget(true);
              }}
            >
              ⚙
            </button>
          </div>

          <div className="water-summary">

            <div className="water-amount">
              <strong>
                {(waterIntake / 1000).toFixed(
                  2
                )}
              </strong>

              <span>
                / {(waterTarget / 1000).toFixed(
                  1
                )}L
              </span>
            </div>

            <span className="water-percentage">
              {Math.round(waterProgress)}%
            </span>

          </div>

          <div className="progress-track water-progress">
            <div
              className="progress-fill"
              style={{
                width: `${waterProgress}%`,
              }}
            />
          </div>

          <p className="water-remaining">
            {waterRemaining > 0
              ? `${(
                  waterRemaining / 1000
                ).toFixed(
                  2
                )}L remaining`
              : "Daily target reached"}
          </p>

          <div className="water-actions">

            <button
              onClick={() =>
                addWater(250)
              }
            >
              +250ml
            </button>

            <button
              onClick={() =>
                addWater(500)
              }
            >
              +500ml
            </button>

            <button
              onClick={() =>
                addWater(1000)
              }
            >
              +1L
            </button>

          </div>

          <div className="custom-water">

            <input
              type="number"
              min="1"
              placeholder="Custom amount (ml)"
              value={customWater}
              onChange={(e) =>
                setCustomWater(
                  e.target.value
                )
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  addCustomWater();
                }
              }}
            />

            <button
              onClick={addCustomWater}
            >
              Add
            </button>

          </div>

          {waterIntake > 0 && (
            <div className="water-secondary-actions">

              <button
                onClick={() =>
                  removeWater(250)
                }
              >
                −250ml
              </button>

              <button
                onClick={() =>
                  removeWater(500)
                }
              >
                −500ml
              </button>

              <button
                onClick={resetWater}
              >
                Reset
              </button>

            </div>
          )}

          <div className="water-history">

            <div className="history-heading">
              Last 7 Days
            </div>

            {lastSevenDays.map(
              (date) => {
                const amount =
                  Number(
                    waterHistory[date]
                  ) || 0;

                const percentage =
                  waterTarget > 0
                    ? Math.min(
                        (amount /
                          waterTarget) *
                          100,
                        100
                      )
                    : 0;

                return (
                  <div
                    className="history-day"
                    key={date}
                  >
                    <div className="history-day-top">

                      <span>
                        {date === getToday()
                          ? "Today"
                          : formatHistoryDate(
                              date
                            )}
                      </span>

                      <span>
                        {(
                          amount / 1000
                        ).toFixed(2)}
                        L
                      </span>

                    </div>

                    <div className="history-track">
                      <div
                        className="history-fill"
                        style={{
                          width: `${percentage}%`,
                        }}
                      />
                    </div>
                  </div>
                );
              }
            )}

          </div>

        </div>

        {/* ====================================
            ACTIVITY
        ==================================== */}

        <div className="dashboard-card activity-card">

          <div className="card-top">
            <div>
              <span className="card-label">
                WORKOUT HISTORY
              </span>

              <h2>
                Recent Activity
              </h2>
            </div>
          </div>

          {recentActivity.length === 0 ? (
            <div className="empty-state">
              <span>🏋️</span>

              <p>
                No workouts completed yet.
              </p>

              <small>
                Complete your first workout
                to see it here.
              </small>
            </div>
          ) : (
            <div className="activity-list">

              {recentActivity.map(
                (workout, index) => (
                  <div
                    className="activity-item"
                    key={
                      workout.workoutId ||
                      workout.id ||
                      index
                    }
                  >
                    <div className="activity-check">
                      ✓
                    </div>

                    <div>
                      <strong>
                        {
                          workout.workoutName
                        }
                      </strong>

                      <span>
                        Workout completed
                      </span>
                    </div>
                  </div>
                )
              )}

            </div>
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

        {/* ====================================
            GOAL
        ==================================== */}

        <div className="dashboard-card goal-card">

          <div className="card-top">
            <div>
              <span className="card-label">
                YOUR GOAL
              </span>

              <h2>
                Muscle Gain
              </h2>
            </div>

            <span className="goal-icon">
              🎯
            </span>
          </div>

          <div className="goal-number">
            <strong>
              {weeklyProgress}
            </strong>

            <span>
              / {weeklyTarget}
            </span>

            <small>
              workouts this week
            </small>
          </div>

          <div className="progress-track">
            <div
              className="progress-fill"
              style={{
                width: `${
                  (weeklyProgress /
                    weeklyTarget) *
                  100
                }%`,
              }}
            />
          </div>

          <p className="goal-message">
            {weeklyProgress >= weeklyTarget
              ? "Weekly workout target completed."
              : `${
                  weeklyTarget -
                  weeklyProgress
                } more workout${
                  weeklyTarget -
                    weeklyProgress ===
                  1
                    ? ""
                    : "s"
                } to hit your weekly target.`}
          </p>

        </div>

      </div>

      {/* ======================================
          WATER TARGET MODAL
      ====================================== */}

      {showWaterTarget && (
        <div
          className="target-modal-overlay"
          onClick={() =>
            setShowWaterTarget(false)
          }
        >
          <div
            className="target-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >
            <h2>
              Daily Water Target
            </h2>

            <p>
              Set your daily hydration
              target.
            </p>

            <label>
              Daily Target (ml)

              <input
                type="number"
                min="1"
                step="50"
                value={newWaterTarget}
                onChange={(e) =>
                  setNewWaterTarget(
                    e.target.value
                  )
                }
              />
            </label>

            <p className="modal-preview">
              Target:{" "}
              {(
                Number(newWaterTarget) /
                1000
              ).toFixed(2)}
              L
            </p>

            <div className="target-modal-actions">

              <Button
                variant="primary"
                onClick={saveWaterTarget}
              >
                Save Target
              </Button>

              <Button
                variant="danger"
                onClick={() =>
                  setShowWaterTarget(false)
                }
              >
                Cancel
              </Button>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default Dashboard;
