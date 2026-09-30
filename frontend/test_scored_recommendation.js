/* global process */
import workoutProgram from "./src/data/Workouts.js";
import {
  recommendationEngine,
  scoreWorkoutCandidate,
  parseDate
} from "./src/services/recommendationEngine.js";

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
console.log("RUNNING DETERMINISTIC RECOMMENDATION ENGINE TESTS");
console.log("==================================================\n");

// ----------------------------------------------------
// TEST 1: New user (0 history)
// Expected: Safe default workout (Push A, id: 1)
// ----------------------------------------------------
console.log("--- TEST 1: New User (No History) ---");
{
  const rec = recommendationEngine.getRecommendedWorkout({
    workouts: workoutProgram,
    workoutHistory: [],
    progressMap: {}
  });

  assert(rec !== null, "Test 1.1: Recommendation is not null");
  assert(rec.workoutId === 1, `Test 1.2: Defaults to Push A (id: 1), got ${rec.workoutId}`);
  assert(rec.status === "ready", `Test 1.3: Status is 'ready', got '${rec.status}'`);
  assert(rec.isCompletedToday === false, "Test 1.4: isCompletedToday is false");
  assert(typeof rec.reason === "string" && rec.reason.length > 0, "Test 1.5: Valid reason is returned");
}

// ----------------------------------------------------
// TEST 2: Recovery preference
// Context: Monday Push A, Wednesday Legs A, Friday Today
// Expected: Pull A is selected (Back/biceps hasn't been trained recently)
// ----------------------------------------------------
console.log("\n--- TEST 2: Recovery Preference (Neglected Split Overdue) ---");
{
  const history = [
    { workoutId: 3, completed: true, completedAt: "2026-09-28T10:00:00.000Z" }, // Wednesday Legs A (2 days ago)
    { workoutId: 1, completed: true, completedAt: "2026-09-26T10:00:00.000Z" }, // Monday Push A (4 days ago)
  ];
  const today = "2026-09-30"; // Friday

  const rec = recommendationEngine.getRecommendedWorkout({
    workouts: workoutProgram,
    workoutHistory: history,
    progressMap: {},
    today
  });

  assert(rec !== null, "Test 2.1: Recommendation returned");
  assert(rec.workoutId === 2, `Test 2.2: Selected Pull A (id: 2) as overdue muscle group, got ${rec.workout.name} (${rec.workoutId})`);
  assert(rec.reason.toLowerCase().includes("back and biceps"), `Test 2.3: Explainable reason mentions back and biceps: "${rec.reason}"`);
  assert(rec.status === "ready", "Test 2.4: Status is ready");
}

// ----------------------------------------------------
// TEST 3: Recent repetition penalty
// Context: User completed Push A yesterday.
// Expected: Push A is penalized; Pull A or next progression is selected.
// ----------------------------------------------------
console.log("\n--- TEST 3: Recent Repetition Penalty ---");
{
  const history = [
    { workoutId: 1, completed: true, completedAt: "2026-09-29T18:00:00.000Z" }, // Push A yesterday
  ];
  const today = "2026-09-30";

  const rec = recommendationEngine.getRecommendedWorkout({
    workouts: workoutProgram,
    workoutHistory: history,
    progressMap: {},
    today
  });

  assert(rec !== null, "Test 3.1: Recommendation returned");
  assert(rec.workoutId !== 1, `Test 3.2: Push A was not repeated immediately (selected ${rec.workout.name})`);
  assert(rec.workoutId === 2, `Test 3.3: Pull A (id: 2) chosen after Push A, got ${rec.workoutId}`);
}

// ----------------------------------------------------
// TEST 4: Progress data
// Context: ProgressMap has sets completed for workout 4 (Push B).
// Expected: Evaluates candidate with progress bonus without crashing.
// ----------------------------------------------------
console.log("\n--- TEST 4: Progress Data Integration ---");
{
  const history = [
    { workoutId: 3, completed: true, completedAt: "2026-09-27T10:00:00.000Z" }, // 3 days ago Legs
    { workoutId: 2, completed: true, completedAt: "2026-09-25T10:00:00.000Z" }, // 5 days ago Pull
  ];
  const today = "2026-09-30";
  const progressMap = {
    4: { completedSets: [3, 3, 2, 0, 0, 0, 0], completed: false } // Push B has recorded progression
  };

  const rec = recommendationEngine.getRecommendedWorkout({
    workouts: workoutProgram,
    workoutHistory: history,
    progressMap,
    today
  });

  assert(rec !== null, "Test 4.1: Recommendation returned");
  assert(rec.scoringBreakdown !== undefined, "Test 4.2: Scoring breakdown present");
  // Check candidate score directly
  const scorePushB = scoreWorkoutCandidate(workoutProgram.find(w => w.id === 4), {
    workoutHistory: history,
    progressMap,
    today
  });
  assert(scorePushB.breakdown.consistency >= 10, `Test 4.3: ProgressMap adds consistency bonus (got ${scorePushB.breakdown.consistency})`);
}

// ----------------------------------------------------
// TEST 5: Active workout priority
// Context: In-progress session with sets completed > 0 and not marked completed.
// Expected: Returns in-progress workout with status 'in-progress'.
// ----------------------------------------------------
console.log("\n--- TEST 5: Active Workout Highest Priority ---");
{
  const progressMap = {
    3: { completedSets: [3, 3, 0, 0, 0, 0], completed: false } // Legs A in progress
  };
  const history = [
    { workoutId: 1, completed: true, completedAt: "2026-09-29T10:00:00.000Z" }
  ];

  const rec = recommendationEngine.getRecommendedWorkout({
    workouts: workoutProgram,
    workoutHistory: history,
    progressMap
  });

  assert(rec.workoutId === 3, `Test 5.1: Returned active workout 3 (Legs A), got ${rec.workoutId}`);
  assert(rec.status === "in-progress", `Test 5.2: Status is 'in-progress', got '${rec.status}'`);
  assert(rec.progressPercent > 0, `Test 5.3: Progress percent calculated (${rec.progressPercent}%)`);
  assert(rec.reason.toLowerCase().includes("session in progress"), `Test 5.4: Reason indicates active session: "${rec.reason}"`);
}

// ----------------------------------------------------
// TEST 6: Completed today behavior
// Context: User finished Push A today.
// Expected: Returns next candidate with isCompletedToday: true, status: 'completed-today'.
// ----------------------------------------------------
console.log("\n--- TEST 6: Completed Today Handling ---");
{
  const today = "2026-09-30";
  const history = [
    { workoutId: 1, completed: true, completedAt: "2026-09-30T08:30:00.000Z" } // Completed today morning
  ];

  const rec = recommendationEngine.getRecommendedWorkout({
    workouts: workoutProgram,
    workoutHistory: history,
    progressMap: {},
    today
  });

  assert(rec.isCompletedToday === true, "Test 6.1: isCompletedToday is true");
  assert(rec.status === "completed-today", `Test 6.2: Status is 'completed-today', got '${rec.status}'`);
  assert(rec.workoutId !== 1, `Test 6.3: Does not recommend the same workout completed today (recommended id: ${rec.workoutId})`);
  assert(rec.reason.includes("already completed today's workout"), `Test 6.4: Reason explains completed today: "${rec.reason}"`);
}

// ----------------------------------------------------
// TEST 7: Dashboard and Workouts consistency
// Context: Same context evaluated via getRecommendedWorkout and generateTodayRecommendation.
// Expected: Resolves to the exact same workout.
// ----------------------------------------------------
console.log("\n--- TEST 7: Dashboard and Workouts Consistency ---");
{
  const history = [
    { workoutId: 1, completed: true, completedAt: "2026-09-28T10:00:00.000Z" }
  ];
  const context = {
    profile: { goal: "muscle_gain", experience: "intermediate" },
    workoutHistory: history,
    progressMap: {},
    consistency: { streak: 2 }
  };

  const dashboardRec = recommendationEngine.generateTodayRecommendation(context);
  const workoutsRec = recommendationEngine.getRecommendedWorkout({
    workouts: workoutProgram,
    workoutHistory: history,
    progressMap: {},
    userProfile: context.profile
  });

  assert(dashboardRec !== null, "Test 7.1: Dashboard recommendation returned");
  assert(workoutsRec !== null, "Test 7.2: Workouts recommendation returned");
  assert(dashboardRec.workoutId === workoutsRec.workoutId,
    `Test 7.3: Dashboard and Workouts match! (Dashboard: ${dashboardRec.workoutId}, Workouts: ${workoutsRec.workoutId})`
  );
  assert(dashboardRec.workout.name === workoutsRec.workout.name,
    `Test 7.4: Names match: ${dashboardRec.workout.name}`
  );
}

// ----------------------------------------------------
// TEST 8: Determinism
// Context: Run candidate scoring and recommendation 10 times with identical input.
// Expected: 100% identical workout, score, and reason every time.
// ----------------------------------------------------
console.log("\n--- TEST 8: Determinism (10 Consecutive Invocations) ---");
{
  const history = [
    { workoutId: 3, completed: true, completedAt: "2026-09-28T10:00:00.000Z" },
    { workoutId: 2, completed: true, completedAt: "2026-09-26T10:00:00.000Z" },
  ];
  const firstRec = recommendationEngine.getRecommendedWorkout({
    workouts: workoutProgram,
    workoutHistory: history,
    progressMap: {},
    today: "2026-09-30"
  });

  for (let i = 1; i <= 10; i++) {
    const nextRec = recommendationEngine.getRecommendedWorkout({
      workouts: workoutProgram,
      workoutHistory: history,
      progressMap: {},
      today: "2026-09-30"
    });

    assert(nextRec.workoutId === firstRec.workoutId, `Test 8.Run${i}: workoutId matches (${nextRec.workoutId})`);
    assert(nextRec.score === firstRec.score, `Test 8.Run${i}: score matches (${nextRec.score})`);
    assert(nextRec.reason === firstRec.reason, `Test 8.Run${i}: reason matches`);
  }
}

// ----------------------------------------------------
// TEST 9: Missing / Null / Corrupted data resilience
// Context: Pass null, undefined, malformed objects.
// Expected: No crashes, returns safe deterministic fallback.
// ----------------------------------------------------
console.log("\n--- TEST 9: Missing / Corrupted Data Resilience ---");
{
  const recNull = recommendationEngine.getRecommendedWorkout(null);
  assert(recNull !== null && recNull.workoutId === 1, "Test 9.1: null params handled safely");

  const recUndefined = recommendationEngine.getRecommendedWorkout(undefined);
  assert(recUndefined !== null && recUndefined.workoutId === 1, "Test 9.2: undefined params handled safely");

  const recCorruptHistory = recommendationEngine.getRecommendedWorkout({
    workouts: workoutProgram,
    workoutHistory: [null, undefined, { completed: true }, "invalid", { id: "none" }],
    progressMap: null,
    userProfile: "invalid_profile"
  });
  assert(recCorruptHistory !== null && recCorruptHistory.workoutId !== undefined,
    `Test 9.3: Malformed history array handled safely (returned workout ${recCorruptHistory.workoutId})`
  );

  const parsedNullDate = parseDate(null);
  assert(parsedNullDate === null, "Test 9.4: parseDate(null) returns null without throwing");
}

// ----------------------------------------------------
// TEST 10: All candidates excluded fallback
// Context: Force all candidates to be excluded (e.g. invalid array or all filtered).
// Expected: Safe existing fallback workout returned without crash.
// ----------------------------------------------------
console.log("\n--- TEST 10: All Candidates Excluded Fallback ---");
{
  // Simulated case where all workouts were somehow marked completed today
  const historyCompletedAll = workoutProgram.map(w => ({
    workoutId: w.id,
    completed: true,
    completedAt: "2026-09-30T10:00:00.000Z"
  }));

  const recAllCompleted = recommendationEngine.getRecommendedWorkout({
    workouts: workoutProgram,
    workoutHistory: historyCompletedAll,
    today: "2026-09-30"
  });

  assert(recAllCompleted !== null, "Test 10.1: Fallback returned when all are completed today");
  assert(recAllCompleted.workout !== undefined, `Test 10.2: Valid workout object in fallback (${recAllCompleted.workout.name})`);
  assert(recAllCompleted.isCompletedToday === true, "Test 10.3: isCompletedToday properly marked");
}

console.log("\n==================================================");
console.log(`ALL TESTS COMPLETED: ${passedCount} PASSED, ${failedCount} FAILED`);
console.log("==================================================");

if (failedCount > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
