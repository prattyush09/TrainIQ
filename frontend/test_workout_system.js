/* global process */
import ExerciseCatalog, {
  getExerciseById,
  findExerciseByName,
  validateCatalogIntegrity,
  filterExercises,
} from "./src/data/ExerciseCatalog.js";
import * as V from "./src/utils/exerciseVocabulary.js";
import workoutProgram, { getWorkoutById } from "./src/data/Workouts.js";
import {
  generateWorkout,
  isExerciseForbiddenForType,
  resolveUserEquipment,
  getExerciseCountForDuration,
  getPrescribedSetsAndReps,
} from "./src/services/workoutGenerator.js";
import fs from "fs";
import path from "path";

let passedCount = 0;
let failedCount = 0;

function assert(condition, message) {
  if (!condition) {
    console.error(`❌ FAILED: ${message}`);
    failedCount++;
    throw new Error(message);
  } else {
    console.log(`✅ PASSED: ${message}`);
    passedCount++;
  }
}

console.log("==================================================");
console.log("RUNNING COMPREHENSIVE WORKOUT SYSTEM & LIBRARY TESTS");
console.log("==================================================\n");

// ----------------------------------------------------
// TEST SUITE 1: Catalog Integrity & Coverage
// ----------------------------------------------------
console.log("--- TEST SUITE 1: Catalog Integrity & Coverage ---");
{
  const integrity = validateCatalogIntegrity();
  assert(integrity.valid === true, `Test 1.1: Catalog integrity passed with 0 errors (errors: ${integrity.errors.join(", ")})`);
  assert(integrity.exerciseCount >= 70, `Test 1.2: Catalog contains ${integrity.exerciseCount} exercises (>= 70)`);

  // Verify all required muscle groups have primary coverage
  const requiredGroups = [
    V.MUSCLE_CHEST,
    V.MUSCLE_LATS,
    V.MUSCLE_UPPER_BACK,
    V.MUSCLE_FRONT_DELTS,
    V.MUSCLE_LATERAL_DELTS,
    V.MUSCLE_REAR_DELTS,
    V.MUSCLE_BICEPS,
    V.MUSCLE_TRICEPS,
    V.MUSCLE_FOREARMS,
    V.MUSCLE_QUADRICEPS,
    V.MUSCLE_HAMSTRINGS,
    V.MUSCLE_GLUTES,
    V.MUSCLE_CALVES,
    V.MUSCLE_CORE,
  ];

  requiredGroups.forEach((m) => {
    const matching = ExerciseCatalog.filter((ex) => ex.primaryMuscles.includes(m));
    assert(matching.length > 0, `Test 1.3: Primary coverage for muscle group "${m}" (found ${matching.length})`);
  });

  // Verify unique stable IDs
  const idSet = new Set();
  ExerciseCatalog.forEach((ex) => {
    assert(!idSet.has(ex.id), `Test 1.4: ID "${ex.id}" is unique`);
    idSet.add(ex.id);
  });

  // Verify all alternative references resolve
  ExerciseCatalog.forEach((ex) => {
    ex.alternatives.forEach((altId) => {
      const alt = getExerciseById(altId);
      assert(alt !== null, `Test 1.5: Exercise "${ex.id}" alternative "${altId}" exists in catalog`);
    });
  });

  // Verify fast lookup helpers
  const foundByName = findExerciseByName("bench press");
  assert(foundByName !== null && foundByName.id === "barbell_bench_press", "Test 1.6: findExerciseByName resolves correctly");

  const compounds = filterExercises({ type: V.EXERCISE_COMPOUND });
  assert(compounds.length > 0 && compounds.every((c) => c.type === V.EXERCISE_COMPOUND), "Test 1.7: filterExercises filters by type");

  assert(Array.isArray(workoutProgram) && workoutProgram.length >= 6, "Test 1.8: workoutProgram exported array valid");

  const resolvedEquip = resolveUserEquipment({ trainingPreference: "Home" });
  assert(Array.isArray(resolvedEquip) && resolvedEquip.includes(V.EQUIP_BODYWEIGHT), "Test 1.9: resolveUserEquipment resolves home equipment");

  const count30 = getExerciseCountForDuration(30);
  assert(count30 === 4, "Test 1.10: getExerciseCountForDuration(30) returns 4");

  const samplePrescription = getPrescribedSetsAndReps(ExerciseCatalog[0], { goal: "Strength" });
  assert(typeof samplePrescription.sets === "number" && typeof samplePrescription.reps === "string", "Test 1.11: getPrescribedSetsAndReps returns valid prescription");
}

// ----------------------------------------------------
// TEST SUITE 2: Mandatory Exercise Selection Rules
// ----------------------------------------------------
console.log("\n--- TEST SUITE 2: Mandatory Exercise-Selection Rules ---");
{
  // Rule 2.1: Legs never selects pull-ups or chest presses
  for (let i = 0; i < 10; i++) {
    const legsWorkout = generateWorkout({ workoutType: V.WORKOUT_TYPE_LEGS, id: 3 });
    legsWorkout.exercises.forEach((ex) => {
      const id = ex.id.toLowerCase();
      assert(
        !id.includes("pull_up") &&
        !id.includes("chin_up") &&
        !id.includes("bench_press") &&
        !id.includes("chest_press") &&
        !id.includes("push_up"),
        `Test 2.1: Legs workout does not contain upper pull/push: ${ex.name}`
      );
      assert(!isExerciseForbiddenForType(ex, V.WORKOUT_TYPE_LEGS), `Test 2.1b: ${ex.name} is legal for Legs`);
    });
  }

  // Rule 2.2: Push excludes primary pulling exercises
  for (let i = 0; i < 10; i++) {
    const pushWorkout = generateWorkout({ workoutType: V.WORKOUT_TYPE_PUSH, id: 1 });
    pushWorkout.exercises.forEach((ex) => {
      assert(
        ex.movementPattern !== V.PATTERN_VERTICAL_PULL &&
        ex.movementPattern !== V.PATTERN_HORIZONTAL_PULL,
        `Test 2.2: Push workout does not contain pulling patterns: ${ex.name}`
      );
      assert(!isExerciseForbiddenForType(ex, V.WORKOUT_TYPE_PUSH), `Test 2.2b: ${ex.name} is legal for Push`);
    });
  }

  // Rule 2.3: Pull excludes primary chest presses
  for (let i = 0; i < 10; i++) {
    const pullWorkout = generateWorkout({ workoutType: V.WORKOUT_TYPE_PULL, id: 2 });
    pullWorkout.exercises.forEach((ex) => {
      assert(
        !ex.id.includes("bench_press") &&
        !ex.id.includes("chest_press") &&
        !ex.id.includes("push_up"),
        `Test 2.3: Pull workout does not contain chest presses: ${ex.name}`
      );
      assert(!isExerciseForbiddenForType(ex, V.WORKOUT_TYPE_PULL), `Test 2.3b: ${ex.name} is legal for Pull`);
    });
  }

  // Rule 2.4: Upper avoids unrelated lower-body exercises
  const upperWorkout = generateWorkout({ workoutType: V.WORKOUT_TYPE_UPPER });
  upperWorkout.exercises.forEach((ex) => {
    assert(
      !ex.primaryMuscles.includes(V.MUSCLE_QUADRICEPS) &&
      !ex.primaryMuscles.includes(V.MUSCLE_HAMSTRINGS) &&
      !ex.primaryMuscles.includes(V.MUSCLE_CALVES),
      `Test 2.4: Upper workout avoids lower-body exercises: ${ex.name}`
    );
  });

  // Rule 2.5: Lower avoids unrelated upper-body exercises
  const lowerWorkout = generateWorkout({ workoutType: V.WORKOUT_TYPE_LOWER });
  lowerWorkout.exercises.forEach((ex) => {
    assert(
      !ex.primaryMuscles.includes(V.MUSCLE_CHEST) &&
      !ex.primaryMuscles.includes(V.MUSCLE_LATS) &&
      !ex.primaryMuscles.includes(V.MUSCLE_FRONT_DELTS),
      `Test 2.5: Lower workout avoids upper-body exercises: ${ex.name}`
    );
  });

  // Rule 2.6: Core prioritizes core exercises
  const coreWorkout = generateWorkout({ workoutType: V.WORKOUT_TYPE_CORE });
  coreWorkout.exercises.forEach((ex) => {
    const isCore = ex.primaryMuscles.includes(V.MUSCLE_CORE) || ex.primaryMuscles.includes(V.MUSCLE_ABS);
    assert(isCore, `Test 2.6: Core workout only selects core movements: ${ex.name}`);
  });

  // Rule 2.7: Full Body ensures balanced coverage
  const fullBody = generateWorkout({ workoutType: V.WORKOUT_TYPE_FULL_BODY });
  const hasLower = fullBody.exercises.some((ex) =>
    ex.primaryMuscles.includes(V.MUSCLE_QUADRICEPS) || ex.primaryMuscles.includes(V.MUSCLE_HAMSTRINGS)
  );
  const hasPush = fullBody.exercises.some((ex) => ex.primaryMuscles.includes(V.MUSCLE_CHEST));
  const hasPull = fullBody.exercises.some((ex) => ex.primaryMuscles.includes(V.MUSCLE_LATS) || ex.primaryMuscles.includes(V.MUSCLE_UPPER_BACK));
  assert(hasLower, "Test 2.7a: Full body includes lower body");
  assert(hasPush, "Test 2.7b: Full body includes chest push");
  assert(hasPull, "Test 2.7c: Full body includes back pull");

  // Rule 2.8: Recovery avoids high-intensity workouts
  const recovery = generateWorkout({ workoutType: V.WORKOUT_TYPE_RECOVERY });
  recovery.exercises.forEach((ex) => {
    const fullEx = getExerciseById(ex.id);
    assert(
      fullEx.type === V.EXERCISE_MOBILITY || fullEx.type === V.EXERCISE_RECOVERY || fullEx.movementPattern === V.PATTERN_BRACING,
      `Test 2.8: Recovery workout has no high-intensity lifts: ${ex.name}`
    );
  });
}

// ----------------------------------------------------
// TEST SUITE 3: Equipment Filtering & Home / Gym Compatibility
// ----------------------------------------------------
console.log("\n--- TEST SUITE 3: Equipment Filtering & Home/Gym Compatibility ---");
{
  const homeProfile = {
    trainingPreference: "Home",
    equipment: [V.EQUIP_BODYWEIGHT, V.EQUIP_DUMBBELL, V.EQUIP_MAT, V.EQUIP_BENCH],
  };

  const homePush = generateWorkout({
    workoutType: V.WORKOUT_TYPE_PUSH,
    userProfile: homeProfile,
  });

  homePush.exercises.forEach((ex) => {
    ex.equipment.forEach((eq) => {
      assert(
        homeProfile.equipment.includes(eq),
        `Test 3.1: Home workout uses only available equipment: ${ex.name} requires ${eq}`
      );
    });
    assert(
      !ex.equipment.includes(V.EQUIP_BARBELL) && !ex.equipment.includes(V.EQUIP_CABLE_MACHINE),
      `Test 3.2: No barbell or cable machine in home workout: ${ex.name}`
    );
  });

  // Pure bodyweight home setup
  const bodyweightOnlyProfile = {
    trainingPreference: "Home",
    equipment: [V.EQUIP_BODYWEIGHT, V.EQUIP_MAT],
  };

  const bodyweightLegs = generateWorkout({
    workoutType: V.WORKOUT_TYPE_LEGS,
    userProfile: bodyweightOnlyProfile,
  });

  bodyweightLegs.exercises.forEach((ex) => {
    assert(
      ex.equipment.every((eq) => eq === V.EQUIP_BODYWEIGHT || eq === V.EQUIP_MAT || eq === V.EQUIP_STEP),
      `Test 3.3: Pure bodyweight legs workout only uses bodyweight/mat: ${ex.name}`
    );
  });
}

// ----------------------------------------------------
// TEST SUITE 4: Experience Level & Goal Adaptation
// ----------------------------------------------------
console.log("\n--- TEST SUITE 4: Experience Level & Goal Adaptation ---");
{
  const beginnerStrength = generateWorkout({
    workoutType: V.WORKOUT_TYPE_PUSH,
    userProfile: { experience: "Beginner", goal: "Strength" },
  });
  beginnerStrength.exercises.forEach((ex) => {
    assert(ex.sets <= 3, `Test 4.1: Beginner sets capped at <= 3: ${ex.name} has ${ex.sets} sets`);
  });

  const advancedGain = generateWorkout({
    workoutType: V.WORKOUT_TYPE_PUSH,
    userProfile: { experience: "Advanced", goal: "Muscle Gain" },
  });
  const compoundEx = advancedGain.exercises.find((ex) => ex.id === "barbell_bench_press");
  if (compoundEx) {
    assert(compoundEx.sets >= 3, `Test 4.2: Advanced compound has appropriate sets: ${compoundEx.sets}`);
  }
}

// ----------------------------------------------------
// TEST SUITE 5: Workout Duration Scaling
// ----------------------------------------------------
console.log("\n--- TEST SUITE 5: Workout Duration Scaling ---");
{
  const shortSession = generateWorkout({
    workoutType: V.WORKOUT_TYPE_PUSH,
    userProfile: { duration: 30 },
  });
  assert(shortSession.exercises.length === 4, `Test 5.1: 30-min workout yields 4 exercises (got ${shortSession.exercises.length})`);

  const mediumSession = generateWorkout({
    workoutType: V.WORKOUT_TYPE_PUSH,
    userProfile: { duration: 45 },
  });
  assert(mediumSession.exercises.length === 5, `Test 5.2: 45-min workout yields 5 exercises (got ${mediumSession.exercises.length})`);

  const longSession = generateWorkout({
    workoutType: V.WORKOUT_TYPE_PUSH,
    userProfile: { duration: 60 },
  });
  assert(longSession.exercises.length === 6, `Test 5.3: 60-min workout yields 6 exercises (got ${longSession.exercises.length})`);
}

// ----------------------------------------------------
// TEST SUITE 6: Recent Exercise Repetition Avoidance
// ----------------------------------------------------
console.log("\n--- TEST SUITE 6: Recent Exercise Repetition Avoidance ---");
{
  // User just completed bench press and lateral raise yesterday
  const recentWorkouts = [
    {
      exercises: [{ id: "barbell_bench_press" }, { id: "dumbbell_lateral_raise" }],
    },
  ];

  const freshPush = generateWorkout({
    workoutType: V.WORKOUT_TYPE_PUSH,
    recentWorkouts,
  });

  const firstExId = freshPush.exercises[0].id;
  // Alternatives for bench press include dumbbell_bench_press or machine_chest_press
  assert(
    firstExId !== "barbell_bench_press",
    `Test 6.1: Substituted barbell bench press due to recent completion (got ${freshPush.exercises[0].name})`
  );
}

// ----------------------------------------------------
// TEST SUITE 7: Legacy Workout History & Progression Compatibility
// ----------------------------------------------------
console.log("\n--- TEST SUITE 7: Legacy History & Progression Compatibility ---");
{
  // Must preserve workout IDs 1 to 6
  for (let id = 1; id <= 6; id++) {
    const workout = getWorkoutById(id);
    assert(workout !== null, `Test 7.1: Workout ID ${id} exists`);
    assert(typeof workout.name === "string" && workout.name.length > 0, `Test 7.2: Workout ID ${id} has valid name: ${workout.name}`);
    assert(Array.isArray(workout.exercises) && workout.exercises.length >= 6, `Test 7.3: Workout ID ${id} has >= 6 exercises`);

    // Verify all exercises have required fields for existing components
    workout.exercises.forEach((ex, idx) => {
      assert(typeof ex.name === "string", `Test 7.4: Workout ${id} ex ${idx} has name`);
      assert(typeof ex.sets === "number" && ex.sets > 0, `Test 7.5: Workout ${id} ex ${idx} has numeric sets`);
      assert(typeof ex.reps === "string" && ex.reps.length > 0, `Test 7.6: Workout ${id} ex ${idx} has reps string`);
      assert(Array.isArray(ex.primaryMuscles), `Test 7.7: Workout ${id} ex ${idx} has primaryMuscles`);
      assert(Array.isArray(ex.equipment), `Test 7.8: Workout ${id} ex ${idx} has equipment`);
    });
  }

  // Verify simulated Firestore completedSets calculation works cleanly
  const workout3 = getWorkoutById(3);
  const fakeProgress = {
    workoutId: 3,
    completedSets: [3, 3, 3, 3, 3, 3],
  };
  const isCompleted = workout3.exercises.every((ex, i) => (fakeProgress.completedSets[i] || 0) >= ex.sets);
  assert(isCompleted === true, "Test 7.9: Firestore completedSets calculation evaluates correctly");
}

// ----------------------------------------------------
// TEST SUITE 8: Rest Timer Complete Removal Verification
// ----------------------------------------------------
console.log("\n--- TEST SUITE 8: Rest Timer Complete Removal Verification ---");
{
  const baseDir = fs.existsSync("./src") ? "." : "./frontend";
  const sessionPath = path.resolve(baseDir, "src/pages/WorkoutSession.jsx");
  const sessionCode = fs.readFileSync(sessionPath, "utf-8");

  assert(!sessionCode.includes("isResting"), "Test 8.1: WorkoutSession has no 'isResting' state");
  assert(!sessionCode.includes("restTimeRemaining"), "Test 8.2: WorkoutSession has no 'restTimeRemaining' state");
  assert(!sessionCode.includes("rest-timer-block"), "Test 8.3: WorkoutSession JSX has no 'rest-timer-block'");
  assert(!sessionCode.includes("formatRestTime"), "Test 8.4: WorkoutSession has no 'formatRestTime' helper");
  assert(!sessionCode.includes("REST_COOLDOWN_MS"), "Test 8.5: WorkoutSession has no 'REST_COOLDOWN_MS'");

  const detailsPath = path.resolve(baseDir, "src/pages/WorkoutDetails.jsx");
  const detailsCode = fs.readFileSync(detailsPath, "utf-8");
  assert(!detailsCode.includes("exercise-rest-hint"), "Test 8.6: WorkoutDetails has no 'exercise-rest-hint'");

  const sessionCssPath = path.resolve(baseDir, "src/styles/WorkoutSession.css");
  const sessionCss = fs.readFileSync(sessionCssPath, "utf-8");
  assert(!sessionCss.includes(".rest-timer-block"), "Test 8.7: WorkoutSession.css has no '.rest-timer-block'");
  assert(!sessionCss.includes(".rest-progress-bar"), "Test 8.8: WorkoutSession.css has no '.rest-progress-bar'");
}

console.log("\n==================================================");
console.log(`ALL WORKOUT SYSTEM TESTS PASSED: ${passedCount} PASSED, ${failedCount} FAILED`);
console.log("==================================================");

if (failedCount > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
