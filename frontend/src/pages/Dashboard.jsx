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
import { workoutService } from "../services/workoutService";
import { dietService } from "../services/dietService";
import { scoreService } from "../services/scoreService";
import { recommendationEngine } from "../services/recommendationEngine";
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
  
  // Real Data Engine State
  const [trainIQScore, setTrainIQScore] = useState({ score: 0, breakdown: {} });
  const [todayRecommendation, setTodayRecommendation] = useState(null);
  const [todayDietRecommendation, setTodayDietRecommendation] = useState(null);
  
  // AI Briefing State
  const [aiBriefing, setAiBriefing] = useState(null);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiError, setAiError] = useState(false);
  const [isAiFallback, setIsAiFallback] = useState(false);
  
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

  // Derived Data
  const totalCalories = foodLog.reduce(
    (sum, food) => sum + (Number(food.totalCalories) || (Number(food.calories || 0) * Number(food.quantity || 1))),
    0
  );
  const totalProtein = foodLog.reduce(
    (sum, food) => sum + (Number(food.totalProtein) || (Number(food.protein || 0) * Number(food.quantity || 1))),
    0
  );

  const calculatedStreak = useMemo(() => {
    return workoutService.calculateStreak(workoutHistory);
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
      let todaysFood = [];
      let todaysWater = 0;
      let dietHistory = {};
      let waterHistoryData = {};
      
      const last7Days = [];
      for(let i=0; i<7; i++) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        last7Days.push(d.toISOString().split("T")[0]);
      }
      
      const previous7Days = [];
      for(let i=7; i<14; i++) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        previous7Days.push(d.toISOString().split("T")[0]);
      }
      const all14Days = [...last7Days, ...previous7Days];

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

      try {
        setDietError(false);
        dietHistory = await dietService.getDietHistory(uid, all14Days);
        
        const dietData = dietHistory[today];
        if (dietData) {
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
        
        waterSnapshot.forEach((waterDoc) => {
          const data = waterDoc.data();
          waterHistoryData[waterDoc.id] = Number(data.amount) || 0;
        });

        todaysWater = Number(waterHistoryData[today]) || 0;

        setWaterHistory(waterHistoryData);
        setWaterIntake(todaysWater);
      } catch (error) {
        console.error("Error loading water data:", error);
        setWaterError(true);
      }

      // ========================================
      // WORKOUT PROGRESS / HISTORY
      // ========================================
      let history = [];
      let progressMap = {};
      try {
        setWorkoutsError(false);
        const workoutSnapshot = await getDocs(collection(db, "users", uid, "workoutProgress"));

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
      // DETERMINISTIC AI-READY ENGINE
      // ========================================
      
      const streak = workoutService.calculateStreak(history);
      
      const todaysCals = todaysFood.reduce((sum, f) => sum + (Number(f.totalCalories) || (Number(f.calories || 0) * Number(f.quantity || 1))), 0);
      const todaysPro = todaysFood.reduce((sum, f) => sum + (Number(f.totalProtein) || (Number(f.protein || 0) * Number(f.quantity || 1))), 0);

      const accountCreatedAt = auth.currentUser?.metadata?.creationTime 
        || (userData?.createdAt?.toDate ? userData.createdAt.toDate().toISOString() : userData?.createdAt) 
        || null;

      if (userData) {
        userData.accountCreatedAt = accountCreatedAt;
      }

      const userContext = recommendationEngine.buildUserContext(
        userData,
        history,
        streak,
        {
          calories: todaysCals,
          protein: todaysPro
        },
        todaysWater,
        dietHistory,
        waterHistoryData,
        last7Days,
        progressMap
      );
      
      const prevContext = recommendationEngine.buildUserContext(
        userData,
        history,
        0, // streak proxy
        null,
        null,
        dietHistory,
        waterHistoryData,
        previous7Days
      );

      const calculatedScore = scoreService.calculateScore(userContext);
      const prevScore = scoreService.calculateScore(prevContext);
      
      const getScoreText = (s) => {
        if (!calculatedScore.isEstablished) return "Building your baseline...";
        if (s >= 90) return "Excellent consistency";
        if (s >= 75) return "Strong consistency";
        if (s >= 60) return "On track";
        if (s >= 40) return "Building consistency";
        return "Needs attention";
      };

      setTrainIQScore({
        ...calculatedScore,
        text: getScoreText(calculatedScore.score),
        prevScore: prevScore.isEstablished ? prevScore.score : null,
        userContext // Save context so we can pass it to the AI safely!
      });

      const recommendation = recommendationEngine.generateTodayRecommendation(userContext);
      setTodayRecommendation(recommendation);

      const dietRecommendation = recommendationEngine.getRecommendedNutrition(userContext);
      setTodayDietRecommendation(dietRecommendation);

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
  // FETCH AI BRIEFING
  // ==========================================
  useEffect(() => {
    let isMounted = true;
    const abortController = new AbortController();
    
    if (
      trainIQScore.isEstablished !== undefined &&
      todayRecommendation &&
      !aiBriefing &&
      !isAiLoading &&
      !aiError &&
      !isAiFallback &&
      auth.currentUser
    ) {
      const fetchAiBriefing = async () => {
        setIsAiLoading(true);
        // Timeout to guarantee the loading state never hangs indefinitely
        const timeoutId = setTimeout(() => {
          abortController.abort();
        }, 15000);

        try {
          const token = await auth.currentUser.getIdToken();
          
          const payload = {
            context: {
               score: trainIQScore.score,
               breakdown: trainIQScore.breakdown,
               coverage: trainIQScore.coverage,
               prevScore: trainIQScore.prevScore,
               recommendation: todayRecommendation,
               preferences: { hydrationTracking },
               targets: trainIQScore.userContext?.targets,
               recentDiet: trainIQScore.userContext?.historicalDiet,
               recentWorkouts: trainIQScore.userContext?.workoutHistory?.slice(0, 5) // Send only most recent for brevity
            }
          };

          const res = await fetch("/api/gemini", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(payload),
            signal: abortController.signal
          });

          let data = null;
          try {
            data = await res.json();
          } catch {
            // response was not JSON
          }

          // Handle controlled fallback response from backend (after retries exhausted)
          if (
            data &&
            (data.source === "fallback" ||
              data.reason === "temporarily_unavailable" ||
              (!data.success && data.reason === "temporarily_unavailable"))
          ) {
            if (isMounted) {
              setAiBriefing(null);
              setIsAiFallback(true);
            }
            return;
          }

          // If response status indicates transient unavailability (503/429)
          if (!res.ok) {
            if (res.status === 503 || res.status === 429) {
              if (isMounted) {
                setAiBriefing(null);
                setIsAiFallback(true);
              }
              return;
            }
            throw new Error(`AI API failed with status ${res.status}`);
          }

          const briefingData = data?.data || data;
          if (briefingData && briefingData.summary && Array.isArray(briefingData.priorities)) {
            if (isMounted) {
              setAiBriefing(briefingData);
              setIsAiFallback(false);
            }
          } else {
            throw new Error("Invalid briefing structure received");
          }
        } catch (error) {
          if (error.name === "AbortError") {
            console.warn("AI briefing request timed out, switching to deterministic fallback.");
            if (isMounted) {
              setIsAiFallback(true);
            }
          } else {
            console.error("Error fetching AI briefing:", error);
            if (isMounted) {
              setAiError(true);
            }
          }
        } finally {
          clearTimeout(timeoutId);
          if (isMounted) {
            setIsAiLoading(false);
          }
        }
      };

      fetchAiBriefing();
    }
    
    return () => {
      isMounted = false;
      abortController.abort();
    };
  }, [trainIQScore, todayRecommendation, aiBriefing, isAiLoading, aiError, isAiFallback, hydrationTracking]);

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
    todayRecommendation?.workout ||
    workoutProgram.find(
      (workout) => !workoutProgressMap[workout.id]?.completed
    ) ||
    workoutProgram[0];

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
          workout={
            todayRecommendation 
              ? { name: todayRecommendation.title, duration: "~45 min", level: "Recommended based on your history" } 
              : { name: currentWorkout?.name || "Rest Day", duration: "-- min", level: "" }
          }
          nutrition={{ calories: calorieTarget, protein: proteinTarget }}
          hydration={{ current: (waterIntake / 1000).toFixed(1), target: (waterTarget / 1000).toFixed(1) }}
          yesterdaysScore={trainIQScore.score}
          yesterdayData={{
            calories: totalCalories,
            protein: totalProtein,
            hydration: (waterIntake / 1000).toFixed(1),
            workoutDone: calculatedStreak > 0,
            workoutTime: "-- min"
          }}
          hydrationTracking={hydrationTracking}
        />
      )}

      {/* ======================================
          TRAINIQ'S TAKE (AI INTELLIGENCE)
      ====================================== */}
      <div className="dashboard-section-v2">
        <h2 className="section-title">TrainIQ's Take</h2>
        
        <Card className="ai-briefing-card bg-surface-card border-none rounded-2xl p-5 sm:p-6 mb-6">
          <div className="flex items-start gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-lg">
              ✨
            </div>
            <div className="flex-1">
              {isAiLoading && !aiBriefing && !aiError && !isAiFallback && (
                <p className="text-sm text-muted-foreground animate-pulse mt-1">Analyzing your recent activity...</p>
              )}
              
              {(isAiFallback || (aiError && !aiBriefing)) && (
                <div className="ai-fallback">
                  <p className="text-sm text-muted-foreground mb-3">
                    AI insights are temporarily unavailable. Your TrainIQ recommendation is still available.
                  </p>
                  <p className="text-sm font-medium">Today's recommendation:</p>
                  <p className="text-sm">{todayRecommendation?.title} — {todayRecommendation?.reason}</p>
                </div>
              )}
              
              {aiBriefing && !isAiFallback && (
                <div className="ai-content">
                  <p className="text-sm font-medium mb-3">{aiBriefing.summary}</p>
                  
                  <div className="space-y-3 mb-4">
                    {aiBriefing.priorities?.map((priority, i) => (
                      <div key={i} className="bg-background/50 rounded-xl p-3 border border-border/50">
                        <p className="text-xs font-bold uppercase text-primary/80 mb-1">{priority.type}</p>
                        <p className="text-sm font-medium">{priority.action}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{priority.reason}</p>
                      </div>
                    ))}
                  </div>
                  
                  <p className="text-xs text-muted-foreground border-t border-border/50 pt-3 italic">
                    {aiBriefing.scoreInsight}
                  </p>
                </div>
              )}
            </div>
          </div>
        </Card>
      </div>

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
          ) : todayRecommendation ? (
            <>
              <h3 className="hero-workout-name">{todayRecommendation.title}</h3>
              <div className="hero-workout-meta">
                <span>{todayRecommendation.type === "rest" ? "Recovery" : "Training"}</span>
                <span className="meta-dot">•</span>
                <span>{todayRecommendation.type === "rest" ? "-- min" : "~45 min"}</span>
              </div>
              
              <div className="hero-why-this">
                {todayRecommendation.reason}
              </div>
              
              {currentWorkoutProgress > 0 && todayRecommendation.type === "workout" && (
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
                onClick={() => {
                  if (todayRecommendation.type === "workout") {
                    navigate(`/workouts/${todayRecommendation.workoutId}`);
                  } else {
                    navigate(`/workouts`); // Redirect to full list if resting
                  }
                }}
                className="hero-cta-btn"
              >
                {todayRecommendation.type === "rest" ? "View Program" : currentWorkoutProgress > 0 ? "Continue Workout" : "Start Workout"}
              </Button>
            </>
          ) : (
            <p className="no-workout">Loading recommendation...</p>
          )}
        </Card>
      </div>

      {/* ======================================
          TRAINIQ INSIGHT
      ====================================== */}
      <div className="dashboard-section-v2 insight-section">
        <Card className="insight-card bg-surface-card border-none rounded-2xl p-5 flex items-start gap-4">
          <div className="insight-icon">💡</div>
          <div className="insight-content flex flex-col gap-1 w-full">
            <p className="text-sm">
              Your TrainIQ score is currently <strong>{trainIQScore.score}</strong>. 
            </p>
            <p className="text-sm font-semibold text-primary mb-1">
              {trainIQScore.text}
            </p>
            {!trainIQScore.isEstablished && (
              <p className="text-[11px] text-muted-foreground italic mb-2">
                *We are still gathering your 7-day history baseline.
              </p>
            )}
            <div className="text-xs text-muted-foreground mt-2 grid grid-cols-2 gap-y-1 w-full max-w-sm">
              <span>• Training: {trainIQScore.breakdown?.training?.score ?? 0}/{trainIQScore.breakdown?.training?.max ?? 35} pts</span>
              <span>• Protein: {trainIQScore.breakdown?.protein ? `${trainIQScore.breakdown.protein.score}/${trainIQScore.breakdown.protein.max} pts` : "No data"}</span>
              <span>• Calories: {trainIQScore.breakdown?.calories ? `${trainIQScore.breakdown.calories.score}/${trainIQScore.breakdown.calories.max} pts` : "No data"}</span>
              <span>• Progress: {trainIQScore.breakdown?.progress ? `${trainIQScore.breakdown.progress.score}/${trainIQScore.breakdown.progress.max} pts` : "No data"}</span>
              {trainIQScore.breakdown?.recovery && (
                <span className="col-span-2">• Recovery: {trainIQScore.breakdown.recovery.score}/{trainIQScore.breakdown.recovery.max} pts</span>
              )}
            </div>

            <div className="text-[10px] text-muted-foreground mt-2 border-t border-border/50 pt-2 flex flex-col gap-0.5 w-full max-w-sm">
              {trainIQScore.coverage?.nutrition && trainIQScore.coverage.nutrition.loggedDays < trainIQScore.coverage.nutrition.windowDays && (
                <span>*Nutrition based on {trainIQScore.coverage.nutrition.loggedDays} of {trainIQScore.coverage.nutrition.windowDays} logged days.</span>
              )}
              {!hydrationTracking && (
                <span className="italic opacity-80">*Hydration OFF: 90 max points scaled to 100</span>
              )}
            </div>
            
            <div className="mt-3 text-xs font-medium">
              {trainIQScore.prevScore !== null ? (
                <span className={trainIQScore.score >= trainIQScore.prevScore ? "text-emerald-500" : "text-destructive"}>
                  {trainIQScore.score >= trainIQScore.prevScore ? "↑" : "↓"} {Math.abs(trainIQScore.score - trainIQScore.prevScore)} from last week
                </span>
              ) : (
                <span className="text-muted-foreground">No previous score</span>
              )}
            </div>
          </div>
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
            {todayDietRecommendation?.recommendation && (
              <div className="mt-4 pt-3 border-t border-border/50 text-xs flex flex-col gap-1">
                <span className="font-semibold text-primary">
                  Today's Focus: {todayDietRecommendation.recommendation.title}
                </span>
                <span className="text-muted-foreground">
                  {todayDietRecommendation.recommendation.reason}
                </span>
              </div>
            )}
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
