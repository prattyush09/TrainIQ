import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";

import { onAuthStateChanged } from "firebase/auth";

import { auth, db } from "../firebase";
import { signOut } from "firebase/auth";

import { Settings as SettingsIcon, LogOut } from "lucide-react";
import Button from "../components/ui/Button/Button";
import "../styles/Profile.css";

const defaultProfile = {
  name: "TrainIQ User",
  email: "",
  age: "",
  height: "",
  weight: "",
  goal: "Muscle Gain",
  experience: "Beginner",
};

function Profile() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState(defaultProfile);
  const [formData, setFormData] = useState(defaultProfile);

  const [editing, setEditing] = useState(false);
  const [savedMessage, setSavedMessage] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // ==========================================
  // LOAD PROFILE FROM FIRESTORE
  // ==========================================

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      async (user) => {
        if (!user) {
          navigate("/login", {
            replace: true,
          });

          return;
        }

        try {
          setLoading(true);

          const userRef = doc(
            db,
            "users",
            user.uid
          );

          const userSnapshot =
            await getDoc(userRef);

          if (userSnapshot.exists()) {
            const firestoreData =
              userSnapshot.data();

            const loadedProfile = {
              ...defaultProfile,
              ...firestoreData,
              email: user.email || "",
            };

            setProfile(loadedProfile);
            setFormData(loadedProfile);
          } else {
            // If the user document doesn't exist yet,
            // create a basic profile from Firebase Auth.

            const newProfile = {
              ...defaultProfile,
              name:
                user.displayName ||
                "TrainIQ User",
              email: user.email || "",
            };

            await setDoc(
              userRef,
              newProfile,
              { merge: true }
            );

            setProfile(newProfile);
            setFormData(newProfile);
          }
        } catch (error) {
          console.error(
            "TrainIQ profile load error:",
            error
          );
        } finally {
          setLoading(false);
        }
      }
    );

    return () => unsubscribe();
  }, [navigate]);

  // ==========================================
  // HANDLE INPUT CHANGES
  // ==========================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ==========================================
  // SAVE PROFILE TO FIRESTORE
  // ==========================================

  const handleSave = async () => {
    const user = auth.currentUser;

    if (!user) {
      navigate("/login", {
        replace: true,
      });

      return;
    }

    try {
      setSaving(true);
      setSavedMessage("");

      const updatedProfile = {
        ...formData,

        name:
          formData.name.trim() ||
          "TrainIQ User",

        // Always use Firebase Auth email
        email: user.email || "",

        updatedAt: new Date(),
      };

      const userRef = doc(
        db,
        "users",
        user.uid
      );

      await setDoc(
        userRef,
        updatedProfile,
        { merge: true }
      );

      setProfile(updatedProfile);
      setFormData(updatedProfile);

      setEditing(false);

      setSavedMessage(
        "Profile updated successfully."
      );

      setTimeout(() => {
        setSavedMessage("");
      }, 2500);
    } catch (error) {
      console.error(
        "TrainIQ profile save error:",
        error
      );

      setSavedMessage(
        "Unable to save profile. Please try again."
      );
    } finally {
      setSaving(false);
    }
  };

  // ==========================================
  // CANCEL EDITING
  // ==========================================

  const handleCancel = () => {
    setFormData(profile);
    setEditing(false);
    setSavedMessage("");
  };

  // ==========================================
  // LOGOUT
  // ==========================================

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("TrainIQ logout error:", error);
    }
  };

  // ==========================================
  // GET INITIALS
  // ==========================================

  const getInitials = () => {
    const name = profile.name?.trim();

    if (!name) {
      return "T";
    }

    const words = name.split(/\s+/);

    if (words.length === 1) {
      return words[0][0].toUpperCase();
    }

    return (
      words[0][0] +
      words[words.length - 1][0]
    ).toUpperCase();
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div className="profile-page">
        <div className="profile-header">
          <div>
            <span className="profile-eyebrow">
              TRAINIQ PROFILE
            </span>

            <h1>Your Profile</h1>

            <p>
              Loading your profile...
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // UI
  // ==========================================

  return (
    <div className="profile-page">

      {/* =====================================
          HEADER
      ===================================== */}

      <div className="profile-header">

        <div>
          <span className="profile-eyebrow">
            TRAINIQ PROFILE
          </span>

          <h1>Your Profile</h1>

          <p>
            Manage your personal fitness information.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <Button
            variant="secondary"
            onClick={() => navigate("/settings")}
            style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <SettingsIcon size={16} />
            Settings
          </Button>

          <Button
            variant="danger"
            onClick={handleLogout}
            style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <LogOut size={16} />
            Logout
          </Button>
        </div>

      </div>


      {/* =====================================
          SUCCESS / ERROR MESSAGE
      ===================================== */}

      {savedMessage && (
        <div className="profile-success">
          {savedMessage}
        </div>
      )}


      {/* =====================================
          PROFILE GRID
      ===================================== */}

      <div className="profile-grid">

        {/* ===================================
            PROFILE SUMMARY
        =================================== */}

        <div className="profile-card profile-summary-card">

          <div className="profile-avatar">
            {getInitials()}
          </div>

          <h2>{profile.name}</h2>

          <p>
            {profile.email ||
              "No email added"}
          </p>

          <div className="profile-goal">

            <span>
              Current Goal
            </span>

            <strong>
              {profile.goal}
            </strong>

          </div>

        </div>


        {/* ===================================
            PERSONAL INFORMATION
        =================================== */}

        <div className="profile-card profile-info-card">

          <div className="profile-card-header">

            <div>

              <span className="profile-label">
                PERSONAL INFORMATION
              </span>

              <h2>
                About You
              </h2>

            </div>


            {!editing && (
              <Button
                variant="primary"
                onClick={() => {
                  setFormData(profile);
                  setEditing(true);
                  setSavedMessage("");
                }}
              >
                Edit Profile
              </Button>
            )}

          </div>


          <div className="profile-form">

            {/* =================================
                NAME
            ================================= */}

            <div className="profile-field">

              <label htmlFor="profile-name">
                Full Name
              </label>

              {editing ? (
                <input
                  id="profile-name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  disabled={saving}
                />
              ) : (
                <div className="profile-value">
                  {profile.name ||
                    "Not set"}
                </div>
              )}

            </div>


            {/* =================================
                EMAIL
            ================================= */}

            <div className="profile-field">

              <label htmlFor="profile-email">
                Email
              </label>

              {editing ? (
                <input
                  id="profile-email"
                  name="email"
                  type="email"
                  value={formData.email}
                  disabled
                />
              ) : (
                <div className="profile-value">
                  {profile.email ||
                    "Not set"}
                </div>
              )}

            </div>


            {/* =================================
                AGE + HEIGHT
            ================================= */}

            <div className="profile-two-column">

              <div className="profile-field">

                <label htmlFor="profile-age">
                  Age
                </label>

                {editing ? (
                  <input
                    id="profile-age"
                    name="age"
                    type="number"
                    min="1"
                    max="120"
                    value={formData.age}
                    onChange={handleChange}
                    placeholder="Age"
                    disabled={saving}
                  />
                ) : (
                  <div className="profile-value">
                    {profile.age
                      ? `${profile.age} years`
                      : "Not set"}
                  </div>
                )}

              </div>


              <div className="profile-field">

                <label htmlFor="profile-height">
                  Height
                </label>

                {editing ? (
                  <input
                    id="profile-height"
                    name="height"
                    type="number"
                    min="1"
                    value={formData.height}
                    onChange={handleChange}
                    placeholder="cm"
                    disabled={saving}
                  />
                ) : (
                  <div className="profile-value">
                    {profile.height
                      ? `${profile.height} cm`
                      : "Not set"}
                  </div>
                )}

              </div>

            </div>


            {/* =================================
                WEIGHT + EXPERIENCE
            ================================= */}

            <div className="profile-two-column">

              <div className="profile-field">

                <label htmlFor="profile-weight">
                  Weight
                </label>

                {editing ? (
                  <input
                    id="profile-weight"
                    name="weight"
                    type="number"
                    min="1"
                    step="0.1"
                    value={formData.weight}
                    onChange={handleChange}
                    placeholder="kg"
                    disabled={saving}
                  />
                ) : (
                  <div className="profile-value">
                    {profile.weight
                      ? `${profile.weight} kg`
                      : "Not set"}
                  </div>
                )}

              </div>


              <div className="profile-field">

                <label htmlFor="profile-experience">
                  Experience
                </label>

                {editing ? (
                  <select
                    id="profile-experience"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    disabled={saving}
                  >

                    <option value="Beginner">
                      Beginner
                    </option>

                    <option value="Intermediate">
                      Intermediate
                    </option>

                    <option value="Advanced">
                      Advanced
                    </option>

                  </select>
                ) : (
                  <div className="profile-value">
                    {profile.experience}
                  </div>
                )}

              </div>

            </div>


            {/* =================================
                FITNESS GOAL
            ================================= */}

            <div className="profile-field">

              <label htmlFor="profile-goal">
                Fitness Goal
              </label>

              {editing ? (
                <select
                  id="profile-goal"
                  name="goal"
                  value={formData.goal}
                  onChange={handleChange}
                  disabled={saving}
                >

                  <option value="Muscle Gain">
                    Muscle Gain
                  </option>

                  <option value="Weight Loss">
                    Weight Loss
                  </option>

                  <option value="Strength">
                    Strength
                  </option>

                  <option value="General Fitness">
                    General Fitness
                  </option>

                  <option value="Endurance">
                    Endurance
                  </option>

                </select>
              ) : (
                <div className="profile-value">
                  {profile.goal}
                </div>
              )}

            </div>


            {/* =================================
                ACTION BUTTONS
            ================================= */}

            {editing && (
              <div className="profile-actions">

                <Button
                  variant="success"
                  onClick={handleSave}
                  disabled={saving}
                >
                  {saving
                    ? "Saving..."
                    : "Save Changes"}
                </Button>

                <Button
                  variant="danger"
                  onClick={handleCancel}
                  disabled={saving}
                >
                  Cancel
                </Button>

              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  );
}

export default Profile;
