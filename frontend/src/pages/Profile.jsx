import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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

  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem("trainiq-profile");

    if (saved) {
      try {
        return {
          ...defaultProfile,
          ...JSON.parse(saved),
        };
      } catch {
        return defaultProfile;
      }
    }

    return defaultProfile;
  });

  const [formData, setFormData] = useState(profile);
  const [editing, setEditing] = useState(false);
  const [savedMessage, setSavedMessage] = useState("");

  useEffect(() => {
    localStorage.setItem(
      "trainiq-profile",
      JSON.stringify(profile)
    );
  }, [profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    const updatedProfile = {
      ...formData,
      name: formData.name.trim() || "TrainIQ User",
      email: formData.email.trim(),
    };

    setProfile(updatedProfile);
    setFormData(updatedProfile);
    setEditing(false);

    setSavedMessage("Profile updated successfully.");

    setTimeout(() => {
      setSavedMessage("");
    }, 2500);
  };

  const handleCancel = () => {
    setFormData(profile);
    setEditing(false);
    setSavedMessage("");
  };

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

  return (
    <div className="profile-page">
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

        <Button
          variant="primary"
          onClick={() => navigate("/dashboard")}
        >
          Back to Dashboard
        </Button>
      </div>

      {savedMessage && (
        <div className="profile-success">
          {savedMessage}
        </div>
      )}

      <div className="profile-grid">
        {/* PROFILE SUMMARY */}

        <div className="profile-card profile-summary-card">
          <div className="profile-avatar">
            {getInitials()}
          </div>

          <h2>{profile.name}</h2>

          <p>
            {profile.email || "No email added"}
          </p>

          <div className="profile-goal">
            <span>Current Goal</span>

            <strong>{profile.goal}</strong>
          </div>
        </div>

        {/* PERSONAL INFORMATION */}

        <div className="profile-card profile-info-card">
          <div className="profile-card-header">
            <div>
              <span className="profile-label">
                PERSONAL INFORMATION
              </span>

              <h2>About You</h2>
            </div>

            {!editing && (
              <Button
                variant="primary"
                onClick={() => {
                  setFormData(profile);
                  setEditing(true);
                }}
              >
                Edit Profile
              </Button>
            )}
          </div>

          <div className="profile-form">
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
                />
              ) : (
                <div className="profile-value">
                  {profile.name || "Not set"}
                </div>
              )}
            </div>

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
                  onChange={handleChange}
                  placeholder="Enter your email"
                />
              ) : (
                <div className="profile-value">
                  {profile.email || "Not set"}
                </div>
              )}
            </div>

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

            {editing && (
              <div className="profile-actions">
                <Button
                  variant="success"
                  onClick={handleSave}
                >
                  Save Changes
                </Button>

                <Button
                  variant="danger"
                  onClick={handleCancel}
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