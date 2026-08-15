import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button/Button";
import "../styles/Settings.css";

const DEFAULT_SETTINGS = {
  fitnessGoal: "Build Muscle",
  trainingLocation: "Gym",
};

function Settings() {
  const navigate = useNavigate();

  const [fitnessGoal, setFitnessGoal] = useState(() => {
    return (
      localStorage.getItem("trainiq-fitness-goal") ||
      DEFAULT_SETTINGS.fitnessGoal
    );
  });

  const [trainingLocation, setTrainingLocation] = useState(() => {
    return (
      localStorage.getItem("trainiq-training-location") ||
      DEFAULT_SETTINGS.trainingLocation
    );
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

  const [waterTarget, setWaterTarget] = useState(() => {
    return (
      Number(
        localStorage.getItem("trainiq-water-target")
      ) || 3000
    );
  });

  const [saved, setSaved] = useState(false);

  const [resetModal, setResetModal] = useState(null);

  useEffect(() => {
    localStorage.setItem(
      "trainiq-fitness-goal",
      fitnessGoal
    );

    localStorage.setItem(
      "trainiq-training-location",
      trainingLocation
    );
  }, [fitnessGoal, trainingLocation]);

  const showSavedMessage = () => {
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);
  };

  const saveSettings = () => {
    const calories = Number(calorieTarget);
    const protein = Number(proteinTarget);
    const water = Number(waterTarget);

    if (
      !Number.isFinite(calories) ||
      calories <= 0 ||
      !Number.isFinite(protein) ||
      protein <= 0 ||
      !Number.isFinite(water) ||
      water <= 0
    ) {
      return;
    }

    localStorage.setItem(
      "trainiq-fitness-goal",
      fitnessGoal
    );

    localStorage.setItem(
      "trainiq-training-location",
      trainingLocation
    );

    localStorage.setItem(
      "trainiq-calorie-target",
      calories
    );

    localStorage.setItem(
      "trainiq-protein-target",
      protein
    );

    localStorage.setItem(
      "trainiq-water-target",
      water
    );

    setCalorieTarget(calories);
    setProteinTarget(protein);
    setWaterTarget(water);

    showSavedMessage();
  };

  const resetDietData = () => {
    localStorage.removeItem("trainiq-food-logs");
    localStorage.removeItem("trainiq-food-log");

    setResetModal(null);
  };

  const resetWaterData = () => {
    localStorage.removeItem("trainiq-water");
    localStorage.removeItem("trainiq-water-history");

    setResetModal(null);
  };

  const resetWorkoutData = () => {
    Object.keys(localStorage).forEach((key) => {
      if (
        key.startsWith(
          "trainiq-workout-progress-"
        )
      ) {
        localStorage.removeItem(key);
      }
    });

    setResetModal(null);
  };

  const resetAllData = () => {
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith("trainiq-")) {
        localStorage.removeItem(key);
      }
    });

    setFitnessGoal(DEFAULT_SETTINGS.fitnessGoal);
    setTrainingLocation(
      DEFAULT_SETTINGS.trainingLocation
    );
    setCalorieTarget(2500);
    setProteinTarget(120);
    setWaterTarget(3000);

    setResetModal(null);
  };

  const handleReset = () => {
    if (resetModal === "diet") {
      resetDietData();
    }

    if (resetModal === "water") {
      resetWaterData();
    }

    if (resetModal === "workouts") {
      resetWorkoutData();
    }

    if (resetModal === "all") {
      resetAllData();
    }
  };

  return (
    <div className="settings-page">
      <div className="settings-header">
        <div>
          <p className="settings-eyebrow">
            TRAINIQ SETTINGS
          </p>

          <h1>Settings</h1>

          <p className="settings-subtitle">
            Manage your fitness preferences,
            targets, and app data.
          </p>
        </div>
      </div>

      <div className="settings-layout">
        {/* PROFILE */}

        <section className="settings-section">
          <div className="settings-section-header">
            <div>
              <span className="settings-section-number">
                01
              </span>

              <div>
                <h2>Profile</h2>

                <p>
                  Manage your TrainIQ profile
                  information.
                </p>
              </div>
            </div>
          </div>

          <div className="settings-card profile-settings-card">
            <div>
              <h3>Your Profile</h3>

              <p>
                Update your personal fitness
                information from your profile
                page.
              </p>
            </div>

            <Button
              variant="primary"
              onClick={() =>
                navigate("/profile")
              }
            >
              Open Profile
            </Button>
          </div>
        </section>

        {/* FITNESS PREFERENCES */}

        <section className="settings-section">
          <div className="settings-section-header">
            <div>
              <span className="settings-section-number">
                02
              </span>

              <div>
                <h2>Fitness Preferences</h2>

                <p>
                  Tell TrainIQ how you want to
                  train.
                </p>
              </div>
            </div>
          </div>

          <div className="settings-card">
            <div className="settings-field">
              <label htmlFor="fitness-goal">
                Fitness Goal
              </label>

              <select
                id="fitness-goal"
                value={fitnessGoal}
                onChange={(e) =>
                  setFitnessGoal(e.target.value)
                }
              >
                <option value="Build Muscle">
                  Build Muscle
                </option>

                <option value="Gain Weight">
                  Gain Weight
                </option>

                <option value="Lose Weight">
                  Lose Weight
                </option>

                <option value="Get Stronger">
                  Get Stronger
                </option>

                <option value="Improve Fitness">
                  Improve Fitness
                </option>

                <option value="Maintain">
                  Maintain
                </option>
              </select>
            </div>

            <div className="settings-field">
              <label htmlFor="training-location">
                Training Location
              </label>

              <select
                id="training-location"
                value={trainingLocation}
                onChange={(e) =>
                  setTrainingLocation(
                    e.target.value
                  )
                }
              >
                <option value="Gym">
                  Gym
                </option>

                <option value="Home">
                  Home
                </option>

                <option value="Both">
                  Gym + Home
                </option>
              </select>
            </div>
          </div>
        </section>

        {/* DAILY TARGETS */}

        <section className="settings-section">
          <div className="settings-section-header">
            <div>
              <span className="settings-section-number">
                03
              </span>

              <div>
                <h2>Daily Targets</h2>

                <p>
                  These targets are shared with
                  your Diet and Dashboard pages.
                </p>
              </div>
            </div>
          </div>

          <div className="settings-card targets-settings-card">
            <div className="settings-field">
              <label htmlFor="calorie-target">
                Calories
              </label>

              <div className="settings-input-wrapper">
                <input
                  id="calorie-target"
                  type="number"
                  min="1"
                  value={calorieTarget}
                  onChange={(e) =>
                    setCalorieTarget(
                      e.target.value
                    )
                  }
                />

                <span>kcal</span>
              </div>

              <small>
                Daily calorie target
              </small>
            </div>

            <div className="settings-field">
              <label htmlFor="protein-target">
                Protein
              </label>

              <div className="settings-input-wrapper">
                <input
                  id="protein-target"
                  type="number"
                  min="1"
                  value={proteinTarget}
                  onChange={(e) =>
                    setProteinTarget(
                      e.target.value
                    )
                  }
                />

                <span>g</span>
              </div>

              <small>
                Daily protein target
              </small>
            </div>

            <div className="settings-field">
              <label htmlFor="water-target">
                Water
              </label>

              <div className="settings-input-wrapper">
                <input
                  id="water-target"
                  type="number"
                  min="1"
                  step="100"
                  value={waterTarget}
                  onChange={(e) =>
                    setWaterTarget(
                      e.target.value
                    )
                  }
                />

                <span>ml</span>
              </div>

              <small>
                Daily water target
              </small>
            </div>

            <div className="settings-save-row">
              <Button
                variant="success"
                onClick={saveSettings}
              >
                Save Changes
              </Button>

              {saved && (
                <span className="settings-saved">
                  Changes saved
                </span>
              )}
            </div>
          </div>
        </section>

        {/* DATA MANAGEMENT */}

        <section className="settings-section">
          <div className="settings-section-header">
            <div>
              <span className="settings-section-number">
                04
              </span>

              <div>
                <h2>Data Management</h2>

                <p>
                  Manage the data stored locally
                  by TrainIQ.
                </p>
              </div>
            </div>
          </div>

          <div className="settings-card data-settings-card">
            <div className="data-row">
              <div>
                <h3>Diet Data</h3>

                <p>
                  Delete all saved food logs.
                  Your nutrition targets will
                  remain unchanged.
                </p>
              </div>

              <Button
                variant="danger"
                onClick={() =>
                  setResetModal("diet")
                }
              >
                Reset Diet
              </Button>
            </div>

            <div className="data-row">
              <div>
                <h3>Water Data</h3>

                <p>
                  Delete today's water amount
                  and your saved water history.
                </p>
              </div>

              <Button
                variant="danger"
                onClick={() =>
                  setResetModal("water")
                }
              >
                Reset Water
              </Button>
            </div>

            <div className="data-row">
              <div>
                <h3>Workout Progress</h3>

                <p>
                  Delete all saved workout
                  completion and progress data.
                </p>
              </div>

              <Button
                variant="danger"
                onClick={() =>
                  setResetModal("workouts")
                }
              >
                Reset Workouts
              </Button>
            </div>

            <div className="data-row danger-row">
              <div>
                <h3>Reset TrainIQ</h3>

                <p>
                  Permanently remove all TrainIQ
                  data stored in this browser.
                </p>
              </div>

              <Button
                variant="danger"
                onClick={() =>
                  setResetModal("all")
                }
              >
                Reset Everything
              </Button>
            </div>
          </div>
        </section>

        {/* APP INFO */}

        <section className="settings-section">
          <div className="settings-section-header">
            <div>
              <span className="settings-section-number">
                05
              </span>

              <div>
                <h2>About TrainIQ</h2>

                <p>
                  Information about this version
                  of the application.
                </p>
              </div>
            </div>
          </div>

          <div className="settings-card about-card">
            <div className="about-item">
              <span>Application</span>
              <strong>TrainIQ</strong>
            </div>

            <div className="about-item">
              <span>Version</span>
              <strong>1.0.0</strong>
            </div>

            <div className="about-item">
              <span>Storage</span>
              <strong>Local Browser Storage</strong>
            </div>
          </div>
        </section>
      </div>

      {/* RESET CONFIRMATION */}

      {resetModal && (
        <div className="settings-modal-overlay">
          <div className="settings-modal">
            <div className="settings-modal-icon">
              !
            </div>

            <h2>
              {resetModal === "all"
                ? "Reset TrainIQ?"
                : "Reset this data?"}
            </h2>

            <p>
              {resetModal === "diet" &&
                "This will permanently delete all saved food logs."}

              {resetModal === "water" &&
                "This will permanently delete your water history and today's water data."}

              {resetModal === "workouts" &&
                "This will permanently delete all saved workout progress."}

              {resetModal === "all" &&
                "This will permanently delete all TrainIQ data stored in this browser. This action cannot be undone."}
            </p>

            <div className="settings-modal-actions">
              <Button
                variant="danger"
                onClick={handleReset}
              >
                Yes, Reset
              </Button>

              <Button
                variant="primary"
                onClick={() =>
                  setResetModal(null)
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

export default Settings;