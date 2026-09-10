import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";

import { auth } from "./firebase";

import "./styles/Global.css";

import Navbar from "./components/Navbar";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Workouts from "./pages/Workouts";
import WorkoutDetails from "./pages/WorkoutDetails";
import WorkoutSession from "./pages/WorkoutSession";
import Diet from "./pages/Diet";
import Progress from "./pages/Progress";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import ProfileSetup from "./pages/ProfileSetup";
import DashboardLayout from "./layouts/DashboardLayout";


// ==========================================
// PROTECTED ROUTE
// ==========================================

function ProtectedRoute({ children }) {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    const unsubscribe =
      onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
      });

    return unsubscribe;
  }, []);

  // Firebase is still checking authentication
  if (user === undefined) {
    return null;
  }

  // User is not logged in
  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  return children;
}


// ==========================================
// APP LAYOUT
// ==========================================

function Layout() {
  const location = useLocation();

  const hideNavbar =
    location.pathname.startsWith("/dashboard") ||
    location.pathname.startsWith("/workouts") ||
    location.pathname.startsWith("/diet") ||
    location.pathname.startsWith("/progress") ||
    location.pathname.startsWith("/workout-progress") ||
    location.pathname.startsWith("/settings") ||
    location.pathname.startsWith("/profile") ||
    location.pathname.startsWith("/profile-setup");

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>

        {/* ==================================
            PUBLIC PAGES
        ================================== */}

        <Route
          path="/"
          element={<Landing />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />


        {/* ==================================
            PROTECTED PAGES
        ================================== */}

        <Route
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >

          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          <Route
            path="/workouts"
            element={<Workouts />}
          />

          <Route
            path="/workouts/:id"
            element={<WorkoutDetails />}
          />

          <Route
            path="/workouts/:id/session"
            element={<WorkoutSession />}
          />

          <Route
            path="/diet"
            element={<Diet />}
          />

          <Route
            path="/progress"
            element={<Progress />}
          />

          <Route
            path="/profile"
            element={<Profile />}
          />

          <Route
            path="/settings"
            element={<Settings />}
          />

          <Route
            path="/profile-setup"
            element={<ProfileSetup />}
          />

        </Route>


        {/* ==================================
            FALLBACK
        ================================== */}

        <Route
          path="*"
          element={
            <Navigate
              to="/"
              replace
            />
          }
        />

      </Routes>
    </>
  );
}


// ==========================================
// APP
// ==========================================

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;
