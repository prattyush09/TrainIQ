import foodDatabase from "../data/Foods.js";

/**
 * Validates a value to ensure it's a non-negative finite number.
 */
function isValidNonNegativeNumber(val) {
  if (val === undefined || val === null) return true; // optional/missing handled elsewhere
  if (typeof val !== 'number') return false;
  return Number.isFinite(val) && val >= 0;
}

/**
 * Validates a value to ensure it's a strictly positive finite number.
 */
function isValidPositiveNumber(val) {
  if (val === undefined || val === null) return true;
  if (typeof val !== 'number') return false;
  return Number.isFinite(val) && val > 0;
}

/**
 * Safely parses any date string and verifies validity.
 */
function isValidDateString(dateStr) {
  if (!dateStr || typeof dateStr !== 'string') return false;
  const d = new Date(dateStr);
  return !isNaN(d.getTime());
}

/**
 * Validates the raw context structure for corrupted or impossible values.
 * Returns { isValid: boolean, errorMessage: string | null }
 */
export function validateNutritionContext(context) {
  if (!context || typeof context !== 'object') {
    return { isValid: true, errorMessage: null };
  }

  // 1. Targets validation
  if (context.targets && typeof context.targets === 'object') {
    const { calories, protein, water } = context.targets;
    if (calories !== undefined && calories !== null && !isValidPositiveNumber(calories)) {
      return { isValid: false, errorMessage: "Calorie target must be a valid positive number." };
    }
    if (protein !== undefined && protein !== null && !isValidPositiveNumber(protein)) {
      return { isValid: false, errorMessage: "Protein target must be a valid positive number." };
    }
    if (water !== undefined && water !== null && !isValidPositiveNumber(water)) {
      return { isValid: false, errorMessage: "Water target must be a valid positive number." };
    }
  }

  // Also check profile-level targets if present
  if (context.profile && typeof context.profile === 'object') {
    const { calorieTarget, proteinTarget, waterTarget } = context.profile;
    if (calorieTarget !== undefined && calorieTarget !== null && !isValidPositiveNumber(Number(calorieTarget))) {
      return { isValid: false, errorMessage: "Calorie target must be a valid positive number." };
    }
    if (proteinTarget !== undefined && proteinTarget !== null && !isValidPositiveNumber(Number(proteinTarget))) {
      return { isValid: false, errorMessage: "Protein target must be a valid positive number." };
    }
    if (waterTarget !== undefined && waterTarget !== null && !isValidPositiveNumber(Number(waterTarget))) {
      return { isValid: false, errorMessage: "Water target must be a valid positive number." };
    }
  }

  // 2. Today / Recent diet intake validation
  if (context.todayDiet && typeof context.todayDiet === 'object') {
    const { calories, protein } = context.todayDiet;
    if (calories !== undefined && calories !== null && !isValidNonNegativeNumber(calories)) {
      return { isValid: false, errorMessage: "Today's calories must be a non-negative number." };
    }
    if (protein !== undefined && protein !== null && !isValidNonNegativeNumber(protein)) {
      return { isValid: false, errorMessage: "Today's protein must be a non-negative number." };
    }
  }

  if (context.recentDiet && typeof context.recentDiet === 'object') {
    const { calories, protein } = context.recentDiet;
    if (calories !== undefined && calories !== null && !isValidNonNegativeNumber(calories)) {
      return { isValid: false, errorMessage: "Recent calories must be a non-negative number." };
    }
    if (protein !== undefined && protein !== null && !isValidNonNegativeNumber(protein)) {
      return { isValid: false, errorMessage: "Recent protein must be a non-negative number." };
    }
  }

  // 3. Historical diet array validation
  if (context.historicalDiet !== undefined && context.historicalDiet !== null) {
    if (!Array.isArray(context.historicalDiet)) {
      return { isValid: false, errorMessage: "Historical diet must be an array." };
    }
    for (const day of context.historicalDiet) {
      if (!day || typeof day !== 'object') {
        return { isValid: false, errorMessage: "Historical diet contains malformed day data." };
      }
      if (day.calories !== undefined && day.calories !== null && !isValidNonNegativeNumber(day.calories)) {
        return { isValid: false, errorMessage: "Historical diet contains invalid calorie value." };
      }
      if (day.protein !== undefined && day.protein !== null && !isValidNonNegativeNumber(day.protein)) {
        return { isValid: false, errorMessage: "Historical diet contains invalid protein value." };
      }
      if (day.date && !isValidDateString(day.date)) {
        return { isValid: false, errorMessage: "Historical diet contains an invalid date format." };
      }
    }
  }

  return { isValid: true, errorMessage: null };
}

/**
 * Extracts and normalizes usable historical days from context.
 */
function extractUsableHistoryDays(context) {
  const days = [];

  if (Array.isArray(context.historicalDiet)) {
    context.historicalDiet.forEach(day => {
      if (day && typeof day === 'object') {
        const isTracked = Boolean(day.tracked) || (Number(day.calories) > 0) || (Number(day.protein) > 0);
        if (isTracked) {
          days.push({
            date: day.date,
            calories: Number(day.calories) || 0,
            protein: Number(day.protein) || 0,
            tracked: true
          });
        }
      }
    });
  } else if (context.dietHistory && typeof context.dietHistory === 'object') {
    Object.keys(context.dietHistory).forEach(date => {
      const dayData = context.dietHistory[date];
      if (dayData && typeof dayData === 'object') {
        let cals = 0;
        let pro = 0;
        let hasFoods = false;
        ["Breakfast", "Lunch", "Dinner", "Snacks"].forEach(meal => {
          if (Array.isArray(dayData[meal]) && dayData[meal].length > 0) {
            hasFoods = true;
            dayData[meal].forEach(f => {
              cals += Number(f.totalCalories) || (Number(f.calories || 0) * Number(f.quantity || 1));
              pro += Number(f.totalProtein) || (Number(f.protein || 0) * Number(f.quantity || 1));
            });
          }
        });
        if (hasFoods || cals > 0 || pro > 0) {
          days.push({
            date,
            calories: cals,
            protein: pro,
            tracked: true
          });
        }
      }
    });
  }

  return days;
}

/**
 * Deterministic Diet Recommendation Engine v1.
 * 
 * Returns exactly ONE nutrition recommendation adhering to the strict missing-data contract:
 * {
 *   status: "ready" | "insufficient_data" | "invalid_data" | "error",
 *   recommendation: null | { type, title, reason, priority },
 *   data: { hasTargets, hasTodayData, hasRecentHistory, historyDaysAvailable, hasProfile, hasPreferences, hydrationAvailable },
 *   missing: string[],
 *   error: null | { code, message }
 * }
 * 
 * @param {Object} context - User context object
 * @returns {Object} Structured recommendation contract
 */
export function getRecommendedNutrition(context = {}) {
  try {
    // ----------------------------------------------------
    // 1. Service / Firestore Load Failure Check
    // ----------------------------------------------------
    if (context?.error || context?.dietError) {
      return {
        status: "error",
        recommendation: null,
        data: {
          hasTargets: false,
          hasTodayData: false,
          hasRecentHistory: false,
          historyDaysAvailable: 0,
          hasProfile: false,
          hasPreferences: false,
          hydrationAvailable: false
        },
        missing: [],
        error: {
          code: context.error?.code || "DATA_LOAD_FAILED",
          message: context.error?.message || "Unable to load nutrition data."
        }
      };
    }

    // ----------------------------------------------------
    // 2. Invalid Data Check (Malformed, Negative, NaN)
    // ----------------------------------------------------
    const validation = validateNutritionContext(context);
    if (!validation.isValid) {
      return {
        status: "invalid_data",
        recommendation: null,
        data: {
          hasTargets: false,
          hasTodayData: false,
          hasRecentHistory: false,
          historyDaysAvailable: 0,
          hasProfile: Boolean(context?.profile),
          hasPreferences: Boolean(context?.preferences),
          hydrationAvailable: false
        },
        missing: [],
        error: {
          code: "INVALID_NUTRITION_DATA",
          message: validation.errorMessage || "Nutrition data contains invalid values."
        }
      };
    }

    const safeContext = (context && typeof context === 'object') ? context : {};

    // ----------------------------------------------------
    // 3. Targets Extraction & Validation
    // ----------------------------------------------------
    const rawCalTarget = safeContext.targets?.calories ?? safeContext.profile?.calorieTarget;
    const rawProTarget = safeContext.targets?.protein ?? safeContext.profile?.proteinTarget;

    const hasCalorieTarget = typeof rawCalTarget === 'number' && Number.isFinite(rawCalTarget) && rawCalTarget > 0;
    const hasProteinTarget = typeof rawProTarget === 'number' && Number.isFinite(rawProTarget) && rawProTarget > 0;
    const hasTargets = hasCalorieTarget && hasProteinTarget;

    const calTarget = hasCalorieTarget ? rawCalTarget : null;
    const proTarget = hasProteinTarget ? rawProTarget : null;

    // ----------------------------------------------------
    // 4. Today's Data Extraction
    // ----------------------------------------------------
    let todayCalories = 0;
    let todayProtein = 0;
    let hasTodayData = false;

    if (safeContext.todayDiet && typeof safeContext.todayDiet === 'object') {
      const { calories, protein, tracked, foods } = safeContext.todayDiet;
      if (tracked === true || (calories !== undefined && calories > 0) || (protein !== undefined && protein > 0) || (Array.isArray(foods) && foods.length > 0)) {
        hasTodayData = true;
        todayCalories = Number(calories) || 0;
        todayProtein = Number(protein) || 0;
      }
    } else if (safeContext.recentDiet && typeof safeContext.recentDiet === 'object' && safeContext.recentDiet.trackedToday) {
      hasTodayData = true;
      todayCalories = Number(safeContext.recentDiet.calories) || 0;
      todayProtein = Number(safeContext.recentDiet.protein) || 0;
    } else if (safeContext.recentDiet && typeof safeContext.recentDiet === 'object' && (Number(safeContext.recentDiet.calories) > 0 || Number(safeContext.recentDiet.protein) > 0)) {
      hasTodayData = true;
      todayCalories = Number(safeContext.recentDiet.calories) || 0;
      todayProtein = Number(safeContext.recentDiet.protein) || 0;
    } else if (Array.isArray(safeContext.historicalDiet) && safeContext.historicalDiet.length > 0) {
      const todayDateStr = safeContext.today || new Date().toISOString().split("T")[0];
      const todayEntry = safeContext.historicalDiet.find(d => d && d.date === todayDateStr);
      if (todayEntry && (todayEntry.tracked || todayEntry.calories > 0 || todayEntry.protein > 0)) {
        hasTodayData = true;
        todayCalories = Number(todayEntry.calories) || 0;
        todayProtein = Number(todayEntry.protein) || 0;
      }
    }

    // ----------------------------------------------------
    // 5. Recent History Extraction
    // ----------------------------------------------------
    const usableHistoryDays = extractUsableHistoryDays(safeContext);
    const historyDaysAvailable = usableHistoryDays.length;
    const hasRecentHistory = historyDaysAvailable >= 2;

    // Profile & Preferences flags
    const hasProfile = Boolean(safeContext.profile && typeof safeContext.profile === 'object' && Object.keys(safeContext.profile).length > 0);
    const hasPreferences = Boolean(safeContext.preferences && typeof safeContext.preferences === 'object');
    const hydrationTrackingOn = Boolean(safeContext.preferences?.hydrationTracking);
    const hydrationAvailable = hydrationTrackingOn && Boolean(safeContext.hydration && typeof safeContext.hydration === 'object');

    // Build missing items array
    const missing = [];
    if (!hasTargets) {
      if (!hasCalorieTarget && !hasProteinTarget) {
        missing.push("targets");
      } else if (!hasCalorieTarget) {
        missing.push("calorieTarget");
      } else {
        missing.push("proteinTarget");
      }
    }
    if (!hasTodayData) {
      missing.push("todayDiet");
    }
    if (!hasRecentHistory) {
      missing.push("recentDiet");
    }

    const dataContract = {
      hasTargets,
      hasTodayData,
      hasRecentHistory,
      historyDaysAvailable,
      hasProfile,
      hasPreferences,
      hydrationAvailable
    };

    // ----------------------------------------------------
    // 6. Missing Targets Guard (Never Fabricate Defaults)
    // ----------------------------------------------------
    if (!hasTargets) {
      return {
        status: "insufficient_data",
        recommendation: {
          type: "complete_nutrition_targets",
          title: "Set your nutrition targets",
          reason: "TrainIQ needs your calorie and protein targets to personalize nutrition recommendations.",
          priority: 0
        },
        data: dataContract,
        missing,
        error: null
      };
    }

    // ----------------------------------------------------
    // 7. Insufficient History Guard (< 2 days of data)
    // ----------------------------------------------------
    if (!hasRecentHistory) {
      return {
        status: "insufficient_data",
        recommendation: {
          type: "start_tracking",
          title: historyDaysAvailable === 0 ? "Start tracking your nutrition" : "Keep tracking your nutrition",
          reason: historyDaysAvailable === 0
            ? "TrainIQ needs some nutrition data before it can identify your nutrition trends."
            : "TrainIQ needs more nutrition history to identify your recent eating patterns.",
          priority: 0
        },
        data: dataContract,
        missing,
        error: null
      };
    }

    // ----------------------------------------------------
    // 8. Sufficient Valid Data -> Analyze Trends & Score Candidates
    // ----------------------------------------------------
    const N = historyDaysAvailable;
    const sumCalories = usableHistoryDays.reduce((sum, d) => sum + d.calories, 0);
    const sumProtein = usableHistoryDays.reduce((sum, d) => sum + d.protein, 0);

    const avgCalories = Math.round(sumCalories / N);
    const avgProtein = Math.round(sumProtein / N);

    // Dynamic honest trend label (Section 7.6)
    let trendLabel;
    if (N >= 7) {
      trendLabel = "7-day average";
    } else if (N >= 4) {
      trendLabel = `${N}-day average`;
    } else {
      trendLabel = `${N}-day trend`;
    }

    const proteinGap = proTarget - avgProtein; // > 0 means deficit
    const calorieGap = calTarget - avgCalories; // > 0 means deficit, < 0 means surplus

    // Consistency calculations
    const daysMeetingProtein = usableHistoryDays.filter(d => d.protein >= proTarget * 0.85).length;
    const proteinConsistencyRate = daysMeetingProtein / N;

    const daysMeetingCalories = usableHistoryDays.filter(d => Math.abs(d.calories - calTarget) <= calTarget * 0.15).length;
    const calorieConsistencyRate = daysMeetingCalories / N;

    // Profile goal context
    const userGoal = (safeContext.profile?.goal || '').toLowerCase();
    const isMuscleOrStrength = userGoal.includes('muscle') || userGoal.includes('strength') || userGoal.includes('hypertrophy');
    const isWeightLoss = userGoal.includes('weight') || userGoal.includes('fat') || userGoal.includes('cut');

    // Recent foods reference for food suggestions
    const recentFoods = Array.isArray(safeContext.recentFoods)
      ? safeContext.recentFoods
      : foodDatabase;

    const highProteinFood = recentFoods
      .filter(f => f && Number(f.protein) >= 15)
      .sort((a, b) => Number(b.protein) - Number(a.protein))[0];

    const candidates = [];

    // ----------------------------------------------------
    // CANDIDATE 1: Protein Gap
    // ----------------------------------------------------
    if (proteinGap >= 15 || (avgProtein / proTarget) <= 0.90) {
      let score = 70;
      // Gap severity bonus
      score += Math.min(25, Math.round((proteinGap / proTarget) * 50));
      // Inconsistency penalty bonus (urgency)
      if (proteinConsistencyRate < 0.5) score += 10;
      // Muscle/Strength goal bonus
      if (isMuscleOrStrength) score += 15;
      // Today's deficit urgency
      if (hasTodayData && (proTarget - todayProtein) >= proTarget * 0.4) score += 5;

      let foodSuggestion = "";
      if (highProteinFood) {
        foodSuggestion = ` Prioritize protein-dense options like ${highProteinFood.name} (${highProteinFood.protein}g protein) to close the gap.`;
      } else {
        foodSuggestion = ` Focus on protein-dense foods across your meals today to close the gap.`;
      }

      candidates.push({
        type: "protein_gap",
        title: "Increase protein",
        reason: `Your recent ${trendLabel} is ${avgProtein}g versus your ${proTarget}g daily target (${proteinGap}g gap).${foodSuggestion}`,
        score,
        priorityRank: 1
      });
    }

    // ----------------------------------------------------
    // CANDIDATE 2: Calorie Gap (Deficit or Surplus)
    // ----------------------------------------------------
    if (calorieGap >= calTarget * 0.12) {
      // Under-eating / deficit
      let score = 65;
      score += Math.min(25, Math.round((calorieGap / calTarget) * 50));
      if (isMuscleOrStrength) score += 15;
      if (calorieConsistencyRate < 0.5) score += 5;
      if (hasTodayData && (calTarget - todayCalories) >= calTarget * 0.5) score += 5;

      candidates.push({
        type: "calorie_gap",
        title: "Increase calorie intake",
        reason: `Your recent ${trendLabel} is ${avgCalories} kcal versus your ${calTarget} kcal target (${calorieGap} kcal below target). Fuel adequately to support energy and recovery.`,
        score,
        priorityRank: 2
      });
    } else if (calorieGap <= -calTarget * 0.12) {
      // Over-eating / surplus
      let score = 65;
      score += Math.min(25, Math.round((Math.abs(calorieGap) / calTarget) * 50));
      if (isWeightLoss) score += 15;

      candidates.push({
        type: "calorie_gap",
        title: "Moderate calorie intake",
        reason: `Your recent ${trendLabel} is ${avgCalories} kcal, exceeding your ${calTarget} kcal target by ${Math.abs(calorieGap)} kcal. Aim for nutrient-dense foods to stay in your target range.`,
        score,
        priorityRank: 2
      });
    }

    // ----------------------------------------------------
    // CANDIDATE 3: Today's Remaining Nutrition
    // ----------------------------------------------------
    if (hasTodayData && (todayProtein < proTarget * 0.5 || todayCalories < calTarget * 0.5)) {
      const remainingPro = Math.max(0, proTarget - todayProtein);
      const remainingCal = Math.max(0, calTarget - todayCalories);
      let score = 60;
      if (remainingPro >= proTarget * 0.5) score += 15;
      if (isMuscleOrStrength) score += 5;

      candidates.push({
        type: "today_remaining",
        title: "Hit your remaining nutrition targets",
        reason: `You have ${remainingPro}g of protein and ${remainingCal} kcal remaining today. Plan a balanced, protein-rich meal to finish strong.`,
        score,
        priorityRank: 3
      });
    }

    // ----------------------------------------------------
    // CANDIDATE 4: Nutrition Consistency
    // ----------------------------------------------------
    if (proteinConsistencyRate < 0.5 || calorieConsistencyRate < 0.5) {
      candidates.push({
        type: "nutrition_consistency",
        title: "Focus on nutrition consistency",
        reason: `Your daily intake fluctuates significantly day-to-day. Aim for consistent meal timing and hitting your targets regularly.`,
        score: 58,
        priorityRank: 4
      });
    }

    // ----------------------------------------------------
    // CANDIDATE 5: Optional Hydration Gap
    // ----------------------------------------------------
    let hasHydrationGap = false;
    if (hydrationTrackingOn && safeContext.hydration) {
      const waterTarget = Number(safeContext.targets?.water || safeContext.profile?.waterTarget || 3000);
      const recentWater = Number(safeContext.hydration.recentIntake ?? 0);
      if (recentWater < waterTarget * 0.60) {
        hasHydrationGap = true;
        candidates.push({
          type: "hydration_gap",
          title: "Increase daily hydration",
          reason: `Your hydration is currently below your ${(waterTarget / 1000).toFixed(1)}L target (${(recentWater / 1000).toFixed(1)}L tracked). Drink water consistently throughout the day.`,
          score: 62, // Meaningful focus when nutrition is on track, but never overrides major protein or calorie deficit
          priorityRank: 5
        });
      }
    }

    // ----------------------------------------------------
    // CANDIDATE 6: Maintain Nutrition Consistency (On Target)
    // ----------------------------------------------------
    if (Math.abs(proteinGap) <= proTarget * 0.12 && Math.abs(calorieGap) <= calTarget * 0.12) {
      candidates.push({
        type: "maintain_nutrition",
        title: "Maintain your nutrition consistency",
        reason: `Your recent nutrition is well-aligned with your targets (${avgCalories} kcal, ${avgProtein}g protein). Keep up this balanced rhythm.`,
        score: hasHydrationGap ? 50 : 75,
        priorityRank: 6
      });
    }

    // Fallback if no specific gap triggered
    if (candidates.length === 0) {
      candidates.push({
        type: "maintain_nutrition",
        title: "Stay consistent with your nutrition",
        reason: `Your recent intake is tracking close to your targets (${avgCalories} kcal, ${avgProtein}g protein). Continue prioritizing balanced meals.`,
        score: 50,
        priorityRank: 6
      });
    }

    // ----------------------------------------------------
    // 9. Deterministic Sort & Selection
    // Primary: Score (descending)
    // Tie-Breaker: Predefined priorityRank (lower rank = higher importance)
    // ----------------------------------------------------
    candidates.sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      return a.priorityRank - b.priorityRank;
    });

    const winner = candidates[0];

    return {
      status: "ready",
      recommendation: {
        type: winner.type,
        title: winner.title,
        reason: winner.reason,
        priority: winner.score
      },
      data: dataContract,
      missing,
      error: null
    };
  } catch (err) {
    console.error("Error in getRecommendedNutrition:", err);
    return {
      status: "error",
      recommendation: null,
      data: {
        hasTargets: false,
        hasTodayData: false,
        hasRecentHistory: false,
        historyDaysAvailable: 0,
        hasProfile: false,
        hasPreferences: false,
        hydrationAvailable: false
      },
      missing: [],
      error: {
        code: "DATA_LOAD_FAILED",
        message: err.message || "Unable to evaluate nutrition recommendation."
      }
    };
  }
}

export const dietRecommendationEngine = {
  getRecommendedNutrition,
  validateNutritionContext
};

export default dietRecommendationEngine;
