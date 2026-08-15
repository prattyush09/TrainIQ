import { useEffect, useMemo, useState } from "react";
import Button from "../components/ui/Button/Button";
import "../styles/Diet.css";

/* ==========================================
   FOOD DATABASE
========================================== */

const foodDatabase = [
  {
    id: 1,
    name: "Chicken Breast",
    servingUnit: "100g",
    calories: 165,
    protein: 31,
    carbs: 0,
    fats: 3.6,
  },
  {
    id: 2,
    name: "Egg",
    servingUnit: "1 egg",
    calories: 78,
    protein: 6.3,
    carbs: 0.6,
    fats: 5.3,
  },
  {
    id: 3,
    name: "Paneer",
    servingUnit: "100g",
    calories: 265,
    protein: 18,
    carbs: 6,
    fats: 20,
  },
  {
    id: 4,
    name: "Rice",
    servingUnit: "100g",
    calories: 130,
    protein: 2.7,
    carbs: 28,
    fats: 0.3,
  },
  {
    id: 5,
    name: "Roti",
    servingUnit: "1 roti",
    calories: 120,
    protein: 3,
    carbs: 18,
    fats: 3,
  },
  {
    id: 6,
    name: "Banana",
    servingUnit: "1 banana",
    calories: 105,
    protein: 1.3,
    carbs: 27,
    fats: 0.4,
  },
  {
    id: 7,
    name: "Milk",
    servingUnit: "100ml",
    calories: 61,
    protein: 3.2,
    carbs: 4.8,
    fats: 3.3,
  },
  {
    id: 8,
    name: "Dal",
    servingUnit: "100g",
    calories: 116,
    protein: 9,
    carbs: 20,
    fats: 0.4,
  },
  {
    id: 9,
    name: "Oats",
    servingUnit: "100g",
    calories: 389,
    protein: 16.9,
    carbs: 66.3,
    fats: 6.9,
  },
  {
    id: 10,
    name: "Curd",
    servingUnit: "100g",
    calories: 61,
    protein: 3.5,
    carbs: 4.7,
    fats: 3.3,
  },
  {
    id: 11,
    name: "Apple",
    servingUnit: "1 apple",
    calories: 95,
    protein: 0.5,
    carbs: 25,
    fats: 0.3,
  },
  {
    id: 12,
    name: "Peanut Butter",
    servingUnit: "1 tbsp",
    calories: 94,
    protein: 4,
    carbs: 3.2,
    fats: 8,
  },
  {
    id: 13,
    name: "Almonds",
    servingUnit: "10 almonds",
    calories: 70,
    protein: 2.6,
    carbs: 2.6,
    fats: 6.1,
  },
  {
    id: 14,
    name: "Potato",
    servingUnit: "100g",
    calories: 77,
    protein: 2,
    carbs: 17,
    fats: 0.1,
  },
  {
    id: 15,
    name: "Whey Protein",
    servingUnit: "1 scoop",
    calories: 120,
    protein: 24,
    carbs: 3,
    fats: 2,
  },
];

/* ==========================================
   CONSTANTS
========================================== */

const mealTypes = [
  "Breakfast",
  "Lunch",
  "Dinner",
  "Snacks",
];

const createEmptyDay = () => ({
  Breakfast: [],
  Lunch: [],
  Dinner: [],
  Snacks: [],
});

/*
  Uses the user's local calendar date instead of UTC.
  This prevents the date from changing around midnight
  for users in India and other time zones.
*/
const getToday = () => {
  const date = new Date();

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

/* ==========================================
   DATA NORMALIZATION
========================================== */

const normalizeFood = (food) => {
  const quantity =
    Number(food?.quantity) > 0
      ? Number(food.quantity)
      : 1;

  return {
    ...food,
    quantity,
    totalCalories:
      Number.isFinite(Number(food?.totalCalories))
        ? Number(food.totalCalories)
        : Number(food?.calories || 0) * quantity,

    totalProtein:
      Number.isFinite(Number(food?.totalProtein))
        ? Number(food.totalProtein)
        : Number(food?.protein || 0) * quantity,

    totalCarbs:
      Number.isFinite(Number(food?.totalCarbs))
        ? Number(food.totalCarbs)
        : Number(food?.carbs || 0) * quantity,

    totalFats:
      Number.isFinite(Number(food?.totalFats))
        ? Number(food.totalFats)
        : Number(food?.fats || 0) * quantity,
  };
};

const normalizeLogs = (logs) => {
  const normalized = {};

  if (!logs || typeof logs !== "object") {
    return normalized;
  }

  Object.keys(logs).forEach((date) => {
    const day = logs[date];

    /*
      Compatibility with the older food-log structure where
      a date could contain a simple array.
    */
    if (Array.isArray(day)) {
      normalized[date] = {
        ...createEmptyDay(),
        Breakfast: day.map(normalizeFood),
      };

      return;
    }

    normalized[date] = {
      Breakfast: Array.isArray(day?.Breakfast)
        ? day.Breakfast.map(normalizeFood)
        : [],

      Lunch: Array.isArray(day?.Lunch)
        ? day.Lunch.map(normalizeFood)
        : [],

      Dinner: Array.isArray(day?.Dinner)
        ? day.Dinner.map(normalizeFood)
        : [],

      Snacks: Array.isArray(day?.Snacks)
        ? day.Snacks.map(normalizeFood)
        : [],
    };
  });

  return normalized;
};

/* ==========================================
   HELPERS
========================================== */

const roundNumber = (value) => {
  const number = Number(value) || 0;
  return Math.round(number * 10) / 10;
};

const getFoodCalories = (food) =>
  Number(food?.totalCalories) ||
  Number(food?.calories || 0) *
    (Number(food?.quantity) || 1);

const getFoodProtein = (food) =>
  Number(food?.totalProtein) ||
  Number(food?.protein || 0) *
    (Number(food?.quantity) || 1);

const getFoodCarbs = (food) =>
  Number(food?.totalCarbs) ||
  Number(food?.carbs || 0) *
    (Number(food?.quantity) || 1);

const getFoodFats = (food) =>
  Number(food?.totalFats) ||
  Number(food?.fats || 0) *
    (Number(food?.quantity) || 1);

/* ==========================================
   COMPONENT
========================================== */

function Diet() {
  const [search, setSearch] = useState("");

  const [selectedDate, setSelectedDate] =
    useState(getToday());

  const [selectedMeal, setSelectedMeal] =
    useState("Breakfast");

  const [selectedFood, setSelectedFood] =
    useState(null);

  const [quantity, setQuantity] =
    useState(1);

  /* ==========================================
     FOOD LOG
  ========================================== */

  const [foodLogs, setFoodLogs] = useState(() => {
    const savedLogs = localStorage.getItem(
      "trainiq-food-logs"
    );

    if (savedLogs) {
      try {
        return normalizeLogs(
          JSON.parse(savedLogs)
        );
      } catch {
        return {};
      }
    }

    /*
      Backward compatibility with the old key.
    */
    const oldFoodLog =
      localStorage.getItem(
        "trainiq-food-log"
      );

    if (oldFoodLog) {
      try {
        const oldData =
          JSON.parse(oldFoodLog);

        if (Array.isArray(oldData)) {
          return {
            [getToday()]: {
              ...createEmptyDay(),
              Breakfast:
                oldData.map(normalizeFood),
            },
          };
        }
      } catch {
        return {};
      }
    }

    return {};
  });

  /* ==========================================
     TARGETS
  ========================================== */

  const [calorieTarget, setCalorieTarget] =
    useState(() => {
      const saved =
        Number(
          localStorage.getItem(
            "trainiq-calorie-target"
          )
        );

      return saved > 0 ? saved : 2500;
    });

  const [proteinTarget, setProteinTarget] =
    useState(() => {
      const saved =
        Number(
          localStorage.getItem(
            "trainiq-protein-target"
          )
        );

      return saved > 0 ? saved : 120;
    });

  const [showTargets, setShowTargets] =
    useState(false);

  const [
    newCalorieTarget,
    setNewCalorieTarget,
  ] = useState(calorieTarget);

  const [
    newProteinTarget,
    setNewProteinTarget,
  ] = useState(proteinTarget);

  /* ==========================================
     PERSIST FOOD LOG
  ========================================== */

  useEffect(() => {
    localStorage.setItem(
      "trainiq-food-logs",
      JSON.stringify(foodLogs)
    );

    /*
      Remove the legacy key after successfully
      migrating its data.
    */
    localStorage.removeItem(
      "trainiq-food-log"
    );
  }, [foodLogs]);

  /* ==========================================
     PERSIST TARGETS
  ========================================== */

  useEffect(() => {
    localStorage.setItem(
      "trainiq-calorie-target",
      String(calorieTarget)
    );

    localStorage.setItem(
      "trainiq-protein-target",
      String(proteinTarget)
    );
  }, [
    calorieTarget,
    proteinTarget,
  ]);

  /* ==========================================
     CURRENT DAY
  ========================================== */

  const dailyMeals =
    foodLogs[selectedDate] ||
    createEmptyDay();

  const foodLog = useMemo(
    () =>
      mealTypes.flatMap(
        (meal) =>
          dailyMeals[meal] || []
      ),
    [dailyMeals]
  );

  /* ==========================================
     SEARCH
  ========================================== */

  const filteredFoods =
    foodDatabase.filter((food) =>
      food.name
        .toLowerCase()
        .includes(
          search.trim().toLowerCase()
        )
    );

  /* ==========================================
     TOTALS
  ========================================== */

  const totalCalories =
    foodLog.reduce(
      (total, food) =>
        total + getFoodCalories(food),
      0
    );

  const totalProtein =
    foodLog.reduce(
      (total, food) =>
        total + getFoodProtein(food),
      0
    );

  const totalCarbs =
    foodLog.reduce(
      (total, food) =>
        total + getFoodCarbs(food),
      0
    );

  const totalFats =
    foodLog.reduce(
      (total, food) =>
        total + getFoodFats(food),
      0
    );

  /* ==========================================
     PROGRESS
  ========================================== */

  const calorieProgress =
    calorieTarget > 0
      ? Math.min(
          (totalCalories /
            calorieTarget) *
            100,
          100
        )
      : 0;

  const proteinProgress =
    proteinTarget > 0
      ? Math.min(
          (totalProtein /
            proteinTarget) *
            100,
          100
        )
      : 0;

  const caloriesRemaining =
    calorieTarget -
    Math.round(totalCalories);

  const proteinRemaining =
    proteinTarget -
    Math.round(totalProtein);

  const isToday =
    selectedDate === getToday();

  /* ==========================================
     MODAL
  ========================================== */

  const openQuantityModal = (food) => {
    setSelectedFood(food);
    setQuantity(1);
  };

  const closeQuantityModal = () => {
    setSelectedFood(null);
    setQuantity(1);
  };

  /* ==========================================
     ADD FOOD
  ========================================== */

  const addFood = () => {
    if (!selectedFood) {
      return;
    }

    const amount = Number(quantity);

    if (
      !Number.isFinite(amount) ||
      amount <= 0
    ) {
      return;
    }

    const foodEntry = {
      ...selectedFood,

      quantity: amount,

      totalCalories:
        selectedFood.calories *
        amount,

      totalProtein:
        selectedFood.protein *
        amount,

      totalCarbs:
        selectedFood.carbs *
        amount,

      totalFats:
        selectedFood.fats *
        amount,
    };

    setFoodLogs((previousLogs) => {
      const currentDay =
        previousLogs[selectedDate] ||
        createEmptyDay();

      return {
        ...previousLogs,

        [selectedDate]: {
          ...currentDay,

          [selectedMeal]: [
            ...(currentDay[selectedMeal] ||
              []),
            foodEntry,
          ],
        },
      };
    });

    closeQuantityModal();
  };

  /* ==========================================
     REMOVE FOOD
  ========================================== */

  const removeFood = (
    meal,
    index
  ) => {
    setFoodLogs((previousLogs) => {
      const currentDay =
        previousLogs[selectedDate] ||
        createEmptyDay();

      return {
        ...previousLogs,

        [selectedDate]: {
          ...currentDay,

          [meal]: (
            currentDay[meal] || []
          ).filter(
            (_, foodIndex) =>
              foodIndex !== index
          ),
        },
      };
    });
  };

  /* ==========================================
     CLEAR MEAL
  ========================================== */

  const clearMeal = (meal) => {
    const confirmed =
      window.confirm(
        `Clear all food from ${meal}?`
      );

    if (!confirmed) {
      return;
    }

    setFoodLogs((previousLogs) => {
      const currentDay =
        previousLogs[selectedDate] ||
        createEmptyDay();

      return {
        ...previousLogs,

        [selectedDate]: {
          ...currentDay,
          [meal]: [],
        },
      };
    });
  };

  /* ==========================================
     CLEAR DAY
  ========================================== */

  const clearFoodLog = () => {
    const confirmed =
      window.confirm(
        "Clear all food logged for this day?"
      );

    if (!confirmed) {
      return;
    }

    setFoodLogs((previousLogs) => ({
      ...previousLogs,

      [selectedDate]:
        createEmptyDay(),
    }));
  };

  /* ==========================================
     TARGETS
  ========================================== */

  const openTargetModal = () => {
    setNewCalorieTarget(
      calorieTarget
    );

    setNewProteinTarget(
      proteinTarget
    );

    setShowTargets(true);
  };

  const saveTargets = () => {
    const calories =
      Number(newCalorieTarget);

    const protein =
      Number(newProteinTarget);

    if (
      !Number.isFinite(calories) ||
      calories <= 0 ||
      !Number.isFinite(protein) ||
      protein <= 0
    ) {
      window.alert(
        "Please enter valid calorie and protein targets."
      );

      return;
    }

    setCalorieTarget(
      Math.round(calories)
    );

    setProteinTarget(
      Math.round(protein)
    );

    setShowTargets(false);
  };

  /* ==========================================
     MODAL PREVIEW
  ========================================== */

  const previewQuantity =
    Number(quantity) > 0
      ? Number(quantity)
      : 0;

  const previewCalories =
    selectedFood
      ? selectedFood.calories *
        previewQuantity
      : 0;

  const previewProtein =
    selectedFood
      ? selectedFood.protein *
        previewQuantity
      : 0;

  const previewCarbs =
    selectedFood
      ? selectedFood.carbs *
        previewQuantity
      : 0;

  const previewFats =
    selectedFood
      ? selectedFood.fats *
        previewQuantity
      : 0;

  /* ==========================================
     RENDER
  ========================================== */

  return (
    <main className="diet-page">
      <div className="diet-container">

        {/* ======================================
            HEADER
        ====================================== */}

        <header className="diet-header">
          <div>
            <p className="diet-eyebrow">
              NUTRITION
            </p>

            <h1>Diet Tracker</h1>

            <p className="diet-subtitle">
              {isToday
                ? "Track your nutrition and stay on target."
                : `Nutrition for ${selectedDate}`}
            </p>
          </div>

          <Button
            variant="primary"
            onClick={openTargetModal}
          >
            Set Targets
          </Button>
        </header>

        {/* ======================================
            DATE
        ====================================== */}

        <section className="diet-date-selector">
          <div className="date-label-group">
            <span className="date-label">
              DATE
            </span>

            <span className="date-description">
              View your nutrition for a specific day.
            </span>
          </div>

          <input
            id="diet-date"
            type="date"
            value={selectedDate}
            max={getToday()}
            onChange={(event) =>
              setSelectedDate(
                event.target.value
              )
            }
          />

          {!isToday && (
            <Button
              variant="secondary"
              onClick={() =>
                setSelectedDate(
                  getToday()
                )
              }
            >
              Back to Today
            </Button>
          )}
        </section>

        {/* ======================================
            TARGET CARDS
        ====================================== */}

        <section className="nutrition-targets">

          {/* CALORIES */}

          <div className="target-card">
            <div className="target-card-top">
              <div>
                <span className="target-label">
                  DAILY TARGET
                </span>

                <h2>Calories</h2>
              </div>

              <div className="target-value">
                <strong>
                  {Math.round(
                    totalCalories
                  )}
                </strong>

                <span>
                  / {calorieTarget} kcal
                </span>
              </div>
            </div>

            <div className="progress-bar">
              <div
                className={`progress-fill ${
                  totalCalories >
                  calorieTarget
                    ? "progress-over"
                    : ""
                }`}
                style={{
                  width: `${calorieProgress}%`,
                }}
              />
            </div>

            <div className="target-footer">
              {caloriesRemaining >= 0 ? (
                <p>
                  <strong>
                    {caloriesRemaining}
                  </strong>{" "}
                  kcal remaining
                </p>
              ) : (
                <p className="target-over">
                  <strong>
                    {Math.abs(
                      caloriesRemaining
                    )}
                  </strong>{" "}
                  kcal over target
                </p>
              )}

              <span>
                {Math.round(
                  (totalCalories /
                    calorieTarget) *
                    100
                )}
                %
              </span>
            </div>
          </div>

          {/* PROTEIN */}

          <div className="target-card">
            <div className="target-card-top">
              <div>
                <span className="target-label">
                  DAILY TARGET
                </span>

                <h2>Protein</h2>
              </div>

              <div className="target-value">
                <strong>
                  {roundNumber(
                    totalProtein
                  )}
                </strong>

                <span>
                  / {proteinTarget}g
                </span>
              </div>
            </div>

            <div className="progress-bar">
              <div
                className={`progress-fill ${
                  totalProtein >
                  proteinTarget
                    ? "progress-over"
                    : ""
                }`}
                style={{
                  width: `${proteinProgress}%`,
                }}
              />
            </div>

            <div className="target-footer">
              {proteinRemaining >= 0 ? (
                <p>
                  <strong>
                    {proteinRemaining}
                  </strong>{" "}
                  g remaining
                </p>
              ) : (
                <p className="target-over">
                  <strong>
                    {Math.abs(
                      proteinRemaining
                    )}
                  </strong>{" "}
                  g over target
                </p>
              )}

              <span>
                {Math.round(
                  (totalProtein /
                    proteinTarget) *
                    100
                )}
                %
              </span>
            </div>
          </div>
        </section>

        {/* ======================================
            NUTRITION SUMMARY
        ====================================== */}

        <section className="nutrition-stats">

          <div className="nutrition-card">
            <span className="nutrition-card-label">
              CALORIES
            </span>

            <h2>
              {Math.round(
                totalCalories
              )}
            </h2>

            <p>kcal consumed</p>
          </div>

          <div className="nutrition-card">
            <span className="nutrition-card-label">
              PROTEIN
            </span>

            <h2>
              {roundNumber(
                totalProtein
              )}
              g
            </h2>

            <p>protein consumed</p>
          </div>

          <div className="nutrition-card">
            <span className="nutrition-card-label">
              CARBS
            </span>

            <h2>
              {roundNumber(
                totalCarbs
              )}
              g
            </h2>

            <p>carbohydrates</p>
          </div>

          <div className="nutrition-card">
            <span className="nutrition-card-label">
              FATS
            </span>

            <h2>
              {roundNumber(
                totalFats
              )}
              g
            </h2>

            <p>dietary fats</p>
          </div>

        </section>

        {/* ======================================
            SEARCH
        ====================================== */}

        <section className="food-search-section">
          <div>
            <span className="section-eyebrow">
              FOOD
            </span>

            <h2>
              Add Food
            </h2>

            <p>
              Search the nutrition database and
              choose how many servings you had.
            </p>
          </div>

          <div className="food-search">
            <span className="search-icon">
              ⌕
            </span>

            <input
              type="text"
              placeholder="Search food..."
              value={search}
              onChange={(event) =>
                setSearch(
                  event.target.value
                )
              }
            />

            {search && (
              <button
                type="button"
                className="search-clear"
                onClick={() =>
                  setSearch("")
                }
                aria-label="Clear search"
              >
                ×
              </button>
            )}
          </div>
        </section>

        {/* ======================================
            MEAL SELECTOR
        ====================================== */}

        <section className="meal-selector">

          <div className="meal-selector-header">
            <div>
              <span className="section-eyebrow">
                MEAL
              </span>

              <h2>
                Add Food To
              </h2>
            </div>

            <div className="selected-meal">
              {selectedMeal}
            </div>
          </div>

          <div className="meal-buttons">
            {mealTypes.map((meal) => (
              <Button
                key={meal}
                variant={
                  selectedMeal === meal
                    ? "success"
                    : "secondary"
                }
                onClick={() =>
                  setSelectedMeal(
                    meal
                  )
                }
              >
                {meal}
              </Button>
            ))}
          </div>
        </section>

        {/* ======================================
            FOOD DATABASE
        ====================================== */}

        <section className="food-results">

          <div className="section-heading">
            <div>
              <span className="section-eyebrow">
                DATABASE
              </span>

              <h2>
                Available Foods
              </h2>
            </div>

            <span className="result-count">
              {filteredFoods.length} foods
            </span>
          </div>

          {filteredFoods.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">
                ?
              </div>

              <h3>
                No foods found
              </h3>

              <p>
                Try searching for another food.
              </p>

              <Button
                variant="secondary"
                onClick={() =>
                  setSearch("")
                }
              >
                Show All Foods
              </Button>
            </div>
          ) : (
            <div className="food-grid">
              {filteredFoods.map(
                (food) => (
                  <div
                    className="food-card"
                    key={food.id}
                  >
                    <div className="food-card-info">
                      <div className="food-card-title">
                        <h3>
                          {food.name}
                        </h3>

                        <span>
                          {food.servingUnit}
                        </span>
                      </div>

                      <div className="food-macros">
                        <span>
                          {food.calories} kcal
                        </span>

                        <span>
                          {food.protein}g protein
                        </span>

                        <span>
                          {food.carbs}g carbs
                        </span>

                        <span>
                          {food.fats}g fat
                        </span>
                      </div>
                    </div>

                    <Button
                      variant="primary"
                      onClick={() =>
                        openQuantityModal(
                          food
                        )
                      }
                    >
                      Add
                    </Button>
                  </div>
                )
              )}
            </div>
          )}
        </section>

        {/* ======================================
            DAILY MEALS
        ====================================== */}

        <section className="daily-food">

          <div className="section-heading daily-heading">
            <div>
              <span className="section-eyebrow">
                DAILY LOG
              </span>

              <h2>
                {isToday
                  ? "Today's Meals"
                  : `Meals on ${selectedDate}`}
              </h2>
            </div>

            {foodLog.length > 0 && (
              <Button
                variant="danger"
                onClick={
                  clearFoodLog
                }
              >
                Clear Day
              </Button>
            )}
          </div>

          {mealTypes.map((meal) => {
            const mealFoods =
              dailyMeals[meal] ||
              [];

            const mealCalories =
              mealFoods.reduce(
                (total, food) =>
                  total +
                  getFoodCalories(
                    food
                  ),
                0
              );

            const mealProtein =
              mealFoods.reduce(
                (total, food) =>
                  total +
                  getFoodProtein(
                    food
                  ),
                0
              );

            return (
              <div
                className="meal-section"
                key={meal}
              >
                <div className="meal-header">
                  <div>
                    <h3>
                      {meal}
                    </h3>

                    <p>
                      {Math.round(
                        mealCalories
                      )}{" "}
                      kcal
                      {" • "}
                      {roundNumber(
                        mealProtein
                      )}
                      g protein
                    </p>
                  </div>

                  {mealFoods.length >
                    0 && (
                    <Button
                      variant="danger"
                      onClick={() =>
                        clearMeal(
                          meal
                        )
                      }
                    >
                      Clear
                    </Button>
                  )}
                </div>

                {mealFoods.length ===
                0 ? (
                  <div className="empty-meal">
                    <span>
                      No food added yet.
                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        setSelectedMeal(
                          meal
                        )
                      }
                    >
                      Add food
                    </button>
                  </div>
                ) : (
                  <div className="logged-food-list">
                    {mealFoods.map(
                      (
                        food,
                        index
                      ) => (
                        <div
                          className="logged-food"
                          key={`${food.id}-${index}`}
                        >
                          <div className="logged-food-main">
                            <div className="logged-food-name">
                              <h3>
                                {
                                  food.name
                                }
                              </h3>

                              <span>
                                {food.quantity ||
                                  1}{" "}
                                ×{" "}
                                {food.servingUnit ||
                                  "serving"}
                              </span>
                            </div>

                            <div className="logged-food-macros">
                              <span>
                                {Math.round(
                                  getFoodCalories(
                                    food
                                  )
                                )}{" "}
                                kcal
                              </span>

                              <span>
                                {roundNumber(
                                  getFoodProtein(
                                    food
                                  )
                                )}
                                g protein
                              </span>

                              <span>
                                {roundNumber(
                                  getFoodCarbs(
                                    food
                                  )
                                )}
                                g carbs
                              </span>

                              <span>
                                {roundNumber(
                                  getFoodFats(
                                    food
                                  )
                                )}
                                g fat
                              </span>
                            </div>
                          </div>

                          <Button
                            variant="danger"
                            onClick={() =>
                              removeFood(
                                meal,
                                index
                              )
                            }
                          >
                            Remove
                          </Button>
                        </div>
                      )
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </section>
      </div>

      {/* ========================================
          ADD FOOD MODAL
      ======================================== */}

      {selectedFood && (
        <div
          className="target-modal-overlay"
          onMouseDown={(event) => {
            if (
              event.target ===
              event.currentTarget
            ) {
              closeQuantityModal();
            }
          }}
        >
          <div className="target-modal">

            <div className="modal-header">
              <div>
                <span className="section-eyebrow">
                  ADD FOOD
                </span>

                <h2>
                  {selectedFood.name}
                </h2>

                <p>
                  Nutrition per{" "}
                  {selectedFood.servingUnit}
                </p>
              </div>

              <button
                type="button"
                className="modal-close"
                onClick={
                  closeQuantityModal
                }
                aria-label="Close"
              >
                ×
              </button>
            </div>

            <div className="modal-food-summary">
              <div>
                <strong>
                  {selectedFood.calories}
                </strong>

                <span>
                  kcal
                </span>
              </div>

              <div>
                <strong>
                  {selectedFood.protein}g
                </strong>

                <span>
                  protein
                </span>
              </div>

              <div>
                <strong>
                  {selectedFood.carbs}g
                </strong>

                <span>
                  carbs
                </span>
              </div>

              <div>
                <strong>
                  {selectedFood.fats}g
                </strong>

                <span>
                  fat
                </span>
              </div>
            </div>

            <label className="modal-input-label">
              Number of servings

              <input
                type="number"
                min="0.1"
                step="0.1"
                value={quantity}
                onChange={(event) =>
                  setQuantity(
                    event.target.value
                  )
                }
                autoFocus
              />

              <span>
                Example: 2 eggs = 2 servings
              </span>
            </label>

            <div className="target-modal-preview">
              <div className="preview-header">
                <strong>
                  Total Nutrition
                </strong>

                <span>
                  {previewQuantity}{" "}
                  servings
                </span>
              </div>

              <div className="preview-grid">
                <div>
                  <strong>
                    {Math.round(
                      previewCalories
                    )}
                  </strong>

                  <span>
                    kcal
                  </span>
                </div>

                <div>
                  <strong>
                    {roundNumber(
                      previewProtein
                    )}
                    g
                  </strong>

                  <span>
                    protein
                  </span>
                </div>

                <div>
                  <strong>
                    {roundNumber(
                      previewCarbs
                    )}
                    g
                  </strong>

                  <span>
                    carbs
                  </span>
                </div>

                <div>
                  <strong>
                    {roundNumber(
                      previewFats
                    )}
                    g
                  </strong>

                  <span>
                    fat
                  </span>
                </div>
              </div>
            </div>

            <div className="target-modal-actions">
              <Button
                variant="success"
                onClick={
                  addFood
                }
              >
                Add Food
              </Button>

              <Button
                variant="secondary"
                onClick={
                  closeQuantityModal
                }
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================
          TARGET MODAL
      ======================================== */}

      {showTargets && (
        <div
          className="target-modal-overlay"
          onMouseDown={(event) => {
            if (
              event.target ===
              event.currentTarget
            ) {
              setShowTargets(false);
            }
          }}
        >
          <div className="target-modal">

            <div className="modal-header">
              <div>
                <span className="section-eyebrow">
                  GOALS
                </span>

                <h2>
                  Daily Nutrition Targets
                </h2>

                <p>
                  Set the targets shown throughout
                  TrainIQ.
                </p>
              </div>

              <button
                type="button"
                className="modal-close"
                onClick={() =>
                  setShowTargets(
                    false
                  )
                }
                aria-label="Close"
              >
                ×
              </button>
            </div>

            <label className="modal-input-label">
              Daily Calories

              <input
                type="number"
                min="1"
                step="1"
                value={
                  newCalorieTarget
                }
                onChange={(event) =>
                  setNewCalorieTarget(
                    event.target.value
                  )
                }
              />

              <span>
                Target in kcal per day.
              </span>
            </label>

            <label className="modal-input-label">
              Daily Protein

              <input
                type="number"
                min="1"
                step="1"
                value={
                  newProteinTarget
                }
                onChange={(event) =>
                  setNewProteinTarget(
                    event.target.value
                  )
                }
              />

              <span>
                Target in grams per day.
              </span>
            </label>

            <div className="target-modal-actions">
              <Button
                variant="success"
                onClick={
                  saveTargets
                }
              >
                Save Targets
              </Button>

              <Button
                variant="secondary"
                onClick={() =>
                  setShowTargets(
                    false
                  )
                }
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default Diet;