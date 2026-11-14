import * as V from "../utils/exerciseVocabulary.js";
import {
  getExerciseById,
  findExerciseByName,
  filterExercises,
} from "../data/ExerciseCatalog.js";

/**
 * Default equipment sets for location preferences.
 */
export const DEFAULT_HOME_EQUIPMENT = [
  V.EQUIP_BODYWEIGHT,
  V.EQUIP_DUMBBELL,
  V.EQUIP_MAT,
  V.EQUIP_STEP,
  V.EQUIP_BENCH,
  V.EQUIP_PULL_UP_BAR,
];

export const DEFAULT_GYM_EQUIPMENT = [...V.ALL_EQUIPMENT];

/**
 * Returns user's effective equipment set based on profile and location preference.
 */
export function resolveUserEquipment(profile = {}) {
  if (Array.isArray(profile.equipment) && profile.equipment.length > 0) {
    return profile.equipment;
  }
  const location = V.normalizeLocation(profile.trainingPreference || profile.location);
  return location === V.LOCATION_HOME ? DEFAULT_HOME_EQUIPMENT : DEFAULT_GYM_EQUIPMENT;
}

/**
 * Determines target exercise count based on requested duration.
 */
export function getExerciseCountForDuration(durationMinutes = 45) {
  const d = Number(durationMinutes) || 45;
  if (d <= 30) return 4;
  if (d <= 45) return 5;
  if (d <= 60) return 6;
  return 7;
}

/**
 * Determines appropriate sets and reps based on goal and experience.
 */
export function getPrescribedSetsAndReps(exercise, profile = {}) {
  const goal = V.normalizeGoal(profile.goal);
  const experience = V.normalizeDifficulty(profile.experience);

  // Recovery exercises have lower set volumes
  if (exercise.type === V.EXERCISE_MOBILITY || exercise.type === V.EXERCISE_RECOVERY) {
    return {
      sets: 2,
      reps: exercise.defaultReps || "30-45 sec",
    };
  }

  let sets = exercise.defaultSets || 3;
  if (experience === V.DIFFICULTY_BEGINNER) {
    sets = Math.min(sets, 3);
  } else if (experience === V.DIFFICULTY_ADVANCED && exercise.type === V.EXERCISE_COMPOUND) {
    sets = Math.max(sets, 4);
  }

  let reps = exercise.defaultReps || "8-12";
  if (goal === V.GOAL_STRENGTH && exercise.type === V.EXERCISE_COMPOUND) {
    reps = "5-8";
  } else if (goal === V.GOAL_ENDURANCE) {
    reps = "12-15";
  } else if (goal === V.GOAL_WEIGHT_LOSS) {
    reps = "10-15";
  } else if (goal === V.GOAL_MUSCLE_GAIN) {
    reps = exercise.type === V.EXERCISE_COMPOUND ? "8-10" : "10-12";
  }

  return { sets, reps };
}

/**
 * Checks if an exercise violates the mandatory selection rules for a given workout type.
 *
 * Mandatory rules:
 * - Legs: never select pull-ups or chest presses.
 * - Push: exclude primary pulling exercises.
 * - Pull: exclude primary chest presses.
 * - Upper: avoid unrelated lower-body exercises.
 * - Lower: avoid unrelated upper-body exercises.
 * - Core: prioritize core exercises.
 * - Full Body: ensure appropriate muscle-group coverage.
 * - Recovery: avoid accidentally generating high-intensity workouts.
 */
export function isExerciseForbiddenForType(exercise, workoutType) {
  if (!exercise || !workoutType) return true;
  const type = String(workoutType).toLowerCase().trim();
  const id = exercise.id || "";
  const pattern = exercise.movementPattern;
  const primaryMuscles = exercise.primaryMuscles || [];
  const exType = exercise.type;

  // RECOVERY: must NEVER include high-intensity compound lifts
  if (type === V.WORKOUT_TYPE_RECOVERY) {
    if (exType === V.EXERCISE_COMPOUND && pattern !== V.PATTERN_MOBILITY) {
      return true;
    }
    if (pattern === V.PATTERN_SQUAT || pattern === V.PATTERN_HINGE || pattern === V.PATTERN_HORIZONTAL_PUSH) {
      return true;
    }
  }

  // LEGS: NEVER select pull-ups or chest presses
  if (type === V.WORKOUT_TYPE_LEGS || type === V.WORKOUT_TYPE_LOWER) {
    if (id.includes("pull_up") || id.includes("chin_up") || id.includes("bench_press") || id.includes("chest_press") || id.includes("push_up") || id.includes("dip")) {
      return true;
    }
    if (primaryMuscles.includes(V.MUSCLE_CHEST) || primaryMuscles.includes(V.MUSCLE_LATS) || primaryMuscles.includes(V.MUSCLE_UPPER_BACK)) {
      return true;
    }
    if (pattern === V.PATTERN_HORIZONTAL_PUSH || pattern === V.PATTERN_VERTICAL_PULL || pattern === V.PATTERN_HORIZONTAL_PULL || pattern === V.PATTERN_OVERHEAD_PUSH) {
      return true;
    }
  }

  // PUSH: EXCLUDE primary pulling exercises
  if (type === V.WORKOUT_TYPE_PUSH) {
    if (pattern === V.PATTERN_VERTICAL_PULL || pattern === V.PATTERN_HORIZONTAL_PULL) {
      return true;
    }
    if (primaryMuscles.includes(V.MUSCLE_LATS) || primaryMuscles.includes(V.MUSCLE_UPPER_BACK) || primaryMuscles.includes(V.MUSCLE_BICEPS)) {
      return true;
    }
    // Also exclude primary lower-body movements
    if (primaryMuscles.includes(V.MUSCLE_QUADRICEPS) || primaryMuscles.includes(V.MUSCLE_HAMSTRINGS) || primaryMuscles.includes(V.MUSCLE_CALVES)) {
      return true;
    }
  }

  // PULL: EXCLUDE primary chest presses
  if (type === V.WORKOUT_TYPE_PULL) {
    if (id.includes("bench_press") || id.includes("chest_press") || id.includes("push_up") || id.includes("chest_fly")) {
      return true;
    }
    if (pattern === V.PATTERN_HORIZONTAL_PUSH || pattern === V.PATTERN_OVERHEAD_PUSH) {
      return true;
    }
    if (primaryMuscles.includes(V.MUSCLE_CHEST) || primaryMuscles.includes(V.MUSCLE_FRONT_DELTS) || primaryMuscles.includes(V.MUSCLE_TRICEPS)) {
      return true;
    }
    // Also exclude primary lower body
    if (primaryMuscles.includes(V.MUSCLE_QUADRICEPS) || primaryMuscles.includes(V.MUSCLE_HAMSTRINGS) || primaryMuscles.includes(V.MUSCLE_CALVES)) {
      return true;
    }
  }

  // UPPER: AVOID unrelated lower-body exercises
  if (type === V.WORKOUT_TYPE_UPPER) {
    if (primaryMuscles.includes(V.MUSCLE_QUADRICEPS) || primaryMuscles.includes(V.MUSCLE_HAMSTRINGS) || primaryMuscles.includes(V.MUSCLE_CALVES) || primaryMuscles.includes(V.MUSCLE_GLUTES)) {
      return true;
    }
    if (pattern === V.PATTERN_SQUAT || pattern === V.PATTERN_HINGE || pattern === V.PATTERN_LUNGE || pattern === V.PATTERN_CALF_RAISE) {
      return true;
    }
  }

  // CORE: PRIORITIZE core exercises (exclude non-core primary movements)
  if (type === V.WORKOUT_TYPE_CORE) {
    if (!primaryMuscles.includes(V.MUSCLE_CORE) && !primaryMuscles.includes(V.MUSCLE_ABS)) {
      return true;
    }
  }

  return false;
}

/**
 * Finds the best exercise candidate from a list of preferred IDs, falling back to
 * alternatives or catalog filtering if equipment is not met.
 */
export function selectBestExercise(preferredIds, options = {}) {
  const {
    availableEquipment = DEFAULT_GYM_EQUIPMENT,
    preferredLocation = V.LOCATION_GYM,
    usedExerciseIds = new Set(),
    recentExerciseIds = new Set(),
    workoutType,
  } = options;

  for (const preferredId of preferredIds) {
    const candidate = getExerciseById(preferredId);
    if (!candidate) continue;

    // Reject if forbidden for this workout type
    if (isExerciseForbiddenForType(candidate, workoutType)) continue;

    // Check if already in this generated workout
    if (usedExerciseIds.has(candidate.id)) continue;

    // Check equipment compatibility
    const hasEquipment = candidate.equipment.every(eq => availableEquipment.includes(eq));
    const hasLocation = candidate.location.includes(preferredLocation);

    // If completely compatible and not recently used, return it immediately
    if (hasEquipment && hasLocation && !recentExerciseIds.has(candidate.id)) {
      return candidate;
    }

    // Try alternatives
    for (const altId of candidate.alternatives) {
      const alt = getExerciseById(altId);
      if (!alt || usedExerciseIds.has(alt.id)) continue;
      if (isExerciseForbiddenForType(alt, workoutType)) continue;

      const altHasEquip = alt.equipment.every(eq => availableEquipment.includes(eq));
      const altHasLoc = alt.location.includes(preferredLocation);

      if (altHasEquip && altHasLoc && !recentExerciseIds.has(alt.id)) {
        return alt;
      }
    }

    // If still not selected but equipment matches (even if recently used), allow as secondary option
    if (hasEquipment && hasLocation) {
      return candidate;
    }
  }

  // Fallback: search catalog for any allowed exercise for this workout type matching equipment
  const fallbacks = filterExercises({
    location: preferredLocation,
    equipment: availableEquipment,
  }).filter(ex => !usedExerciseIds.has(ex.id) && !isExerciseForbiddenForType(ex, workoutType));

  return fallbacks.length > 0 ? fallbacks[0] : null;
}

/**
 * Blueprint definitions for each workout type.
 * Each blueprint specifies ordered slots with ranked candidate IDs.
 */
const WORKOUT_BLUEPRINTS = {
  [V.WORKOUT_TYPE_PUSH]: {
    name: "Push",
    focus: "Chest • Shoulders • Triceps",
    slots: [
      // 1. Primary horizontal compound
      ["barbell_bench_press", "dumbbell_bench_press", "push_ups", "machine_chest_press"],
      // 2. Incline chest compound
      ["incline_dumbbell_press", "incline_barbell_bench_press", "incline_push_ups"],
      // 3. Overhead press
      ["dumbbell_shoulder_press", "overhead_barbell_press", "arnold_press", "pike_push_ups"],
      // 4. Lateral shoulder isolation
      ["dumbbell_lateral_raise", "cable_lateral_raise"],
      // 5. Triceps isolation
      ["triceps_pushdown", "rope_triceps_pushdown", "overhead_triceps_extension", "diamond_push_ups"],
      // 6. Chest isolation / secondary triceps
      ["cable_chest_fly", "dumbbell_fly", "skull_crushers", "bench_dips"],
      // 7. Accessory finisher
      ["close_grip_bench_press", "chest_dips", "push_ups"]
    ]
  },
  [V.WORKOUT_TYPE_PULL]: {
    name: "Pull",
    focus: "Back • Biceps",
    slots: [
      // 1. Vertical pull
      ["lat_pulldown", "pull_ups", "chin_ups"],
      // 2. Horizontal row compound
      ["barbell_bent_over_row", "seated_cable_row", "single_arm_dumbbell_row"],
      // 3. Secondary upper back row
      ["chest_supported_row", "inverted_row", "straight_arm_pulldown"],
      // 4. Rear delt isolation
      ["face_pull", "rear_delt_cable_fly", "dumbbell_rear_delt_fly"],
      // 5. Biceps curl
      ["ez_bar_curl", "barbell_biceps_curl", "dumbbell_biceps_curl", "incline_dumbbell_curl"],
      // 6. Hammer curl / brachialis
      ["hammer_curl", "preacher_curl", "cable_biceps_curl", "reverse_barbell_curl"],
      // 7. Grip / forearms
      ["farmers_walk", "dead_hang", "barbell_wrist_curl"]
    ]
  },
  [V.WORKOUT_TYPE_LEGS]: {
    name: "Legs",
    focus: "Legs • Core",
    slots: [
      // 1. Squat compound
      ["barbell_back_squat", "front_squat", "goblet_squat", "leg_press", "bodyweight_squat"],
      // 2. Posterior chain hinge
      ["romanian_deadlift", "dumbbell_romanian_deadlift"],
      // 3. Unilateral leg
      ["bulgarian_split_squat", "walking_lunges", "leg_extensions"],
      // 4. Hamstrings or glute focus
      ["lying_leg_curl", "barbell_hip_thrust", "dumbbell_hip_thrust", "bodyweight_glute_bridge"],
      // 5. Calves
      ["standing_calf_raise", "seated_calf_raise", "single_leg_bodyweight_calf_raise"],
      // 6. Core stability
      ["plank", "hanging_leg_raise", "russian_twist"],
      // 7. Extra quad/glute finisher
      ["bodyweight_squat", "walking_lunges", "side_plank"]
    ]
  },
  [V.WORKOUT_TYPE_UPPER]: {
    name: "Upper Body",
    focus: "Chest • Back • Arms",
    slots: [
      // 1. Chest press
      ["barbell_bench_press", "dumbbell_bench_press", "push_ups"],
      // 2. Horizontal row
      ["barbell_bent_over_row", "seated_cable_row", "single_arm_dumbbell_row"],
      // 3. Overhead shoulder press
      ["dumbbell_shoulder_press", "overhead_barbell_press", "arnold_press"],
      // 4. Vertical pull
      ["lat_pulldown", "pull_ups", "chin_ups"],
      // 5. Biceps
      ["dumbbell_biceps_curl", "ez_bar_curl", "hammer_curl"],
      // 6. Triceps
      ["triceps_pushdown", "overhead_triceps_extension", "diamond_push_ups"],
      // 7. Lateral raise
      ["dumbbell_lateral_raise", "cable_lateral_raise"]
    ]
  },
  [V.WORKOUT_TYPE_LOWER]: {
    name: "Lower Body",
    focus: "Quads • Hamstrings • Glutes • Calves",
    slots: [
      // 1. Heavy squat pattern
      ["barbell_back_squat", "leg_press", "goblet_squat"],
      // 2. Romanian deadlift pattern
      ["romanian_deadlift", "dumbbell_romanian_deadlift"],
      // 3. Lunge pattern
      ["bulgarian_split_squat", "walking_lunges"],
      // 4. Glute bridge or hip thrust
      ["barbell_hip_thrust", "dumbbell_hip_thrust", "lying_leg_curl"],
      // 5. Calf raise
      ["standing_calf_raise", "seated_calf_raise", "single_leg_bodyweight_calf_raise"],
      // 6. Core bracing
      ["plank", "dead_bug", "hanging_leg_raise"]
    ]
  },
  [V.WORKOUT_TYPE_FULL_BODY]: {
    name: "Full Body",
    focus: "Full Body Integration",
    slots: [
      // 1. Quad dominant (Squat)
      ["barbell_back_squat", "goblet_squat", "leg_press", "bodyweight_squat"],
      // 2. Horizontal push (Chest)
      ["barbell_bench_press", "dumbbell_bench_press", "push_ups"],
      // 3. Horizontal or vertical pull (Back)
      ["lat_pulldown", "seated_cable_row", "pull_ups", "single_arm_dumbbell_row"],
      // 4. Hip hinge (Hamstrings/Glutes)
      ["romanian_deadlift", "dumbbell_romanian_deadlift", "barbell_hip_thrust"],
      // 5. Shoulder or arm accessory
      ["dumbbell_shoulder_press", "dumbbell_lateral_raise", "ez_bar_curl", "triceps_pushdown"],
      // 6. Core bracing
      ["plank", "hanging_leg_raise", "russian_twist"]
    ]
  },
  [V.WORKOUT_TYPE_CORE]: {
    name: "Core Focus",
    focus: "Abs • Obliques • Stability",
    slots: [
      // 1. Bracing anti-extension
      ["plank", "dead_bug"],
      // 2. Vertical flexion
      ["hanging_leg_raise"],
      // 3. Rotational
      ["russian_twist", "bicycle_crunch"],
      // 4. Lateral anti-lateral flexion
      ["side_plank"],
      // 5. Dynamic stabilization
      ["dead_bug", "plank"],
      // 6. Loaded carry or hang
      ["farmers_walk", "dead_hang"]
    ]
  },
  [V.WORKOUT_TYPE_RECOVERY]: {
    name: "Active Recovery",
    focus: "Mobility • Joint Decompression",
    slots: [
      // 1. Spinal mobility
      ["cat_cow_stretch"],
      // 2. Lat & shoulder mobility
      ["childs_pose"],
      // 3. Hip & thoracic mobility
      ["worlds_greatest_stretch"],
      // 4. Dynamic lower body stretch
      ["dynamic_hip_flexor_stretch"],
      // 5. Anterior line stretch
      ["cobra_stretch"],
      // 6. Spinal decompression
      ["dead_hang"]
    ]
  }
};

/**
 * Generates an intelligent, fully catalog-backed workout.
 *
 * @param {Object} options
 * @param {string} options.workoutType - push, pull, legs, upper, lower, full_body, core, recovery
 * @param {Object} options.userProfile - user profile containing goal, experience, trainingPreference, equipment, duration
 * @param {Array} options.recentWorkouts - array of completed workout history
 * @param {string|number} options.id - optional workout ID to assign
 * @param {string} options.variant - optional variant "A" or "B"
 * @returns {Object} Complete workout structure with exercises hydrated from ExerciseCatalog
 */
export function generateWorkout(options = {}) {
  const {
    workoutType = V.WORKOUT_TYPE_PUSH,
    userProfile = {},
    recentWorkouts = [],
    id = 1,
    variant = "A",
  } = options;

  const normalizedType = String(workoutType).toLowerCase().trim();
  const blueprint = WORKOUT_BLUEPRINTS[normalizedType] || WORKOUT_BLUEPRINTS[V.WORKOUT_TYPE_PUSH];

  const preferredLocation = V.normalizeLocation(userProfile.trainingPreference || userProfile.location);
  const availableEquipment = resolveUserEquipment(userProfile);
  const targetExerciseCount = getExerciseCountForDuration(userProfile.duration || userProfile.workoutDuration || 45);

  // Extract recent exercise IDs to prevent excessive repetition
  const recentExerciseIds = new Set();
  if (Array.isArray(recentWorkouts)) {
    recentWorkouts.slice(0, 3).forEach(w => {
      if (Array.isArray(w.exercises)) {
        w.exercises.forEach(ex => {
          if (ex.id) recentExerciseIds.add(ex.id);
          const found = findExerciseByName(ex.name);
          if (found) recentExerciseIds.add(found.id);
        });
      }
    });
  }

  const selectedExercises = [];
  const usedExerciseIds = new Set();

  // If variant B, reverse the primary slots for variation
  const slots = [...blueprint.slots];
  if (variant === "B" && slots.length >= 2) {
    // Rotate first two candidate orders for variation
    slots.forEach(slotList => slotList.reverse());
  }

  for (let i = 0; i < slots.length && selectedExercises.length < targetExerciseCount; i++) {
    const candidate = selectBestExercise(slots[i], {
      availableEquipment,
      preferredLocation,
      usedExerciseIds,
      recentExerciseIds,
      workoutType: normalizedType,
    });

    if (candidate) {
      usedExerciseIds.add(candidate.id);
      const prescription = getPrescribedSetsAndReps(candidate, userProfile);

      selectedExercises.push({
        id: candidate.id,
        name: candidate.name,
        sets: prescription.sets,
        reps: prescription.reps,
        movementPattern: candidate.movementPattern,
        primaryMuscles: candidate.primaryMuscles,
        equipment: candidate.equipment,
        difficulty: candidate.difficulty,
        instructions: candidate.instructions,
      });
    }
  }

  // Graceful fallback if too few exercises were found due to severe equipment constraints
  if (selectedExercises.length === 0) {
    // Provide a safe bodyweight fallback matching the workout type
    const safeBodyweight = filterExercises({
      location: preferredLocation,
      equipment: [V.EQUIP_BODYWEIGHT],
    }).filter(ex => !isExerciseForbiddenForType(ex, normalizedType));

    safeBodyweight.slice(0, targetExerciseCount).forEach(candidate => {
      const prescription = getPrescribedSetsAndReps(candidate, userProfile);
      selectedExercises.push({
        id: candidate.id,
        name: candidate.name,
        sets: prescription.sets,
        reps: prescription.reps,
        movementPattern: candidate.movementPattern,
        primaryMuscles: candidate.primaryMuscles,
        equipment: candidate.equipment,
        difficulty: candidate.difficulty,
        instructions: candidate.instructions,
      });
    });
  }

  const workoutName = `${blueprint.name} ${variant}`.trim();

  return {
    id: Number(id) || id,
    name: workoutName,
    type: normalizedType,
    variant,
    focus: blueprint.focus,
    difficulty: userProfile.experience || "Intermediate",
    estimatedDuration: `${userProfile.duration || 45} min`,
    exercises: selectedExercises,
  };
}

export default generateWorkout;
