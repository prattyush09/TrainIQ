import { getExerciseById } from "./ExerciseCatalog.js";
import * as V from "../utils/exerciseVocabulary.js";
import { generateWorkout } from "../services/workoutGenerator.js";

/**
 * Hydrates an exercise definition from the centralized ExerciseCatalog.
 * Falls back safely if an ID cannot be resolved.
 */
function hydrateExercise(catalogId, customProps = {}) {
  const catalogEntry = getExerciseById(catalogId);
  if (!catalogEntry) {
    console.warn(`[Workouts.js] Exercise with ID "${catalogId}" not found in ExerciseCatalog.`);
    return {
      id: catalogId,
      name: customProps.name || catalogId,
      sets: customProps.sets || 3,
      reps: customProps.reps || "8-12",
      primaryMuscles: customProps.primaryMuscles || [V.MUSCLE_CORE],
      secondaryMuscles: customProps.secondaryMuscles || [],
      movementPattern: customProps.movementPattern || V.PATTERN_BRACING,
      equipment: customProps.equipment || [V.EQUIP_BODYWEIGHT],
      difficulty: customProps.difficulty || V.DIFFICULTY_BEGINNER,
      instructions: customProps.instructions || [],
      ...customProps
    };
  }

  return {
    id: catalogEntry.id,
    // Preserve custom legacy name if provided (e.g. "Bench Press" vs "Barbell Bench Press")
    name: customProps.name || catalogEntry.name,
    sets: customProps.sets ?? catalogEntry.defaultSets,
    reps: customProps.reps ?? catalogEntry.defaultReps,
    primaryMuscles: catalogEntry.primaryMuscles,
    secondaryMuscles: catalogEntry.secondaryMuscles,
    movementPattern: catalogEntry.movementPattern,
    type: catalogEntry.type,
    equipment: catalogEntry.equipment,
    difficulty: catalogEntry.difficulty,
    location: catalogEntry.location,
    instructions: catalogEntry.instructions,
    alternatives: catalogEntry.alternatives,
  };
}

/**
 * Canonical workout programs hydrated directly from the centralized ExerciseCatalog.
 * Workout IDs 1 through 6 are strictly preserved for historical and Firestore compatibility.
 */
export const workoutProgram = [
  // ---------------------------------------------------------------------------
  // WORKOUT 1: PUSH A
  // ---------------------------------------------------------------------------
  {
    id: 1,
    name: "Push A",
    type: V.WORKOUT_TYPE_PUSH,
    variant: "A",
    focus: "Chest • Shoulders • Triceps",
    difficulty: "Intermediate",
    exercises: [
      hydrateExercise("barbell_bench_press", { name: "Bench Press", sets: 3, reps: "8-10" }),
      hydrateExercise("incline_dumbbell_press", { name: "Incline Dumbbell Press", sets: 3, reps: "8-10" }),
      hydrateExercise("machine_chest_press", { name: "Machine Chest Press", sets: 3, reps: "10-12" }),
      hydrateExercise("dumbbell_shoulder_press", { name: "Shoulder Press", sets: 3, reps: "8-10" }),
      hydrateExercise("dumbbell_lateral_raise", { name: "Lateral Raise", sets: 3, reps: "12-15" }),
      hydrateExercise("triceps_pushdown", { name: "Triceps Pushdown", sets: 3, reps: "10-12" }),
      hydrateExercise("overhead_triceps_extension", { name: "Overhead Triceps Extension", sets: 2, reps: "12-15" }),
    ],
  },

  // ---------------------------------------------------------------------------
  // WORKOUT 2: PULL A
  // ---------------------------------------------------------------------------
  {
    id: 2,
    name: "Pull A",
    type: V.WORKOUT_TYPE_PULL,
    variant: "A",
    focus: "Back • Biceps",
    difficulty: "Intermediate",
    exercises: [
      hydrateExercise("lat_pulldown", { name: "Lat Pulldown", sets: 3, reps: "8-10" }),
      hydrateExercise("seated_cable_row", { name: "Seated Cable Row", sets: 3, reps: "8-10" }),
      hydrateExercise("chest_supported_row", { name: "Chest Supported Row", sets: 3, reps: "10-12" }),
      hydrateExercise("face_pull", { name: "Face Pull", sets: 3, reps: "12-15" }),
      hydrateExercise("ez_bar_curl", { name: "EZ Bar Curl", sets: 3, reps: "10-12" }),
      hydrateExercise("hammer_curl", { name: "Hammer Curl", sets: 2, reps: "12-15" }),
    ],
  },

  // ---------------------------------------------------------------------------
  // WORKOUT 3: LEGS A
  // ---------------------------------------------------------------------------
  {
    id: 3,
    name: "Legs A",
    type: V.WORKOUT_TYPE_LEGS,
    variant: "A",
    focus: "Legs • Core",
    difficulty: "Intermediate",
    exercises: [
      hydrateExercise("barbell_back_squat", { name: "Barbell Squat", sets: 3, reps: "8-10" }),
      hydrateExercise("leg_press", { name: "Leg Press", sets: 3, reps: "10-12" }),
      hydrateExercise("romanian_deadlift", { name: "Romanian Deadlift", sets: 3, reps: "10-12" }),
      hydrateExercise("lying_leg_curl", { name: "Leg Curl", sets: 3, reps: "10-12" }),
      hydrateExercise("standing_calf_raise", { name: "Standing Calf Raise", sets: 3, reps: "15-20" }),
      hydrateExercise("plank", { name: "Plank", sets: 3, reps: "45 sec" }),
    ],
  },

  // ---------------------------------------------------------------------------
  // WORKOUT 4: PUSH B
  // ---------------------------------------------------------------------------
  {
    id: 4,
    name: "Push B",
    type: V.WORKOUT_TYPE_PUSH,
    variant: "B",
    focus: "Chest • Shoulders • Triceps",
    difficulty: "Intermediate",
    exercises: [
      hydrateExercise("dumbbell_bench_press", { name: "Dumbbell Bench Press", sets: 3, reps: "8-10" }),
      hydrateExercise("incline_barbell_bench_press", { name: "Incline Barbell Press", sets: 3, reps: "8-10" }),
      hydrateExercise("cable_chest_fly", { name: "Cable Fly", sets: 3, reps: "12-15" }),
      hydrateExercise("arnold_press", { name: "Arnold Press", sets: 3, reps: "8-10" }),
      hydrateExercise("cable_lateral_raise", { name: "Cable Lateral Raise", sets: 3, reps: "12-15" }),
      hydrateExercise("rope_triceps_pushdown", { name: "Rope Triceps Pushdown", sets: 3, reps: "10-12" }),
      hydrateExercise("skull_crushers", { name: "Skull Crushers", sets: 2, reps: "10-12" }),
    ],
  },

  // ---------------------------------------------------------------------------
  // WORKOUT 5: PULL B
  // ---------------------------------------------------------------------------
  {
    id: 5,
    name: "Pull B",
    type: V.WORKOUT_TYPE_PULL,
    variant: "B",
    focus: "Back • Biceps",
    difficulty: "Intermediate",
    exercises: [
      hydrateExercise("pull_ups", { name: "Pull-Ups", sets: 3, reps: "6-10" }),
      hydrateExercise("barbell_bent_over_row", { name: "Barbell Row", sets: 3, reps: "8-10" }),
      hydrateExercise("single_arm_dumbbell_row", { name: "Single Arm Dumbbell Row", sets: 3, reps: "10-12" }),
      hydrateExercise("straight_arm_pulldown", { name: "Straight Arm Pulldown", sets: 3, reps: "12-15" }),
      hydrateExercise("incline_dumbbell_curl", { name: "Incline Dumbbell Curl", sets: 3, reps: "10-12" }),
      hydrateExercise("preacher_curl", { name: "Preacher Curl", sets: 2, reps: "10-12" }),
    ],
  },

  // ---------------------------------------------------------------------------
  // WORKOUT 6: LEGS B
  // ---------------------------------------------------------------------------
  {
    id: 6,
    name: "Legs B",
    type: V.WORKOUT_TYPE_LEGS,
    variant: "B",
    focus: "Legs • Core",
    difficulty: "Intermediate",
    exercises: [
      hydrateExercise("front_squat", { name: "Front Squat", sets: 3, reps: "8-10" }),
      hydrateExercise("bulgarian_split_squat", { name: "Bulgarian Split Squat", sets: 3, reps: "10-12" }),
      hydrateExercise("barbell_hip_thrust", { name: "Hip Thrust", sets: 3, reps: "8-12" }),
      hydrateExercise("leg_extensions", { name: "Leg Extension", sets: 3, reps: "12-15" }),
      hydrateExercise("seated_calf_raise", { name: "Seated Calf Raise", sets: 3, reps: "15-20" }),
      hydrateExercise("hanging_leg_raise", { name: "Hanging Leg Raise", sets: 3, reps: "10-15" }),
    ],
  },

  // ---------------------------------------------------------------------------
  // WORKOUT 7: UPPER BODY
  // ---------------------------------------------------------------------------
  {
    id: 7,
    name: "Upper Body",
    type: V.WORKOUT_TYPE_UPPER,
    variant: "A",
    focus: "Chest • Back • Arms",
    difficulty: "Intermediate",
    exercises: [
      hydrateExercise("barbell_bench_press", { sets: 3, reps: "8-10" }),
      hydrateExercise("barbell_bent_over_row", { sets: 3, reps: "8-10" }),
      hydrateExercise("dumbbell_shoulder_press", { sets: 3, reps: "8-10" }),
      hydrateExercise("lat_pulldown", { sets: 3, reps: "8-12" }),
      hydrateExercise("dumbbell_biceps_curl", { sets: 3, reps: "10-12" }),
      hydrateExercise("triceps_pushdown", { sets: 3, reps: "10-12" }),
    ],
  },

  // ---------------------------------------------------------------------------
  // WORKOUT 8: LOWER BODY
  // ---------------------------------------------------------------------------
  {
    id: 8,
    name: "Lower Body",
    type: V.WORKOUT_TYPE_LOWER,
    variant: "A",
    focus: "Quads • Hamstrings • Glutes • Calves",
    difficulty: "Intermediate",
    exercises: [
      hydrateExercise("barbell_back_squat", { sets: 3, reps: "8-10" }),
      hydrateExercise("romanian_deadlift", { sets: 3, reps: "8-12" }),
      hydrateExercise("bulgarian_split_squat", { sets: 3, reps: "10-12" }),
      hydrateExercise("barbell_hip_thrust", { sets: 3, reps: "8-12" }),
      hydrateExercise("standing_calf_raise", { sets: 3, reps: "15-20" }),
      hydrateExercise("plank", { sets: 3, reps: "45 sec" }),
    ],
  },

  // ---------------------------------------------------------------------------
  // WORKOUT 9: FULL BODY
  // ---------------------------------------------------------------------------
  {
    id: 9,
    name: "Full Body",
    type: V.WORKOUT_TYPE_FULL_BODY,
    variant: "A",
    focus: "Full Body Integration",
    difficulty: "Intermediate",
    exercises: [
      hydrateExercise("barbell_back_squat", { sets: 3, reps: "8-10" }),
      hydrateExercise("barbell_bench_press", { sets: 3, reps: "8-10" }),
      hydrateExercise("lat_pulldown", { sets: 3, reps: "8-10" }),
      hydrateExercise("romanian_deadlift", { sets: 3, reps: "8-12" }),
      hydrateExercise("dumbbell_shoulder_press", { sets: 3, reps: "8-10" }),
      hydrateExercise("plank", { sets: 3, reps: "45 sec" }),
    ],
  },

  // ---------------------------------------------------------------------------
  // WORKOUT 10: CORE
  // ---------------------------------------------------------------------------
  {
    id: 10,
    name: "Core Focus",
    type: V.WORKOUT_TYPE_CORE,
    variant: "A",
    focus: "Abs • Obliques • Stability",
    difficulty: "Beginner",
    exercises: [
      hydrateExercise("plank", { sets: 3, reps: "45 sec" }),
      hydrateExercise("hanging_leg_raise", { sets: 3, reps: "10-15" }),
      hydrateExercise("russian_twist", { sets: 3, reps: "15-20" }),
      hydrateExercise("side_plank", { sets: 3, reps: "30-45 sec" }),
      hydrateExercise("dead_bug", { sets: 3, reps: "10-12" }),
    ],
  },

  // ---------------------------------------------------------------------------
  // WORKOUT 11: RECOVERY
  // ---------------------------------------------------------------------------
  {
    id: 11,
    name: "Active Recovery",
    type: V.WORKOUT_TYPE_RECOVERY,
    variant: "A",
    focus: "Mobility • Joint Decompression",
    difficulty: "Beginner",
    exercises: [
      hydrateExercise("cat_cow_stretch", { sets: 2, reps: "10 reps" }),
      hydrateExercise("childs_pose", { sets: 2, reps: "45 sec" }),
      hydrateExercise("worlds_greatest_stretch", { sets: 2, reps: "6 per side" }),
      hydrateExercise("dynamic_hip_flexor_stretch", { sets: 2, reps: "8 per side" }),
      hydrateExercise("cobra_stretch", { sets: 2, reps: "30 sec" }),
    ],
  },
];

/**
 * Returns a workout by its numerical or string ID.
 */
export function getWorkoutById(id) {
  const num = Number(id);
  return workoutProgram.find(w => w.id === num || String(w.id) === String(id)) || null;
}

/**
 * Generate a personalized workout using the centralized ExerciseCatalog.
 */
export function generatePersonalizedWorkout(options = {}) {
  return generateWorkout(options);
}

export default workoutProgram;
