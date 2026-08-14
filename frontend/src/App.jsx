import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import "./styles/Global.css";

import Navbar from "./components/Navbar";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Workouts from "./pages/Workouts";
import WorkoutDetails from "./pages/WorkoutDetails";
import Diet from "./pages/Diet";
import Progress from "./pages/Progress";
import Settings from "./pages/Settings";
import WorkoutSession from "./pages/WorkoutSession";
import DashboardLayout from "./layouts/DashboardLayout";
import WorkoutProgress from "./pages/WorkoutProgress";

function Layout() {
  const location = useLocation();

  const hideNavbar =
    location.pathname.startsWith("/dashboard") ||
    location.pathname.startsWith("/workouts") ||
    location.pathname.startsWith("/diet") ||
    location.pathname.startsWith("/progress") ||
    location.pathname.startsWith("/workout-progress") ||
    location.pathname.startsWith("/settings");

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        {/* Public Pages */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Dashboard Pages */}
        <Route element={<DashboardLayout />}>
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
            path="/workout-progress"
            element={<WorkoutProgress />}
          />

          <Route
            path="/settings"
            element={<Settings />}
          />
        </Route>
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;