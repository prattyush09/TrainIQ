import { useEffect, useState, useMemo } from "react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { auth, db } from "../firebase";
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
  const date = new Date();

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const normalizeFood = (food) => {
  const quantity =
    Number(food?.quantity) > 0
      ? Number(food.quantity)
      : 1;

  return {
    ...food,
    quantity,

    totalCalories:
      food?.totalCalories ??
      Number(food?.calories || 0) * quantity,

    totalProtein:
      food?.totalProtein ??
      Number(food?.protein || 0) * quantity,

    totalCarbs:
      food?.totalCarbs ??
      Number(food?.carbs || 0) * quantity,

    totalFats:
      food?.totalFats ??
      Number(food?.fats || 0) * quantity,
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
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [modalError, setModalError] = useState("");

  const [search, setSearch] = useState("");
  const [selectedDate, setSelectedDate] =
    useState(getToday());

  const [selectedMeal, setSelectedMeal] =
    useState("Breakfast");

  const [selectedFood, setSelectedFood] =
    useState(null);

  const [quantity, setQuantity] = useState(1);

  const [foodLogs, setFoodLogs] = useState({});

  const [calorieTarget, setCalorieTarget] =
    useState(2500);

  const [proteinTarget, setProteinTarget] =
    useState(120);

  const [showTargets, setShowTargets] =
    useState(false);

  const [showAddFood, setShowAddFood] =
    useState(false);

  const [newCalorieTarget, setNewCalorieTarget] =
    useState(2500);

  const [newProteinTarget, setNewProteinTarget] =
    useState(120);

  /*
   * ==========================================
   * LOCAL STORAGE HELPERS
   * ==========================================
   */

  const getLocalStorageLogs = () => {
    const savedLogs =
      localStorage.getItem(
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
     * Compatibility with the original
     * trainiq-food-log format.
     */

    const oldFoodLog =
      localStorage.getItem(
        "trainiq-food-log"
      );

    if (oldFoodLog) {
      try {
        const oldData =
          JSON.parse(oldFoodLog);

        return {
          [getToday()]: {
            ...createEmptyDay(),
            Breakfast: Array.isArray(oldData)
              ? oldData.map(normalizeFood)
              : [],
          },
        };
      } catch {
        return {};
      }
    }

    return {};
  };

  /*
   * ==========================================
   * MIGRATE LOCAL DATA → FIRESTORE
   * ==========================================
   */

  const migrateLocalLogs = async (
    uid,
    logs
  ) => {
    try {
      const dates = Object.keys(logs);

      for (const date of dates) {
        const day = logs[date];

        const dayRef = doc(
          db,
          "users",
          uid,
          "dietLogs",
          date
        );

        await setDoc(
          dayRef,
          {
            Breakfast:
              Array.isArray(day.Breakfast)
                ? day.Breakfast
                : [],

            Lunch:
              Array.isArray(day.Lunch)
                ? day.Lunch
                : [],

            Dinner:
              Array.isArray(day.Dinner)
                ? day.Dinner
                : [],

            Snacks:
              Array.isArray(day.Snacks)
                ? day.Snacks
                : [],

            updatedAt:
              serverTimestamp(),
          },
          {
            merge: true,
          }
        );
      }

      console.log(
        "TrainIQ diet data migrated to Firebase."
      );
    } catch (error) {
      console.error(
        "Diet migration failed:",
        error
      );

      throw error;
    }
  };

  /*
   * ==========================================
   * LOAD FIREBASE DATA
   * ==========================================
   */

  async function loadFirebaseData(currentUser) {
    try {
      const uid = currentUser.uid;

      const userRef = doc(db, "users", uid);

      const userSnapshot = await getDoc(userRef);

      const userData = userSnapshot.exists()
        ? userSnapshot.data()
        : {};

      /*
       * ========================================
       * LOAD TARGETS
       * ========================================
       */

      let loadedCalorieTarget =
        Number(userData.calorieTarget) || 0;

      let loadedProteinTarget =
        Number(userData.proteinTarget) || 0;

      /*
       * If targets don't exist in Firebase,
       * migrate them from localStorage.
       */

      if (!loadedCalorieTarget) {
        loadedCalorieTarget =
          Number(
            localStorage.getItem(
              "trainiq-calorie-target"
            )
          ) || 2500;
      }

      if (!loadedProteinTarget) {
        loadedProteinTarget =
          Number(
            localStorage.getItem(
              "trainiq-protein-target"
            )
          ) || 120;
      }

      setCalorieTarget(loadedCalorieTarget);
      setProteinTarget(loadedProteinTarget);

      setNewCalorieTarget(loadedCalorieTarget);
      setNewProteinTarget(loadedProteinTarget);

      /*
       * ========================================
       * LOAD FIRESTORE DIET LOGS
       * ========================================
       */

      const dietLogsRef = collection(
        db,
        "users",
        uid,
        "dietLogs"
      );

      const snapshot = await getDocs(
        dietLogsRef
      );

      const firebaseLogs = {};

      snapshot.forEach((document) => {
        const data = document.data();

        firebaseLogs[document.id] = {
          Breakfast: Array.isArray(data.Breakfast)
            ? data.Breakfast.map(normalizeFood)
            : [],

          Lunch: Array.isArray(data.Lunch)
            ? data.Lunch.map(normalizeFood)
            : [],

          Dinner: Array.isArray(data.Dinner)
            ? data.Dinner.map(normalizeFood)
            : [],

          Snacks: Array.isArray(data.Snacks)
            ? data.Snacks.map(normalizeFood)
            : [],
        };
      });

      /*
       * ========================================
       * LOCAL STORAGE MIGRATION
       * ========================================
       *
       * Only migrate if Firebase has no diet logs.
       * Existing local data is preserved.
       */

      if (Object.keys(firebaseLogs).length === 0) {
        const migratedLogs =
          getLocalStorageLogs();

        if (
          Object.keys(migratedLogs).length > 0
        ) {
          await migrateLocalLogs(
            uid,
            migratedLogs
          );

          Object.assign(
            firebaseLogs,
            migratedLogs
          );
        }
      }

      /*
       * Save targets to Firebase if they were
       * missing from the user's document.
       */

      if (
        !userData.calorieTarget ||
        !userData.proteinTarget
      ) {
        await setDoc(
          userRef,
          {
            calorieTarget:
              loadedCalorieTarget,

            proteinTarget:
              loadedProteinTarget,

            updatedAt:
              serverTimestamp(),
          },
          {
            merge: true,
          }
        );
      }

      setFoodLogs(firebaseLogs);
    } catch (error) {
      console.error(
        "Error loading TrainIQ diet data:",
        error
      );

      /*
       * Firebase failed, so use existing local
       * data as a temporary fallback.
       */

      const localLogs =
        getLocalStorageLogs();

      setFoodLogs(localLogs);

      const localCalories =
        Number(
          localStorage.getItem(
            "trainiq-calorie-target"
          )
        ) || 2500;

      const localProtein =
        Number(
          localStorage.getItem(
            "trainiq-protein-target"
          )
        ) || 120;

      setCalorieTarget(localCalories);
      setProteinTarget(localProtein);

      setNewCalorieTarget(localCalories);
      setNewProteinTarget(localProtein);
    }
  }

  /*
   * ==========================================
   * FIREBASE AUTH
   * ==========================================
   */

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      async (currentUser) => {
        setUser(currentUser);

        if (!currentUser) {
          setFoodLogs({});
          setLoading(false);
          return;
        }

        await loadFirebaseData(currentUser);

        setLoading(false);
      }
    );

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

;


  /*
   * ==========================================
   * SAVE ONE DAY TO FIRESTORE
   * ==========================================
   */

  const saveDayToFirebase = async (
    date,
    day
  ) => {
    if (!user) return;

    try {
      setSaving(true);

      const dayRef = doc(
        db,
        "users",
        user.uid,
        "dietLogs",
        date
      );

      await setDoc(
        dayRef,
        {
          Breakfast:
            day.Breakfast || [],

          Lunch:
            day.Lunch || [],

          Dinner:
            day.Dinner || [],

          Snacks:
            day.Snacks || [],

          updatedAt:
            serverTimestamp(),
        },
        {
          merge: true,
        }
      );

      console.log(
        `Diet saved: ${date}`
      );
    } catch (error) {
      console.error(
        "Error saving diet data:",
        error
      );
      throw error;
    } finally {
      setSaving(false);
    }
  };

  /*
   * ==========================================
   * FILTER FOOD
   * ==========================================
   */

  const filteredFoods =
    foodDatabase.filter((food) =>
      food.name
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  const recentFoods = useMemo(() => {
    const recent = [];
    const seen = new Set();
    const dates = Object.keys(foodLogs).sort((a,b) => b.localeCompare(a));
    for (const date of dates) {
      const day = foodLogs[date];
      for (const meal of mealTypes) {
        if (day[meal] && Array.isArray(day[meal])) {
          for (let i = day[meal].length - 1; i >= 0; i--) {
            const food = day[meal][i];
            if (!seen.has(food.id)) {
              seen.add(food.id);
              const dbFood = foodDatabase.find(f => f.id === food.id);
              if (dbFood) {
                recent.push(dbFood);
                if (recent.length >= 4) return recent;
              }
            }
          }
        }
      }
    }
    return recent;
  }, [foodLogs]);

  /*
   * ==========================================
   * FOOD MODAL
   * ==========================================
   */

  const openQuantityModal = (food) => {
    setSelectedFood(food);
    setQuantity(1);
  };

  const closeQuantityModal = () => {
    setSelectedFood(null);
    setQuantity(1);
    setModalError("");
  };

  /*
   * ==========================================
   * ADD FOOD
   * ==========================================
   */

  const addFood = async () => {
    if (!selectedFood) return;

    const amount = Number(quantity);

    if (
      !Number.isFinite(amount) ||
      amount <= 0
    ) {
      setModalError("Please enter a valid positive serving amount.");
      return;
    }

    setModalError("");

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

    const currentDay =
      foodLogs[selectedDate] ||
      createEmptyDay();

    const updatedDay = {
      ...currentDay,

      [selectedMeal]: [
        ...(currentDay[selectedMeal] || []),
        foodEntry,
      ],
    };

    const updatedLogs = {
      ...foodLogs,
      [selectedDate]: updatedDay,
    };

    try {
      await saveDayToFirebase(
        selectedDate,
        updatedDay
      );
      setFoodLogs(updatedLogs);
      closeQuantityModal();
    } catch {
      setModalError("Failed to save food. Please try again.");
    }
  };

  /*
   * ==========================================
   * REMOVE FOOD
   * ==========================================
   */

  const removeFood = async (
    meal,
    index
  ) => {
    const currentDay =
      foodLogs[selectedDate] ||
      createEmptyDay();

    const updatedMeal =
      currentDay[meal].filter(
        (_, foodIndex) =>
          foodIndex !== index
      );

    const updatedDay = {
      ...currentDay,
      [meal]: updatedMeal,
    };

    const updatedLogs = {
      ...foodLogs,
      [selectedDate]: updatedDay,
    };

    try {
      await saveDayToFirebase(
        selectedDate,
        updatedDay
      );
      setFoodLogs(updatedLogs);
    } catch {
      setError("Failed to remove food. Please try again.");
    }
  };

  /*
   * ==========================================
   * CLEAR MEAL
   * ==========================================
   */

  const clearMeal = async (meal) => {
    const currentDay =
      foodLogs[selectedDate] ||
      createEmptyDay();

    const updatedDay = {
      ...currentDay,
      [meal]: [],
    };

    const updatedLogs = {
      ...foodLogs,
      [selectedDate]: updatedDay,
    };

    try {
      await saveDayToFirebase(
        selectedDate,
        updatedDay
      );
      setFoodLogs(updatedLogs);
    } catch {
      setError("Failed to clear meal. Please try again.");
    }
  };

  /*
   * ==========================================
   * CLEAR ENTIRE DAY
   * ==========================================
   */

  const clearFoodLog = async () => {
    const updatedDay = createEmptyDay();

    const updatedLogs = {
      ...foodLogs,
      [selectedDate]: updatedDay,
    };

    try {
      await saveDayToFirebase(
        selectedDate,
        updatedDay
      );
      setFoodLogs(updatedLogs);
    } catch {
      setError("Failed to clear day. Please try again.");
    }
  };

  /*
   * ==========================================
   * SAVE TARGETS
   * ==========================================
   */

  const saveTargets = async () => {
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
      return;
    }

    setCalorieTarget(calories);
    setProteinTarget(protein);

    /*
     * Save targets to Firebase.
     */

    if (user) {
      try {
        setSaving(true);

        const userRef = doc(
          db,
          "users",
          user.uid
        );

        await setDoc(
          userRef,
          {
            calorieTarget: calories,
            proteinTarget: protein,
            updatedAt:
              serverTimestamp(),
          },
          {
            merge: true,
          }
        );
      } catch (error) {
        console.error(
          "Error saving nutrition targets:",
          error
        );
      } finally {
        setSaving(false);
      }
    }

    setShowTargets(false);
  };

  /*
   * ==========================================
   * NUTRITION CALCULATIONS
   * ==========================================
   */

  const dailyMeals =
    foodLogs[selectedDate] ||
    createEmptyDay();

  const foodLog =
    mealTypes.flatMap(
      (meal) =>
        dailyMeals[meal] || []
    );

  const getCalories = (food) =>
    food.totalCalories ??
    Number(food.calories || 0) *
      (Number(food.quantity) || 1);

  const getProtein = (food) =>
    food.totalProtein ??
    Number(food.protein || 0) *
      (Number(food.quantity) || 1);

  const getCarbs = (food) =>
    food.totalCarbs ??
    Number(food.carbs || 0) *
      (Number(food.quantity) || 1);

  const getFats = (food) =>
    food.totalFats ??
    Number(food.fats || 0) *
      (Number(food.quantity) || 1);

  const totalCalories =
    foodLog.reduce(
      (total, food) =>
        total + getCalories(food),
      0
    );

  const totalProtein =
    foodLog.reduce(
      (total, food) =>
        total + getProtein(food),
      0
    );

  const totalCarbs =
    foodLog.reduce(
      (total, food) =>
        total + getCarbs(food),
      0
    );

  const totalFats =
    foodLog.reduce(
      (total, food) =>
        total + getFats(food),
      0
    );

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

  const isToday =
    selectedDate === getToday();

  const formatNumber = (value) =>
    Math.round(value * 10) / 10;

  /*
   * ==========================================
   * LOADING STATE
   * ==========================================
   */

  if (loading) {
    return (
      <div className="diet-page">
        <div className="diet-header">
          <div>
            <h1>Diet Tracker</h1>
            <p>Loading your nutrition data...</p>
          </div>
        </div>
      </div>
    );
  }

  /*
   * ==========================================
   * RENDER
   * ==========================================
   */

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

          {saving && (
            <small>
              Saving...
            </small>
          )}
        </div>

        <Button
          variant="primary"
          onClick={() => {
            setNewCalorieTarget(
              calorieTarget
            );

            setNewProteinTarget(
              proteinTarget
            );

            setShowTargets(true);
          }}
        >
          Set Targets
        </Button>
      </div>

      {error && (
        <div style={{ backgroundColor: '#fef2f2', border: '1px solid #ef4444', color: '#ef4444', padding: '12px', borderRadius: '8px', marginBottom: '24px', textAlign: 'center' }}>
          {error}
        </div>
      )}

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
                Math.round(
                  totalCalories
                ),
              0
            )}{" "}
            kcal remaining
          </p>
        </div>

        <div className="target-card">
          <div className="target-header">
            <h3>Protein</h3>

            <span>
              {formatNumber(
                totalProtein
              )}{" "}
              / {proteinTarget}g
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
                Math.round(
                  totalProtein
                ),
              0
            )}{" "}
            g remaining
          </p>
        </div>
      </div>

      <div className="nutrition-stats">
        <div className="nutrition-card">
          <h2>
            {Math.round(totalCalories)}
          </h2>
          <p>Calories</p>
        </div>

        <div className="nutrition-card">
          <h2>
            {formatNumber(
              totalProtein
            )}
            g
          </h2>
          <p>Protein</p>
        </div>

        <div className="nutrition-card">
          <h2>
            {formatNumber(
              totalCarbs
            )}
            g
          </h2>
          <p>Carbs</p>
        </div>

        <div className="nutrition-card">
          <h2>
            {formatNumber(
              totalFats
            )}
            g
          </h2>
          <p>Fats</p>
        </div>
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
                total +
                getCalories(food),
              0
            );

          const mealProtein =
            mealFoods.reduce(
              (total, food) =>
                total +
                getProtein(food),
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
                    {Math.round(
                      mealCalories
                    )}{" "}
                    kcal •{" "}
                    {formatNumber(
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

              {mealFoods.length === 0 ? (
                <div style={{ padding: '24px 16px', textAlign: 'center', backgroundColor: 'var(--surface-card)', borderRadius: '12px', marginTop: '12px' }}>
                  <h4 style={{ marginBottom: '8px', color: 'var(--text-primary)' }}>No food logged yet</h4>
                  <p style={{ color: 'var(--text-muted)', marginBottom: '16px', fontSize: '14px' }}>Add food to {meal} to start tracking.</p>
                  <Button variant="secondary" onClick={() => { setSelectedMeal(meal); setShowAddFood(true); }}>
                    + Add to {meal}
                  </Button>
                </div>
              ) : (
                mealFoods.map(
                  (
                    food,
                    index
                  ) => (
                    <div
                      className="logged-food"
                      key={`${food.id}-${index}`}
                    >
                      <div>
                        <h3>
                          {food.name}
                        </h3>

                        <p>
                          {food.quantity ||
                            1}{" "}
                          ×{" "}
                          {food.servingUnit ||
                            "serving"}{" "}
                          •{" "}
                          {Math.round(
                            getCalories(
                              food
                            )
                          )}{" "}
                          kcal •{" "}
                          {formatNumber(
                            getProtein(
                              food
                            )
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
                  )
                )
              )}
            </div>
          );
        })}

        {foodLog.length > 0 && (
          <Button
            variant="danger"
            onClick={
              clearFoodLog
            }
          >
            Clear Entire Day
          </Button>
        )}
      </div>

      <div className="meal-selector" style={{ marginTop: '32px' }}>
        <h2>Add Food To</h2>
        <div className="meal-buttons">
          {mealTypes.map((meal) => (
            <Button
              key={meal}
              variant={selectedMeal === meal ? "success" : "primary"}
              onClick={() => setSelectedMeal(meal)}
            >
              {meal}
            </Button>
          ))}
        </div>
        <div style={{ marginTop: '1rem', width: '100%' }}>
          <Button variant="primary" style={{ width: '100%', padding: '1rem' }} onClick={() => setShowAddFood(true)}>
            + Add Food
          </Button>
        </div>
      </div>

      <div className="diet-date-selector" style={{ marginTop: '32px', marginBottom: '32px', display: 'flex', justifyContent: 'center', background: 'transparent', border: 'none', padding: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <label htmlFor="diet-date" style={{ color: 'var(--text-muted)', fontSize: '13px' }}>View another date:</label>
          <input
            id="diet-date"
            type="date"
            value={selectedDate}
            max={getToday()}
            onChange={(e) => setSelectedDate(e.target.value)}
            style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--surface-card)', color: '#ffffff', minWidth: 'auto' }}
          />
          {!isToday && (
            <Button variant="secondary" onClick={() => setSelectedDate(getToday())} style={{ padding: '8px 12px', minWidth: 'auto' }}>
              Today
            </Button>
          )}
        </div>
      </div>

      {selectedFood && (
        <div className="target-modal-overlay">
          <div className="target-modal">
            <h2>
              Add{" "}
              {selectedFood.name}
            </h2>

            <p>
              Nutrition per{" "}
              {
                selectedFood.servingUnit
              }
            </p>

            <p>
              {selectedFood.calories}{" "}
              kcal •{" "}
              {
                selectedFood.protein
              }
              g protein •{" "}
              {selectedFood.carbs}g
              carbs •{" "}
              {selectedFood.fats}g
              fats
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
                disabled={saving}
              />
            </label>

            <div className="target-modal-preview">
              <strong>
                Total Nutrition
              </strong>

              <p>
                {Math.round(
                  selectedFood.calories *
                    Number(
                      quantity || 0
                    )
                )}{" "}
                kcal
              </p>

              <p>
                {formatNumber(
                  selectedFood.protein *
                    Number(
                      quantity || 0
                    )
                )}
                g protein
              </p>

              <p>
                {formatNumber(
                  selectedFood.carbs *
                    Number(
                      quantity || 0
                    )
                )}
                g carbs
              </p>

              <p>
                {formatNumber(
                  selectedFood.fats *
                    Number(
                      quantity || 0
                    )
                )}
                g fats
              </p>
            </div>

            {modalError && (
              <p style={{ color: '#ef4444', marginBottom: '16px', textAlign: 'center', fontSize: '14px' }}>
                {modalError}
              </p>
            )}

            <div className="target-modal-actions">
              <Button
                variant="success"
                onClick={addFood}
                disabled={saving}
              >
                {saving
                  ? "Saving..."
                  : "Add Food"}
              </Button>

              <Button
                variant="danger"
                onClick={
                  closeQuantityModal
                }
                disabled={saving}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      <Sheet open={showAddFood} onOpenChange={setShowAddFood}>
        <SheetContent side="bottom" className="h-[80vh] sm:h-full sm:w-[450px] sm:side-right overflow-y-auto bg-surface-card text-foreground border-border border-l-0 sm:border-l">
          <SheetHeader className="mb-6">
            <SheetTitle className="text-xl font-bold">Add to {selectedMeal}</SheetTitle>
          </SheetHeader>
          
          <Input
            type="text"
            placeholder="Search food..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full mb-6"
          />
          
          {!search && recentFoods.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wider">Recent Foods</h3>
              <div className="flex gap-2 flex-wrap">
                {recentFoods.map(rf => (
                  <Button key={rf.id} variant="secondary" onClick={() => {
                     setShowAddFood(false);
                     openQuantityModal(rf);
                  }}>
                    {rf.name}
                  </Button>
                ))}
              </div>
            </div>
          )}
          
          <div className="food-results">
            <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wider">{search ? 'Search Results' : 'Food Database'}</h3>
            {filteredFoods.length === 0 ? (
              <p className="text-muted-foreground">No foods found.</p>
            ) : (
              <div className="flex flex-col gap-3">
                {filteredFoods.map((food) => (
                  <Card className="p-4 flex justify-between items-center bg-[rgba(9,13,22,0.6)] border-border hover:border-primary transition-colors cursor-pointer" key={food.id} onClick={() => {
                    setShowAddFood(false);
                    openQuantityModal(food);
                  }}>
                    <div>
                      <h3 className="font-bold text-foreground text-base mb-1">{food.name}</h3>
                      <p className="text-sm text-muted-foreground">{food.calories} kcal • {food.protein}g protein</p>
                      <small className="text-xs text-muted-foreground mt-1 block">Per {food.servingUnit}</small>
                    </div>
                    <Button variant="secondary" size="sm" onClick={(e) => {
                      e.stopPropagation();
                      setShowAddFood(false);
                      openQuantityModal(food);
                    }}>
                      Add
                    </Button>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>

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
                value={
                  newCalorieTarget
                }
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
                value={
                  newProteinTarget
                }
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
                onClick={
                  saveTargets
                }
                disabled={saving}
              >
                {saving
                  ? "Saving..."
                  : "Save Targets"}
              </Button>

              <Button
                variant="danger"
                onClick={() =>
                  setShowTargets(
                    false
                  )
                }
                disabled={saving}
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
