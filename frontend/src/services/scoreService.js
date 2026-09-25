export const scoreService = {
  /**
   * Deterministically calculates the TrainIQ score v1.1 based on user context.
   * A 7-day rolling window is used, with coverage-aware logic for missing data.
   * @param {Object} context - User context object containing history and targets
   */
  calculateScore(context) {
    if (!context || !context.last7Days) {
      return { score: 0, isEstablished: false, breakdown: {}, windowDays: 7, coverage: {} };
    }

    const { profile, targets, workoutHistory, historicalDiet, consistency, hydration } = context;
    const windowDays = context.last7Days.length || 7;

    let isEstablished = true;

    // ==========================================
    // Determine Baseline (New User Logic)
    // ==========================================
    let daysSinceAccountStart;
    
    // Priority 1 & 2: Firebase Auth creationTime or explicit profile createdAt
    let baselineDateStr = profile?.accountCreatedAt;
    
    // Priority 3 & 4: Safest existing fallback (first recorded workout)
    if (!baselineDateStr && workoutHistory && workoutHistory.length > 0) {
      let earliestTime = Infinity;
      workoutHistory.forEach(w => {
        if (w.completed && (w.completedAt || w.savedAt)) {
          const time = new Date(w.completedAt || w.savedAt).getTime();
          if (time < earliestTime) {
            earliestTime = time;
            baselineDateStr = new Date(time).toISOString();
          }
        }
      });
    }

    if (baselineDateStr) {
      const accountDate = new Date(baselineDateStr);
      accountDate.setHours(0,0,0,0);
      const today = new Date(context.last7Days[0]);
      today.setHours(0,0,0,0);
      
      const diffDays = Math.floor((today - accountDate) / (1000 * 60 * 60 * 24)) + 1;
      daysSinceAccountStart = Math.max(1, diffDays); // At least day 1
      
      if (daysSinceAccountStart < windowDays) {
        isEstablished = false;
      }
    } else {
      // If no account creation date is found, and no workouts exist, 
      // they literally just started. Treat as Day 1.
      daysSinceAccountStart = 1;
      isEstablished = false;
    }

    // ==========================================
    // 1. Training Consistency (Max 35 points)
    // ==========================================
    const expectedWeeklyWorkouts = profile?.workoutDays || 4; // fallback
    const windowSet = new Set(context.last7Days);
    const completedDates = new Set();
    
    workoutHistory.forEach(w => {
      if (w.completed && (w.completedAt || w.savedAt)) {
        const timeStr = w.completedAt || w.savedAt;
        const dStr = timeStr.split("T")[0];
        if (windowSet.has(dStr)) {
          completedDates.add(dStr); // Prevents duplicates in the same day from inflating score
        }
      }
    });

    let expectedWorkouts = expectedWeeklyWorkouts;

    if (daysSinceAccountStart < windowDays) {
      // Scale expected workouts to the actual days since joining
      expectedWorkouts = Math.max(1, Math.ceil((daysSinceAccountStart / windowDays) * expectedWeeklyWorkouts));
    }

    const completionRate = Math.min(completedDates.size / expectedWorkouts, 1.0);
    const trainingScoreVal = completionRate * 35;
    
    const trainingCoverage = {
      loggedDays: completedDates.size,
      windowDays,
      coverageRatio: Math.min(completedDates.size / expectedWorkouts, 1.0)
    };

    // ==========================================
    // 2 & 3. Nutrition: Protein (Max 25) & Calories (Max 20)
    // ==========================================
    const targetPro = targets.protein > 0 ? targets.protein : 120;
    const targetCal = targets.calories > 0 ? targets.calories : 2500;

    let trackedDietDays = 0;
    let sumProMultiplier = 0;
    let sumCalMultiplier = 0;

    historicalDiet.forEach(day => {
      if (day.tracked) {
        trackedDietDays++;
        
        // Protein Curve: cap at 1.0.
        const proRatio = Math.min(day.protein / targetPro, 1.0);
        sumProMultiplier += proRatio;

        // Calorie Curve: Distance from target
        const diff = Math.abs(day.calories - targetCal) / targetCal;
        let calMultiplier = 0;
        if (diff <= 0.10) {
          calMultiplier = 1.0;
        } else if (diff <= 0.50) {
          calMultiplier = 1.0 - ((diff - 0.10) / 0.40); 
        }
        sumCalMultiplier += calMultiplier;
      }
    });

    let proteinScoreVal = 0;
    let calorieScoreVal = 0;
    let proteinMax = 25;
    let calorieMax = 20;

    if (trackedDietDays > 0) {
      proteinScoreVal = (sumProMultiplier / trackedDietDays) * 25;
      calorieScoreVal = (sumCalMultiplier / trackedDietDays) * 20;
    } else {
      // Missing data entirely: Do NOT assume 50% baseline. 
      // Treat as unknown and exclude from calculation.
      proteinMax = 0;
      calorieMax = 0;
    }

    const dietCoverage = {
      loggedDays: trackedDietDays,
      windowDays,
      coverageRatio: trackedDietDays / windowDays
    };

    // ==========================================
    // 4. Progress Consistency (Max 10)
    // ==========================================
    let progressScoreVal;
    let progressMax = 10;
    const streak = consistency?.streak || 0;
    
    if (streak >= 3) progressScoreVal = 10;
    else if (streak === 2) progressScoreVal = 7;
    else if (streak === 1) progressScoreVal = 4;
    else progressScoreVal = 0;
    
    // If brand new user with no streak yet, exclude progress instead of median-guessing
    if (!isEstablished && streak === 0 && completedDates.size === 0) {
      progressMax = 0; 
    }

    // ==========================================
    // 5. Recovery / Hydration (Max 10)
    // ==========================================
    let recoveryScoreVal = 0;
    let recoveryMax = 0;
    let trackedWaterDays = 0;

    if (context.preferences?.hydrationTracking && hydration?.historical) {
      recoveryMax = 10;
      const targetWater = targets.water > 0 ? targets.water : 3000;

      hydration.historical.forEach(day => {
        if (day.tracked) {
          trackedWaterDays++;
          recoveryScoreVal += Math.min(day.amount / targetWater, 1.0);
        }
      });

      if (trackedWaterDays > 0) {
        recoveryScoreVal = (recoveryScoreVal / trackedWaterDays) * 10;
      } else {
        recoveryMax = 0; // Exclude from denominator if tracking is ON but literally 0 days logged
      }
    }

    const recoveryCoverage = {
      loggedDays: trackedWaterDays,
      windowDays,
      coverageRatio: trackedWaterDays / windowDays
    };

    // ==========================================
    // Final Calculation (Normalization)
    // ==========================================
    const availablePoints = 35 + proteinMax + calorieMax + progressMax + recoveryMax;
    const rawTotal = trainingScoreVal + proteinScoreVal + calorieScoreVal + progressScoreVal + recoveryScoreVal;
    
    let finalScore = 0;
    if (availablePoints > 0) {
      // Normalize raw score against whatever data was actually available
      finalScore = Math.min(Math.round((rawTotal / availablePoints) * 100), 100);
    }

    return {
      score: finalScore,
      isEstablished,
      windowDays,
      coverage: {
        overall: {
          availablePoints,
          totalPoints: 100
        },
        nutrition: dietCoverage,
        training: trainingCoverage,
        recovery: recoveryCoverage
      },
      breakdown: {
        training: { score: Math.round(trainingScoreVal), max: 35, dataCoverage: trainingCoverage },
        protein: proteinMax > 0 ? { score: Math.round(proteinScoreVal), max: proteinMax, dataCoverage: dietCoverage } : null,
        calories: calorieMax > 0 ? { score: Math.round(calorieScoreVal), max: calorieMax, dataCoverage: dietCoverage } : null,
        progress: progressMax > 0 ? { score: Math.round(progressScoreVal), max: progressMax } : null,
        recovery: recoveryMax > 0 ? { score: Math.round(recoveryScoreVal), max: recoveryMax, dataCoverage: recoveryCoverage } : null
      }
    };
  }
};
