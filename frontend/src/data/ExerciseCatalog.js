import * as V from "../utils/exerciseVocabulary.js";

export const ExerciseCatalog = [
  // ===========================================================================
  // CHEST
  // ===========================================================================
  {
    id: "barbell_bench_press",
    name: "Barbell Bench Press",
    primaryMuscles: [V.MUSCLE_CHEST],
    secondaryMuscles: [V.MUSCLE_FRONT_DELTS, V.MUSCLE_TRICEPS],
    movementPattern: V.PATTERN_HORIZONTAL_PUSH,
    type: V.EXERCISE_COMPOUND,
    equipment: [V.EQUIP_BARBELL, V.EQUIP_BENCH],
    difficulty: V.DIFFICULTY_INTERMEDIATE,
    location: [V.LOCATION_GYM],
    suitableGoals: [V.GOAL_MUSCLE_GAIN, V.GOAL_STRENGTH, V.GOAL_GENERAL_FITNESS],
    instructions: [
      "Lie flat on the bench with eyes under the barbell.",
      "Grip the bar slightly wider than shoulder-width, wrists straight.",
      "Unrack the bar and lower it with control to mid-chest.",
      "Press the bar back up until arms are fully extended, engaging chest and triceps."
    ],
    defaultSets: 3,
    defaultRepRange: { min: 6, max: 10 },
    defaultReps: "8-10",
    alternatives: ["dumbbell_bench_press", "machine_chest_press", "push_ups"]
  },
  {
    id: "dumbbell_bench_press",
    name: "Dumbbell Bench Press",
    primaryMuscles: [V.MUSCLE_CHEST],
    secondaryMuscles: [V.MUSCLE_FRONT_DELTS, V.MUSCLE_TRICEPS],
    movementPattern: V.PATTERN_HORIZONTAL_PUSH,
    type: V.EXERCISE_COMPOUND,
    equipment: [V.EQUIP_DUMBBELL, V.EQUIP_BENCH],
    difficulty: V.DIFFICULTY_BEGINNER,
    location: [V.LOCATION_GYM, V.LOCATION_HOME],
    suitableGoals: [V.GOAL_MUSCLE_GAIN, V.GOAL_STRENGTH, V.GOAL_GENERAL_FITNESS, V.GOAL_WEIGHT_LOSS],
    instructions: [
      "Sit on a flat bench with a dumbbell resting on each knee.",
      "Lie back and position the dumbbells over your chest with neutral or slightly pronated wrists.",
      "Lower the dumbbells until elbows reach about 90 degrees.",
      "Press the dumbbells smoothly back up over your chest."
    ],
    defaultSets: 3,
    defaultRepRange: { min: 8, max: 12 },
    defaultReps: "8-10",
    alternatives: ["barbell_bench_press", "push_ups", "machine_chest_press"]
  },
  {
    id: "incline_barbell_bench_press",
    name: "Incline Barbell Press",
    primaryMuscles: [V.MUSCLE_CHEST],
    secondaryMuscles: [V.MUSCLE_FRONT_DELTS, V.MUSCLE_TRICEPS],
    movementPattern: V.PATTERN_HORIZONTAL_PUSH,
    type: V.EXERCISE_COMPOUND,
    equipment: [V.EQUIP_BARBELL, V.EQUIP_BENCH],
    difficulty: V.DIFFICULTY_INTERMEDIATE,
    location: [V.LOCATION_GYM],
    suitableGoals: [V.GOAL_MUSCLE_GAIN, V.GOAL_STRENGTH],
    instructions: [
      "Set an incline bench to roughly 30 degrees.",
      "Grip the barbell slightly wider than shoulder-width.",
      "Lower the barbell slowly to the upper clavicular portion of your chest.",
      "Drive the barbell straight back up to arm lockout."
    ],
    defaultSets: 3,
    defaultRepRange: { min: 6, max: 10 },
    defaultReps: "8-10",
    alternatives: ["incline_dumbbell_press", "barbell_bench_press"]
  },
  {
    id: "incline_dumbbell_press",
    name: "Incline Dumbbell Press",
    primaryMuscles: [V.MUSCLE_CHEST],
    secondaryMuscles: [V.MUSCLE_FRONT_DELTS, V.MUSCLE_TRICEPS],
    movementPattern: V.PATTERN_HORIZONTAL_PUSH,
    type: V.EXERCISE_COMPOUND,
    equipment: [V.EQUIP_DUMBBELL, V.EQUIP_BENCH],
    difficulty: V.DIFFICULTY_BEGINNER,
    location: [V.LOCATION_GYM, V.LOCATION_HOME],
    suitableGoals: [V.GOAL_MUSCLE_GAIN, V.GOAL_STRENGTH, V.GOAL_GENERAL_FITNESS],
    instructions: [
      "Lie back on an incline bench set to 30-45 degrees with dumbbells at shoulder level.",
      "Press dumbbells up in a smooth converging arc.",
      "Lower under control feeling a deep stretch across upper chest."
    ],
    defaultSets: 3,
    defaultRepRange: { min: 8, max: 12 },
    defaultReps: "8-10",
    alternatives: ["incline_barbell_bench_press", "dumbbell_bench_press"]
  },
  {
    id: "machine_chest_press",
    name: "Machine Chest Press",
    primaryMuscles: [V.MUSCLE_CHEST],
    secondaryMuscles: [V.MUSCLE_FRONT_DELTS, V.MUSCLE_TRICEPS],
    movementPattern: V.PATTERN_HORIZONTAL_PUSH,
    type: V.EXERCISE_COMPOUND,
    equipment: [V.EQUIP_CABLE_MACHINE],
    difficulty: V.DIFFICULTY_BEGINNER,
    location: [V.LOCATION_GYM],
    suitableGoals: [V.GOAL_MUSCLE_GAIN, V.GOAL_GENERAL_FITNESS, V.GOAL_WEIGHT_LOSS],
    instructions: [
      "Adjust the seat so handles align with mid-chest.",
      "Keep shoulder blades retracted and press handles straight out.",
      "Control the return without letting weights slam."
    ],
    defaultSets: 3,
    defaultRepRange: { min: 10, max: 12 },
    defaultReps: "10-12",
    alternatives: ["barbell_bench_press", "dumbbell_bench_press", "push_ups"]
  },
  {
    id: "cable_chest_fly",
    name: "Cable Fly",
    primaryMuscles: [V.MUSCLE_CHEST],
    secondaryMuscles: [V.MUSCLE_FRONT_DELTS],
    movementPattern: V.PATTERN_HORIZONTAL_PUSH,
    type: V.EXERCISE_ISOLATION,
    equipment: [V.EQUIP_CABLE_MACHINE],
    difficulty: V.DIFFICULTY_INTERMEDIATE,
    location: [V.LOCATION_GYM],
    suitableGoals: [V.GOAL_MUSCLE_GAIN, V.GOAL_GENERAL_FITNESS],
    instructions: [
      "Set dual cable pulleys at chest or shoulder height.",
      "Step forward with a staggered stance, slight bend in elbows.",
      "Bring hands together in front of chest in a hugging motion.",
      "Squeeze chest at peak contraction, then reverse smoothly."
    ],
    defaultSets: 3,
    defaultRepRange: { min: 12, max: 15 },
    defaultReps: "12-15",
    alternatives: ["dumbbell_fly", "push_ups"]
  },
  {
    id: "dumbbell_fly",
    name: "Dumbbell Fly",
    primaryMuscles: [V.MUSCLE_CHEST],
    secondaryMuscles: [V.MUSCLE_FRONT_DELTS],
    movementPattern: V.PATTERN_HORIZONTAL_PUSH,
    type: V.EXERCISE_ISOLATION,
    equipment: [V.EQUIP_DUMBBELL, V.EQUIP_BENCH],
    difficulty: V.DIFFICULTY_BEGINNER,
    location: [V.LOCATION_GYM, V.LOCATION_HOME],
    suitableGoals: [V.GOAL_MUSCLE_GAIN, V.GOAL_GENERAL_FITNESS],
    instructions: [
      "Lie on flat bench holding dumbbells with arms extended above chest.",
      "With slight bend in elbows, lower dumbbells outwards until feeling chest stretch.",
      "Contract pectorals to return dumbbells back to starting position."
    ],
    defaultSets: 3,
    defaultRepRange: { min: 10, max: 15 },
    defaultReps: "12-15",
    alternatives: ["cable_chest_fly", "push_ups"]
  },
  {
    id: "push_ups",
    name: "Push-Ups",
    primaryMuscles: [V.MUSCLE_CHEST],
    secondaryMuscles: [V.MUSCLE_FRONT_DELTS, V.MUSCLE_TRICEPS, V.MUSCLE_CORE],
    movementPattern: V.PATTERN_HORIZONTAL_PUSH,
    type: V.EXERCISE_COMPOUND,
    equipment: [V.EQUIP_BODYWEIGHT],
    difficulty: V.DIFFICULTY_BEGINNER,
    location: [V.LOCATION_GYM, V.LOCATION_HOME],
    suitableGoals: [V.GOAL_MUSCLE_GAIN, V.GOAL_GENERAL_FITNESS, V.GOAL_ENDURANCE, V.GOAL_WEIGHT_LOSS],
    instructions: [
      "Assume a high plank position with hands slightly wider than shoulder-width.",
      "Keep core braced and spine neutral from head to heels.",
      "Lower body until chest is an inch off the floor.",
      "Push forcefully back up to start."
    ],
    defaultSets: 3,
    defaultRepRange: { min: 10, max: 20 },
    defaultReps: "12-15",
    alternatives: ["dumbbell_bench_press", "incline_push_ups", "chest_dips"]
  },
  {
    id: "incline_push_ups",
    name: "Incline Push-Ups",
    primaryMuscles: [V.MUSCLE_CHEST],
    secondaryMuscles: [V.MUSCLE_TRICEPS, V.MUSCLE_FRONT_DELTS],
    movementPattern: V.PATTERN_HORIZONTAL_PUSH,
    type: V.EXERCISE_COMPOUND,
    equipment: [V.EQUIP_BODYWEIGHT, V.EQUIP_BENCH],
    difficulty: V.DIFFICULTY_BEGINNER,
    location: [V.LOCATION_GYM, V.LOCATION_HOME],
    suitableGoals: [V.GOAL_GENERAL_FITNESS, V.GOAL_WEIGHT_LOSS, V.GOAL_ENDURANCE],
    instructions: [
      "Place hands on an elevated bench, step, or counter.",
      "Lower chest towards the elevated surface under full control.",
      "Press back up to full extension."
    ],
    defaultSets: 3,
    defaultRepRange: { min: 10, max: 15 },
    defaultReps: "10-15",
    alternatives: ["push_ups", "dumbbell_bench_press"]
  },
  {
    id: "chest_dips",
    name: "Chest Dips",
    primaryMuscles: [V.MUSCLE_CHEST],
    secondaryMuscles: [V.MUSCLE_TRICEPS, V.MUSCLE_FRONT_DELTS],
    movementPattern: V.PATTERN_HORIZONTAL_PUSH,
    type: V.EXERCISE_COMPOUND,
    equipment: [V.EQUIP_DIP_BAR, V.EQUIP_BODYWEIGHT],
    difficulty: V.DIFFICULTY_ADVANCED,
    location: [V.LOCATION_GYM],
    suitableGoals: [V.GOAL_MUSCLE_GAIN, V.GOAL_STRENGTH],
    instructions: [
      "Mount parallel dip bars with slight forward torso lean to target chest.",
      "Lower body until elbows reach 90 degrees.",
      "Press upward through palms until elbows lock out."
    ],
    defaultSets: 3,
    defaultRepRange: { min: 6, max: 12 },
    defaultReps: "8-10",
    alternatives: ["push_ups", "barbell_bench_press", "dumbbell_bench_press"]
  },

  // ===========================================================================
  // BACK
  // ===========================================================================
  {
    id: "lat_pulldown",
    name: "Lat Pulldown",
    primaryMuscles: [V.MUSCLE_LATS],
    secondaryMuscles: [V.MUSCLE_BICEPS, V.MUSCLE_UPPER_BACK],
    movementPattern: V.PATTERN_VERTICAL_PULL,
    type: V.EXERCISE_COMPOUND,
    equipment: [V.EQUIP_LAT_PULLDOWN_MACHINE],
    difficulty: V.DIFFICULTY_BEGINNER,
    location: [V.LOCATION_GYM],
    suitableGoals: [V.GOAL_MUSCLE_GAIN, V.GOAL_STRENGTH, V.GOAL_GENERAL_FITNESS, V.GOAL_WEIGHT_LOSS],
    instructions: [
      "Sit snugly under thigh pads and grip wide lat bar.",
      "Depress shoulder blades and pull bar down toward upper collarbone.",
      "Pause for peak contraction in lats, then release smoothly upward."
    ],
    defaultSets: 3,
    defaultRepRange: { min: 8, max: 12 },
    defaultReps: "8-10",
    alternatives: ["pull_ups", "chin_ups", "straight_arm_pulldown"]
  },
  {
    id: "pull_ups",
    name: "Pull-Ups",
    primaryMuscles: [V.MUSCLE_LATS],
    secondaryMuscles: [V.MUSCLE_BICEPS, V.MUSCLE_UPPER_BACK, V.MUSCLE_CORE],
    movementPattern: V.PATTERN_VERTICAL_PULL,
    type: V.EXERCISE_COMPOUND,
    equipment: [V.EQUIP_PULL_UP_BAR, V.EQUIP_BODYWEIGHT],
    difficulty: V.DIFFICULTY_ADVANCED,
    location: [V.LOCATION_GYM, V.LOCATION_HOME],
    suitableGoals: [V.GOAL_MUSCLE_GAIN, V.GOAL_STRENGTH, V.GOAL_GENERAL_FITNESS],
    instructions: [
      "Hang with an overhand grip wider than shoulders.",
      "Pull chest toward bar by driving elbows downward and back.",
      "Clear chin over bar and lower under complete control."
    ],
    defaultSets: 3,
    defaultRepRange: { min: 5, max: 10 },
    defaultReps: "6-10",
    alternatives: ["lat_pulldown", "chin_ups", "inverted_row"]
  },
  {
    id: "chin_ups",
    name: "Chin-Ups",
    primaryMuscles: [V.MUSCLE_LATS],
    secondaryMuscles: [V.MUSCLE_BICEPS, V.MUSCLE_UPPER_BACK],
    movementPattern: V.PATTERN_VERTICAL_PULL,
    type: V.EXERCISE_COMPOUND,
    equipment: [V.EQUIP_CHIN_UP_BAR, V.EQUIP_BODYWEIGHT],
    difficulty: V.DIFFICULTY_INTERMEDIATE,
    location: [V.LOCATION_GYM, V.LOCATION_HOME],
    suitableGoals: [V.GOAL_MUSCLE_GAIN, V.GOAL_STRENGTH],
    instructions: [
      "Hang from chin-up bar with an underhand shoulder-width grip.",
      "Pull body up until chin rises above bar, pulling elbows into sides.",
      "Lower down under control to a dead hang."
    ],
    defaultSets: 3,
    defaultRepRange: { min: 6, max: 10 },
    defaultReps: "6-10",
    alternatives: ["lat_pulldown", "pull_ups"]
  },
  {
    id: "barbell_bent_over_row",
    name: "Barbell Row",
    primaryMuscles: [V.MUSCLE_UPPER_BACK, V.MUSCLE_LATS],
    secondaryMuscles: [V.MUSCLE_BICEPS, V.MUSCLE_TRAPS, V.MUSCLE_CORE],
    movementPattern: V.PATTERN_HORIZONTAL_PULL,
    type: V.EXERCISE_COMPOUND,
    equipment: [V.EQUIP_BARBELL],
    difficulty: V.DIFFICULTY_INTERMEDIATE,
    location: [V.LOCATION_GYM],
    suitableGoals: [V.GOAL_MUSCLE_GAIN, V.GOAL_STRENGTH],
    instructions: [
      "Hinge hips back with knees slightly bent and torso roughly 45 degrees.",
      "Grip barbell overhand and pull bar smoothly to lower ribcage.",
      "Squeeze shoulder blades firmly at the top, then lower under control."
    ],
    defaultSets: 3,
    defaultRepRange: { min: 8, max: 10 },
    defaultReps: "8-10",
    alternatives: ["seated_cable_row", "single_arm_dumbbell_row", "chest_supported_row"]
  },
  {
    id: "seated_cable_row",
    name: "Seated Cable Row",
    primaryMuscles: [V.MUSCLE_UPPER_BACK, V.MUSCLE_LATS],
    secondaryMuscles: [V.MUSCLE_BICEPS, V.MUSCLE_TRAPS],
    movementPattern: V.PATTERN_HORIZONTAL_PULL,
    type: V.EXERCISE_COMPOUND,
    equipment: [V.EQUIP_CABLE_MACHINE, V.EQUIP_ROW_MACHINE],
    difficulty: V.DIFFICULTY_BEGINNER,
    location: [V.LOCATION_GYM],
    suitableGoals: [V.GOAL_MUSCLE_GAIN, V.GOAL_STRENGTH, V.GOAL_GENERAL_FITNESS, V.GOAL_WEIGHT_LOSS],
    instructions: [
      "Sit upright with feet securely braced on footrests.",
      "Pull cable handle toward lower abdomen while keeping spine straight.",
      "Retract scapulae firmly at peak pull, then return slowly."
    ],
    defaultSets: 3,
    defaultRepRange: { min: 8, max: 12 },
    defaultReps: "8-10",
    alternatives: ["barbell_bent_over_row", "single_arm_dumbbell_row"]
  },
  {
    id: "single_arm_dumbbell_row",
    name: "Single Arm Dumbbell Row",
    primaryMuscles: [V.MUSCLE_LATS, V.MUSCLE_UPPER_BACK],
    secondaryMuscles: [V.MUSCLE_BICEPS, V.MUSCLE_CORE],
    movementPattern: V.PATTERN_HORIZONTAL_PULL,
    type: V.EXERCISE_COMPOUND,
    equipment: [V.EQUIP_DUMBBELL, V.EQUIP_BENCH],
    difficulty: V.DIFFICULTY_BEGINNER,
    location: [V.LOCATION_GYM, V.LOCATION_HOME],
    suitableGoals: [V.GOAL_MUSCLE_GAIN, V.GOAL_STRENGTH, V.GOAL_GENERAL_FITNESS],
    instructions: [
      "Place one knee and same-side hand firmly on a flat bench.",
      "Hold dumbbell in opposite hand, arm hanging straight down.",
      "Drive elbow upward toward hip, squeezing back at peak.",
      "Lower under control and repeat on both sides."
    ],
    defaultSets: 3,
    defaultRepRange: { min: 8, max: 12 },
    defaultReps: "10-12",
    alternatives: ["barbell_bent_over_row", "seated_cable_row"]
  },
  {
    id: "chest_supported_row",
    name: "Chest Supported Row",
    primaryMuscles: [V.MUSCLE_UPPER_BACK, V.MUSCLE_LATS],
    secondaryMuscles: [V.MUSCLE_BICEPS, V.MUSCLE_REAR_DELTS],
    movementPattern: V.PATTERN_HORIZONTAL_PULL,
    type: V.EXERCISE_COMPOUND,
    equipment: [V.EQUIP_DUMBBELL, V.EQUIP_BENCH],
    difficulty: V.DIFFICULTY_BEGINNER,
    location: [V.LOCATION_GYM, V.LOCATION_HOME],
    suitableGoals: [V.GOAL_MUSCLE_GAIN, V.GOAL_STRENGTH, V.GOAL_GENERAL_FITNESS],
    instructions: [
      "Lie face down on an incline bench set to 30-45 degrees.",
      "Let arms hang holding dumbbells, then pull elbows up toward ceiling.",
      "Pinch shoulder blades hard at top and lower steadily."
    ],
    defaultSets: 3,
    defaultRepRange: { min: 10, max: 12 },
    defaultReps: "10-12",
    alternatives: ["seated_cable_row", "barbell_bent_over_row"]
  },
  {
    id: "straight_arm_pulldown",
    name: "Straight Arm Pulldown",
    primaryMuscles: [V.MUSCLE_LATS],
    secondaryMuscles: [V.MUSCLE_UPPER_BACK, V.MUSCLE_TRICEPS],
    movementPattern: V.PATTERN_VERTICAL_PULL,
    type: V.EXERCISE_ISOLATION,
    equipment: [V.EQUIP_CABLE_MACHINE],
    difficulty: V.DIFFICULTY_BEGINNER,
    location: [V.LOCATION_GYM],
    suitableGoals: [V.GOAL_MUSCLE_GAIN, V.GOAL_GENERAL_FITNESS],
    instructions: [
      "Stand facing high cable with straight bar attachment.",
      "Keep arms straight with tiny elbow bend, sweep bar downward in an arc to thighs.",
      "Squeeze lats intensely at the bottom, then return smoothly."
    ],
    defaultSets: 3,
    defaultRepRange: { min: 12, max: 15 },
    defaultReps: "12-15",
    alternatives: ["lat_pulldown", "pull_ups"]
  },
  {
    id: "face_pull",
    name: "Face Pull",
    primaryMuscles: [V.MUSCLE_REAR_DELTS, V.MUSCLE_UPPER_BACK],
    secondaryMuscles: [V.MUSCLE_TRAPS, V.MUSCLE_LATERAL_DELTS],
    movementPattern: V.PATTERN_HORIZONTAL_PULL,
    type: V.EXERCISE_ISOLATION,
    equipment: [V.EQUIP_CABLE_MACHINE],
    difficulty: V.DIFFICULTY_BEGINNER,
    location: [V.LOCATION_GYM],
    suitableGoals: [V.GOAL_MUSCLE_GAIN, V.GOAL_GENERAL_FITNESS, V.GOAL_STRENGTH],
    instructions: [
      "Set cable pulley to eye level with rope attachment.",
      "Grip rope ends with thumbs pointing back.",
      "Pull hands toward face while externally rotating shoulders.",
      "Hold briefly and return smoothly."
    ],
    defaultSets: 3,
    defaultRepRange: { min: 12, max: 15 },
    defaultReps: "12-15",
    alternatives: ["rear_delt_cable_fly", "dumbbell_rear_delt_fly"]
  },
  {
    id: "inverted_row",
    name: "Inverted Row",
    primaryMuscles: [V.MUSCLE_UPPER_BACK, V.MUSCLE_LATS],
    secondaryMuscles: [V.MUSCLE_BICEPS, V.MUSCLE_CORE],
    movementPattern: V.PATTERN_HORIZONTAL_PULL,
    type: V.EXERCISE_COMPOUND,
    equipment: [V.EQUIP_BODYWEIGHT],
    difficulty: V.DIFFICULTY_BEGINNER,
    location: [V.LOCATION_GYM, V.LOCATION_HOME],
    suitableGoals: [V.GOAL_GENERAL_FITNESS, V.GOAL_ENDURANCE, V.GOAL_MUSCLE_GAIN],
    instructions: [
      "Lie underneath a stable bar set waist-high.",
      "Grip bar with overhand grip and keep body in a rigid plank.",
      "Pull chest to the bar, squeeze upper back, and lower under control."
    ],
    defaultSets: 3,
    defaultRepRange: { min: 8, max: 12 },
    defaultReps: "8-12",
    alternatives: ["single_arm_dumbbell_row", "pull_ups"]
  },

  // ===========================================================================
  // SHOULDERS
  // ===========================================================================
  {
    id: "overhead_barbell_press",
    name: "Overhead Barbell Press",
    primaryMuscles: [V.MUSCLE_FRONT_DELTS, V.MUSCLE_LATERAL_DELTS],
    secondaryMuscles: [V.MUSCLE_TRICEPS, V.MUSCLE_UPPER_BACK, V.MUSCLE_CORE],
    movementPattern: V.PATTERN_OVERHEAD_PUSH,
    type: V.EXERCISE_COMPOUND,
    equipment: [V.EQUIP_BARBELL],
    difficulty: V.DIFFICULTY_INTERMEDIATE,
    location: [V.LOCATION_GYM],
    suitableGoals: [V.GOAL_MUSCLE_GAIN, V.GOAL_STRENGTH],
    instructions: [
      "Stand tall holding barbell at shoulder level across anterior deltoids.",
      "Brace glutes and core, press barbell vertically overhead.",
      "Lock out arms directly above ears, then lower under control."
    ],
    defaultSets: 3,
    defaultRepRange: { min: 6, max: 10 },
    defaultReps: "8-10",
    alternatives: ["dumbbell_shoulder_press", "arnold_press", "pike_push_ups"]
  },
  {
    id: "dumbbell_shoulder_press",
    name: "Shoulder Press",
    primaryMuscles: [V.MUSCLE_FRONT_DELTS, V.MUSCLE_LATERAL_DELTS],
    secondaryMuscles: [V.MUSCLE_TRICEPS],
    movementPattern: V.PATTERN_OVERHEAD_PUSH,
    type: V.EXERCISE_COMPOUND,
    equipment: [V.EQUIP_DUMBBELL, V.EQUIP_BENCH],
    difficulty: V.DIFFICULTY_BEGINNER,
    location: [V.LOCATION_GYM, V.LOCATION_HOME],
    suitableGoals: [V.GOAL_MUSCLE_GAIN, V.GOAL_STRENGTH, V.GOAL_GENERAL_FITNESS, V.GOAL_WEIGHT_LOSS],
    instructions: [
      "Sit on an upright bench holding dumbbells at ear level.",
      "Press dumbbells directly upward until arms are extended overhead.",
      "Lower smoothly back to ear level."
    ],
    defaultSets: 3,
    defaultRepRange: { min: 8, max: 12 },
    defaultReps: "8-10",
    alternatives: ["overhead_barbell_press", "arnold_press", "pike_push_ups"]
  },
  {
    id: "arnold_press",
    name: "Arnold Press",
    primaryMuscles: [V.MUSCLE_FRONT_DELTS, V.MUSCLE_LATERAL_DELTS],
    secondaryMuscles: [V.MUSCLE_TRICEPS],
    movementPattern: V.PATTERN_OVERHEAD_PUSH,
    type: V.EXERCISE_COMPOUND,
    equipment: [V.EQUIP_DUMBBELL, V.EQUIP_BENCH],
    difficulty: V.DIFFICULTY_INTERMEDIATE,
    location: [V.LOCATION_GYM, V.LOCATION_HOME],
    suitableGoals: [V.GOAL_MUSCLE_GAIN, V.GOAL_GENERAL_FITNESS],
    instructions: [
      "Hold dumbbells in front of chest with palms facing your face.",
      "As you press overhead, rotate your wrists so palms face forward at lockout.",
      "Reverse rotation as you lower back down."
    ],
    defaultSets: 3,
    defaultRepRange: { min: 8, max: 12 },
    defaultReps: "8-10",
    alternatives: ["dumbbell_shoulder_press", "overhead_barbell_press"]
  },
  {
    id: "dumbbell_lateral_raise",
    name: "Lateral Raise",
    primaryMuscles: [V.MUSCLE_LATERAL_DELTS],
    secondaryMuscles: [V.MUSCLE_FRONT_DELTS, V.MUSCLE_TRAPS],
    movementPattern: V.PATTERN_OVERHEAD_PUSH,
    type: V.EXERCISE_ISOLATION,
    equipment: [V.EQUIP_DUMBBELL],
    difficulty: V.DIFFICULTY_BEGINNER,
    location: [V.LOCATION_GYM, V.LOCATION_HOME],
    suitableGoals: [V.GOAL_MUSCLE_GAIN, V.GOAL_GENERAL_FITNESS],
    instructions: [
      "Stand with dumbbells at sides, slight hinge in torso and slight elbow bend.",
      "Raise dumbbells out to sides until parallel to floor.",
      "Lower under control, avoiding swinging momentum."
    ],
    defaultSets: 3,
    defaultRepRange: { min: 12, max: 15 },
    defaultReps: "12-15",
    alternatives: ["cable_lateral_raise"]
  },
  {
    id: "cable_lateral_raise",
    name: "Cable Lateral Raise",
    primaryMuscles: [V.MUSCLE_LATERAL_DELTS],
    secondaryMuscles: [V.MUSCLE_FRONT_DELTS],
    movementPattern: V.PATTERN_OVERHEAD_PUSH,
    type: V.EXERCISE_ISOLATION,
    equipment: [V.EQUIP_CABLE_MACHINE],
    difficulty: V.DIFFICULTY_INTERMEDIATE,
    location: [V.LOCATION_GYM],
    suitableGoals: [V.GOAL_MUSCLE_GAIN, V.GOAL_GENERAL_FITNESS],
    instructions: [
      "Attach single handle to lowest cable pulley.",
      "Stand with opposite side to machine and pull cable across and up to shoulder level.",
      "Slowly lower back down under continuous cable tension."
    ],
    defaultSets: 3,
    defaultRepRange: { min: 12, max: 15 },
    defaultReps: "12-15",
    alternatives: ["dumbbell_lateral_raise"]
  },
  {
    id: "rear_delt_cable_fly",
    name: "Rear Delt Cable Fly",
    primaryMuscles: [V.MUSCLE_REAR_DELTS],
    secondaryMuscles: [V.MUSCLE_UPPER_BACK, V.MUSCLE_TRAPS],
    movementPattern: V.PATTERN_HORIZONTAL_PULL,
    type: V.EXERCISE_ISOLATION,
    equipment: [V.EQUIP_CABLE_MACHINE],
    difficulty: V.DIFFICULTY_BEGINNER,
    location: [V.LOCATION_GYM],
    suitableGoals: [V.GOAL_MUSCLE_GAIN, V.GOAL_GENERAL_FITNESS],
    instructions: [
      "Set dual cable pulleys at eye level without handles.",
      "Cross arms and grip opposite cables, then pull hands back and outward.",
      "Squeeze rear shoulders and slowly return to start."
    ],
    defaultSets: 3,
    defaultRepRange: { min: 12, max: 15 },
    defaultReps: "12-15",
    alternatives: ["face_pull", "dumbbell_rear_delt_fly"]
  },
  {
    id: "dumbbell_rear_delt_fly",
    name: "Dumbbell Rear Delt Fly",
    primaryMuscles: [V.MUSCLE_REAR_DELTS],
    secondaryMuscles: [V.MUSCLE_UPPER_BACK],
    movementPattern: V.PATTERN_HORIZONTAL_PULL,
    type: V.EXERCISE_ISOLATION,
    equipment: [V.EQUIP_DUMBBELL],
    difficulty: V.DIFFICULTY_BEGINNER,
    location: [V.LOCATION_GYM, V.LOCATION_HOME],
    suitableGoals: [V.GOAL_MUSCLE_GAIN, V.GOAL_GENERAL_FITNESS],
    instructions: [
      "Hinge forward at hips until torso is nearly parallel to floor.",
      "With slight elbow bend, raise dumbbells outward until upper arms align with back.",
      "Squeeze rear shoulders, then lower steadily."
    ],
    defaultSets: 3,
    defaultRepRange: { min: 12, max: 15 },
    defaultReps: "12-15",
    alternatives: ["face_pull", "rear_delt_cable_fly"]
  },
  {
    id: "pike_push_ups",
    name: "Pike Push-Ups",
    primaryMuscles: [V.MUSCLE_FRONT_DELTS, V.MUSCLE_LATERAL_DELTS],
    secondaryMuscles: [V.MUSCLE_TRICEPS, V.MUSCLE_CORE],
    movementPattern: V.PATTERN_OVERHEAD_PUSH,
    type: V.EXERCISE_COMPOUND,
    equipment: [V.EQUIP_BODYWEIGHT],
    difficulty: V.DIFFICULTY_INTERMEDIATE,
    location: [V.LOCATION_GYM, V.LOCATION_HOME],
    suitableGoals: [V.GOAL_GENERAL_FITNESS, V.GOAL_STRENGTH, V.GOAL_ENDURANCE],
    instructions: [
      "Assume downward dog position with hips elevated high in the air.",
      "Lower head toward floor between hands at a diagonal angle.",
      "Push forcefully back up to pike position."
    ],
    defaultSets: 3,
    defaultRepRange: { min: 8, max: 12 },
    defaultReps: "8-12",
    alternatives: ["dumbbell_shoulder_press", "overhead_barbell_press"]
  },

  // ===========================================================================
  // BICEPS
  // ===========================================================================
  {
    id: "barbell_biceps_curl",
    name: "Barbell Curl",
    primaryMuscles: [V.MUSCLE_BICEPS],
    secondaryMuscles: [V.MUSCLE_FOREARMS],
    movementPattern: V.PATTERN_VERTICAL_PULL,
    type: V.EXERCISE_ISOLATION,
    equipment: [V.EQUIP_BARBELL],
    difficulty: V.DIFFICULTY_BEGINNER,
    location: [V.LOCATION_GYM],
    suitableGoals: [V.GOAL_MUSCLE_GAIN, V.GOAL_STRENGTH],
    instructions: [
      "Stand tall holding barbell with an underhand shoulder-width grip.",
      "Keeping elbows pinned to ribs, curl bar upward toward shoulders.",
      "Squeeze biceps firmly at top, then lower under control."
    ],
    defaultSets: 3,
    defaultRepRange: { min: 8, max: 12 },
    defaultReps: "8-10",
    alternatives: ["ez_bar_curl", "dumbbell_biceps_curl"]
  },
  {
    id: "ez_bar_curl",
    name: "EZ Bar Curl",
    primaryMuscles: [V.MUSCLE_BICEPS],
    secondaryMuscles: [V.MUSCLE_FOREARMS],
    movementPattern: V.PATTERN_VERTICAL_PULL,
    type: V.EXERCISE_ISOLATION,
    equipment: [V.EQUIP_BARBELL],
    difficulty: V.DIFFICULTY_BEGINNER,
    location: [V.LOCATION_GYM],
    suitableGoals: [V.GOAL_MUSCLE_GAIN, V.GOAL_STRENGTH, V.GOAL_GENERAL_FITNESS],
    instructions: [
      "Grip inner angled handles of an EZ curl bar.",
      "Curl bar upward smoothly while keeping upper arms fixed.",
      "Lower bar steadily to full arm extension."
    ],
    defaultSets: 3,
    defaultRepRange: { min: 8, max: 12 },
    defaultReps: "10-12",
    alternatives: ["barbell_biceps_curl", "dumbbell_biceps_curl"]
  },
  {
    id: "dumbbell_biceps_curl",
    name: "Dumbbell Curl",
    primaryMuscles: [V.MUSCLE_BICEPS],
    secondaryMuscles: [V.MUSCLE_FOREARMS],
    movementPattern: V.PATTERN_VERTICAL_PULL,
    type: V.EXERCISE_ISOLATION,
    equipment: [V.EQUIP_DUMBBELL],
    difficulty: V.DIFFICULTY_BEGINNER,
    location: [V.LOCATION_GYM, V.LOCATION_HOME],
    suitableGoals: [V.GOAL_MUSCLE_GAIN, V.GOAL_GENERAL_FITNESS, V.GOAL_WEIGHT_LOSS],
    instructions: [
      "Stand holding dumbbells at your sides with palms facing forward.",
      "Curl dumbbells toward shoulders without swinging.",
      "Lower under control to starting position."
    ],
    defaultSets: 3,
    defaultRepRange: { min: 10, max: 12 },
    defaultReps: "10-12",
    alternatives: ["hammer_curl", "incline_dumbbell_curl"]
  },
  {
    id: "incline_dumbbell_curl",
    name: "Incline Dumbbell Curl",
    primaryMuscles: [V.MUSCLE_BICEPS],
    secondaryMuscles: [V.MUSCLE_FOREARMS],
    movementPattern: V.PATTERN_VERTICAL_PULL,
    type: V.EXERCISE_ISOLATION,
    equipment: [V.EQUIP_DUMBBELL, V.EQUIP_BENCH],
    difficulty: V.DIFFICULTY_INTERMEDIATE,
    location: [V.LOCATION_GYM, V.LOCATION_HOME],
    suitableGoals: [V.GOAL_MUSCLE_GAIN],
    instructions: [
      "Lie back on an incline bench set to 45-60 degrees.",
      "Let dumbbells hang straight down to place biceps on a full stretch.",
      "Curl dumbbells upward while keeping elbows back."
    ],
    defaultSets: 3,
    defaultRepRange: { min: 10, max: 12 },
    defaultReps: "10-12",
    alternatives: ["dumbbell_biceps_curl", "preacher_curl"]
  },
  {
    id: "hammer_curl",
    name: "Hammer Curl",
    primaryMuscles: [V.MUSCLE_BICEPS, V.MUSCLE_FOREARMS],
    secondaryMuscles: [],
    movementPattern: V.PATTERN_VERTICAL_PULL,
    type: V.EXERCISE_ISOLATION,
    equipment: [V.EQUIP_DUMBBELL],
    difficulty: V.DIFFICULTY_BEGINNER,
    location: [V.LOCATION_GYM, V.LOCATION_HOME],
    suitableGoals: [V.GOAL_MUSCLE_GAIN, V.GOAL_STRENGTH, V.GOAL_GENERAL_FITNESS],
    instructions: [
      "Stand holding dumbbells with neutral palms-facing-each-other grip.",
      "Curl weights straight up toward shoulders, emphasizing brachialis and forearms.",
      "Lower under steady control."
    ],
    defaultSets: 2,
    defaultRepRange: { min: 12, max: 15 },
    defaultReps: "12-15",
    alternatives: ["dumbbell_biceps_curl", "reverse_barbell_curl"]
  },
  {
    id: "preacher_curl",
    name: "Preacher Curl",
    primaryMuscles: [V.MUSCLE_BICEPS],
    secondaryMuscles: [V.MUSCLE_FOREARMS],
    movementPattern: V.PATTERN_VERTICAL_PULL,
    type: V.EXERCISE_ISOLATION,
    equipment: [V.EQUIP_BARBELL, V.EQUIP_BENCH],
    difficulty: V.DIFFICULTY_INTERMEDIATE,
    location: [V.LOCATION_GYM],
    suitableGoals: [V.GOAL_MUSCLE_GAIN],
    instructions: [
      "Position upper arms flat against preacher bench pad.",
      "Grip bar with palms up, curl upward until forearms are vertical.",
      "Lower bar slowly until arms are nearly straight."
    ],
    defaultSets: 2,
    defaultRepRange: { min: 10, max: 12 },
    defaultReps: "10-12",
    alternatives: ["incline_dumbbell_curl", "ez_bar_curl"]
  },
  {
    id: "cable_biceps_curl",
    name: "Cable Biceps Curl",
    primaryMuscles: [V.MUSCLE_BICEPS],
    secondaryMuscles: [V.MUSCLE_FOREARMS],
    movementPattern: V.PATTERN_VERTICAL_PULL,
    type: V.EXERCISE_ISOLATION,
    equipment: [V.EQUIP_CABLE_MACHINE],
    difficulty: V.DIFFICULTY_BEGINNER,
    location: [V.LOCATION_GYM],
    suitableGoals: [V.GOAL_MUSCLE_GAIN, V.GOAL_GENERAL_FITNESS],
    instructions: [
      "Attach straight or EZ bar to low cable pulley.",
      "Stand facing machine, curl bar upward keeping elbows fixed.",
      "Squeeze biceps against continuous cable tension."
    ],
    defaultSets: 3,
    defaultRepRange: { min: 10, max: 15 },
    defaultReps: "10-12",
    alternatives: ["ez_bar_curl", "dumbbell_biceps_curl"]
  },

  // ===========================================================================
  // TRICEPS
  // ===========================================================================
  {
    id: "triceps_pushdown",
    name: "Triceps Pushdown",
    primaryMuscles: [V.MUSCLE_TRICEPS],
    secondaryMuscles: [],
    movementPattern: V.PATTERN_HORIZONTAL_PUSH,
    type: V.EXERCISE_ISOLATION,
    equipment: [V.EQUIP_CABLE_MACHINE],
    difficulty: V.DIFFICULTY_BEGINNER,
    location: [V.LOCATION_GYM],
    suitableGoals: [V.GOAL_MUSCLE_GAIN, V.GOAL_GENERAL_FITNESS, V.GOAL_STRENGTH],
    instructions: [
      "Attach straight or angled bar to high cable pulley.",
      "Pin elbows against ribs and press bar downward until arms lock.",
      "Allow bar to rise smoothly to chest level."
    ],
    defaultSets: 3,
    defaultRepRange: { min: 10, max: 12 },
    defaultReps: "10-12",
    alternatives: ["rope_triceps_pushdown", "overhead_triceps_extension", "bench_dips"]
  },
  {
    id: "rope_triceps_pushdown",
    name: "Rope Triceps Pushdown",
    primaryMuscles: [V.MUSCLE_TRICEPS],
    secondaryMuscles: [],
    movementPattern: V.PATTERN_HORIZONTAL_PUSH,
    type: V.EXERCISE_ISOLATION,
    equipment: [V.EQUIP_CABLE_MACHINE],
    difficulty: V.DIFFICULTY_BEGINNER,
    location: [V.LOCATION_GYM],
    suitableGoals: [V.GOAL_MUSCLE_GAIN, V.GOAL_GENERAL_FITNESS],
    instructions: [
      "Grip rope attachment with palms facing inwards.",
      "Push downward, spreading rope ends apart at full lockout.",
      "Control ascent back to chest level."
    ],
    defaultSets: 3,
    defaultRepRange: { min: 10, max: 12 },
    defaultReps: "10-12",
    alternatives: ["triceps_pushdown", "overhead_triceps_extension"]
  },
  {
    id: "overhead_triceps_extension",
    name: "Overhead Triceps Extension",
    primaryMuscles: [V.MUSCLE_TRICEPS],
    secondaryMuscles: [],
    movementPattern: V.PATTERN_OVERHEAD_PUSH,
    type: V.EXERCISE_ISOLATION,
    equipment: [V.EQUIP_DUMBBELL],
    difficulty: V.DIFFICULTY_BEGINNER,
    location: [V.LOCATION_GYM, V.LOCATION_HOME],
    suitableGoals: [V.GOAL_MUSCLE_GAIN, V.GOAL_GENERAL_FITNESS],
    instructions: [
      "Hold a dumbbell with both hands overhead.",
      "Keeping elbows pointing forward, lower dumbbell behind head.",
      "Extend arms to raise dumbbell back overhead."
    ],
    defaultSets: 2,
    defaultRepRange: { min: 12, max: 15 },
    defaultReps: "12-15",
    alternatives: ["skull_crushers", "triceps_pushdown", "bench_dips"]
  },
  {
    id: "skull_crushers",
    name: "Skull Crushers",
    primaryMuscles: [V.MUSCLE_TRICEPS],
    secondaryMuscles: [],
    movementPattern: V.PATTERN_HORIZONTAL_PUSH,
    type: V.EXERCISE_ISOLATION,
    equipment: [V.EQUIP_BARBELL, V.EQUIP_BENCH],
    difficulty: V.DIFFICULTY_INTERMEDIATE,
    location: [V.LOCATION_GYM],
    suitableGoals: [V.GOAL_MUSCLE_GAIN, V.GOAL_STRENGTH],
    instructions: [
      "Lie on flat bench holding EZ bar or barbell above shoulders.",
      "Bend at elbows to lower bar toward forehead or crown of head.",
      "Drive weight back up using triceps."
    ],
    defaultSets: 2,
    defaultRepRange: { min: 10, max: 12 },
    defaultReps: "10-12",
    alternatives: ["overhead_triceps_extension", "triceps_pushdown"]
  },
  {
    id: "close_grip_bench_press",
    name: "Close Grip Bench Press",
    primaryMuscles: [V.MUSCLE_TRICEPS],
    secondaryMuscles: [V.MUSCLE_CHEST, V.MUSCLE_FRONT_DELTS],
    movementPattern: V.PATTERN_HORIZONTAL_PUSH,
    type: V.EXERCISE_COMPOUND,
    equipment: [V.EQUIP_BARBELL, V.EQUIP_BENCH],
    difficulty: V.DIFFICULTY_INTERMEDIATE,
    location: [V.LOCATION_GYM],
    suitableGoals: [V.GOAL_MUSCLE_GAIN, V.GOAL_STRENGTH],
    instructions: [
      "Lie on flat bench with shoulder-width grip on barbell.",
      "Lower bar to lower chest keeping elbows tucked close to torso.",
      "Press back up forcefully, emphasizing triceps lockout."
    ],
    defaultSets: 3,
    defaultRepRange: { min: 8, max: 10 },
    defaultReps: "8-10",
    alternatives: ["barbell_bench_press", "triceps_pushdown", "diamond_push_ups"]
  },
  {
    id: "diamond_push_ups",
    name: "Diamond Push-Ups",
    primaryMuscles: [V.MUSCLE_TRICEPS],
    secondaryMuscles: [V.MUSCLE_CHEST, V.MUSCLE_FRONT_DELTS, V.MUSCLE_CORE],
    movementPattern: V.PATTERN_HORIZONTAL_PUSH,
    type: V.EXERCISE_COMPOUND,
    equipment: [V.EQUIP_BODYWEIGHT],
    difficulty: V.DIFFICULTY_INTERMEDIATE,
    location: [V.LOCATION_GYM, V.LOCATION_HOME],
    suitableGoals: [V.GOAL_MUSCLE_GAIN, V.GOAL_GENERAL_FITNESS, V.GOAL_ENDURANCE],
    instructions: [
      "Assume push-up position with thumbs and index fingers touching under chest.",
      "Lower chest toward hands keeping elbows tucked close to sides.",
      "Press back up to straight arms."
    ],
    defaultSets: 3,
    defaultRepRange: { min: 8, max: 15 },
    defaultReps: "10-12",
    alternatives: ["push_ups", "bench_dips", "triceps_pushdown"]
  },
  {
    id: "bench_dips",
    name: "Bench Dips",
    primaryMuscles: [V.MUSCLE_TRICEPS],
    secondaryMuscles: [V.MUSCLE_CHEST, V.MUSCLE_FRONT_DELTS],
    movementPattern: V.PATTERN_HORIZONTAL_PUSH,
    type: V.EXERCISE_COMPOUND,
    equipment: [V.EQUIP_BENCH, V.EQUIP_BODYWEIGHT],
    difficulty: V.DIFFICULTY_BEGINNER,
    location: [V.LOCATION_GYM, V.LOCATION_HOME],
    suitableGoals: [V.GOAL_GENERAL_FITNESS, V.GOAL_MUSCLE_GAIN, V.GOAL_WEIGHT_LOSS],
    instructions: [
      "Sit on edge of a bench with hands gripping edge next to hips.",
      "Extend legs forward and slide hips off bench.",
      "Lower body until elbows reach 90 degrees, then push through palms back up."
    ],
    defaultSets: 3,
    defaultRepRange: { min: 10, max: 15 },
    defaultReps: "10-15",
    alternatives: ["diamond_push_ups", "triceps_pushdown"]
  },

  // ===========================================================================
  // FOREARMS
  // ===========================================================================
  {
    id: "barbell_wrist_curl",
    name: "Barbell Wrist Curl",
    primaryMuscles: [V.MUSCLE_FOREARMS],
    secondaryMuscles: [],
    movementPattern: V.PATTERN_VERTICAL_PULL,
    type: V.EXERCISE_ISOLATION,
    equipment: [V.EQUIP_BARBELL, V.EQUIP_BENCH],
    difficulty: V.DIFFICULTY_BEGINNER,
    location: [V.LOCATION_GYM],
    suitableGoals: [V.GOAL_MUSCLE_GAIN, V.GOAL_STRENGTH],
    instructions: [
      "Rest forearms on flat bench with palms facing up, wrists hanging off edge.",
      "Curl wrists upward as high as possible, then lower back down slowly."
    ],
    defaultSets: 3,
    defaultRepRange: { min: 12, max: 15 },
    defaultReps: "12-15",
    alternatives: ["dumbbell_wrist_curl", "farmers_walk"]
  },
  {
    id: "reverse_barbell_curl",
    name: "Reverse Barbell Curl",
    primaryMuscles: [V.MUSCLE_FOREARMS],
    secondaryMuscles: [V.MUSCLE_BICEPS],
    movementPattern: V.PATTERN_VERTICAL_PULL,
    type: V.EXERCISE_ISOLATION,
    equipment: [V.EQUIP_BARBELL],
    difficulty: V.DIFFICULTY_BEGINNER,
    location: [V.LOCATION_GYM],
    suitableGoals: [V.GOAL_MUSCLE_GAIN, V.GOAL_GENERAL_FITNESS],
    instructions: [
      "Hold barbell with an overhand (pronated) shoulder-width grip.",
      "Curl bar upward keeping elbows fixed at your sides.",
      "Lower under control, feeling tension across brachioradialis."
    ],
    defaultSets: 3,
    defaultRepRange: { min: 10, max: 12 },
    defaultReps: "10-12",
    alternatives: ["hammer_curl", "barbell_wrist_curl"]
  },
  {
    id: "dumbbell_wrist_curl",
    name: "Dumbbell Wrist Curl",
    primaryMuscles: [V.MUSCLE_FOREARMS],
    secondaryMuscles: [],
    movementPattern: V.PATTERN_VERTICAL_PULL,
    type: V.EXERCISE_ISOLATION,
    equipment: [V.EQUIP_DUMBBELL, V.EQUIP_BENCH],
    difficulty: V.DIFFICULTY_BEGINNER,
    location: [V.LOCATION_GYM, V.LOCATION_HOME],
    suitableGoals: [V.GOAL_MUSCLE_GAIN, V.GOAL_GENERAL_FITNESS],
    instructions: [
      "Rest forearm on thigh or bench with palm facing up.",
      "Curl wrist upward, squeeze forearm, and slowly lower."
    ],
    defaultSets: 3,
    defaultRepRange: { min: 12, max: 15 },
    defaultReps: "12-15",
    alternatives: ["barbell_wrist_curl", "farmers_walk"]
  },
  {
    id: "farmers_walk",
    name: "Farmer's Walk",
    primaryMuscles: [V.MUSCLE_FOREARMS, V.MUSCLE_TRAPS],
    secondaryMuscles: [V.MUSCLE_CORE, V.MUSCLE_GLUTES, V.MUSCLE_CALVES],
    movementPattern: V.PATTERN_CARRY,
    type: V.EXERCISE_COMPOUND,
    equipment: [V.EQUIP_DUMBBELL, V.EQUIP_KETTLEBELL],
    difficulty: V.DIFFICULTY_BEGINNER,
    location: [V.LOCATION_GYM, V.LOCATION_HOME],
    suitableGoals: [V.GOAL_STRENGTH, V.GOAL_GENERAL_FITNESS, V.GOAL_ENDURANCE],
    instructions: [
      "Deadlift two heavy dumbbells or kettlebells to standing position.",
      "Pull shoulders back, brace core tightly, and walk with short, controlled steps.",
      "Maintain tall posture throughout the distance."
    ],
    defaultSets: 3,
    defaultRepRange: { min: 30, max: 60 },
    defaultReps: "45 sec",
    alternatives: ["dead_hang", "barbell_wrist_curl"]
  },
  {
    id: "dead_hang",
    name: "Dead Hang",
    primaryMuscles: [V.MUSCLE_FOREARMS],
    secondaryMuscles: [V.MUSCLE_LATS, V.MUSCLE_CORE],
    movementPattern: V.PATTERN_BRACING,
    type: V.EXERCISE_ISOLATION,
    equipment: [V.EQUIP_PULL_UP_BAR, V.EQUIP_BODYWEIGHT],
    difficulty: V.DIFFICULTY_BEGINNER,
    location: [V.LOCATION_GYM, V.LOCATION_HOME],
    suitableGoals: [V.GOAL_GENERAL_FITNESS, V.GOAL_STRENGTH, V.GOAL_ENDURANCE],
    instructions: [
      "Grip pull-up bar firmly with an overhand grip.",
      "Hang with arms fully extended and shoulders gently engaged.",
      "Hold for prescribed time, breathing steadily."
    ],
    defaultSets: 3,
    defaultRepRange: { min: 30, max: 60 },
    defaultReps: "45 sec",
    alternatives: ["farmers_walk", "dumbbell_wrist_curl"]
  },

  // ===========================================================================
  // QUADRICEPS
  // ===========================================================================
  {
    id: "barbell_back_squat",
    name: "Barbell Squat",
    primaryMuscles: [V.MUSCLE_QUADRICEPS, V.MUSCLE_GLUTES],
    secondaryMuscles: [V.MUSCLE_HAMSTRINGS, V.MUSCLE_CORE],
    movementPattern: V.PATTERN_SQUAT,
    type: V.EXERCISE_COMPOUND,
    equipment: [V.EQUIP_BARBELL, V.EQUIP_SQUAT_RACK],
    difficulty: V.DIFFICULTY_INTERMEDIATE,
    location: [V.LOCATION_GYM],
    suitableGoals: [V.GOAL_MUSCLE_GAIN, V.GOAL_STRENGTH],
    instructions: [
      "Place barbell across upper traps, feet shoulder-width apart.",
      "Brace core, sit back and down until thighs reach parallel or below.",
      "Drive through midfoot and heels to return to standing position."
    ],
    defaultSets: 3,
    defaultRepRange: { min: 6, max: 10 },
    defaultReps: "8-10",
    alternatives: ["leg_press", "goblet_squat", "front_squat"]
  },
  {
    id: "front_squat",
    name: "Front Squat",
    primaryMuscles: [V.MUSCLE_QUADRICEPS],
    secondaryMuscles: [V.MUSCLE_GLUTES, V.MUSCLE_CORE],
    movementPattern: V.PATTERN_SQUAT,
    type: V.EXERCISE_COMPOUND,
    equipment: [V.EQUIP_BARBELL, V.EQUIP_SQUAT_RACK],
    difficulty: V.DIFFICULTY_ADVANCED,
    location: [V.LOCATION_GYM],
    suitableGoals: [V.GOAL_MUSCLE_GAIN, V.GOAL_STRENGTH],
    instructions: [
      "Rest barbell across front shoulders with elbows raised high.",
      "Squat deeply while keeping torso exceptionally upright.",
      "Drive through heels to stand back up."
    ],
    defaultSets: 3,
    defaultRepRange: { min: 6, max: 10 },
    defaultReps: "8-10",
    alternatives: ["barbell_back_squat", "goblet_squat", "leg_press"]
  },
  {
    id: "goblet_squat",
    name: "Goblet Squat",
    primaryMuscles: [V.MUSCLE_QUADRICEPS, V.MUSCLE_GLUTES],
    secondaryMuscles: [V.MUSCLE_CORE],
    movementPattern: V.PATTERN_SQUAT,
    type: V.EXERCISE_COMPOUND,
    equipment: [V.EQUIP_DUMBBELL, V.EQUIP_KETTLEBELL],
    difficulty: V.DIFFICULTY_BEGINNER,
    location: [V.LOCATION_GYM, V.LOCATION_HOME],
    suitableGoals: [V.GOAL_MUSCLE_GAIN, V.GOAL_GENERAL_FITNESS, V.GOAL_WEIGHT_LOSS],
    instructions: [
      "Hold a dumbbell or kettlebell vertically against chest.",
      "Squat down between knees keeping chest proud.",
      "Push through floor to return to top."
    ],
    defaultSets: 3,
    defaultRepRange: { min: 10, max: 15 },
    defaultReps: "10-12",
    alternatives: ["barbell_back_squat", "bodyweight_squat", "leg_press"]
  },
  {
    id: "leg_press",
    name: "Leg Press",
    primaryMuscles: [V.MUSCLE_QUADRICEPS, V.MUSCLE_GLUTES],
    secondaryMuscles: [V.MUSCLE_HAMSTRINGS],
    movementPattern: V.PATTERN_SQUAT,
    type: V.EXERCISE_COMPOUND,
    equipment: [V.EQUIP_LEG_PRESS_MACHINE],
    difficulty: V.DIFFICULTY_BEGINNER,
    location: [V.LOCATION_GYM],
    suitableGoals: [V.GOAL_MUSCLE_GAIN, V.GOAL_STRENGTH, V.GOAL_GENERAL_FITNESS, V.GOAL_WEIGHT_LOSS],
    instructions: [
      "Sit with lower back flush against machine backrest, feet shoulder-width on sled.",
      "Release safety and lower sled until knees reach 90 degrees.",
      "Press platform back up without hyperextending knees."
    ],
    defaultSets: 3,
    defaultRepRange: { min: 10, max: 12 },
    defaultReps: "10-12",
    alternatives: ["barbell_back_squat", "goblet_squat"]
  },
  {
    id: "bulgarian_split_squat",
    name: "Bulgarian Split Squat",
    primaryMuscles: [V.MUSCLE_QUADRICEPS, V.MUSCLE_GLUTES],
    secondaryMuscles: [V.MUSCLE_HAMSTRINGS, V.MUSCLE_CORE],
    movementPattern: V.PATTERN_LUNGE,
    type: V.EXERCISE_COMPOUND,
    equipment: [V.EQUIP_DUMBBELL, V.EQUIP_BENCH],
    difficulty: V.DIFFICULTY_INTERMEDIATE,
    location: [V.LOCATION_GYM, V.LOCATION_HOME],
    suitableGoals: [V.GOAL_MUSCLE_GAIN, V.GOAL_STRENGTH, V.GOAL_GENERAL_FITNESS],
    instructions: [
      "Stand lunge-distance ahead of a bench with rear foot elevated on bench.",
      "Lower rear knee toward floor until front thigh is parallel.",
      "Drive through front heel to stand back up."
    ],
    defaultSets: 3,
    defaultRepRange: { min: 8, max: 12 },
    defaultReps: "10-12",
    alternatives: ["walking_lunges", "goblet_squat"]
  },
  {
    id: "walking_lunges",
    name: "Walking Lunges",
    primaryMuscles: [V.MUSCLE_QUADRICEPS, V.MUSCLE_GLUTES],
    secondaryMuscles: [V.MUSCLE_HAMSTRINGS, V.MUSCLE_CALVES],
    movementPattern: V.PATTERN_LUNGE,
    type: V.EXERCISE_COMPOUND,
    equipment: [V.EQUIP_DUMBBELL],
    difficulty: V.DIFFICULTY_BEGINNER,
    location: [V.LOCATION_GYM, V.LOCATION_HOME],
    suitableGoals: [V.GOAL_GENERAL_FITNESS, V.GOAL_WEIGHT_LOSS, V.GOAL_MUSCLE_GAIN],
    instructions: [
      "Step forward with right foot and lower hips until both knees bend to 90 degrees.",
      "Push off front foot to step directly into next lunge with left foot.",
      "Maintain upright torso throughout."
    ],
    defaultSets: 3,
    defaultRepRange: { min: 10, max: 15 },
    defaultReps: "10-12",
    alternatives: ["bulgarian_split_squat", "goblet_squat"]
  },
  {
    id: "leg_extensions",
    name: "Leg Extension",
    primaryMuscles: [V.MUSCLE_QUADRICEPS],
    secondaryMuscles: [],
    movementPattern: V.PATTERN_KNEE_FLEXION,
    type: V.EXERCISE_ISOLATION,
    equipment: [V.EQUIP_LEG_EXTENSIONS_MACHINE],
    difficulty: V.DIFFICULTY_BEGINNER,
    location: [V.LOCATION_GYM],
    suitableGoals: [V.GOAL_MUSCLE_GAIN, V.GOAL_GENERAL_FITNESS],
    instructions: [
      "Sit in machine with pad resting against lower shins.",
      "Extend legs until knees are straight, squeezing quadriceps firmly.",
      "Lower weight with control back to start."
    ],
    defaultSets: 3,
    defaultRepRange: { min: 12, max: 15 },
    defaultReps: "12-15",
    alternatives: ["goblet_squat", "bodyweight_squat"]
  },
  {
    id: "bodyweight_squat",
    name: "Bodyweight Squat",
    primaryMuscles: [V.MUSCLE_QUADRICEPS, V.MUSCLE_GLUTES],
    secondaryMuscles: [V.MUSCLE_CORE],
    movementPattern: V.PATTERN_SQUAT,
    type: V.EXERCISE_COMPOUND,
    equipment: [V.EQUIP_BODYWEIGHT],
    difficulty: V.DIFFICULTY_BEGINNER,
    location: [V.LOCATION_GYM, V.LOCATION_HOME],
    suitableGoals: [V.GOAL_GENERAL_FITNESS, V.GOAL_WEIGHT_LOSS, V.GOAL_ENDURANCE],
    instructions: [
      "Stand with feet shoulder-width apart, arms out for balance.",
      "Squat down until thighs reach parallel.",
      "Stand back up, driving hips forward at the top."
    ],
    defaultSets: 3,
    defaultRepRange: { min: 15, max: 20 },
    defaultReps: "15-20",
    alternatives: ["goblet_squat", "walking_lunges"]
  },

  // ===========================================================================
  // HAMSTRINGS
  // ===========================================================================
  {
    id: "romanian_deadlift",
    name: "Romanian Deadlift",
    primaryMuscles: [V.MUSCLE_HAMSTRINGS, V.MUSCLE_GLUTES],
    secondaryMuscles: [V.MUSCLE_UPPER_BACK, V.MUSCLE_CORE],
    movementPattern: V.PATTERN_HINGE,
    type: V.EXERCISE_COMPOUND,
    equipment: [V.EQUIP_BARBELL],
    difficulty: V.DIFFICULTY_INTERMEDIATE,
    location: [V.LOCATION_GYM],
    suitableGoals: [V.GOAL_MUSCLE_GAIN, V.GOAL_STRENGTH, V.GOAL_GENERAL_FITNESS],
    instructions: [
      "Stand holding barbell with overhand grip at thighs.",
      "Hinge at hips, pushing them back while bar slides down thighs and shins.",
      "Feel deep hamstring stretch below knees, then drive hips forward to stand."
    ],
    defaultSets: 3,
    defaultRepRange: { min: 8, max: 12 },
    defaultReps: "10-12",
    alternatives: ["dumbbell_romanian_deadlift", "lying_leg_curl"]
  },
  {
    id: "dumbbell_romanian_deadlift",
    name: "Dumbbell Romanian Deadlift",
    primaryMuscles: [V.MUSCLE_HAMSTRINGS, V.MUSCLE_GLUTES],
    secondaryMuscles: [V.MUSCLE_CORE],
    movementPattern: V.PATTERN_HINGE,
    type: V.EXERCISE_COMPOUND,
    equipment: [V.EQUIP_DUMBBELL],
    difficulty: V.DIFFICULTY_BEGINNER,
    location: [V.LOCATION_GYM, V.LOCATION_HOME],
    suitableGoals: [V.GOAL_MUSCLE_GAIN, V.GOAL_GENERAL_FITNESS, V.GOAL_WEIGHT_LOSS],
    instructions: [
      "Hold dumbbells in front of thighs with knees soft.",
      "Push hips back and glide dumbbells down shins.",
      "Squeeze glutes and hamstrings to return upright."
    ],
    defaultSets: 3,
    defaultRepRange: { min: 10, max: 12 },
    defaultReps: "10-12",
    alternatives: ["romanian_deadlift", "lying_leg_curl"]
  },
  {
    id: "lying_leg_curl",
    name: "Leg Curl",
    primaryMuscles: [V.MUSCLE_HAMSTRINGS],
    secondaryMuscles: [V.MUSCLE_CALVES],
    movementPattern: V.PATTERN_KNEE_FLEXION,
    type: V.EXERCISE_ISOLATION,
    equipment: [V.EQUIP_LEG_CURL_MACHINE],
    difficulty: V.DIFFICULTY_BEGINNER,
    location: [V.LOCATION_GYM],
    suitableGoals: [V.GOAL_MUSCLE_GAIN, V.GOAL_GENERAL_FITNESS],
    instructions: [
      "Lie face down on machine with roller pad against lower calves.",
      "Curl legs upward toward glutes as far as comfortable.",
      "Lower weight with control back to starting point."
    ],
    defaultSets: 3,
    defaultRepRange: { min: 10, max: 12 },
    defaultReps: "10-12",
    alternatives: ["romanian_deadlift", "dumbbell_romanian_deadlift"]
  },
  {
    id: "single_leg_romanian_deadlift",
    name: "Single-Leg Romanian Deadlift",
    primaryMuscles: [V.MUSCLE_HAMSTRINGS, V.MUSCLE_GLUTES],
    secondaryMuscles: [V.MUSCLE_CORE],
    movementPattern: V.PATTERN_HINGE,
    type: V.EXERCISE_COMPOUND,
    equipment: [V.EQUIP_DUMBBELL],
    difficulty: V.DIFFICULTY_INTERMEDIATE,
    location: [V.LOCATION_GYM, V.LOCATION_HOME],
    suitableGoals: [V.GOAL_GENERAL_FITNESS, V.GOAL_STRENGTH, V.GOAL_WEIGHT_LOSS],
    instructions: [
      "Stand on one foot holding a dumbbell in opposite hand.",
      "Hinge at hip, extending free leg back for balance while lowering weight toward floor.",
      "Squeeze glute of standing leg to pull torso back up."
    ],
    defaultSets: 3,
    defaultRepRange: { min: 8, max: 12 },
    defaultReps: "10-12",
    alternatives: ["dumbbell_romanian_deadlift", "romanian_deadlift"]
  },

  // ===========================================================================
  // GLUTES
  // ===========================================================================
  {
    id: "barbell_hip_thrust",
    name: "Hip Thrust",
    primaryMuscles: [V.MUSCLE_GLUTES],
    secondaryMuscles: [V.MUSCLE_HAMSTRINGS, V.MUSCLE_CORE],
    movementPattern: V.PATTERN_HINGE,
    type: V.EXERCISE_COMPOUND,
    equipment: [V.EQUIP_BARBELL, V.EQUIP_BENCH],
    difficulty: V.DIFFICULTY_INTERMEDIATE,
    location: [V.LOCATION_GYM],
    suitableGoals: [V.GOAL_MUSCLE_GAIN, V.GOAL_STRENGTH, V.GOAL_GENERAL_FITNESS],
    instructions: [
      "Sit with upper back against bench and loaded barbell across hips.",
      "Plant feet flat and drive hips upward toward ceiling.",
      "Lock out hips in full extension with posterior pelvic tilt, then lower."
    ],
    defaultSets: 3,
    defaultRepRange: { min: 8, max: 12 },
    defaultReps: "8-12",
    alternatives: ["dumbbell_hip_thrust", "bodyweight_glute_bridge", "romanian_deadlift"]
  },
  {
    id: "dumbbell_hip_thrust",
    name: "Dumbbell Hip Thrust",
    primaryMuscles: [V.MUSCLE_GLUTES],
    secondaryMuscles: [V.MUSCLE_HAMSTRINGS],
    movementPattern: V.PATTERN_HINGE,
    type: V.EXERCISE_COMPOUND,
    equipment: [V.EQUIP_DUMBBELL, V.EQUIP_BENCH],
    difficulty: V.DIFFICULTY_BEGINNER,
    location: [V.LOCATION_GYM, V.LOCATION_HOME],
    suitableGoals: [V.GOAL_MUSCLE_GAIN, V.GOAL_GENERAL_FITNESS, V.GOAL_WEIGHT_LOSS],
    instructions: [
      "Rest upper back on bench with heavy dumbbell resting on hips.",
      "Drive through heels to bridge hips upward into full extension.",
      "Squeeze glutes hard at the top and lower under control."
    ],
    defaultSets: 3,
    defaultRepRange: { min: 10, max: 15 },
    defaultReps: "10-12",
    alternatives: ["barbell_hip_thrust", "bodyweight_glute_bridge"]
  },
  {
    id: "bodyweight_glute_bridge",
    name: "Glute Bridge",
    primaryMuscles: [V.MUSCLE_GLUTES],
    secondaryMuscles: [V.MUSCLE_HAMSTRINGS, V.MUSCLE_CORE],
    movementPattern: V.PATTERN_HINGE,
    type: V.EXERCISE_ISOLATION,
    equipment: [V.EQUIP_BODYWEIGHT, V.EQUIP_MAT],
    difficulty: V.DIFFICULTY_BEGINNER,
    location: [V.LOCATION_GYM, V.LOCATION_HOME],
    suitableGoals: [V.GOAL_GENERAL_FITNESS, V.GOAL_WEIGHT_LOSS, V.GOAL_ENDURANCE],
    instructions: [
      "Lie on back with knees bent and feet flat on floor hip-width apart.",
      "Drive hips up until straight line forms from knees to shoulders.",
      "Squeeze glutes at peak for a two-count and lower."
    ],
    defaultSets: 3,
    defaultRepRange: { min: 15, max: 20 },
    defaultReps: "15-20",
    alternatives: ["dumbbell_hip_thrust", "barbell_hip_thrust"]
  },

  // ===========================================================================
  // CALVES
  // ===========================================================================
  {
    id: "standing_calf_raise",
    name: "Standing Calf Raise",
    primaryMuscles: [V.MUSCLE_CALVES],
    secondaryMuscles: [],
    movementPattern: V.PATTERN_CALF_RAISE,
    type: V.EXERCISE_ISOLATION,
    equipment: [V.EQUIP_CALF_RAISE_MACHINE, V.EQUIP_DUMBBELL],
    difficulty: V.DIFFICULTY_BEGINNER,
    location: [V.LOCATION_GYM, V.LOCATION_HOME],
    suitableGoals: [V.GOAL_MUSCLE_GAIN, V.GOAL_GENERAL_FITNESS, V.GOAL_STRENGTH],
    instructions: [
      "Stand on balls of feet on an elevated step or calf block.",
      "Lower heels into a deep stretch.",
      "Press through toes to raise heels as high as possible."
    ],
    defaultSets: 3,
    defaultRepRange: { min: 15, max: 20 },
    defaultReps: "15-20",
    alternatives: ["seated_calf_raise", "single_leg_bodyweight_calf_raise"]
  },
  {
    id: "seated_calf_raise",
    name: "Seated Calf Raise",
    primaryMuscles: [V.MUSCLE_CALVES],
    secondaryMuscles: [],
    movementPattern: V.PATTERN_CALF_RAISE,
    type: V.EXERCISE_ISOLATION,
    equipment: [V.EQUIP_CALF_RAISE_MACHINE],
    difficulty: V.DIFFICULTY_BEGINNER,
    location: [V.LOCATION_GYM],
    suitableGoals: [V.GOAL_MUSCLE_GAIN, V.GOAL_GENERAL_FITNESS],
    instructions: [
      "Sit in machine with pad resting snugly over lower thighs.",
      "Drop heels to bottom of range for a full soleus stretch.",
      "Explode upward onto balls of feet, squeezing calves at top."
    ],
    defaultSets: 3,
    defaultRepRange: { min: 15, max: 20 },
    defaultReps: "15-20",
    alternatives: ["standing_calf_raise", "single_leg_bodyweight_calf_raise"]
  },
  {
    id: "single_leg_bodyweight_calf_raise",
    name: "Single-Leg Calf Raise",
    primaryMuscles: [V.MUSCLE_CALVES],
    secondaryMuscles: [],
    movementPattern: V.PATTERN_CALF_RAISE,
    type: V.EXERCISE_ISOLATION,
    equipment: [V.EQUIP_BODYWEIGHT, V.EQUIP_STEP],
    difficulty: V.DIFFICULTY_BEGINNER,
    location: [V.LOCATION_GYM, V.LOCATION_HOME],
    suitableGoals: [V.GOAL_GENERAL_FITNESS, V.GOAL_WEIGHT_LOSS, V.GOAL_ENDURANCE],
    instructions: [
      "Stand on one foot on a step with light balance assistance against a wall.",
      "Lower heel below step level, then press up high onto big toe.",
      "Lower under control and switch legs."
    ],
    defaultSets: 3,
    defaultRepRange: { min: 15, max: 20 },
    defaultReps: "15-20",
    alternatives: ["standing_calf_raise", "seated_calf_raise"]
  },

  // ===========================================================================
  // CORE
  // ===========================================================================
  {
    id: "plank",
    name: "Plank",
    primaryMuscles: [V.MUSCLE_CORE, V.MUSCLE_ABS],
    secondaryMuscles: [V.MUSCLE_GLUTES, V.MUSCLE_FRONT_DELTS],
    movementPattern: V.PATTERN_BRACING,
    type: V.EXERCISE_ISOLATION,
    equipment: [V.EQUIP_BODYWEIGHT, V.EQUIP_MAT],
    difficulty: V.DIFFICULTY_BEGINNER,
    location: [V.LOCATION_GYM, V.LOCATION_HOME],
    suitableGoals: [V.GOAL_GENERAL_FITNESS, V.GOAL_STRENGTH, V.GOAL_WEIGHT_LOSS, V.GOAL_ENDURANCE],
    instructions: [
      "Rest on forearms and toes with elbows directly below shoulders.",
      "Engage glutes, pull navel to spine, and hold rigid line.",
      "Breathe steadily without sagging hips."
    ],
    defaultSets: 3,
    defaultRepRange: { min: 30, max: 60 },
    defaultReps: "45 sec",
    alternatives: ["side_plank", "dead_bug", "hanging_leg_raise"]
  },
  {
    id: "hanging_leg_raise",
    name: "Hanging Leg Raise",
    primaryMuscles: [V.MUSCLE_CORE, V.MUSCLE_ABS],
    secondaryMuscles: [V.MUSCLE_FOREARMS],
    movementPattern: V.PATTERN_BRACING,
    type: V.EXERCISE_COMPOUND,
    equipment: [V.EQUIP_PULL_UP_BAR, V.EQUIP_BODYWEIGHT],
    difficulty: V.DIFFICULTY_INTERMEDIATE,
    location: [V.LOCATION_GYM, V.LOCATION_HOME],
    suitableGoals: [V.GOAL_MUSCLE_GAIN, V.GOAL_STRENGTH, V.GOAL_GENERAL_FITNESS],
    instructions: [
      "Hang from pull-up bar with overhand grip and engaged shoulders.",
      "Raise straight legs or knees up to waist level without swinging.",
      "Lower slowly back down under core control."
    ],
    defaultSets: 3,
    defaultRepRange: { min: 10, max: 15 },
    defaultReps: "10-15",
    alternatives: ["plank", "russian_twist", "bicycle_crunch"]
  },
  {
    id: "side_plank",
    name: "Side Plank",
    primaryMuscles: [V.MUSCLE_CORE],
    secondaryMuscles: [V.MUSCLE_GLUTES],
    movementPattern: V.PATTERN_BRACING,
    type: V.EXERCISE_ISOLATION,
    equipment: [V.EQUIP_BODYWEIGHT, V.EQUIP_MAT],
    difficulty: V.DIFFICULTY_BEGINNER,
    location: [V.LOCATION_GYM, V.LOCATION_HOME],
    suitableGoals: [V.GOAL_GENERAL_FITNESS, V.GOAL_STRENGTH, V.GOAL_ENDURANCE],
    instructions: [
      "Lie on side supported on elbow and stacked feet.",
      "Lift hips until body creates a straight diagonal line.",
      "Hold firmly while maintaining deep breathing."
    ],
    defaultSets: 3,
    defaultRepRange: { min: 30, max: 45 },
    defaultReps: "30-45 sec",
    alternatives: ["plank", "russian_twist"]
  },
  {
    id: "russian_twist",
    name: "Russian Twist",
    primaryMuscles: [V.MUSCLE_CORE, V.MUSCLE_ABS],
    secondaryMuscles: [],
    movementPattern: V.PATTERN_ROTATION,
    type: V.EXERCISE_ISOLATION,
    equipment: [V.EQUIP_BODYWEIGHT, V.EQUIP_MAT],
    difficulty: V.DIFFICULTY_BEGINNER,
    location: [V.LOCATION_GYM, V.LOCATION_HOME],
    suitableGoals: [V.GOAL_GENERAL_FITNESS, V.GOAL_WEIGHT_LOSS, V.GOAL_ENDURANCE],
    instructions: [
      "Sit on floor with knees bent and feet elevated slightly.",
      "Lean torso back 45 degrees, clasp hands and rotate torso smoothly from side to side.",
      "Touch floor on each side with control."
    ],
    defaultSets: 3,
    defaultRepRange: { min: 15, max: 20 },
    defaultReps: "15-20",
    alternatives: ["plank", "hanging_leg_raise", "bicycle_crunch"]
  },
  {
    id: "bicycle_crunch",
    name: "Bicycle Crunches",
    primaryMuscles: [V.MUSCLE_CORE, V.MUSCLE_ABS],
    secondaryMuscles: [],
    movementPattern: V.PATTERN_ROTATION,
    type: V.EXERCISE_ISOLATION,
    equipment: [V.EQUIP_BODYWEIGHT, V.EQUIP_MAT],
    difficulty: V.DIFFICULTY_BEGINNER,
    location: [V.LOCATION_GYM, V.LOCATION_HOME],
    suitableGoals: [V.GOAL_GENERAL_FITNESS, V.GOAL_WEIGHT_LOSS, V.GOAL_ENDURANCE],
    instructions: [
      "Lie on back with hands lightly behind head and knees raised.",
      "Rotate torso bringing right elbow toward left knee while extending right leg.",
      "Alternate sides smoothly in a pedaling rhythm."
    ],
    defaultSets: 3,
    defaultRepRange: { min: 15, max: 20 },
    defaultReps: "15-20",
    alternatives: ["russian_twist", "plank", "dead_bug"]
  },
  {
    id: "dead_bug",
    name: "Dead Bug",
    primaryMuscles: [V.MUSCLE_CORE, V.MUSCLE_ABS],
    secondaryMuscles: [],
    movementPattern: V.PATTERN_BRACING,
    type: V.EXERCISE_ISOLATION,
    equipment: [V.EQUIP_BODYWEIGHT, V.EQUIP_MAT],
    difficulty: V.DIFFICULTY_BEGINNER,
    location: [V.LOCATION_GYM, V.LOCATION_HOME],
    suitableGoals: [V.GOAL_GENERAL_FITNESS, V.GOAL_RECOVERY],
    instructions: [
      "Lie face up with arms extended to ceiling and knees at 90 degrees.",
      "Press lower back firmly into floor.",
      "Slowly lower right arm and left leg toward floor, return, and switch."
    ],
    defaultSets: 3,
    defaultRepRange: { min: 10, max: 12 },
    defaultReps: "10-12",
    alternatives: ["plank", "bicycle_crunch"]
  },

  // ===========================================================================
  // RECOVERY & MOBILITY
  // ===========================================================================
  {
    id: "cat_cow_stretch",
    name: "Cat-Cow Stretch",
    primaryMuscles: [V.MUSCLE_CORE, V.MUSCLE_UPPER_BACK],
    secondaryMuscles: [],
    movementPattern: V.PATTERN_MOBILITY,
    type: V.EXERCISE_MOBILITY,
    equipment: [V.EQUIP_BODYWEIGHT, V.EQUIP_MAT],
    difficulty: V.DIFFICULTY_BEGINNER,
    location: [V.LOCATION_GYM, V.LOCATION_HOME],
    suitableGoals: [V.GOAL_GENERAL_FITNESS],
    instructions: [
      "Start on all fours with hands under shoulders and knees under hips.",
      "Inhale, arch back, dropping belly and looking up (Cow).",
      "Exhale, round spine upward toward ceiling and tuck chin (Cat)."
    ],
    defaultSets: 2,
    defaultRepRange: { min: 8, max: 12 },
    defaultReps: "10 reps",
    alternatives: ["childs_pose", "worlds_greatest_stretch"]
  },
  {
    id: "childs_pose",
    name: "Child's Pose",
    primaryMuscles: [V.MUSCLE_LATS, V.MUSCLE_GLUTES],
    secondaryMuscles: [V.MUSCLE_UPPER_BACK],
    movementPattern: V.PATTERN_MOBILITY,
    type: V.EXERCISE_MOBILITY,
    equipment: [V.EQUIP_BODYWEIGHT, V.EQUIP_MAT],
    difficulty: V.DIFFICULTY_BEGINNER,
    location: [V.LOCATION_GYM, V.LOCATION_HOME],
    suitableGoals: [V.GOAL_GENERAL_FITNESS],
    instructions: [
      "Kneel on floor with big toes touching and knees spread wide.",
      "Sit hips back toward heels and reach arms forward along floor.",
      "Rest forehead on mat and breathe deeply."
    ],
    defaultSets: 2,
    defaultRepRange: { min: 30, max: 60 },
    defaultReps: "45 sec",
    alternatives: ["cat_cow_stretch", "cobra_stretch"]
  },
  {
    id: "worlds_greatest_stretch",
    name: "World's Greatest Stretch",
    primaryMuscles: [V.MUSCLE_HAMSTRINGS, V.MUSCLE_GLUTES, V.MUSCLE_UPPER_BACK],
    secondaryMuscles: [V.MUSCLE_CORE],
    movementPattern: V.PATTERN_MOBILITY,
    type: V.EXERCISE_MOBILITY,
    equipment: [V.EQUIP_BODYWEIGHT],
    difficulty: V.DIFFICULTY_BEGINNER,
    location: [V.LOCATION_GYM, V.LOCATION_HOME],
    suitableGoals: [V.GOAL_GENERAL_FITNESS],
    instructions: [
      "Step into a deep forward lunge with hands inside front foot.",
      "Rotate torso opening chest and reaching inside arm toward ceiling.",
      "Hold briefly, return, and rock hips back for a hamstring stretch."
    ],
    defaultSets: 2,
    defaultRepRange: { min: 5, max: 8 },
    defaultReps: "6 per side",
    alternatives: ["cat_cow_stretch", "dynamic_hip_flexor_stretch"]
  },
  {
    id: "dynamic_hip_flexor_stretch",
    name: "Dynamic Hip Flexor Stretch",
    primaryMuscles: [V.MUSCLE_QUADRICEPS, V.MUSCLE_GLUTES],
    secondaryMuscles: [V.MUSCLE_CORE],
    movementPattern: V.PATTERN_MOBILITY,
    type: V.EXERCISE_MOBILITY,
    equipment: [V.EQUIP_BODYWEIGHT, V.EQUIP_MAT],
    difficulty: V.DIFFICULTY_BEGINNER,
    location: [V.LOCATION_GYM, V.LOCATION_HOME],
    suitableGoals: [V.GOAL_GENERAL_FITNESS],
    instructions: [
      "Kneel on one knee in half-kneeling position.",
      "Squeeze rear glute and shift hips forward gently until feeling hip flexor stretch.",
      "Rock gently in and out of the stretch."
    ],
    defaultSets: 2,
    defaultRepRange: { min: 8, max: 10 },
    defaultReps: "8 per side",
    alternatives: ["worlds_greatest_stretch", "childs_pose"]
  },
  {
    id: "cobra_stretch",
    name: "Cobra Stretch",
    primaryMuscles: [V.MUSCLE_ABS, V.MUSCLE_CORE],
    secondaryMuscles: [V.MUSCLE_UPPER_BACK],
    movementPattern: V.PATTERN_MOBILITY,
    type: V.EXERCISE_MOBILITY,
    equipment: [V.EQUIP_BODYWEIGHT, V.EQUIP_MAT],
    difficulty: V.DIFFICULTY_BEGINNER,
    location: [V.LOCATION_GYM, V.LOCATION_HOME],
    suitableGoals: [V.GOAL_GENERAL_FITNESS],
    instructions: [
      "Lie face down with hands under shoulders.",
      "Press gently through palms to lift chest off the mat while keeping hips down.",
      "Breathe smoothly, feeling a stretch across the abdomen."
    ],
    defaultSets: 2,
    defaultRepRange: { min: 20, max: 40 },
    defaultReps: "30 sec",
    alternatives: ["cat_cow_stretch", "childs_pose"]
  }
];

// Build fast lookup map by ID
const exerciseById = new Map();
ExerciseCatalog.forEach(ex => {
  exerciseById.set(ex.id, ex);
});

// Build fast lookup map by Name (normalized lowercase)
const exerciseByName = new Map();
ExerciseCatalog.forEach(ex => {
  exerciseByName.set(ex.name.toLowerCase().trim(), ex);
});

/**
 * Look up exercise definition by stable ID.
 */
export function getExerciseById(id) {
  if (!id) return null;
  return exerciseById.get(id) || null;
}

/**
 * Look up exercise definition by name (case-insensitive fuzzy match).
 */
export function findExerciseByName(name) {
  if (!name) return null;
  const key = String(name).toLowerCase().trim();
  if (exerciseByName.has(key)) return exerciseByName.get(key);

  // Partial match fallback
  for (const ex of ExerciseCatalog) {
    if (ex.name.toLowerCase().includes(key) || key.includes(ex.name.toLowerCase())) {
      return ex;
    }
  }
  return null;
}

/**
 * Validate catalog integrity:
 * - All exercises pass schema validation
 * - All exercise IDs are unique
 * - All alternatives reference valid existing exercises
 * - Every required muscle group is covered
 */
export function validateCatalogIntegrity() {
  const seenIds = new Set();
  const errors = [];

  ExerciseCatalog.forEach((ex, idx) => {
    try {
      V.validateExerciseDefinition(ex);
    } catch (err) {
      errors.push(`Exercise index ${idx} ("${ex?.id}") validation failed: ${err.message}`);
    }

    if (seenIds.has(ex.id)) {
      errors.push(`Duplicate exercise ID: "${ex.id}"`);
    }
    seenIds.add(ex.id);
  });

  // Verify alternatives
  ExerciseCatalog.forEach((ex) => {
    ex.alternatives.forEach(altId => {
      if (!seenIds.has(altId)) {
        errors.push(`Exercise "${ex.id}" has invalid alternative ID: "${altId}"`);
      }
    });
  });

  // Verify muscle coverage
  const coveredMuscles = new Set();
  ExerciseCatalog.forEach(ex => {
    ex.primaryMuscles.forEach(m => coveredMuscles.add(m));
  });

  const requiredMuscles = [
    V.MUSCLE_CHEST,
    V.MUSCLE_LATS,
    V.MUSCLE_FRONT_DELTS,
    V.MUSCLE_LATERAL_DELTS,
    V.MUSCLE_BICEPS,
    V.MUSCLE_TRICEPS,
    V.MUSCLE_FOREARMS,
    V.MUSCLE_QUADRICEPS,
    V.MUSCLE_HAMSTRINGS,
    V.MUSCLE_GLUTES,
    V.MUSCLE_CALVES,
    V.MUSCLE_CORE,
  ];

  requiredMuscles.forEach(m => {
    if (!coveredMuscles.has(m)) {
      errors.push(`Missing primary coverage for required muscle group: "${m}"`);
    }
  });

  return {
    valid: errors.length === 0,
    exerciseCount: ExerciseCatalog.length,
    errors
  };
}

/**
 * Filter catalog by various criteria.
 */
export function filterExercises(criteria = {}) {
  const {
    location,
    equipment,
    muscleGroups,
    pattern,
    type,
    difficulty,
    goal,
  } = criteria;

  return ExerciseCatalog.filter(ex => {
    if (location && !ex.location.includes(location)) {
      return false;
    }
    if (equipment && Array.isArray(equipment) && equipment.length > 0) {
      const hasAllEquip = ex.equipment.every(eq => equipment.includes(eq));
      if (!hasAllEquip) return false;
    }
    if (muscleGroups && Array.isArray(muscleGroups) && muscleGroups.length > 0) {
      const touchesMuscle = ex.primaryMuscles.some(m => muscleGroups.includes(m));
      if (!touchesMuscle) return false;
    }
    if (pattern && ex.movementPattern !== pattern) {
      return false;
    }
    if (type && ex.type !== type) {
      return false;
    }
    if (difficulty && ex.difficulty !== difficulty) {
      return false;
    }
    if (goal && Array.isArray(ex.suitableGoals) && !ex.suitableGoals.includes(goal)) {
      return false;
    }
    return true;
  });
}

export default ExerciseCatalog;
