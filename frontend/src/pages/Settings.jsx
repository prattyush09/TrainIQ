import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc, setDoc, collection, getDocs, deleteDoc } from "firebase/firestore";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
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
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [resetting, setResetting] = useState(false);

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
      setError("Please ensure all targets are valid positive numbers.");
      return;
    }

    setError("");
    setSaving(true);

    const user = auth.currentUser;

    if (!user) {
      setSaving(false);
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
      setError("Couldn't save your settings. Check your connection and try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    try {
      setLogoutLoading(true);
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
      setError("Couldn't log out. Try again.");
      setLogoutLoading(false);
    }
  };

  const handleResetProgress = async () => {
    const user = auth.currentUser;
    if (!user) return;

    if (window.confirm("Are you sure you want to reset all workout progress? This cannot be undone.")) {
      setResetting(true);
      try {
        const progressRef = collection(db, "users", user.uid, "workoutProgress");
        const snapshot = await getDocs(progressRef);
        const deletePromises = snapshot.docs.map(doc => deleteDoc(doc.ref));
        await Promise.all(deletePromises);
        alert("All workout progress has been reset.");
      } catch (err) {
        console.error("Error resetting progress:", err);
        alert("Failed to reset progress.");
      } finally {
        setResetting(false);
      }
    }
  };

  return (
    <div className="settings-page-v2">
      <div className="settings-header-v2">
        <div>
          <p className="settings-eyebrow-v2">
            TRAINIQ SETTINGS
          </p>

          <h1>Settings</h1>

          <p className="settings-subtitle-v2">
            Manage your fitness preferences,
            targets, and app data.
          </p>
        </div>
      </div>

      <div className="settings-layout-v2">
        {/* PROFILE */}

        <section className="settings-section-v2">
          <div className="settings-section-header-v2">
            <div>
              <span className="settings-section-number-v2">
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

          <Card className="settings-card-v2 profile-settings-card-v2">
            <div>
              <h3>Your Profile</h3>

              <p>
                Update your personal fitness
                information from your profile
                page.
              </p>
            </div>

            <Button
              variant="default"
              onClick={() => navigate("/profile")}
            >
              Open Profile
            </Button>
          </Card>
        </section>

        {/* FITNESS PREFERENCES */}

        <section className="settings-section-v2">
          <div className="settings-section-header-v2">
            <div>
              <span className="settings-section-number-v2">
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

          <Card className="settings-card-v2">
            <div className="settings-fields-grid-v2">
              <div className="settings-field-v2">
                <label htmlFor="fitness-goal">
                  Fitness Goal
                </label>

                <Select value={fitnessGoal} onValueChange={setFitnessGoal}>
                  <SelectTrigger id="fitness-goal">
                    <SelectValue placeholder="Select a goal" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Build Muscle">Build Muscle</SelectItem>
                    <SelectItem value="Gain Weight">Gain Weight</SelectItem>
                    <SelectItem value="Lose Weight">Lose Weight</SelectItem>
                    <SelectItem value="Get Stronger">Get Stronger</SelectItem>
                    <SelectItem value="Improve Fitness">Improve Fitness</SelectItem>
                    <SelectItem value="Maintain">Maintain</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="settings-field-v2">
                <label htmlFor="training-location">
                  Training Location
                </label>

                <Select value={trainingLocation} onValueChange={setTrainingLocation}>
                  <SelectTrigger id="training-location">
                    <SelectValue placeholder="Select a location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Gym">Gym</SelectItem>
                    <SelectItem value="Home">Home</SelectItem>
                    <SelectItem value="Both">Gym + Home</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>
        </section>

        {/* DAILY TARGETS */}

        <section className="settings-section-v2">
          <div className="settings-section-header-v2">
            <div>
              <span className="settings-section-number-v2">
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

          <Card className="settings-card-v2">
            <div className="targets-settings-grid-v2">
              <div className="settings-field-v2">
                <label htmlFor="calorie-target">
                  Calories
                </label>

                <div className="settings-input-wrapper-v2">
                  <Input
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

              <div className="settings-field-v2">
                <label htmlFor="protein-target">
                  Protein
                </label>

                <div className="settings-input-wrapper-v2">
                  <Input
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

              <div className="settings-field-v2">
                <label htmlFor="water-target">
                  Water
                </label>

                <div className="settings-input-wrapper-v2">
                  <Input
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

              <div className="settings-field-v2">
                <label htmlFor="hydration-tracking">
                  Hydration Tracking
                </label>

                <div className="hydration-toggle-v2">
                  <Switch
                    id="hydration-tracking"
                    checked={hydrationTracking}
                    onCheckedChange={setHydrationTracking}
                  />
                  <span>
                    {hydrationTracking ? "ON" : "OFF"}
                  </span>
                </div>

                <small>
                  Track your daily water intake with TrainIQ
                </small>
              </div>

              <div className="settings-save-row-v2">
                {error && (
                  <div className="settings-error-v2">
                    {error}
                  </div>
                )}

                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: 1 }}>
                  <Button
                    variant="default"
                    onClick={saveSettings}
                    disabled={saving}
                  >
                    {saving ? "Saving..." : "Save Changes"}
                  </Button>

                  {saved && !saving && (
                    <span className="settings-saved-v2">
                      Changes saved
                    </span>
                  )}
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* APP INFO */}

        <section className="settings-section-v2">
          <div className="settings-section-header-v2">
            <div>
              <span className="settings-section-number-v2">
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

          <Card className="settings-card-v2 about-card-v2">
            <div className="about-item-v2">
              <span>Application</span>
              <strong>TrainIQ</strong>
            </div>

            <div className="about-item-v2">
              <span>Version</span>
              <strong>1.0.0</strong>
            </div>

            <div className="about-item-v2">
              <span>Storage</span>
              <strong>Firebase Cloud Storage</strong>
            </div>
          </Card>
        </section>

        {/* DEVELOPER TOOLS */}
        <section className="settings-section-v2">
          <div className="settings-section-header-v2">
            <div>
              <span className="settings-section-number-v2">05</span>
              <div>
                <h2>Developer Tools</h2>
                <p>Manage app data directly.</p>
              </div>
            </div>
          </div>
          <Card className="settings-card-v2 dev-tools-card-v2">
            <div>
              <h3 style={{ marginBottom: '0.5rem', fontSize: 'var(--text-h3)', fontWeight: '600' }}>Reset Workout Progress</h3>
              <p style={{ color: 'var(--color-fg-muted)', fontSize: 'var(--font-size-sm)', marginBottom: '1rem' }}>Clear all saved workout progress to test the completion flow again.</p>
              <Button variant="outline" onClick={handleResetProgress} disabled={resetting}>
                {resetting ? "Resetting..." : "Reset All Progress"}
              </Button>
            </div>
          </Card>
        </section>

        <div className="settings-logout-v2">
          <Button variant="destructive" onClick={handleLogout} disabled={logoutLoading}>
            {logoutLoading ? "Logging Out..." : "Log Out"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Settings;