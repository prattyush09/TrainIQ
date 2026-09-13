import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import "../styles/ProfileSetup.css";

const defaultForm = {
  name: "",
  age: "",
  gender: "",
  height: "",
  weight: "",
  goal: "Muscle Gain",
  experience: "Beginner",
  trainingPreference: "Gym",
  activityLevel: "Moderately Active",
  workoutDays: "4",
  hydrationTracking: "",
};

function ProfileSetup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem(
      "trainiq-profile-setup"
    );

    if (saved) {
      try {
        return {
          ...defaultForm,
          ...JSON.parse(saved),
        };
      } catch {
        return defaultForm;
      }
    }

    return defaultForm;
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    // ==============================
    // VALIDATION
    // ==============================

    if (!formData.name.trim()) {
      setError("Please enter your full name.");
      return;
    }

    if (
      !formData.age ||
      Number(formData.age) <= 0
    ) {
      setError("Please enter a valid age.");
      return;
    }

    if (!formData.gender) {
      setError("Please select your gender.");
      return;
    }

    if (
      !formData.height ||
      Number(formData.height) <= 0
    ) {
      setError("Please enter your height.");
      return;
    }

    if (
      !formData.weight ||
      Number(formData.weight) <= 0
    ) {
      setError("Please enter your weight.");
      return;
    }

    if (formData.hydrationTracking === "") {
      setError("Please select your hydration tracking preference.");
      return;
    }

    // ==============================
    // CHECK FIREBASE USER
    // ==============================

    const user = auth.currentUser;

    if (!user) {
      setError(
        "Your session has expired. Please log in again."
      );

      navigate("/login", {
        replace: true,
      });

      return;
    }

    try {
      setLoading(true);

      // ==============================
      // PROFILE OBJECT
      // ==============================

      const profile = {
        uid: user.uid,

        name: formData.name.trim(),

        email: user.email || "",

        age: Number(formData.age),

        gender: formData.gender,

        height: Number(formData.height),

        weight: Number(formData.weight),

        goal: formData.goal,

        experience: formData.experience,

        trainingPreference:
          formData.trainingPreference,

        activityLevel:
          formData.activityLevel,

        workoutDays:
          Number(formData.workoutDays),

        preferences: {
          hydrationTracking: formData.hydrationTracking === "true",
        },

        profileCompleted: true,

        updatedAt: new Date(),
      };

      // ==============================
      // SAVE TO FIRESTORE
      // ==============================

      await setDoc(
        doc(db, "users", user.uid),
        profile,
        {
          merge: true,
        }
      );

      console.log(
        "TrainIQ profile saved to Firestore."
      );

      // ==============================
      // TEMPORARY LOCAL STORAGE
      // ==============================
      // Kept temporarily for form state recovery
      
      localStorage.setItem(
        "trainiq-profile-setup",
        JSON.stringify(formData)
      );

      // ==============================
      // GO TO DASHBOARD
      // ==============================

      navigate("/dashboard", {
        replace: true,
      });

    } catch (error) {
      console.error(
        "TrainIQ profile save error:",
        error
      );

      setError(
        "Unable to save your profile. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-setup-page">
      <div className="profile-setup-container">

        {/* ============================
            HEADER
        ============================ */}

        <div className="profile-setup-header">

          <span className="profile-setup-eyebrow">
            TRAINIQ
          </span>

          <h1>
            Set Up Your Profile
          </h1>

          <p>
            Tell TrainIQ a little about yourself
            so we can personalize your fitness
            experience.
          </p>

        </div>

        {/* ============================
            FORM
        ============================ */}

        <Card className="border-none bg-surface-card rounded-2xl p-6 sm:p-8">
          <form
            className="flex flex-col gap-10"
            onSubmit={handleSubmit}
          >

          {/* ============================
              BASIC INFORMATION
          ============================ */}

          <div className="setup-section">

            <div className="setup-section-header">

              <span className="setup-number">
                01
              </span>

              <div>
                <h2>
                  Basic Information
                </h2>

                <p>
                  Your personal details
                </p>
              </div>

            </div>

            <div className="setup-field">

              <label htmlFor="name">
                Full Name
              </label>

              <input
                id="name"
                name="name"
                type="text"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                autoComplete="name"
                disabled={loading}
              />

            </div>

            <div className="setup-two-column">

              <div className="setup-field">

                <label htmlFor="age">
                  Age
                </label>

                <input
                  id="age"
                  name="age"
                  type="number"
                  min="1"
                  max="120"
                  placeholder="e.g. 18"
                  value={formData.age}
                  onChange={handleChange}
                  disabled={loading}
                />

              </div>

              <div className="setup-field">

                <label htmlFor="gender">
                  Gender
                </label>

                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  disabled={loading}
                >

                  <option value="">
                    Select gender
                  </option>

                  <option value="Male">
                    Male
                  </option>

                  <option value="Female">
                    Female
                  </option>

                  <option value="Other">
                    Other
                  </option>

                  <option value="Prefer not to say">
                    Prefer not to say
                  </option>

                </select>

              </div>

            </div>

          </div>

          {/* ============================
              BODY INFORMATION
          ============================ */}

          <div className="setup-section">

            <div className="setup-section-header">

              <span className="setup-number">
                02
              </span>

              <div>
                <h2>
                  Body Information
                </h2>

                <p>
                  Used to personalize your fitness
                  targets
                </p>
              </div>

            </div>

            <div className="setup-two-column">

              <div className="setup-field">

                <label htmlFor="height">
                  Height (cm)
                </label>

                <input
                  id="height"
                  name="height"
                  type="number"
                  min="50"
                  max="250"
                  step="0.1"
                  placeholder="e.g. 180"
                  value={formData.height}
                  onChange={handleChange}
                  disabled={loading}
                />

              </div>

              <div className="setup-field">

                <label htmlFor="weight">
                  Weight (kg)
                </label>

                <input
                  id="weight"
                  name="weight"
                  type="number"
                  min="20"
                  max="300"
                  step="0.1"
                  placeholder="e.g. 70"
                  value={formData.weight}
                  onChange={handleChange}
                  disabled={loading}
                />

              </div>

            </div>

          </div>

          {/* ============================
              FITNESS GOAL
          ============================ */}

          <div className="setup-section">

            <div className="setup-section-header">

              <span className="setup-number">
                03
              </span>

              <div>
                <h2>
                  Fitness Goal
                </h2>

                <p>
                  What are you working towards?
                </p>
              </div>

            </div>

            <div className="setup-options">

              {[
                "Muscle Gain",
                "Weight Loss",
                "Strength",
                "General Fitness",
                "Endurance",
              ].map((goal) => (

                <label
                  className={`setup-option ${
                    formData.goal === goal
                      ? "selected"
                      : ""
                  }`}
                  key={goal}
                >

                  <input
                    type="radio"
                    name="goal"
                    value={goal}
                    checked={
                      formData.goal === goal
                    }
                    onChange={handleChange}
                    disabled={loading}
                  />

                  <span>
                    {goal}
                  </span>

                </label>

              ))}

            </div>

          </div>

          {/* ============================
              EXPERIENCE
          ============================ */}

          <div className="setup-section">

            <div className="setup-section-header">

              <span className="setup-number">
                04
              </span>

              <div>
                <h2>
                  Training Experience
                </h2>

                <p>
                  Select your current experience
                </p>
              </div>

            </div>

            <div className="setup-options">

              {[
                "Beginner",
                "Intermediate",
                "Advanced",
              ].map((experience) => (

                <label
                  className={`setup-option ${
                    formData.experience ===
                    experience
                      ? "selected"
                      : ""
                  }`}
                  key={experience}
                >

                  <input
                    type="radio"
                    name="experience"
                    value={experience}
                    checked={
                      formData.experience ===
                      experience
                    }
                    onChange={handleChange}
                    disabled={loading}
                  />

                  <span>
                    {experience}
                  </span>

                </label>

              ))}

            </div>

          </div>

          {/* ============================
              TRAINING PREFERENCE
          ============================ */}

          <div className="setup-section">

            <div className="setup-section-header">

              <span className="setup-number">
                05
              </span>

              <div>
                <h2>
                  Training Preference
                </h2>

                <p>
                  Where do you usually train?
                </p>
              </div>

            </div>

            <div className="setup-options">

              {[
                "Gym",
                "Home",
              ].map((preference) => (

                <label
                  className={`setup-option ${
                    formData.trainingPreference ===
                    preference
                      ? "selected"
                      : ""
                  }`}
                  key={preference}
                >

                  <input
                    type="radio"
                    name="trainingPreference"
                    value={preference}
                    checked={
                      formData.trainingPreference ===
                      preference
                    }
                    onChange={handleChange}
                    disabled={loading}
                  />

                  <span>
                    {preference}
                  </span>

                </label>

              ))}

            </div>

          </div>

          {/* ============================
              ACTIVITY LEVEL
          ============================ */}

          <div className="setup-section">

            <div className="setup-section-header">

              <span className="setup-number">
                06
              </span>

              <div>
                <h2>
                  Activity Level
                </h2>

                <p>
                  How active are you outside
                  workouts?
                </p>
              </div>

            </div>

            <div className="setup-field">

              <label htmlFor="activityLevel">
                Activity Level
              </label>

              <select
                id="activityLevel"
                name="activityLevel"
                value={formData.activityLevel}
                onChange={handleChange}
                disabled={loading}
              >

                <option value="Sedentary">
                  Sedentary
                </option>

                <option value="Lightly Active">
                  Lightly Active
                </option>

                <option value="Moderately Active">
                  Moderately Active
                </option>

                <option value="Very Active">
                  Very Active
                </option>

                <option value="Extremely Active">
                  Extremely Active
                </option>

              </select>

            </div>

          </div>

          {/* ============================
              WORKOUT DAYS
          ============================ */}

          <div className="setup-section">

            <div className="setup-section-header">

              <span className="setup-number">
                07
              </span>

              <div>
                <h2>
                  Weekly Training
                </h2>

                <p>
                  How many days do you want to
                  train?
                </p>
              </div>

            </div>

            <div className="setup-field">

              <label htmlFor="workoutDays">
                Workout Days Per Week
              </label>

              <select
                id="workoutDays"
                name="workoutDays"
                value={formData.workoutDays}
                onChange={handleChange}
                disabled={loading}
              >

                <option value="1">
                  1 day
                </option>

                <option value="2">
                  2 days
                </option>

                <option value="3">
                  3 days
                </option>

                <option value="4">
                  4 days
                </option>

                <option value="5">
                  5 days
                </option>

                <option value="6">
                  6 days
                </option>

                <option value="7">
                  7 days
                </option>

              </select>

            </div>

          </div>

          {/* ============================
              HYDRATION TRACKING
          ============================ */}

          <div className="setup-section">

            <div className="setup-section-header">

              <span className="setup-number">
                08
              </span>

              <div>
                <h2>
                  Hydration Tracking
                </h2>

                <p>
                  Would you like TrainIQ to track your daily water intake?
                </p>
              </div>

            </div>

            <div className="setup-options">

              <label
                className={`setup-option ${
                  formData.hydrationTracking === "true"
                    ? "selected"
                    : ""
                }`}
              >

                <input
                  type="radio"
                  name="hydrationTracking"
                  value="true"
                  checked={
                    formData.hydrationTracking === "true"
                  }
                  onChange={handleChange}
                  disabled={loading}
                />

                <span>
                  Yes, track my water
                </span>

              </label>

              <label
                className={`setup-option ${
                  formData.hydrationTracking === "false"
                    ? "selected"
                    : ""
                }`}
              >

                <input
                  type="radio"
                  name="hydrationTracking"
                  value="false"
                  checked={
                    formData.hydrationTracking === "false"
                  }
                  onChange={handleChange}
                  disabled={loading}
                />

                <span>
                  No, skip water tracking
                </span>

              </label>

            </div>

          </div>

          {/* ============================
              ERROR
          ============================ */}

          {error && (
            <div className="setup-error">
              {error}
            </div>
          )}

          {/* ============================
              SUBMIT
          ============================ */}

          <div className="setup-submit">

            <Button
              variant="default"
              type="submit"
              disabled={loading}
            >
              {loading
                ? "Saving Profile..."
                : "Complete Profile"}
            </Button>

            <p>
              You can change these details later
              from your Profile page.
            </p>

          </div>

          </form>
        </Card>

      </div>
    </div>
  );
}

export default ProfileSetup;
