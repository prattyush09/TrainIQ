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
import TodayModal from "../components/dashboard/TodayModal";
import TrainIQScore from "../components/dashboard/TrainIQScore";
import "../styles/Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  // ==========================================
  // STATE
  // ==========================================

  const [foodLog, setFoodLog] = useState([]);
  const [userName, setUserName] = useState("");
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

  // Preferences
  const [hydrationTracking, setHydrationTracking] = useState(true);

  // Today Modal
  const [showTodayModal, setShowTodayModal] = useState(() => {
    const today = new Date().toISOString().split("T")[0];
    const lastShown = localStorage.getItem("todayModalShownDate");
    return lastShown !== today;
  });

  const handleCloseTodayModal = () => {
    const today = new Date().toISOString().split("T")[0];
    localStorage.setItem("todayModalShownDate", today);
    setShowTodayModal(false);
  };

  // Mock Data
  const mockTrainIQScore = {
    score: 84,
    breakdown: {
      workout: 90,
      nutrition: 78,
      hydration: 82,
      consistency: 85,
    }
  };
  const mockYesterdayData = {
    calories: 2180,
    protein: 104,
    hydration: 2.1,
    workoutDone: true,
    workoutTime: "47 min",
  };
  const mockTodayWorkout = {
    name: "Push A",
    duration: "~45 min",
    level: "Beginner/Intermediate appropriate"
  };
  const mockStreak = 7;

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

          const fullName = userData.name || userData.firstName || "";
          setUserName(fullName.split(" ")[0]);

          const calories = Number(userData.calorieTarget) || 2500;
          const protein = Number(userData.proteinTarget) || 120;
          const target = Number(userData.waterTarget) || 3000;

          setCalorieTarget(calories);
          setProteinTarget(protein);
          setWaterTarget(target);
          setNewWaterTarget(target);
          
          if (userData.preferences && userData.preferences.hydrationTracking !== undefined) {
            setHydrationTracking(userData.preferences.hydrationTracking);
          } else {
            setHydrationTracking(true);
          }
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
    <div className="main-content dashboard-v2">
      {/* ======================================
          HEADER
      ====================================== */}
      <div className="dashboard-header-v2">
        <div className="header-greeting">
          <span className="greeting-text">
            Welcome Back{userName ? `, ${userName}` : ""}
          </span>
          <span className="streak-pill">
            <span className="streak-icon">🔥</span> {mockStreak}
          </span>
        </div>
        <div className="profile-avatar-small" onClick={() => navigate("/profile")}>
          {userName ? userName[0].toUpperCase() : "U"}
        </div>
      </div>

      {showTodayModal && (
        <TodayModal 
          close={handleCloseTodayModal}
          workout={mockTodayWorkout}
          nutrition={{ calories: calorieTarget, protein: proteinTarget }}
          hydration={{ current: (waterIntake / 1000).toFixed(1), target: (waterTarget / 1000).toFixed(1) }}
          yesterdaysScore={mockTrainIQScore.score}
          yesterdayData={mockYesterdayData}
          hydrationTracking={hydrationTracking}
        />
      )}

      {/* ======================================
          TODAY (PRIMARY HERO)
      ====================================== */}
      <div className="dashboard-section-v2">
        <h2 className="section-title">Today</h2>
        
        <div className="today-hero-card">
          <div className="hero-top">
            <span className="hero-label">RECOMMENDED WORKOUT</span>
            <span className="workout-badge">
              {currentWorkoutProgress > 0 ? "IN PROGRESS" : "READY"}
            </span>
          </div>

          {currentWorkout ? (
            <>
              <h3 className="hero-workout-name">{currentWorkout.name}</h3>
              <div className="hero-workout-meta">
                <span>{currentWorkout.focus}</span>
                <span className="meta-dot">•</span>
                <span>~{Math.round(currentWorkout.exercises.length * 5)} min</span>
              </div>
              
              <div className="hero-why-this">
                Based on your recent training and yesterday's activity, this is your recommended session today.
              </div>
              
              {currentWorkoutProgress > 0 && (
                <div className="workout-progress hero-progress">
                  <div className="progress-label">
                    <span>Workout progress</span>
                    <span>{currentWorkoutProgress}%</span>
                  </div>
                  <div className="progress-track">
                    <div className="progress-fill" style={{ width: `${currentWorkoutProgress}%` }} />
                  </div>
                </div>
              )}

              <Button
                variant="primary"
                onClick={() => navigate(`/workouts/${currentWorkout.id}`)}
                className="hero-cta-btn"
              >
                {currentWorkoutProgress > 0 ? "Continue Workout" : "Start Workout"}
              </Button>
            </>
          ) : (
            <p className="no-workout">No workout available.</p>
          )}
        </div>
      </div>

      {/* ======================================
          TRAINIQ INSIGHT
      ====================================== */}
      <div className="dashboard-section-v2 insight-section">
        <div className="insight-card">
          <div className="insight-icon">💡</div>
          <p>You completed your workout yesterday, but your protein intake was below target. Today, prioritize protein and complete your recommended session.</p>
        </div>
      </div>

      {/* ======================================
          YESTERDAY
      ====================================== */}
      <div className="dashboard-section-v2">
        <h2 className="section-title">Yesterday</h2>
        
        <div className="yesterday-grid">
          <div className="yesterday-card">
            <span className="yesterday-label">Workout</span>
            <strong className="yesterday-value">{mockYesterdayData.workoutDone ? "✓ Completed" : "Missed"}</strong>
          </div>
          <div className="yesterday-card">
            <span className="yesterday-label">Nutrition</span>
            <strong className="yesterday-value">{Math.round((mockYesterdayData.calories / calorieTarget) * 100)}% <small>kcal</small></strong>
            <span className="yesterday-sub">{mockYesterdayData.protein}g protein</span>
          </div>
          <div className="yesterday-card score-card-small">
            <span className="yesterday-label">TrainIQ Score</span>
            <strong className="yesterday-value">{mockTrainIQScore.score}</strong>
          </div>
          {hydrationTracking && (
            <div className="yesterday-card">
              <span className="yesterday-label">Hydration</span>
              <strong className="yesterday-value">{mockYesterdayData.hydration}L</strong>
            </div>
          )}
        </div>
      </div>

      {/* ======================================
          NUTRITION
      ====================================== */}
      <div className="dashboard-section-v2">
        <div className="section-header-split">
          <h2 className="section-title">Nutrition</h2>
          <button className="text-btn" onClick={() => navigate("/diet")}>View Diet</button>
        </div>
        
        <div className="nutrition-summary-card">
          <div className="nutrition-bars">
            <div className="nutrition-bar-group">
              <div className="bar-labels">
                <span>Calories</span>
                <strong>{Math.round(totalCalories)} / {calorieTarget}</strong>
              </div>
              <div className="progress-track">
                <div className="progress-fill calorie-fill" style={{ width: `${calorieProgress}%` }} />
              </div>
            </div>
            
            <div className="nutrition-bar-group">
              <div className="bar-labels">
                <span>Protein</span>
                <strong>{Math.round(totalProtein)}g / {proteinTarget}g</strong>
              </div>
              <div className="progress-track">
                <div className="progress-fill protein-fill" style={{ width: `${proteinProgress}%` }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ======================================
          WATER TARGET MODAL
      ====================================== */}
      {showWaterTarget && (
        <div
          className="target-modal-overlay"
          onClick={() => setShowWaterTarget(false)}
        >
          <div
            className="target-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <h2>Daily Water Target</h2>
            <p>Set your daily hydration target.</p>

            <label>
              Daily Target (ml)
              <input
                type="number"
                min="1"
                step="50"
                value={newWaterTarget}
                onChange={(e) => setNewWaterTarget(e.target.value)}
              />
            </label>

            <p className="modal-preview">
              Target: {(Number(newWaterTarget) / 1000).toFixed(2)}L
            </p>

            <div className="target-modal-actions">
              <Button variant="primary" onClick={saveWaterTarget}>
                Save Target
              </Button>
              <Button variant="danger" onClick={() => setShowWaterTarget(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================
          HYDRATION (OPTIONAL)
      ====================================== */}
      {hydrationTracking && (
        <div className="dashboard-section-v2">
          <div className="dashboard-card water-card">
            <div className="card-top">
              <div>
                <span className="card-label">HYDRATION</span>
                <h2>Water Intake</h2>
              </div>
              <button
                className="settings-button"
                onClick={() => {
                  setNewWaterTarget(waterTarget);
                  setShowWaterTarget(true);
                }}
              >
                ⚙
              </button>
            </div>

            <div className="water-summary">
              <div className="water-amount">
                <strong>{(waterIntake / 1000).toFixed(2)}</strong>
                <span>/ {(waterTarget / 1000).toFixed(1)}L</span>
              </div>
              <span className="water-percentage">{Math.round(waterProgress)}%</span>
            </div>

            <div className="progress-track water-progress">
              <div
                className="progress-fill"
                style={{ width: `${waterProgress}%` }}
              />
            </div>

            <p className="water-remaining">
              {waterRemaining > 0
                ? `${(waterRemaining / 1000).toFixed(2)}L remaining`
                : "Daily target reached"}
            </p>

            <div className="water-actions">
              <button onClick={() => addWater(250)}>+250ml</button>
              <button onClick={() => addWater(500)}>+500ml</button>
              <button onClick={() => addWater(1000)}>+1L</button>
            </div>

            <div className="custom-water">
              <input
                type="number"
                min="1"
                placeholder="Custom amount (ml)"
                value={customWater}
                onChange={(e) => setCustomWater(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") addCustomWater();
                }}
              />
              <button onClick={addCustomWater}>Add</button>
            </div>

            {waterIntake > 0 && (
              <div className="water-secondary-actions">
                <button onClick={() => removeWater(250)}>−250ml</button>
                <button onClick={() => removeWater(500)}>−500ml</button>
                <button onClick={resetWater}>Reset</button>
              </div>
            )}

            <div className="water-history">
              <div className="history-heading">Last 7 Days</div>
              {lastSevenDays.map((date) => {
                const amount = Number(waterHistory[date]) || 0;
                const percentage =
                  waterTarget > 0 ? Math.min((amount / waterTarget) * 100, 100) : 0;

                return (
                  <div className="history-day" key={date}>
                    <div className="history-day-top">
                      <span>{date === getToday() ? "Today" : formatHistoryDate(date)}</span>
                      <span>{(amount / 1000).toFixed(2)}L</span>
                    </div>
                    <div className="history-track">
                      <div
                        className="history-fill"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default Dashboard;
