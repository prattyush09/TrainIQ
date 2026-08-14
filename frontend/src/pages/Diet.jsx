import { useEffect, useState } from "react";
import Button from "../components/ui/Button/Button";
import "../styles/Diet.css";

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
];

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

const getToday = () => {
  return new Date().toISOString().split("T")[0];
};

const normalizeFood = (food) => {
  const quantity = Number(food.quantity) > 0
    ? Number(food.quantity)
    : 1;

  return {
    ...food,
    quantity,
    totalCalories:
      food.totalCalories ??
      food.calories * quantity,
    totalProtein:
      food.totalProtein ??
      food.protein * quantity,
    totalCarbs:
      food.totalCarbs ??
      food.carbs * quantity,
    totalFats:
      food.totalFats ??
      food.fats * quantity,
  };
};

const normalizeLogs = (logs) => {
  const normalized = {};

  Object.keys(logs || {}).forEach((date) => {
    const day = logs[date];

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

function Diet() {
  const [search, setSearch] = useState("");
  const [selectedDate, setSelectedDate] = useState(getToday());
  const [selectedMeal, setSelectedMeal] =
    useState("Breakfast");

  const [selectedFood, setSelectedFood] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const [foodLogs, setFoodLogs] = useState(() => {
    const savedLogs = localStorage.getItem(
      "trainiq-food-logs"
    );

    if (savedLogs) {
      try {
        return normalizeLogs(JSON.parse(savedLogs));
      } catch {
        return {};
      }
    }

    const oldFoodLog =
      localStorage.getItem("trainiq-food-log");

    if (oldFoodLog) {
      try {
        const oldData = JSON.parse(oldFoodLog);

        return {
          [getToday()]: {
            ...createEmptyDay(),
            Breakfast: oldData.map(normalizeFood),
          },
        };
      } catch {
        return {};
      }
    }

    return {};
  });

  const [calorieTarget, setCalorieTarget] = useState(() => {
    return (
      Number(
        localStorage.getItem("trainiq-calorie-target")
      ) || 2500
    );
  });

  const [proteinTarget, setProteinTarget] = useState(() => {
    return (
      Number(
        localStorage.getItem("trainiq-protein-target")
      ) || 120
    );
  });

  const [showTargets, setShowTargets] = useState(false);

  const [newCalorieTarget, setNewCalorieTarget] =
    useState(calorieTarget);

  const [newProteinTarget, setNewProteinTarget] =
    useState(proteinTarget);

  const dailyMeals =
    foodLogs[selectedDate] || createEmptyDay();

  const foodLog = mealTypes.flatMap(
    (meal) => dailyMeals[meal] || []
  );

  useEffect(() => {
    localStorage.setItem(
      "trainiq-food-logs",
      JSON.stringify(foodLogs)
    );

    localStorage.removeItem("trainiq-food-log");
  }, [foodLogs]);

  useEffect(() => {
    localStorage.setItem(
      "trainiq-calorie-target",
      calorieTarget
    );

    localStorage.setItem(
      "trainiq-protein-target",
      proteinTarget
    );
  }, [calorieTarget, proteinTarget]);

  const filteredFoods = foodDatabase.filter((food) =>
    food.name
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const openQuantityModal = (food) => {
    setSelectedFood(food);
    setQuantity(1);
  };

  const closeQuantityModal = () => {
    setSelectedFood(null);
    setQuantity(1);
  };

  const addFood = () => {
    if (!selectedFood) return;

    const amount = Number(quantity);

    if (!Number.isFinite(amount) || amount <= 0) {
      return;
    }

    const foodEntry = {
      ...selectedFood,
      quantity: amount,
      totalCalories:
        selectedFood.calories * amount,
      totalProtein:
        selectedFood.protein * amount,
      totalCarbs:
        selectedFood.carbs * amount,
      totalFats:
        selectedFood.fats * amount,
    };

    setFoodLogs((prev) => {
      const currentDay =
        prev[selectedDate] || createEmptyDay();

      return {
        ...prev,
        [selectedDate]: {
          ...currentDay,
          [selectedMeal]: [
            ...(currentDay[selectedMeal] || []),
            foodEntry,
          ],
        },
      };
    });

    closeQuantityModal();
  };

  const removeFood = (meal, index) => {
    setFoodLogs((prev) => {
      const currentDay =
        prev[selectedDate] || createEmptyDay();

      return {
        ...prev,
        [selectedDate]: {
          ...currentDay,
          [meal]: currentDay[meal].filter(
            (_, foodIndex) => foodIndex !== index
          ),
        },
      };
    });
  };

  const clearMeal = (meal) => {
    setFoodLogs((prev) => {
      const currentDay =
        prev[selectedDate] || createEmptyDay();

      return {
        ...prev,
        [selectedDate]: {
          ...currentDay,
          [meal]: [],
        },
      };
    });
  };

  const clearFoodLog = () => {
    setFoodLogs((prev) => ({
      ...prev,
      [selectedDate]: createEmptyDay(),
    }));
  };

  const saveTargets = () => {
    const calories = Number(newCalorieTarget);
    const protein = Number(newProteinTarget);

    if (
      Number.isFinite(calories) &&
      calories > 0 &&
      Number.isFinite(protein) &&
      protein > 0
    ) {
      setCalorieTarget(calories);
      setProteinTarget(protein);
      setShowTargets(false);
    }
  };

  const getCalories = (food) =>
    food.totalCalories ??
    food.calories * (Number(food.quantity) || 1);

  const getProtein = (food) =>
    food.totalProtein ??
    food.protein * (Number(food.quantity) || 1);

  const getCarbs = (food) =>
    food.totalCarbs ??
    food.carbs * (Number(food.quantity) || 1);

  const getFats = (food) =>
    food.totalFats ??
    food.fats * (Number(food.quantity) || 1);

  const totalCalories = foodLog.reduce(
    (total, food) => total + getCalories(food),
    0
  );

  const totalProtein = foodLog.reduce(
    (total, food) => total + getProtein(food),
    0
  );

  const totalCarbs = foodLog.reduce(
    (total, food) => total + getCarbs(food),
    0
  );

  const totalFats = foodLog.reduce(
    (total, food) => total + getFats(food),
    0
  );

  const calorieProgress =
    calorieTarget > 0
      ? Math.min(
          (totalCalories / calorieTarget) * 100,
          100
        )
      : 0;

  const proteinProgress =
    proteinTarget > 0
      ? Math.min(
          (totalProtein / proteinTarget) * 100,
          100
        )
      : 0;

  const isToday = selectedDate === getToday();

  const formatNumber = (value) => {
    return Math.round(value * 10) / 10;
  };

  return (
    <div className="diet-page">
      <div className="diet-header">
        <div>
          <h1>Diet Tracker</h1>

          <p>
            {isToday
              ? "Track your nutrition today"
              : `Nutrition for ${selectedDate}`}
          </p>
        </div>

        <Button
          variant="primary"
          onClick={() => {
            setNewCalorieTarget(calorieTarget);
            setNewProteinTarget(proteinTarget);
            setShowTargets(true);
          }}
        >
          Set Targets
        </Button>
      </div>

      <div className="diet-date-selector">
        <label htmlFor="diet-date">
          Select Date
        </label>

        <input
          id="diet-date"
          type="date"
          value={selectedDate}
          max={getToday()}
          onChange={(e) =>
            setSelectedDate(e.target.value)
          }
        />

        {!isToday && (
          <Button
            variant="primary"
            onClick={() =>
              setSelectedDate(getToday())
            }
          >
            Back to Today
          </Button>
        )}
      </div>

      <div className="nutrition-targets">
        <div className="target-card">
          <div className="target-header">
            <h3>Calories</h3>

            <span>
              {Math.round(totalCalories)} /{" "}
              {calorieTarget} kcal
            </span>
          </div>

          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{
                width: `${calorieProgress}%`,
              }}
            />
          </div>

          <p>
            {Math.max(
              calorieTarget -
                Math.round(totalCalories),
              0
            )}{" "}
            kcal remaining
          </p>
        </div>

        <div className="target-card">
          <div className="target-header">
            <h3>Protein</h3>

            <span>
              {formatNumber(totalProtein)} /{" "}
              {proteinTarget}g
            </span>
          </div>

          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{
                width: `${proteinProgress}%`,
              }}
            />
          </div>

          <p>
            {Math.max(
              proteinTarget -
                Math.round(totalProtein),
              0
            )}{" "}
            g remaining
          </p>
        </div>
      </div>

      <div className="nutrition-stats">
        <div className="nutrition-card">
          <h2>{Math.round(totalCalories)}</h2>
          <p>Calories</p>
        </div>

        <div className="nutrition-card">
          <h2>
            {formatNumber(totalProtein)}g
          </h2>
          <p>Protein</p>
        </div>

        <div className="nutrition-card">
          <h2>
            {formatNumber(totalCarbs)}g
          </h2>
          <p>Carbs</p>
        </div>

        <div className="nutrition-card">
          <h2>
            {formatNumber(totalFats)}g
          </h2>
          <p>Fats</p>
        </div>
      </div>

      <div className="food-search">
        <input
          type="text"
          placeholder="Search food..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />
      </div>

      <div className="meal-selector">
        <h2>Add Food To</h2>

        <div className="meal-buttons">
          {mealTypes.map((meal) => (
            <Button
              key={meal}
              variant={
                selectedMeal === meal
                  ? "success"
                  : "primary"
              }
              onClick={() =>
                setSelectedMeal(meal)
              }
            >
              {meal}
            </Button>
          ))}
        </div>

        <p>
          Adding food to:{" "}
          <strong>{selectedMeal}</strong>
        </p>
      </div>

      <div className="food-results">
        <h2>Food Database</h2>

        {filteredFoods.length === 0 ? (
          <p>No foods found.</p>
        ) : (
          filteredFoods.map((food) => (
            <div
              className="food-card"
              key={food.id}
            >
              <div>
                <h3>{food.name}</h3>

                <p>
                  {food.calories} kcal •{" "}
                  {food.protein}g protein •{" "}
                  {food.carbs}g carbs •{" "}
                  {food.fats}g fats
                </p>

                <small>
                  Per {food.servingUnit}
                </small>
              </div>

              <Button
                variant="primary"
                onClick={() =>
                  openQuantityModal(food)
                }
              >
                Add
              </Button>
            </div>
          ))
        )}
      </div>

      <div className="daily-food">
        <h2>
          {isToday
            ? "Today's Meals"
            : `Meals on ${selectedDate}`}
        </h2>

        {mealTypes.map((meal) => {
          const mealFoods =
            dailyMeals[meal] || [];

          const mealCalories =
            mealFoods.reduce(
              (total, food) =>
                total + getCalories(food),
              0
            );

          const mealProtein =
            mealFoods.reduce(
              (total, food) =>
                total + getProtein(food),
              0
            );

          return (
            <div
              className="meal-section"
              key={meal}
            >
              <div className="meal-header">
                <div>
                  <h3>{meal}</h3>

                  <p>
                    {Math.round(mealCalories)} kcal •{" "}
                    {formatNumber(mealProtein)}g
                    protein
                  </p>
                </div>

                {mealFoods.length > 0 && (
                  <Button
                    variant="danger"
                    onClick={() =>
                      clearMeal(meal)
                    }
                  >
                    Clear
                  </Button>
                )}
              </div>

              {mealFoods.length === 0 ? (
                <p className="empty-meal">
                  No food added.
                </p>
              ) : (
                mealFoods.map((food, index) => (
                  <div
                    className="logged-food"
                    key={`${food.id}-${index}`}
                  >
                    <div>
                      <h3>{food.name}</h3>

                      <p>
                        {food.quantity || 1} ×{" "}
                        {food.servingUnit ||
                          "serving"}{" "}
                        •{" "}
                        {Math.round(
                          getCalories(food)
                        )}{" "}
                        kcal •{" "}
                        {formatNumber(
                          getProtein(food)
                        )}
                        g protein
                      </p>
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
                ))
              )}
            </div>
          );
        })}

        {foodLog.length > 0 && (
          <Button
            variant="danger"
            onClick={clearFoodLog}
          >
            Clear Entire Day
          </Button>
        )}
      </div>

      {selectedFood && (
        <div className="target-modal-overlay">
          <div className="target-modal">
            <h2>
              Add {selectedFood.name}
            </h2>

            <p>
              Nutrition per{" "}
              {selectedFood.servingUnit}
            </p>

            <p>
              {selectedFood.calories} kcal •{" "}
              {selectedFood.protein}g protein •{" "}
              {selectedFood.carbs}g carbs •{" "}
              {selectedFood.fats}g fats
            </p>

            <label>
              Number of servings

              <input
                type="number"
                min="0.1"
                step="0.1"
                value={quantity}
                onChange={(e) =>
                  setQuantity(
                    e.target.value
                  )
                }
              />
            </label>

            <div className="target-modal-preview">
              <strong>
                Total Nutrition
              </strong>

              <p>
                {Math.round(
                  selectedFood.calories *
                    Number(quantity || 0)
                )}{" "}
                kcal
              </p>

              <p>
                {formatNumber(
                  selectedFood.protein *
                    Number(quantity || 0)
                )}
                g protein
              </p>

              <p>
                {formatNumber(
                  selectedFood.carbs *
                    Number(quantity || 0)
                )}
                g carbs
              </p>

              <p>
                {formatNumber(
                  selectedFood.fats *
                    Number(quantity || 0)
                )}
                g fats
              </p>
            </div>

            <div className="target-modal-actions">
              <Button
                variant="success"
                onClick={addFood}
              >
                Add Food
              </Button>

              <Button
                variant="danger"
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

      {showTargets && (
        <div className="target-modal-overlay">
          <div className="target-modal">
            <h2>
              Daily Nutrition Targets
            </h2>

            <label>
              Daily Calories

              <input
                type="number"
                min="1"
                value={newCalorieTarget}
                onChange={(e) =>
                  setNewCalorieTarget(
                    e.target.value
                  )
                }
              />
            </label>

            <label>
              Daily Protein (g)

              <input
                type="number"
                min="1"
                value={newProteinTarget}
                onChange={(e) =>
                  setNewProteinTarget(
                    e.target.value
                  )
                }
              />
            </label>

            <div className="target-modal-actions">
              <Button
                variant="success"
                onClick={saveTargets}
              >
                Save Targets
              </Button>

              <Button
                variant="danger"
                onClick={() =>
                  setShowTargets(false)
                }
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Diet;