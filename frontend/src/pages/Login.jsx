import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  doc,
  getDoc,
} from "firebase/firestore";

import { auth, db } from "../firebase";
import { Button } from "@/components/ui/button";
import "../styles/Auth.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      console.log("Attempting Firebase login...");

      // 1. Sign in with Firebase Authentication
      const userCredential =
        await signInWithEmailAndPassword(
          auth,
          email.trim(),
          password
        );

      const user = userCredential.user;

      console.log(
        "LOGIN SUCCESS:",
        user.uid
      );

      // 2. Check whether the user has completed
      //    their Firestore profile
      const profileRef = doc(
        db,
        "users",
        user.uid
      );

      const profileSnap = await getDoc(
        profileRef
      );

      // 3. Decide where the user should go
      if (profileSnap.exists()) {
        console.log(
          "Profile exists → Dashboard"
        );

        navigate("/dashboard", {
          replace: true,
        });
      } else {
        console.log(
          "Profile does not exist → Profile Setup"
        );

        navigate("/profile-setup", {
          replace: true,
        });
      }

    } catch (error) {
      console.error(
        "LOGIN ERROR:",
        error
      );

      console.error(
        "ERROR CODE:",
        error.code
      );

      console.error(
        "ERROR MESSAGE:",
        error.message
      );

      if (
        error.code ===
        "auth/invalid-credential"
      ) {
        setError(
          "Invalid email or password."
        );
      } else if (
        error.code ===
        "auth/user-not-found"
      ) {
        setError(
          "No account found with this email."
        );
      } else if (
        error.code ===
        "auth/wrong-password"
      ) {
        setError(
          "Incorrect password."
        );
      } else if (
        error.code ===
        "auth/invalid-email"
      ) {
        setError(
          "Please enter a valid email address."
        );
      } else {
        setError(
          "Login failed. Please try again."
        );
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page-v2">
      <div className="auth-box-v2">

        <h1>Login</h1>

        <form onSubmit={handleLogin}>

          <div className="auth-field-v2">
            <label htmlFor="login-email">Email</label>
            <input
              id="login-email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              autoComplete="email"
              required
              disabled={loading}
            />
          </div>

          <div className="auth-field-v2">
            <label htmlFor="login-password">Password</label>
            <input
              id="login-password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              autoComplete="current-password"
              required
              disabled={loading}
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
              ? "Logging in..."
              : "Login"}
          </Button>

        </form>

        <p className="auth-footer-v2">
          Don't have an account?
          <Link to="/signup">
            {" "}Sign Up
          </Link>
        </p>

        <Link to="/">
          <Button
            variant="ghost"
            type="button"
            className="auth-back-btn-v2"
          >
            Back Home
          </Button>
        </Link>

      </div>
    </div>
  );
}

export default Login;