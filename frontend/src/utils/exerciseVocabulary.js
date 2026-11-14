/**
 * Canonical vocabulary for exercise metadata.
 *
 * Every string used in ExerciseCatalog.js MUST come from one of these
 * controlled lists. This prevents keyword-guessing, inconsistent tagging
 * and accidental exercise-selection errors.
 */

// ---------------------------------------------------------------------------
// MUSCLE GROUPS
// ---------------------------------------------------------------------------
export const MUSCLE_QUADRICEPS = "quadriceps";
export const MUSCLE_HAMSTRINGS = "hamstrings";
export const MUSCLE_GLUTES = "glutes";
export const MUSCLE_CALVES = "calves";
export const MUSCLE_CORE = "core";
export const MUSCLE_ABS = "abs";
export const MUSCLE_CHEST = "chest";
export const MUSCLE_FRONT_DELTS = "front_delts";
export const MUSCLE_LATERAL_DELTS = "lateral_delts";
export const MUSCLE_REAR_DELTS = "rear_delts";
export const MUSCLE_TRICEPS = "triceps";
export const MUSCLE_BICEPS = "biceps";
export const MUSCLE_FOREARMS = "forearms";
export const MUSCLE_LATS = "lats";
export const MUSCLE_UPPER_BACK = "upper_back";
export const MUSCLE_TRAPS = "traps";

export const ALL_MUSCLE_GROUPS = [
  MUSCLE_QUADRICEPS,
  MUSCLE_HAMSTRINGS,
  MUSCLE_GLUTES,
  MUSCLE_CALVES,
  MUSCLE_CORE,
  MUSCLE_ABS,
  MUSCLE_CHEST,
  MUSCLE_FRONT_DELTS,
  MUSCLE_LATERAL_DELTS,
  MUSCLE_REAR_DELTS,
  MUSCLE_TRICEPS,
  MUSCLE_BICEPS,
  MUSCLE_FOREARMS,
  MUSCLE_LATS,
  MUSCLE_UPPER_BACK,
  MUSCLE_TRAPS,
];

// ---------------------------------------------------------------------------
// MOVEMENT PATTERNS
// ---------------------------------------------------------------------------
export const PATTERN_SQUAT = "squat";
export const PATTERN_HINGE = "hinge";
export const PATTERN_LUNGE = "lunge";
export const PATTERN_KNEE_FLEXION = "knee_flexion";
export const PATTERN_CALF_RAISE = "calf_raise";
export const PATTERN_VERTICAL_PULL = "vertical_pull";
export const PATTERN_HORIZONTAL_PULL = "horizontal_pull";
export const PATTERN_HORIZONTAL_PUSH = "horizontal_push";
export const PATTERN_OVERHEAD_PUSH = "overhead_push";
export const PATTERN_CARRY = "carry";
export const PATTERN_ROTATION = "rotation";
export const PATTERN_BRACING = "bracing";
export const PATTERN_MOBILITY = "mobility";

export const ALL_PATTERNS = [
  PATTERN_SQUAT,
  PATTERN_HINGE,
  PATTERN_LUNGE,
  PATTERN_KNEE_FLEXION,
  PATTERN_CALF_RAISE,
  PATTERN_VERTICAL_PULL,
  PATTERN_HORIZONTAL_PULL,
  PATTERN_HORIZONTAL_PUSH,
  PATTERN_OVERHEAD_PUSH,
  PATTERN_CARRY,
  PATTERN_ROTATION,
  PATTERN_BRACING,
  PATTERN_MOBILITY,
];

// ---------------------------------------------------------------------------
// EQUIPMENT
// ---------------------------------------------------------------------------
export const EQUIP_BARBELL = "barbell";
export const EQUIP_DUMBBELL = "dumbbell";
export const EQUIP_SQUAT_RACK = "squat_rack";
export const EQUIP_BENCH = "bench";
export const EQUIP_CABLE_MACHINE = "cable_machine";
export const EQUIP_LAT_PULLDOWN_MACHINE = "lat_pulldown_machine";
export const EQUIP_ROW_MACHINE = "row_machine";
export const EQUIP_LEG_PRESS_MACHINE = "leg_press_machine";
export const EQUIP_LEG_EXTENSIONS_MACHINE = "leg_extensions_machine";
export const EQUIP_LEG_CURL_MACHINE = "leg_curl_machine";
export const EQUIP_CALF_RAISE_MACHINE = "calf_raise_machine";
export const EQUIP_SHRUG_MACHINE = "shrug_machine";
export const EQUIP_HIP_THRUST_MACHINE = "hip_thrust_machine";
export const EQUIP_CHIN_UP_BAR = "chin_up_bar";
export const EQUIP_PULL_UP_BAR = "pull_up_bar";
export const EQUIP_DIP_BAR = "dip_bar";
export const EQUIP_KETTLEBELL = "kettlebell";
export const EQUIP_BODYWEIGHT = "bodyweight";
export const EQUIP_STEP = "step";
export const EQUIP_MAT = "mat";
export const EQUIP_RESISTANCE_BAND = "resistance_band";

export const ALL_EQUIPMENT = [
  EQUIP_BARBELL,
  EQUIP_DUMBBELL,
  EQUIP_SQUAT_RACK,
  EQUIP_BENCH,
  EQUIP_CABLE_MACHINE,
  EQUIP_LAT_PULLDOWN_MACHINE,
  EQUIP_ROW_MACHINE,
  EQUIP_LEG_PRESS_MACHINE,
  EQUIP_LEG_EXTENSIONS_MACHINE,
  EQUIP_LEG_CURL_MACHINE,
  EQUIP_CALF_RAISE_MACHINE,
  EQUIP_SHRUG_MACHINE,
  EQUIP_HIP_THRUST_MACHINE,
  EQUIP_CHIN_UP_BAR,
  EQUIP_PULL_UP_BAR,
  EQUIP_DIP_BAR,
  EQUIP_KETTLEBELL,
  EQUIP_BODYWEIGHT,
  EQUIP_STEP,
  EQUIP_MAT,
  EQUIP_RESISTANCE_BAND,
];

// ---------------------------------------------------------------------------
// EXERCISE TYPES / CATEGORIES
// ---------------------------------------------------------------------------
export const EXERCISE_COMPOUND = "compound";
export const EXERCISE_ISOLATION = "isolation";
export const EXERCISE_MOBILITY = "mobility";
export const EXERCISE_RECOVERY = "recovery";

export const ALL_EXERCISE_TYPES = [
  EXERCISE_COMPOUND,
  EXERCISE_ISOLATION,
  EXERCISE_MOBILITY,
  EXERCISE_RECOVERY,
];

// ---------------------------------------------------------------------------
// DIFFICULTY
// ---------------------------------------------------------------------------
export const DIFFICULTY_BEGINNER = "beginner";
export const DIFFICULTY_INTERMEDIATE = "intermediate";
export const DIFFICULTY_ADVANCED = "advanced";

export const ALL_DIFFICULTIES = [
  DIFFICULTY_BEGINNER,
  DIFFICULTY_INTERMEDIATE,
  DIFFICULTY_ADVANCED,
];

// ---------------------------------------------------------------------------
// TRAINING LOCATIONS
// ---------------------------------------------------------------------------
export const LOCATION_GYM = "gym";
export const LOCATION_HOME = "home";

export const ALL_LOCATIONS = [LOCATION_GYM, LOCATION_HOME];

// ---------------------------------------------------------------------------
// SUITABLE TRAINING GOALS
// ---------------------------------------------------------------------------
export const GOAL_MUSCLE_GAIN = "muscle_gain";
export const GOAL_STRENGTH = "strength";
export const GOAL_WEIGHT_LOSS = "weight_loss";
export const GOAL_GENERAL_FITNESS = "general_fitness";
export const GOAL_ENDURANCE = "endurance";
export const GOAL_RECOVERY = "recovery";

export const ALL_GOALS = [
  GOAL_MUSCLE_GAIN,
  GOAL_STRENGTH,
  GOAL_WEIGHT_LOSS,
  GOAL_GENERAL_FITNESS,
  GOAL_ENDURANCE,
  GOAL_RECOVERY,
];

// ---------------------------------------------------------------------------
// WORKOUT TYPES
// ---------------------------------------------------------------------------
export const WORKOUT_TYPE_PUSH = "push";
export const WORKOUT_TYPE_PULL = "pull";
export const WORKOUT_TYPE_LEGS = "legs";
export const WORKOUT_TYPE_UPPER = "upper";
export const WORKOUT_TYPE_LOWER = "lower";
export const WORKOUT_TYPE_FULL_BODY = "full_body";
export const WORKOUT_TYPE_CORE = "core";
export const WORKOUT_TYPE_RECOVERY = "recovery";

export const ALL_WORKOUT_TYPES = [
  WORKOUT_TYPE_PUSH,
  WORKOUT_TYPE_PULL,
  WORKOUT_TYPE_LEGS,
  WORKOUT_TYPE_UPPER,
  WORKOUT_TYPE_LOWER,
  WORKOUT_TYPE_FULL_BODY,
  WORKOUT_TYPE_CORE,
  WORKOUT_TYPE_RECOVERY,
];

// ---------------------------------------------------------------------------
// HELPERS & ASSERTIONS
// ---------------------------------------------------------------------------
export function assertValidMuscle(muscle) {
  if (!ALL_MUSCLE_GROUPS.includes(muscle)) {
    throw new Error(`Unknown muscle group: "${muscle}"`);
  }
}

export function assertValidPattern(pattern) {
  if (!ALL_PATTERNS.includes(pattern)) {
    throw new Error(`Unknown movement pattern: "${pattern}"`);
  }
}

export function assertValidEquipment(equipment) {
  if (!ALL_EQUIPMENT.includes(equipment)) {
    throw new Error(`Unknown equipment: "${equipment}"`);
  }
}

export function assertValidGoal(goal) {
  if (!ALL_GOALS.includes(goal)) {
    throw new Error(`Unknown goal: "${goal}"`);
  }
}

export function normalizeGoal(goalString) {
  if (!goalString) return GOAL_GENERAL_FITNESS;
  const s = String(goalString).toLowerCase().replace(/[-\s]+/g, "_");
  if (s.includes("muscle") || s.includes("hypertrophy") || s.includes("bulk")) return GOAL_MUSCLE_GAIN;
  if (s.includes("strength") || s.includes("power")) return GOAL_STRENGTH;
  if (s.includes("weight") || s.includes("fat") || s.includes("cut")) return GOAL_WEIGHT_LOSS;
  if (s.includes("endurance") || s.includes("stamina")) return GOAL_ENDURANCE;
  return GOAL_GENERAL_FITNESS;
}

export function normalizeLocation(locString) {
  if (!locString) return LOCATION_GYM;
  const s = String(locString).toLowerCase();
  if (s.includes("home")) return LOCATION_HOME;
  return LOCATION_GYM;
}

export function normalizeDifficulty(diffString) {
  if (!diffString) return DIFFICULTY_INTERMEDIATE;
  const s = String(diffString).toLowerCase();
  if (s.includes("beg")) return DIFFICULTY_BEGINNER;
  if (s.includes("adv")) return DIFFICULTY_ADVANCED;
  return DIFFICULTY_INTERMEDIATE;
}

export function validateExerciseDefinition(exercise) {
  if (!exercise || typeof exercise !== "object") {
    throw new Error("Exercise definition must be an object");
  }
  if (!exercise.id || typeof exercise.id !== "string") {
    throw new Error(`Invalid exercise id: "${exercise?.id}"`);
  }
  if (!exercise.name || typeof exercise.name !== "string") {
    throw new Error(`Invalid exercise name for "${exercise.id}"`);
  }
  if (!Array.isArray(exercise.primaryMuscles) || exercise.primaryMuscles.length === 0) {
    throw new Error(`Exercise "${exercise.id}" must have at least one primary muscle`);
  }
  exercise.primaryMuscles.forEach(assertValidMuscle);

  if (Array.isArray(exercise.secondaryMuscles)) {
    exercise.secondaryMuscles.forEach(assertValidMuscle);
  }

  assertValidPattern(exercise.movementPattern);

  if (!ALL_EXERCISE_TYPES.includes(exercise.type)) {
    throw new Error(`Invalid exercise type "${exercise.type}" for "${exercise.id}"`);
  }

  if (!Array.isArray(exercise.equipment)) {
    throw new Error(`Exercise "${exercise.id}" equipment must be an array`);
  }
  exercise.equipment.forEach(assertValidEquipment);

  if (!ALL_DIFFICULTIES.includes(exercise.difficulty)) {
    throw new Error(`Invalid difficulty "${exercise.difficulty}" for "${exercise.id}"`);
  }

  if (!Array.isArray(exercise.location) || exercise.location.length === 0) {
    throw new Error(`Exercise "${exercise.id}" must have at least one location`);
  }
  exercise.location.forEach(loc => {
    if (!ALL_LOCATIONS.includes(loc)) {
      throw new Error(`Invalid location "${loc}" for "${exercise.id}"`);
    }
  });

  if (Array.isArray(exercise.suitableGoals)) {
    exercise.suitableGoals.forEach(assertValidGoal);
  }

  if (!Array.isArray(exercise.instructions)) {
    throw new Error(`Exercise "${exercise.id}" instructions must be an array`);
  }

  if (!Array.isArray(exercise.alternatives)) {
    throw new Error(`Exercise "${exercise.id}" alternatives must be an array`);
  }

  return true;
}
