import { useEffect, useState, useMemo } from "react";
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
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import workoutProgram from "../data/Workouts";
import TodayModal from "../components/dashboard/TodayModal";
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
  const [showTodayModal, setShowTodayModal] = useState(false);
  
  // Errors
  const [dietError, setDietError] = useState(false);
  const [waterError, setWaterError] = useState(false);
  const [workoutsError, setWorkoutsError] = useState(false);

  const handleCloseTodayModal = async () => {
    setShowTodayModal(false);
    
    const user = auth.currentUser;
    if (user) {
      try {
        await setDoc(
          doc(db, "users", user.uid),
          { preferences: { briefingShownForDate: getToday() } },
          { merge: true }
        );
      } catch (error) {
        console.error("Error saving briefing date:", error);
      }
    }
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
  const calculatedStreak = useMemo(() => {
    if (workoutHistory.length === 0) return 0;
    const dates = [...new Set(workoutHistory.map(w => (w.completedAt || w.savedAt)?.split('T')[0]).filter(Boolean))].sort().reverse();
    if (dates.length === 0) return 0;
    
    let streak = 0;
    let current = new Date();
    current.setHours(0, 0, 0, 0);
    
    let firstDate = new Date(dates[0]);
    firstDate.setHours(0, 0, 0, 0);
    
    const diff = Math.floor((current - firstDate) / (1000 * 60 * 60 * 24));
    if (diff > 1) return 0; 
    
    let expected = new Date(firstDate);
    
    for (const d of dates) {
      const dDate = new Date(d);
      dDate.setHours(0,0,0,0);
      if (dDate.getTime() === expected.getTime()) {
        streak++;
        expected.setDate(expected.getDate() - 1);
      } else {
        break;
      }
    }
    return streak;
  }, [workoutHistory]);
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
      const today = getToday();
      const userRef = doc(db, "users", uid);
      let userData = null;

      // ========================================
      // USER TARGETS
      // ========================================
      try {
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          userData = userSnap.data();

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
      } catch (error) {
        console.error("Error loading user targets:", error);
      }

      // ========================================
      // FOOD - TODAY'S DIET LOG
      // ========================================
      try {
        setDietError(false);
        const dietRef = doc(db, "users", uid, "dietLogs", today);
        const dietSnap = await getDoc(dietRef);
        let todaysFood = [];

        if (dietSnap.exists()) {
          const dietData = dietSnap.data();
          ["Breakfast", "Lunch", "Dinner", "Snacks"].forEach((meal) => {
            if (Array.isArray(dietData[meal])) {
              todaysFood.push(...dietData[meal]);
            }
          });
        }
        setFoodLog(todaysFood);
      } catch (error) {
        console.error("Error loading diet data:", error);
        setDietError(true);
      }

      // ========================================
      // WATER HISTORY
      // ========================================
      try {
        setWaterError(false);
        const waterSnapshot = await getDocs(collection(db, "users", uid, "waterLogs"));
        const loadedHistory = {};

        waterSnapshot.forEach((waterDoc) => {
          const data = waterDoc.data();
          loadedHistory[waterDoc.id] = Number(data.amount) || 0;
        });

        const todaysWater = Number(loadedHistory[today]) || 0;

        setWaterHistory(loadedHistory);
        setWaterIntake(todaysWater);
      } catch (error) {
        console.error("Error loading water data:", error);
        setWaterError(true);
      }

      // ========================================
      // WORKOUT PROGRESS / HISTORY
      // ========================================
      let history = [];
      try {
        setWorkoutsError(false);
        const workoutSnapshot = await getDocs(collection(db, "users", uid, "workoutProgress"));
        const progressMap = {};

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
          (a, b) => new Date(b.completedAt || b.savedAt || 0) - new Date(a.completedAt || a.savedAt || 0)
        );

        setWorkoutProgressMap(progressMap);
        setWorkoutHistory(history);
      } catch (error) {
        console.error("Error loading workout history:", error);
        setWorkoutsError(true);
      }

      // ========================================
      // CHECK DAILY BRIEFING
      // ========================================
      if (userData) {
        const briefingShownForDate = userData.preferences?.briefingShownForDate || "";
        
        // Only show to users who have some history (not brand new)
        if (briefingShownForDate !== today && history.length > 0) {
          setShowTodayModal(true);
        }
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
  // RENDER
  // ==========================================

  return (
    <div className="main-content dashboard-v2">
      {/* ======================================
          HEADER
      ====================================== */}
      <div className="dashboard-header-v2">
        <div className="header-greeting">
          <span className="streak-pill">
            <span className="streak-icon">🔥</span> {calculatedStreak}
          </span>
          <span className="greeting-text">
            Welcome back{userName ? `, ${userName}` : ""}
          </span>
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
        
        <Card className="today-hero-card bg-surface-card border-none rounded-2xl p-6 sm:p-8">
          <div className="hero-top">
            <span className="hero-label">RECOMMENDED WORKOUT</span>
            {!workoutsError && (
              <span className="workout-badge">
                {currentWorkoutProgress > 0 ? "IN PROGRESS" : "READY"}
              </span>
            )}
          </div>

          {workoutsError ? (
            <div style={{ padding: '24px 0', textAlign: 'center' }}>
              <p style={{ color: '#ef4444', marginBottom: '12px' }}>Couldn't load your workouts.</p>
              <Button variant="secondary" onClick={() => window.location.reload()}>Retry</Button>
            </div>
          ) : currentWorkout ? (
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
        </Card>
      </div>

      {/* ======================================
          TRAINIQ INSIGHT
      ====================================== */}
      <div className="dashboard-section-v2 insight-section">
        <Card className="insight-card bg-surface-card border-none rounded-2xl p-5 flex items-start gap-4">
          <div className="insight-icon">💡</div>
          <p>You completed your workout yesterday, but your protein intake was below target. Today, prioritize protein and complete your recommended session.</p>
        </Card>
      </div>

      {/* ======================================
          NUTRITION
      ====================================== */}
      <div className="dashboard-section-v2">
        <div className="section-header-split">
          <h2 className="section-title">Nutrition</h2>
          <button className="text-btn" onClick={() => navigate("/diet")}>View Diet</button>
        </div>
        
        {dietError ? (
          <Card className="nutrition-summary-card flex flex-col items-center justify-center p-8 bg-surface-card border-none rounded-2xl">
            <p className="text-destructive mb-3">Couldn't load diet data.</p>
            <Button variant="secondary" onClick={() => window.location.reload()}>Retry</Button>
          </Card>
        ) : (
          <Card className="nutrition-summary-card bg-surface-card border-none rounded-2xl p-6">
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
          </Card>
        )}
      </div>

      {/* ======================================
          WATER TARGET MODAL
      ====================================== */}
      <Dialog open={showWaterTarget} onOpenChange={setShowWaterTarget}>
        <DialogContent className="sm:max-w-[400px] bg-surface-card border-border">
          <DialogHeader>
            <DialogTitle>Daily Water Target</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-muted-foreground mb-4">Set your daily hydration target.</p>
            <div className="flex flex-col gap-2 mb-4">
              <label className="text-sm font-semibold text-muted-foreground">Daily Target (ml)</label>
              <Input
                type="number"
                min="1"
                step="50"
                value={newWaterTarget}
                onChange={(e) => setNewWaterTarget(e.target.value)}
              />
            </div>
            <p className="text-sm font-medium mb-6">Target: {(Number(newWaterTarget) / 1000).toFixed(2)}L</p>
            <div className="flex gap-3">
              <Button variant="default" className="flex-1" onClick={saveWaterTarget}>Save Target</Button>
              <Button variant="destructive" className="flex-1" onClick={() => setShowWaterTarget(false)}>Cancel</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* ======================================
          HYDRATION (OPTIONAL)
      ====================================== */}
      {hydrationTracking && (
        <div className="dashboard-section-v2">
          <Card className="dashboard-card water-card bg-surface-card border-none rounded-2xl p-6">
            <div className="card-top flex justify-between items-start mb-6">
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

            {waterError ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '32px 0' }}>
                <p style={{ color: '#ef4444', marginBottom: '12px' }}>Couldn't load hydration data.</p>
                <Button variant="secondary" onClick={() => window.location.reload()}>Retry</Button>
              </div>
            ) : (
              <>
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
            </>
            )}
          </Card>
        </div>
      )}

    </div>
  );
}

export default Dashboard;
