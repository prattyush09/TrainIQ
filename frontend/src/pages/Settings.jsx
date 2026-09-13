import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from "firebase/firestore";

import Button from "../components/ui/Button/Button";
import { auth, db } from "../firebase";
import "../styles/Settings.css";

const DEFAULT_SETTINGS = {
  fitnessGoal: "Build Muscle",
  trainingLocation: "Gym",
  calorieTarget: 2500,
  proteinTarget: 120,
  waterTarget: 3000,
};

function Settings() {
  const navigate = useNavigate();

  const [fitnessGoal, setFitnessGoal] = useState(
    DEFAULT_SETTINGS.fitnessGoal
  );

  const [trainingLocation, setTrainingLocation] = useState(
    DEFAULT_SETTINGS.trainingLocation
  );

  const [calorieTarget, setCalorieTarget] = useState(
    DEFAULT_SETTINGS.calorieTarget
  );

  const [proteinTarget, setProteinTarget] = useState(
    DEFAULT_SETTINGS.proteinTarget
  );

  const [waterTarget, setWaterTarget] = useState(
    DEFAULT_SETTINGS.waterTarget
  );

  const [hydrationTracking, setHydrationTracking] = useState(true);

  const [saved, setSaved] = useState(false);
  const [resetModal, setResetModal] = useState(null);

  /*
   * Load settings from Firebase
   */
  useEffect(() => {
    let unsubscribe;

    const loadSettings = async (user) => {
      if (!user) {
        navigate("/login");
        return;
      }

      try {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const data = userSnap.data();

          setFitnessGoal(
            data.fitnessGoal || DEFAULT_SETTINGS.fitnessGoal
          );

          setTrainingLocation(
            data.trainingLocation ||
              DEFAULT_SETTINGS.trainingLocation
          );

          setCalorieTarget(
            Number(data.calorieTarget) ||
              DEFAULT_SETTINGS.calorieTarget
          );

          setProteinTarget(
            Number(data.proteinTarget) ||
              DEFAULT_SETTINGS.proteinTarget
          );

          setWaterTarget(
            Number(data.waterTarget) ||
              DEFAULT_SETTINGS.waterTarget
          );

          setHydrationTracking(
            data.preferences?.hydrationTracking !== undefined
              ? data.preferences.hydrationTracking
              : true
          );
        }
      } catch (error) {
        console.error("Error loading settings:", error);
      }
    };

    unsubscribe = onAuthStateChanged(auth, loadSettings);

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [navigate]);

  const showSavedMessage = () => {
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);
  };

  /*
   * Save settings to Firebase
   */
  const saveSettings = async () => {
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

    const user = auth.currentUser;

    if (!user) {
      navigate("/login");
      return;
    }

    try {
      const userRef = doc(db, "users", user.uid);

      await setDoc(
        userRef,
        {
          fitnessGoal,
          trainingLocation,
          calorieTarget: calories,
          proteinTarget: protein,
          waterTarget: water,
          preferences: { hydrationTracking },
        },
        { merge: true }
      );

      setCalorieTarget(calories);
      setProteinTarget(protein);
      setWaterTarget(water);

      showSavedMessage();
    } catch (error) {
      console.error("Error saving settings:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="settings-page">
      <div className="settings-header">
        <div>
          <p className="settings-eyebrow">
            TRAINIq SETTINGS
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
              onClick={() => navigate("/profile")}
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
                <option value="Gym">Gym</option>

                <option value="Home">Home</option>

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
                    setCalorieTarget(e.target.value)
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
                    setProteinTarget(e.target.value)
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
                    setWaterTarget(e.target.value)
                  }
                />

                <span>ml</span>
              </div>

              <small>
                Daily water target
              </small>
            </div>

            <div className="settings-field">
              <label htmlFor="hydration-tracking">
                Hydration Tracking
              </label>

              <select
                id="hydration-tracking"
                value={hydrationTracking ? "ON" : "OFF"}
                onChange={(e) =>
                  setHydrationTracking(
                    e.target.value === "ON"
                  )
                }
              >
                <option value="ON">ON</option>
                <option value="OFF">OFF</option>
              </select>

              <small>
                Track your daily water intake with TrainIQ
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

        {/* APP INFO */}

        <section className="settings-section">
          <div className="settings-section-header">
            <div>
              <span className="settings-section-number">
                04
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
              <strong>Firebase Cloud Storage</strong>
            </div>
          </div>
        </section>
        
        <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center', width: '100%' }}>
          <Button variant="danger" onClick={handleLogout}>
            Log Out
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Settings;
