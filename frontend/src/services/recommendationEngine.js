import workoutProgram from "../data/Workouts.js";
import { getRecommendedNutrition } from "./dietRecommendationEngine.js";

/**
 * Safely parses any date/timestamp representation (Firestore Timestamp, ISO string, Date, millis).
 * Returns a valid Date object, or null if invalid.
 */
export function parseDate(timestamp) {
  if (!timestamp) return null;
  if (typeof timestamp.toDate === 'function') {
    try {
      const d = timestamp.toDate();
      return isNaN(d.getTime()) ? null : d;
    } catch {
      return null;
    }
  }
  if (typeof timestamp === 'object' && typeof timestamp.seconds === 'number') {
    return new Date(timestamp.seconds * 1000);
  }
  if (timestamp instanceof Date) {
    return isNaN(timestamp.getTime()) ? null : timestamp;
  }
  const d = new Date(timestamp);
  return isNaN(d.getTime()) ? null : d;
}

/**
 * Maps a workout candidate to its movement split category ('push' | 'pull' | 'legs').
 */
export function getWorkoutSplit(workout) {
  if (!workout) return 'general';
  const name = (workout.name || '').toLowerCase();
  const focus = (workout.focus || '').toLowerCase();

  if (name.includes('push') || focus.includes('chest') || focus.includes('triceps')) {
    return 'push';
  }
  if (name.includes('pull') || focus.includes('back') || focus.includes('biceps')) {
    return 'pull';
  }
  if (name.includes('legs') || focus.includes('legs') || focus.includes('quad') || focus.includes('glute')) {
    return 'legs';
  }
  return 'general';
}

/**
 * Extracts variant ('A' or 'B') from workout name.
 */
export function getWorkoutVariant(workout) {
  const name = (workout?.name || '').toUpperCase().trim();
  if (name.endsWith('B')) return 'B';
  return 'A';
}

/**
 * Human-readable muscle group description for explanations.
 */
export function getSplitDisplayName(split) {
  switch (split) {
    case 'push': return 'chest, shoulders, and triceps';
    case 'pull': return 'back and biceps';
    case 'legs': return 'legs and core';
    default: return 'target muscle groups';
  }
}

/**
 * Deterministically evaluates and scores a single workout candidate.
 * 
 * Factors evaluated:
 * 1. Recovery suitability & training gap (~30% weight)
 * 2. Overdue muscle group / split balance (~20% weight)
 * 3. Repetition penalty & variant rotation (~20% weight)
 * 4. Sequential split alignment (~15% weight)
 * 5. User goals & experience alignment (~10% weight)
 * 6. Progress data & consistency streak (~10% weight)
 * 
 * @param {Object} workout - The workout definition
 * @param {Object} context - Scoring context containing history, progressMap, userProfile, today date
 * @returns {Object} { score, breakdown, daysSinceThisSplit, isMostOverdue, candidateSplit, candidateVariant, eligible }
 */
export function scoreWorkoutCandidate(workout, context = {}) {
  if (!workout || typeof workout !== 'object') {
    return {
      score: -999,
      breakdown: { base: 0 },
      daysSinceThisSplit: Infinity,
      isMostOverdue: false,
      candidateSplit: 'general',
      candidateVariant: 'A',
      eligible: false
    };
  }

  const candidateSplit = getWorkoutSplit(workout);
  const candidateVariant = getWorkoutVariant(workout);
  const candidateId = Number(workout?.id);

  const breakdown = {
    base: 50,
    recovery: 0,
    overdue: 0,
    repetition: 0,
    sequence: 0,
    goal: 0,
    consistency: 0,
  };

  const history = Array.isArray(context.workoutHistory) ? context.workoutHistory : [];
  const completedWorkouts = history
    .filter(w => w && w.completed)
    .sort((a, b) => {
      const timeA = parseDate(a.completedAt || a.savedAt)?.getTime() || 0;
      const timeB = parseDate(b.completedAt || b.savedAt)?.getTime() || 0;
      return timeB - timeA;
    });

  // Eligibility Rule 1: Exclude workout completed TODAY
  if (context.completedTodayId && candidateId === Number(context.completedTodayId)) {
    breakdown.recovery = -999;
    return {
      score: -999,
      breakdown,
      daysSinceThisSplit: 0,
      isMostOverdue: false,
      candidateSplit,
      candidateVariant,
      eligible: false
    };
  }

  const todayDate = parseDate(context.today) || new Date();
  todayDate.setHours(0, 0, 0, 0);

  // Compute days since each split ('push', 'pull', 'legs')
  const splits = ['push', 'pull', 'legs'];
  const splitGaps = { push: Infinity, pull: Infinity, legs: Infinity };

  splits.forEach(split => {
    const lastSession = completedWorkouts.find(w => {
      const original = w.originalWorkout || workoutProgram.find(p => Number(p.id) === Number(w.workoutId ?? w.id));
      return getWorkoutSplit(original) === split;
    });

    if (lastSession) {
      const sDate = parseDate(lastSession.completedAt || lastSession.savedAt);
      if (sDate) {
        sDate.setHours(0, 0, 0, 0);
        splitGaps[split] = Math.max(0, Math.floor((todayDate - sDate) / (1000 * 60 * 60 * 24)));
      }
    }
  });

  const daysSinceThisSplit = splitGaps[candidateSplit] ?? Infinity;

  // 1. Recovery Suitability (~30% weight)
  if (daysSinceThisSplit === 0) {
    breakdown.recovery = -40; // Severe conflict: trained earlier today
  } else if (daysSinceThisSplit === 1) {
    breakdown.recovery = -25; // Acute fatigue: trained yesterday
  } else if (daysSinceThisSplit === 2) {
    breakdown.recovery = +15; // 48h recovery window
  } else if (daysSinceThisSplit === 3) {
    breakdown.recovery = +25; // 72h supercompensation window
  } else {
    breakdown.recovery = +30; // 4+ days or never trained: fully recovered and primed
  }

  // 2. Overdue Muscle Group / Split Balance (~20% weight)
  const maxGap = Math.max(splitGaps.push, splitGaps.pull, splitGaps.legs);
  const isMostOverdue = (daysSinceThisSplit === maxGap && maxGap >= 2);

  if (isMostOverdue) {
    breakdown.overdue += 25; // Prioritize muscles with longest recovery gap
  }

  const recentSplits = completedWorkouts.slice(0, 2).map(w => {
    const orig = w.originalWorkout || workoutProgram.find(p => Number(p.id) === Number(w.workoutId ?? w.id));
    return getWorkoutSplit(orig);
  });
  if (recentSplits.includes(candidateSplit) && !isMostOverdue && maxGap >= 3) {
    breakdown.overdue -= 15; // Balance penalty: don't double-hit a split while another is neglected
  }

  // 3. Workout Repetition Penalty & Variant Rotation (~20% weight)
  const lastCompleted = completedWorkouts[0];
  const lastCompletedId = lastCompleted ? Number(lastCompleted.workoutId ?? lastCompleted.id) : null;
  const lastCompletedSplit = lastCompleted ? getWorkoutSplit(lastCompleted.originalWorkout || workoutProgram.find(p => Number(p.id) === lastCompletedId)) : null;

  if (lastCompletedId === candidateId) {
    breakdown.repetition -= 35; // Direct repetition penalty
  } else if (completedWorkouts.length > 1 && Number(completedWorkouts[1].workoutId ?? completedWorkouts[1].id) === candidateId) {
    breakdown.repetition -= 15; // Recent repetition penalty
  }

  if (lastCompletedSplit === candidateSplit) {
    breakdown.repetition -= 15; // Back-to-back same split penalty
  }

  // Variant rotation:
  const lastSessionThisSplit = completedWorkouts.find(w => {
    const original = w.originalWorkout || workoutProgram.find(p => Number(p.id) === Number(w.workoutId ?? w.id));
    return getWorkoutSplit(original) === candidateSplit;
  });

  if (lastSessionThisSplit) {
    const lastObj = lastSessionThisSplit.originalWorkout || workoutProgram.find(p => Number(p.id) === Number(lastSessionThisSplit.workoutId ?? lastSessionThisSplit.id));
    if (lastObj && getWorkoutVariant(lastObj) !== candidateVariant) {
      breakdown.repetition += 12; // Healthy split variation (A -> B or B -> A)
    }
  } else if (candidateVariant === 'A') {
    breakdown.repetition += 8; // Foundational anchor variant for first exposure
  }

  // 4. Sequential Progression Alignment (~15% weight)
  let expectedNextSplit = null;
  if (lastCompleted) {
    if (lastCompletedSplit === 'push') expectedNextSplit = 'pull';
    else if (lastCompletedSplit === 'pull') expectedNextSplit = 'legs';
    else if (lastCompletedSplit === 'legs') expectedNextSplit = 'push';
  }

  if (expectedNextSplit && candidateSplit === expectedNextSplit) {
    breakdown.sequence = +15;
  } else if (!lastCompleted && candidateId === 1) {
    breakdown.sequence = +15; // Default starting workout for new users
  }

  // 5. User Goal & Experience Alignment (~10% weight)
  const userProfile = context.userProfile || context.profile || {};
  const goal = (userProfile.goal || '').toLowerCase();
  const experience = (userProfile.experience || '').toLowerCase();

  if (goal.includes('strength')) {
    if (candidateVariant === 'A') breakdown.goal += 8; // Foundational barbell anchors
  } else if (goal.includes('muscle')) {
    if (candidateVariant === 'B') breakdown.goal += 8; // Hypertrophy/isolation volume anchors
  } else if (goal.includes('weight') || goal.includes('endurance')) {
    if (candidateSplit === 'legs') breakdown.goal += 5; // Highest metabolic output
  }

  if (experience === 'beginner' && candidateVariant === 'A') {
    breakdown.goal += 6; // Clean foundational lifts
  } else if (experience === 'advanced' && candidateVariant === 'B') {
    breakdown.goal += 4;
  }

  // 6. Progress Data & Consistency (~10% weight)
  const progressMap = context.progressMap || {};
  const candidateProgress = progressMap[candidateId] || progressMap[String(candidateId)];
  if (candidateProgress && Array.isArray(candidateProgress.completedSets) && candidateProgress.completedSets.some(s => Number(s) > 0)) {
    breakdown.consistency += 10; // User is actively progressing through this workout
  }

  const streak = context.consistency?.streak || context.streak || 0;
  if (streak >= 3) {
    breakdown.consistency += 5; // Trainee consistency bonus
  }

  const totalScore = breakdown.base +
    breakdown.recovery +
    breakdown.overdue +
    breakdown.repetition +
    breakdown.sequence +
    breakdown.goal +
    breakdown.consistency;

  return {
    score: totalScore,
    breakdown,
    daysSinceThisSplit,
    isMostOverdue,
    candidateSplit,
    candidateVariant,
    eligible: true
  };
}

/**
 * Generates an explainable reason for the recommended workout based on actual scoring data.
 */
export function generateRecommendationReason(winningCandidate, scoreInfo, context = {}) {
  const { workout, status, isCompletedToday } = winningCandidate;
  const daysSinceThisSplit = scoreInfo?.daysSinceThisSplit ?? Infinity;
  const isMostOverdue = scoreInfo?.isMostOverdue ?? false;
  const candidateSplit = scoreInfo?.candidateSplit || getWorkoutSplit(workout);
  const splitName = getSplitDisplayName(candidateSplit);

  if (status === 'in-progress') {
    return `You have an active session in progress for ${workout.name}. Pick up right where you left off.`;
  }

  if (isCompletedToday) {
    return `You already completed today's workout! Active recovery is recommended today. Next up in your training progression is ${workout.name} targeting your ${splitName}.`;
  }

  const history = Array.isArray(context.workoutHistory) ? context.workoutHistory : [];
  if (history.length === 0) {
    return `Start your training progression with ${workout.name} to establish your baseline strength.`;
  }

  // Most overdue split
  if (isMostOverdue && daysSinceThisSplit !== Infinity) {
    return `Your ${splitName} haven't been trained recently (${daysSinceThisSplit} days), making ${workout.name} the optimal session for balanced progression today.`;
  }

  if (isMostOverdue && daysSinceThisSplit === Infinity) {
    return `Your ${splitName} haven't been trained recently, making ${workout.name} the ideal focus for balanced muscular development today.`;
  }

  // Recovery-grounded explanations
  if (daysSinceThisSplit >= 2 && daysSinceThisSplit <= 4) {
    return `Your ${splitName} are fully recovered (${daysSinceThisSplit} days since last trained) and primed for optimal progression today.`;
  }

  if (daysSinceThisSplit >= 5 && daysSinceThisSplit !== Infinity) {
    return `It has been ${daysSinceThisSplit} days since you trained ${splitName}. Today is the optimal time to target them for balanced progression.`;
  }

  // Sequence alignment explanation
  return `Based on your recent training history, ${workout.name} gives your opposing muscle groups time to recover while targeting your ${splitName}.`;
}

export const recommendationEngine = {
  /**
   * Generates a structured user context from raw persisted data.
   */
  buildUserContext(profile, workoutHistory, streak, recentDiet, recentWater, dietHistory = {}, waterHistoryData = {}, last7Days = [], progressMap = {}) {
    const preferences = profile?.preferences || { hydrationTracking: true };
    const calVal = (profile?.calorieTarget !== undefined && profile?.calorieTarget !== null && profile?.calorieTarget !== "") ? Number(profile.calorieTarget) : null;
    const proVal = (profile?.proteinTarget !== undefined && profile?.proteinTarget !== null && profile?.proteinTarget !== "") ? Number(profile.proteinTarget) : null;
    const waterVal = (profile?.waterTarget !== undefined && profile?.waterTarget !== null && profile?.waterTarget !== "") ? Number(profile.waterTarget) : 3000;

    const targets = {
      calories: calVal,
      protein: proVal,
      water: waterVal
    };
    
    // Build historical arrays mapped exactly to last7Days
    const historicalDiet = (last7Days || []).map(date => {
      const dayData = dietHistory[date];
      if (!dayData) return { date, calories: 0, protein: 0, tracked: false };
      
      let cals = 0;
      let pro = 0;
      let hasData = false;
      
      ["Breakfast", "Lunch", "Dinner", "Snacks"].forEach(meal => {
        if (Array.isArray(dayData[meal]) && dayData[meal].length > 0) {
          hasData = true;
          dayData[meal].forEach(f => {
            cals += Number(f.totalCalories) || (Number(f.calories || 0) * Number(f.quantity || 1));
            pro += Number(f.totalProtein) || (Number(f.protein || 0) * Number(f.quantity || 1));
          });
        }
      });
      return { date, calories: cals, protein: pro, tracked: hasData };
    });

    const context = {
      profile: {
        age: profile?.age,
        goal: profile?.goal,
        experience: profile?.experience,
        trainingPreference: profile?.trainingPreference,
        activityLevel: profile?.activityLevel,
        workoutDays: profile?.workoutDays || 4,
        accountCreatedAt: profile?.accountCreatedAt
      },
      progressMap: progressMap || {},
      preferences,
      targets,
      workoutHistory: workoutHistory || [],
      consistency: { streak: streak || 0 },
      recentDiet: recentDiet || { calories: 0, protein: 0 },
      todayDiet: {
        calories: Number(recentDiet?.calories) || 0,
        protein: Number(recentDiet?.protein) || 0,
        tracked: Boolean(Number(recentDiet?.calories) > 0 || Number(recentDiet?.protein) > 0)
      },
      historicalDiet,
      last7Days: last7Days || []
    };
    
    // Conditionally include hydration
    if (preferences.hydrationTracking) {
      context.hydration = {
        recentIntake: recentWater || 0,
        historical: (last7Days || []).map(date => ({
          date,
          amount: Number(waterHistoryData[date]) || 0,
          tracked: waterHistoryData[date] !== undefined
        }))
      };
    }
    
    return context;
  },

  /**
   * Evaluates a candidate workout using the deterministic scoring system.
   */
  scoreWorkoutCandidate(workout, context) {
    return scoreWorkoutCandidate(workout, context);
  },

  /**
   * Selects ONE deterministic recommended workout for today based on candidate scoring.
   * This is the single canonical source of truth for both the Dashboard and the Workouts tab.
   *
   * @param {Object} params
   * @param {Array} params.workouts - Array of available workouts (defaults to workoutProgram)
   * @param {Array} params.workoutHistory - Array of completed/saved workouts from Firestore
   * @param {Object} params.progressMap - Map of workoutId -> progress doc
   * @param {Object} params.userProfile - Profile object with goal, experience, etc.
   * @param {String} params.today - Optional override for current date (YYYY-MM-DD)
   * @returns {Object} recommendation
   */
  getRecommendedWorkout(params = {}) {
    const safeParams = (params && typeof params === "object") ? params : {};
    try {
      const {
        workouts = workoutProgram,
        workoutHistory = [],
        progressMap = {},
        userProfile = null,
        profile = null,
        today = null
      } = safeParams;
      const availableWorkouts = (workouts && workouts.length > 0) ? workouts : workoutProgram;
      const defaultWorkout = availableWorkouts && availableWorkouts.length > 0 ? availableWorkouts[0] : workoutProgram[0];

      if (!availableWorkouts || availableWorkouts.length === 0) {
        return null;
      }

      const safeProgressMap = progressMap || {};

      // 1. Top Priority: Check if any workout is currently in-progress
      const inProgressWorkout = availableWorkouts.find(w => {
        const prog = safeProgressMap[w.id] || safeProgressMap[String(w.id)];
        if (!prog || prog.completed) return false;
        const setsCount = Array.isArray(prog.completedSets)
          ? prog.completedSets.reduce((sum, s) => sum + Number(s || 0), 0)
          : 0;
        return setsCount > 0;
      });

      if (inProgressWorkout) {
        const prog = safeProgressMap[inProgressWorkout.id] || safeProgressMap[String(inProgressWorkout.id)];
        const totalSets = inProgressWorkout.exercises.reduce((sum, e) => sum + Number(e.sets || 0), 0);
        const completedSets = Array.isArray(prog.completedSets)
          ? prog.completedSets.reduce((sum, s) => sum + Number(s || 0), 0)
          : 0;
        const progressPercent = totalSets > 0 ? Math.min(Math.round((completedSets / totalSets) * 100), 100) : 0;

        return {
          workout: inProgressWorkout,
          workoutId: inProgressWorkout.id,
          name: inProgressWorkout.name,
          focus: inProgressWorkout.focus,
          exercises: inProgressWorkout.exercises,
          exerciseCount: inProgressWorkout.exercises.length,
          status: "in-progress",
          progressPercent,
          reason: `You have an active session in progress for ${inProgressWorkout.name}. Pick up right where you left off.`,
          isCompletedToday: false,
          score: 100,
          scoringBreakdown: { base: 100, inProgress: true }
        };
      }

      // 2. Identify if a workout was completed today
      const history = Array.isArray(workoutHistory) ? workoutHistory : [];
      const completedWorkouts = history
        .filter(w => w && w.completed)
        .sort((a, b) => {
          const timeA = parseDate(a.completedAt || a.savedAt)?.getTime() || 0;
          const timeB = parseDate(b.completedAt || b.savedAt)?.getTime() || 0;
          return timeB - timeA;
        });

      const todayDateStr = today || new Date().toISOString().split("T")[0];
      const completedTodayWorkout = completedWorkouts.find(w => {
        const ts = w.completedAt || w.savedAt;
        if (!ts) return false;
        if (typeof ts === 'string' && ts.startsWith(todayDateStr)) return true;
        const d = parseDate(ts);
        return d ? d.toISOString().split("T")[0] === todayDateStr : false;
      });
      const completedTodayId = completedTodayWorkout ? Number(completedTodayWorkout.workoutId ?? completedTodayWorkout.id) : null;

      // 3. Fallback for brand new user with 0 history
      if (completedWorkouts.length === 0) {
        return {
          workout: defaultWorkout,
          workoutId: defaultWorkout.id,
          name: defaultWorkout.name,
          focus: defaultWorkout.focus,
          exercises: defaultWorkout.exercises,
          exerciseCount: defaultWorkout.exercises.length,
          status: "ready",
          progressPercent: 0,
          reason: `Start your training progression with ${defaultWorkout.name} to establish your baseline strength.`,
          isCompletedToday: false,
          score: 65,
          scoringBreakdown: { base: 50, sequence: 15 }
        };
      }

      // 4. Candidate Scoring & Evaluation
      const scoringContext = {
        workoutHistory: completedWorkouts,
        progressMap: safeProgressMap,
        userProfile: userProfile || profile || {},
        today: todayDateStr,
        completedTodayId,
      };

      const scoredCandidates = availableWorkouts.map(workout => {
        const scoreInfo = scoreWorkoutCandidate(workout, scoringContext);
        return {
          workout,
          score: scoreInfo.score,
          scoreInfo,
          eligible: scoreInfo.eligible !== false && scoreInfo.score > -500,
        };
      });

      // Filter eligible candidates
      const eligibleCandidates = scoredCandidates.filter(c => c.eligible);
      const candidatePool = eligibleCandidates.length > 0 ? eligibleCandidates : scoredCandidates;

      // Deterministic Sort & Tie-Breaking
      // Primary: Score (descending)
      // Tie-breaker 1: Matches expected sequential split
      // Tie-breaker 2: Lower workout ID
      const lastCompleted = completedWorkouts[0];
      let expectedNextSplit = null;
      if (lastCompleted) {
        const lastObj = lastCompleted.originalWorkout || workoutProgram.find(p => Number(p.id) === Number(lastCompleted.workoutId ?? lastCompleted.id));
        const lastSplit = getWorkoutSplit(lastObj);
        if (lastSplit === 'push') expectedNextSplit = 'pull';
        else if (lastSplit === 'pull') expectedNextSplit = 'legs';
        else if (lastSplit === 'legs') expectedNextSplit = 'push';
      }

      candidatePool.sort((a, b) => {
        if (b.score !== a.score) {
          return b.score - a.score;
        }
        const aMatchesSeq = getWorkoutSplit(a.workout) === expectedNextSplit ? 1 : 0;
        const bMatchesSeq = getWorkoutSplit(b.workout) === expectedNextSplit ? 1 : 0;
        if (bMatchesSeq !== aMatchesSeq) {
          return bMatchesSeq - aMatchesSeq;
        }
        return Number(a.workout.id) - Number(b.workout.id);
      });

      const winner = candidatePool[0] || { workout: defaultWorkout, score: 50, scoreInfo: {} };
      const winnerWorkout = winner.workout;

      const winningObject = {
        workout: winnerWorkout,
        workoutId: winnerWorkout.id,
        name: winnerWorkout.name,
        focus: winnerWorkout.focus,
        exercises: winnerWorkout.exercises,
        exerciseCount: winnerWorkout.exercises.length,
        status: completedTodayWorkout ? "completed-today" : "ready",
        progressPercent: 0,
        isCompletedToday: Boolean(completedTodayWorkout),
        score: winner.score,
        scoringBreakdown: winner.scoreInfo?.breakdown || {},
      };

      winningObject.reason = generateRecommendationReason(winningObject, winner.scoreInfo, scoringContext);

      return winningObject;
    } catch (err) {
      console.error("Error in recommendationEngine.getRecommendedWorkout:", err);
      const fallbackWorkout = (safeParams?.workouts && safeParams.workouts[0]) || workoutProgram[0];
      return {
        workout: fallbackWorkout,
        workoutId: fallbackWorkout.id,
        name: fallbackWorkout.name,
        focus: fallbackWorkout.focus,
        exercises: fallbackWorkout.exercises,
        exerciseCount: fallbackWorkout.exercises.length,
        status: "ready",
        progressPercent: 0,
        reason: `Start your training progression with ${fallbackWorkout.name}.`,
        isCompletedToday: false,
        score: 50,
        scoringBreakdown: { base: 50, fallback: true }
      };
    }
  },

  /**
   * Generates a deterministic daily recommendation based on the user context.
   */
  generateTodayRecommendation(context) {
    if (!context) return null;
    
    const history = context.workoutHistory || [];
    const today = new Date().toISOString().split("T")[0];
    const completedToday = history.some(
      w => w && w.completed && ((w.completedAt && String(w.completedAt).startsWith(today)) || (w.savedAt && String(w.savedAt).startsWith(today)))
    );
    
    const rec = this.getRecommendedWorkout({
      workouts: workoutProgram,
      workoutHistory: history,
      progressMap: context.progressMap || {},
      userProfile: context.profile || {},
      today
    });

    if (!rec) return null;

    if (completedToday) {
      return {
        type: "rest",
        title: "Active Recovery",
        reason: rec.reason || "You have already crushed your workout today. Focus on protein intake and recovery.",
        workoutId: rec.workout.id,
        workout: rec.workout,
        score: rec.score,
        context: { workoutDone: true, nextWorkoutId: rec.workout.id }
      };
    }
    
    return {
      type: "workout",
      workoutId: rec.workout.id,
      title: rec.workout.name,
      reason: rec.reason,
      confidence: "high",
      workout: rec.workout,
      score: rec.score,
      context: { programState: "progressing", nextWorkoutId: rec.workout.id }
    };
  },

  /**
   * Evaluates and produces ONE deterministic nutrition recommendation for today.
   */
  getRecommendedNutrition(context) {
    return getRecommendedNutrition(context);
  }
};

export { getRecommendedNutrition };
