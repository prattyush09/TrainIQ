import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";

import { auth } from "../firebase";
import { Button } from "@/components/ui/button";
import "../styles/Auth.css";

function Signup() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();

    setError("");

    const trimmedName = fullName.trim();
    const trimmedEmail = email.trim();

    if (!trimmedName) {
      setError("Please enter your full name.");
      return;
    }

    if (!trimmedEmail) {
      setError("Please enter your email.");
      return;
    }

    if (!password) {
      setError("Please enter a password.");
      return;
    }

    if (password.length < 6) {
      setError(
        "Password must be at least 6 characters."
      );
      return;
    }

    try {
      setLoading(true);

      // Create Firebase account
      const userCredential =
        await createUserWithEmailAndPassword(
          auth,
          trimmedEmail,
          password
        );

      // Save user's name to Firebase Auth
      await updateProfile(
        userCredential.user,
        {
          displayName: trimmedName,
        }
      );

      console.log(
        "TrainIQ account created successfully."
      );

      // Firebase automatically signs the new user in.
      // Sign them out so they must explicitly log in.
      await signOut(auth);

      console.log(
        "New user signed out successfully."
      );

      // Send the user to Login
      navigate("/login", {
        replace: true,
      });

    } catch (error) {
      console.error(
        "TrainIQ signup error:",
        error
      );

      switch (error.code) {
        case "auth/email-already-in-use":
          setError(
            "An account with this email already exists."
          );
          break;

        case "auth/invalid-email":
          setError(
            "Please enter a valid email address."
          );
          break;

        case "auth/weak-password":
          setError(
            "Password must be at least 6 characters."
          );
          break;

        case "auth/network-request-failed":
          setError(
            "Network error. Please check your internet connection."
          );
          break;

        case "auth/operation-not-allowed":
          setError(
            "Email/password authentication is not enabled in Firebase."
          );
          break;

        default:
          setError(
            "Unable to create your account. Please try again."
          );
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page-v2">
      <div className="auth-box-v2">

        <h1>Create Account</h1>

        <p className="auth-subtitle-v2">
          Join TrainIQ and start your fitness journey
        </p>

        <form onSubmit={handleSignup}>

          <div className="auth-field-v2">
            <label htmlFor="signup-name">Full Name</label>
            <input
              id="signup-name"
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) =>
                setFullName(e.target.value)
              }
              disabled={loading}
              autoComplete="name"
            />
          </div>

          <div className="auth-field-v2">
            <label htmlFor="signup-email">Email</label>
            <input
              id="signup-email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              disabled={loading}
              autoComplete="email"
            />
          </div>

          <div className="auth-field-v2">
            <label htmlFor="signup-password">Password</label>
            <input
              id="signup-password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              disabled={loading}
              autoComplete="new-password"
            />
          </div>

          {error && (
            <p className="auth-error-v2">
              {error}
            </p>
          )}

          <Button
            variant="default"
            type="submit"
            disabled={loading}
            className="btn-submit"
          >
            {loading
              ? "Creating Account..."
              : "Sign Up"}
          </Button>

        </form>

        <p className="auth-footer-v2">
          Already have an account?
          <Link to="/login"> Login</Link>
        </p>

        <Link to="/">
          <Button
            variant="ghost"
            type="button"
            disabled={loading}
            className="auth-back-btn-v2"
          >
            Back Home
          </Button>
        </Link>

      </div>
    </div>
  );
}

export default Signup;