/* global process */
import {
  getRecommendedNutrition,
  validateNutritionContext
} from "./src/services/dietRecommendationEngine.js";
import { recommendationEngine } from "./src/services/recommendationEngine.js";
import { dietService } from "./src/services/dietService.js";

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
console.log("RUNNING DETERMINISTIC DIET RECOMMENDATION ENGINE TESTS");
console.log("==================================================\n");

// ----------------------------------------------------
// TEST 1: Brand-new user (No nutrition history)
// Expected: status: "insufficient_data", type: "start_tracking"
// ----------------------------------------------------
console.log("--- TEST 1: Brand-New User (No History) ---");
{
  const result = getRecommendedNutrition({
    profile: { goal: "Muscle Gain" },
    preferences: { hydrationTracking: true },
    targets: { calories: 2500, protein: 120 },
    historicalDiet: [],
    todayDiet: null
  });

  assert(result.status === "insufficient_data", `Test 1.1: status is 'insufficient_data', got '${result.status}'`);
  assert(result.recommendation?.type === "start_tracking", `Test 1.2: type is 'start_tracking', got '${result.recommendation?.type}'`);
  assert(result.data.hasRecentHistory === false, "Test 1.3: hasRecentHistory is false");
  assert(result.data.historyDaysAvailable === 0, `Test 1.4: historyDaysAvailable is 0, got ${result.data.historyDaysAvailable}`);
  assert(result.missing.includes("recentDiet"), "Test 1.5: missing includes 'recentDiet'");
  assert(result.missing.includes("todayDiet"), "Test 1.6: missing includes 'todayDiet'");
  assert(result.error === null, "Test 1.7: error is null");
}

// ----------------------------------------------------
// TEST 2: Missing targets
// Context: History exists, but calorie and protein targets are missing.
// Expected: status: "insufficient_data", type: "complete_nutrition_targets", no fabricated targets
// ----------------------------------------------------
console.log("\n--- TEST 2: Missing Targets ---");
{
  const sevenDaysHistory = [
    { date: "2026-09-24", calories: 2000, protein: 100, tracked: true },
    { date: "2026-09-25", calories: 2100, protein: 110, tracked: true },
    { date: "2026-09-26", calories: 2050, protein: 105, tracked: true },
    { date: "2026-09-27", calories: 2200, protein: 115, tracked: true },
    { date: "2026-09-28", calories: 1950, protein: 95, tracked: true },
    { date: "2026-09-29", calories: 2100, protein: 100, tracked: true },
    { date: "2026-09-30", calories: 2000, protein: 100, tracked: true },
  ];

  const resultNoTargets = getRecommendedNutrition({
    profile: { goal: "Strength" },
    targets: null, // No targets!
    historicalDiet: sevenDaysHistory
  });

  assert(resultNoTargets.status === "insufficient_data", `Test 2.1: status is 'insufficient_data', got '${resultNoTargets.status}'`);
  assert(resultNoTargets.recommendation?.type === "complete_nutrition_targets", `Test 2.2: type is 'complete_nutrition_targets', got '${resultNoTargets.recommendation?.type}'`);
  assert(resultNoTargets.data.hasTargets === false, "Test 2.3: hasTargets is false");
  assert(resultNoTargets.missing.includes("targets"), "Test 2.4: missing includes 'targets'");

  // Test single missing target
  const resultMissingCalorie = getRecommendedNutrition({
    targets: { protein: 140 }, // missing calorie target
    historicalDiet: sevenDaysHistory
  });
  assert(resultMissingCalorie.missing.includes("calorieTarget"), "Test 2.5: Identifies missing calorieTarget explicitly");
}

// ----------------------------------------------------
// TEST 3: Missing today's data but sufficient history
// Context: 7 days historical diet, but today has not been logged.
// Expected: status: "ready", data.hasTodayData: false, missing: ["todayDiet"]
// ----------------------------------------------------
console.log("\n--- TEST 3: Missing Today's Data But Sufficient History ---");
{
  const sevenDaysHistory = [
    { date: "2026-09-23", calories: 2400, protein: 120, tracked: true },
    { date: "2026-09-24", calories: 2350, protein: 115, tracked: true },
    { date: "2026-09-25", calories: 2500, protein: 125, tracked: true },
    { date: "2026-09-26", calories: 2450, protein: 120, tracked: true },
    { date: "2026-09-27", calories: 2300, protein: 110, tracked: true },
    { date: "2026-09-28", calories: 2400, protein: 118, tracked: true },
    { date: "2026-09-29", calories: 2380, protein: 122, tracked: true },
  ];

  const result = getRecommendedNutrition({
    targets: { calories: 2500, protein: 120 },
    historicalDiet: sevenDaysHistory,
    todayDiet: null,
    today: "2026-09-30"
  });

  assert(result.status === "ready", `Test 3.1: status is 'ready' when history is sufficient, got '${result.status}'`);
  assert(result.data.hasTodayData === false, "Test 3.2: hasTodayData is false");
  assert(result.data.hasRecentHistory === true, "Test 3.3: hasRecentHistory is true");
  assert(result.data.historyDaysAvailable === 7, `Test 3.4: historyDaysAvailable is 7, got ${result.data.historyDaysAvailable}`);
  assert(result.missing.includes("todayDiet"), "Test 3.5: missing includes 'todayDiet'");
  assert(result.recommendation !== null, "Test 3.6: recommendation is produced based on history");
}

// ----------------------------------------------------
// TEST 4: Partial history trend analysis
// Verify:
// - 1 day is treated as insufficient trend analysis
// - 2-3 days treated as limited trend ("X-day trend")
// - 4-6 days treated as partial trend ("X-day average")
// - 7 days treated as full trend ("7-day average")
// ----------------------------------------------------
console.log("\n--- TEST 4: Partial History Granular Analysis ---");
{
  const targets = { calories: 2500, protein: 120 };

  // 1 day history:
  const res1Day = getRecommendedNutrition({
    targets,
    historicalDiet: [{ date: "2026-09-29", calories: 2000, protein: 90, tracked: true }]
  });
  assert(res1Day.status === "insufficient_data", "Test 4.1: 1 day history is insufficient_data");
  assert(res1Day.data.historyDaysAvailable === 1, "Test 4.2: 1 day reported as historyDaysAvailable: 1");
  assert(res1Day.data.hasRecentHistory === false, "Test 4.3: hasRecentHistory is false for 1 day");

  // 3 days history (limited trend):
  const res3Days = getRecommendedNutrition({
    targets,
    historicalDiet: [
      { date: "2026-09-27", calories: 2100, protein: 85, tracked: true },
      { date: "2026-09-28", calories: 2000, protein: 80, tracked: true },
      { date: "2026-09-29", calories: 2050, protein: 85, tracked: true },
    ]
  });
  assert(res3Days.status === "ready", "Test 4.4: 3 days history is ready");
  assert(res3Days.data.historyDaysAvailable === 3, "Test 4.5: historyDaysAvailable is 3");
  assert(res3Days.recommendation.reason.includes("3-day trend"), `Test 4.6: Reason correctly cites '3-day trend': "${res3Days.recommendation.reason}"`);

  // 5 days history (partial trend):
  const res5Days = getRecommendedNutrition({
    targets,
    historicalDiet: [
      { date: "2026-09-25", calories: 2100, protein: 85, tracked: true },
      { date: "2026-09-26", calories: 2000, protein: 80, tracked: true },
      { date: "2026-09-27", calories: 2050, protein: 85, tracked: true },
      { date: "2026-09-28", calories: 2100, protein: 85, tracked: true },
      { date: "2026-09-29", calories: 2000, protein: 85, tracked: true },
    ]
  });
  assert(res5Days.status === "ready", "Test 4.7: 5 days history is ready");
  assert(res5Days.data.historyDaysAvailable === 5, "Test 4.8: historyDaysAvailable is 5");
  assert(res5Days.recommendation.reason.includes("5-day average"), `Test 4.9: Reason correctly cites '5-day average': "${res5Days.recommendation.reason}"`);

  // 7 days history (full trend):
  const res7Days = getRecommendedNutrition({
    targets,
    historicalDiet: [
      { date: "2026-09-23", calories: 2100, protein: 85, tracked: true },
      { date: "2026-09-24", calories: 2000, protein: 80, tracked: true },
      { date: "2026-09-25", calories: 2050, protein: 85, tracked: true },
      { date: "2026-09-26", calories: 2100, protein: 85, tracked: true },
      { date: "2026-09-27", calories: 2000, protein: 80, tracked: true },
      { date: "2026-09-28", calories: 2050, protein: 85, tracked: true },
      { date: "2026-09-29", calories: 2050, protein: 85, tracked: true },
    ]
  });
  assert(res7Days.status === "ready", "Test 4.10: 7 days history is ready");
  assert(res7Days.recommendation.reason.includes("7-day average"), `Test 4.11: Reason correctly cites '7-day average': "${res7Days.recommendation.reason}"`);
}

// ----------------------------------------------------
// TEST 5: Protein consistently low
// Context: Target = 120g, 7-day average = 80g
// Expected: status: "ready", type: "protein_gap"
// ----------------------------------------------------
console.log("\n--- TEST 5: Protein Consistently Low ---");
{
  const history = [
    { date: "2026-09-23", calories: 2450, protein: 80, tracked: true },
    { date: "2026-09-24", calories: 2500, protein: 78, tracked: true },
    { date: "2026-09-25", calories: 2480, protein: 82, tracked: true },
    { date: "2026-09-26", calories: 2520, protein: 80, tracked: true },
    { date: "2026-09-27", calories: 2500, protein: 75, tracked: true },
    { date: "2026-09-28", calories: 2490, protein: 83, tracked: true },
    { date: "2026-09-29", calories: 2510, protein: 82, tracked: true },
  ];

  const result = getRecommendedNutrition({
    targets: { calories: 2500, protein: 120 },
    historicalDiet: history
  });

  assert(result.status === "ready", "Test 5.1: Status is ready");
  assert(result.recommendation.type === "protein_gap", `Test 5.2: Type is 'protein_gap', got '${result.recommendation.type}'`);
  assert(result.recommendation.reason.includes("80g versus your 120g"), `Test 5.3: Reason cites actual values: "${result.recommendation.reason}"`);
}

// ----------------------------------------------------
// TEST 6: Calories consistently low
// Context: Target = 2500, Recent average = 1900 kcal
// Expected: status: "ready", type: "calorie_gap"
// ----------------------------------------------------
console.log("\n--- TEST 6: Calories Consistently Low ---");
{
  const history = [
    { date: "2026-09-23", calories: 1900, protein: 120, tracked: true },
    { date: "2026-09-24", calories: 1880, protein: 122, tracked: true },
    { date: "2026-09-25", calories: 1920, protein: 118, tracked: true },
    { date: "2026-09-26", calories: 1900, protein: 120, tracked: true },
    { date: "2026-09-27", calories: 1890, protein: 119, tracked: true },
    { date: "2026-09-28", calories: 1910, protein: 121, tracked: true },
    { date: "2026-09-29", calories: 1900, protein: 120, tracked: true },
  ];

  const result = getRecommendedNutrition({
    targets: { calories: 2500, protein: 120 },
    historicalDiet: history
  });

  assert(result.status === "ready", "Test 6.1: Status is ready");
  assert(result.recommendation.type === "calorie_gap", `Test 6.2: Type is 'calorie_gap', got '${result.recommendation.type}'`);
  assert(result.recommendation.title.includes("Increase calorie"), `Test 6.3: Title focuses on increasing calories: "${result.recommendation.title}"`);
  assert(result.recommendation.reason.includes("1900 kcal versus your 2500 kcal"), `Test 6.4: Reason shows actual numbers: "${result.recommendation.reason}"`);
}

// ----------------------------------------------------
// TEST 7: Protein and calories both low
// Context: Both are low, but user goal is Muscle Gain.
// Expected: Prioritizes protein gap according to documented scoring
// ----------------------------------------------------
console.log("\n--- TEST 7: Protein and Calories Both Low (Priority Scoring) ---");
{
  const history = [
    { date: "2026-09-23", calories: 2000, protein: 80, tracked: true },
    { date: "2026-09-24", calories: 2050, protein: 78, tracked: true },
    { date: "2026-09-25", calories: 2000, protein: 82, tracked: true },
    { date: "2026-09-26", calories: 2100, protein: 80, tracked: true },
    { date: "2026-09-27", calories: 1950, protein: 75, tracked: true },
    { date: "2026-09-28", calories: 2000, protein: 83, tracked: true },
    { date: "2026-09-29", calories: 2020, protein: 82, tracked: true },
  ];

  const result = getRecommendedNutrition({
    profile: { goal: "Muscle Gain" },
    targets: { calories: 2500, protein: 120 },
    historicalDiet: history
  });

  assert(result.status === "ready", "Test 7.1: Status is ready");
  assert(result.recommendation.type === "protein_gap", `Test 7.2: Protein gap prioritized over calorie gap for muscle gain, got '${result.recommendation.type}'`);
}

// ----------------------------------------------------
// TEST 8: Protein and calories both on target
// Context: Average calories = 2480 (target 2500), average protein = 118g (target 120g)
// Expected: status: "ready", type: "maintain_nutrition"
// ----------------------------------------------------
console.log("\n--- TEST 8: Protein and Calories Both On Target ---");
{
  const history = [
    { date: "2026-09-23", calories: 2480, protein: 118, tracked: true },
    { date: "2026-09-24", calories: 2510, protein: 120, tracked: true },
    { date: "2026-09-25", calories: 2470, protein: 119, tracked: true },
    { date: "2026-09-26", calories: 2490, protein: 117, tracked: true },
    { date: "2026-09-27", calories: 2520, protein: 121, tracked: true },
    { date: "2026-09-28", calories: 2460, protein: 118, tracked: true },
    { date: "2026-09-29", calories: 2480, protein: 118, tracked: true },
  ];

  const result = getRecommendedNutrition({
    targets: { calories: 2500, protein: 120 },
    historicalDiet: history
  });

  assert(result.status === "ready", "Test 8.1: Status is ready");
  assert(result.recommendation.type === "maintain_nutrition", `Test 8.2: Type is 'maintain_nutrition', got '${result.recommendation.type}'`);
  assert(result.recommendation.title.includes("Maintain"), `Test 8.3: Title contains 'Maintain': "${result.recommendation.title}"`);
}

// ----------------------------------------------------
// TEST 9: Today's data influences scoring
// Context: History has a protein gap, and today user has only consumed 20g protein
// Expected: Today's state adds urgency without fabricating missing intake
// ----------------------------------------------------
console.log("\n--- TEST 9: Today's Data Influence ---");
{
  const history = [
    { date: "2026-09-24", calories: 2400, protein: 85, tracked: true },
    { date: "2026-09-25", calories: 2400, protein: 85, tracked: true },
    { date: "2026-09-26", calories: 2400, protein: 85, tracked: true },
    { date: "2026-09-27", calories: 2400, protein: 85, tracked: true },
    { date: "2026-09-28", calories: 2400, protein: 85, tracked: true },
    { date: "2026-09-29", calories: 2400, protein: 85, tracked: true },
  ];

  const resWithoutToday = getRecommendedNutrition({
    targets: { calories: 2500, protein: 120 },
    historicalDiet: history
  });

  const resWithTodayLagging = getRecommendedNutrition({
    targets: { calories: 2500, protein: 120 },
    historicalDiet: history,
    todayDiet: { calories: 800, protein: 25, tracked: true }
  });

  assert(resWithTodayLagging.data.hasTodayData === true, "Test 9.1: hasTodayData marked true");
  assert(resWithTodayLagging.recommendation.priority > resWithoutToday.recommendation.priority,
    `Test 9.2: Priority higher when today is lagging (${resWithTodayLagging.recommendation.priority} vs ${resWithoutToday.recommendation.priority})`
  );
}

// ----------------------------------------------------
// TEST 10: Recent foods influence
// Context: High-protein food (Chicken Breast) in recent foods
// Expected: Suggested food name appears in protein recommendation reason
// ----------------------------------------------------
console.log("\n--- TEST 10: Recent Foods Influence ---");
{
  const history = [
    { date: "2026-09-26", calories: 2200, protein: 85, tracked: true },
    { date: "2026-09-27", calories: 2200, protein: 80, tracked: true },
    { date: "2026-09-28", calories: 2200, protein: 85, tracked: true },
    { date: "2026-09-29", calories: 2200, protein: 80, tracked: true },
  ];

  const recentFoods = [
    { id: 1, name: "Chicken Breast", calories: 165, protein: 31 },
    { id: 6, name: "Banana", calories: 105, protein: 1.3 }
  ];

  const result = getRecommendedNutrition({
    targets: { calories: 2500, protein: 120 },
    historicalDiet: history,
    recentFoods
  });

  assert(result.recommendation.type === "protein_gap", "Test 10.1: Type is protein_gap");
  assert(result.recommendation.reason.includes("Chicken Breast"), `Test 10.2: Mentions Chicken Breast in reason: "${result.recommendation.reason}"`);
}

// ----------------------------------------------------
// TEST 11: Hydration OFF
// Context: preferences.hydrationTracking is false
// Expected: hydrationAvailable is false, hydration never creates recommendation
// ----------------------------------------------------
console.log("\n--- TEST 11: Hydration Tracking OFF ---");
{
  const history = [
    { date: "2026-09-26", calories: 2480, protein: 119, tracked: true },
    { date: "2026-09-27", calories: 2500, protein: 120, tracked: true },
    { date: "2026-09-28", calories: 2510, protein: 118, tracked: true },
    { date: "2026-09-29", calories: 2490, protein: 120, tracked: true },
  ];

  const result = getRecommendedNutrition({
    preferences: { hydrationTracking: false },
    hydration: { recentIntake: 500 }, // Low water, but tracking is OFF!
    targets: { calories: 2500, protein: 120, water: 3000 },
    historicalDiet: history
  });

  assert(result.data.hydrationAvailable === false, "Test 11.1: hydrationAvailable is false");
  assert(result.recommendation.type !== "hydration_gap", `Test 11.2: Hydration did NOT trigger recommendation (type: ${result.recommendation.type})`);
}

// ----------------------------------------------------
// TEST 12: Hydration ON
// Context: preferences.hydrationTracking is true, water intake low, nutrition on target
// Expected: hydrationAvailable is true, triggers hydration recommendation
// ----------------------------------------------------
console.log("\n--- TEST 12: Hydration Tracking ON ---");
{
  const history = [
    { date: "2026-09-26", calories: 2480, protein: 119, tracked: true },
    { date: "2026-09-27", calories: 2500, protein: 120, tracked: true },
    { date: "2026-09-28", calories: 2510, protein: 118, tracked: true },
    { date: "2026-09-29", calories: 2490, protein: 120, tracked: true },
  ];

  const result = getRecommendedNutrition({
    preferences: { hydrationTracking: true },
    hydration: { recentIntake: 800 }, // 800ml vs 3000ml target
    targets: { calories: 2500, protein: 120, water: 3000 },
    historicalDiet: history
  });

  assert(result.data.hydrationAvailable === true, "Test 12.1: hydrationAvailable is true");
  assert(result.recommendation.type === "hydration_gap", `Test 12.2: Triggers hydration_gap when nutrition on track, got '${result.recommendation.type}'`);
  assert(result.recommendation.title.includes("hydration"), `Test 12.3: Title mentions hydration: "${result.recommendation.title}"`);
}

// ----------------------------------------------------
// TEST 13: Invalid Data Handling
// Context: Negative calories, NaN, invalid date
// Expected: status: "invalid_data", error.code: "INVALID_NUTRITION_DATA", recommendation: null
// ----------------------------------------------------
console.log("\n--- TEST 13: Invalid Data Handling ---");
{
  const resNegativeTarget = getRecommendedNutrition({
    targets: { calories: -2500, protein: 120 },
    historicalDiet: [{ date: "2026-09-29", calories: 2000, protein: 100, tracked: true }]
  });
  assert(resNegativeTarget.status === "invalid_data", "Test 13.1: Negative target returns invalid_data");
  assert(resNegativeTarget.recommendation === null, "Test 13.2: Recommendation is null on invalid_data");
  assert(resNegativeTarget.error.code === "INVALID_NUTRITION_DATA", `Test 13.3: Error code is INVALID_NUTRITION_DATA (${resNegativeTarget.error.code})`);

  const resNegativeCalories = getRecommendedNutrition({
    targets: { calories: 2500, protein: 120 },
    historicalDiet: [{ date: "2026-09-29", calories: -500, protein: 100, tracked: true }]
  });
  assert(resNegativeCalories.status === "invalid_data", "Test 13.4: Negative calories in diet returns invalid_data");

  const resInvalidDate = getRecommendedNutrition({
    targets: { calories: 2500, protein: 120 },
    historicalDiet: [{ date: "invalid-date", calories: 2000, protein: 100, tracked: true }]
  });
  assert(resInvalidDate.status === "invalid_data", "Test 13.5: Invalid date string returns invalid_data");

  const validation = validateNutritionContext({ targets: { calories: "banana" } });
  assert(validation.isValid === false, "Test 13.6: validateNutritionContext catches non-numeric calories");
}

// ----------------------------------------------------
// TEST 14: Firestore / Service Error Handling
// Context: error or dietError passed in context
// Expected: status: "error", error.code: "DATA_LOAD_FAILED", recommendation: null
// ----------------------------------------------------
console.log("\n--- TEST 14: Firestore / Service Error Handling ---");
{
  const resultServiceError = getRecommendedNutrition({
    dietError: true,
    targets: { calories: 2500, protein: 120 }
  });
  assert(resultServiceError.status === "error", `Test 14.1: status is 'error', got '${resultServiceError.status}'`);
  assert(resultServiceError.recommendation === null, "Test 14.2: recommendation is null");
  assert(resultServiceError.error.code === "DATA_LOAD_FAILED", `Test 14.3: error.code is DATA_LOAD_FAILED (${resultServiceError.error.code})`);

  const resultExplicitError = getRecommendedNutrition({
    error: { code: "FIRESTORE_PERMISSION_DENIED", message: "Permission denied." }
  });
  assert(resultExplicitError.status === "error", "Test 14.4: explicit error returns status error");
  assert(resultExplicitError.error.code === "FIRESTORE_PERMISSION_DENIED", "Test 14.5: preserves error code");
}

// ----------------------------------------------------
// TEST 15: Missing profile/preferences fields
// Context: Profile and preferences are empty or missing optional fields
// Expected: Safe execution, no crash
// ----------------------------------------------------
console.log("\n--- TEST 15: Missing Optional Profile/Preferences Fields ---");
{
  const history = [
    { date: "2026-09-28", calories: 2200, protein: 90, tracked: true },
    { date: "2026-09-29", calories: 2100, protein: 85, tracked: true },
  ];

  const result = getRecommendedNutrition({
    targets: { calories: 2500, protein: 120 },
    profile: null,
    preferences: null,
    historicalDiet: history
  });

  assert(result.status === "ready", "Test 15.1: Missing profile/preferences executes safely with status ready");
  assert(result.data.hasProfile === false, "Test 15.2: hasProfile marked false");
  assert(result.data.hasPreferences === false, "Test 15.3: hasPreferences marked false");
  assert(result.recommendation !== null, "Test 15.4: Recommendation generated successfully");
}

// ----------------------------------------------------
// TEST 16: Determinism
// Context: Run identical input 10 times consecutively
// Expected: 100% identical status, recommendation, score, and reason
// ----------------------------------------------------
console.log("\n--- TEST 16: Determinism (10 Consecutive Invocations) ---");
{
  const context = {
    targets: { calories: 2500, protein: 120 },
    profile: { goal: "Muscle Gain" },
    historicalDiet: [
      { date: "2026-09-26", calories: 2100, protein: 80, tracked: true },
      { date: "2026-09-27", calories: 2200, protein: 85, tracked: true },
      { date: "2026-09-28", calories: 2000, protein: 78, tracked: true },
      { date: "2026-09-29", calories: 2150, protein: 82, tracked: true },
    ]
  };

  const baseline = getRecommendedNutrition(context);

  for (let i = 1; i <= 10; i++) {
    const run = getRecommendedNutrition(context);
    assert(run.status === baseline.status, `Test 16.Run${i}: status matches (${run.status})`);
    assert(run.recommendation.type === baseline.recommendation.type, `Test 16.Run${i}: type matches (${run.recommendation.type})`);
    assert(run.recommendation.priority === baseline.recommendation.priority, `Test 16.Run${i}: priority matches (${run.recommendation.priority})`);
    assert(run.recommendation.reason === baseline.recommendation.reason, `Test 16.Run${i}: reason matches`);
  }
}

// ----------------------------------------------------
// TEST 17: Service Integration Consistency
// Context: recommendationEngine.getRecommendedNutrition and dietService.getRecommendedNutrition
// Expected: Both resolve to the exact same recommendation contract
// ----------------------------------------------------
console.log("\n--- TEST 17: Service Integration Consistency ---");
{
  const context = {
    targets: { calories: 2400, protein: 130 },
    historicalDiet: [
      { date: "2026-09-27", calories: 2350, protein: 128, tracked: true },
      { date: "2026-09-28", calories: 2420, protein: 132, tracked: true },
      { date: "2026-09-29", calories: 2390, protein: 129, tracked: true },
    ]
  };

  const recEngineResult = recommendationEngine.getRecommendedNutrition(context);
  const dietServiceResult = dietService.getRecommendedNutrition(context);
  const directResult = getRecommendedNutrition(context);

  assert(recEngineResult.status === directResult.status, "Test 17.1: recommendationEngine matches direct call");
  assert(dietServiceResult.status === directResult.status, "Test 17.2: dietService matches direct call");
  assert(recEngineResult.recommendation.type === dietServiceResult.recommendation.type, "Test 17.3: Recommendation types match");
  assert(recEngineResult.recommendation.reason === dietServiceResult.recommendation.reason, "Test 17.4: Recommendation reasons match");
}

console.log("\n==================================================");
console.log(`ALL TESTS COMPLETED: ${passedCount} PASSED, ${failedCount} FAILED`);
console.log("==================================================");

if (failedCount > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
