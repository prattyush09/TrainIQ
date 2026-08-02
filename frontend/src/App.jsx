import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import "./styles/Global.css";

import Navbar from "./components/Navbar";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Workouts from "./pages/Workouts";
import Diet from "./pages/Diet";
import Progress from "./pages/Progress";
import Settings from "./pages/Settings";
import DashboardLayout from "./layouts/DashboardLayout";
import WorkoutDetails from "./pages/WorkoutDetails";

function Layout() {
  const location = useLocation();

  return (
    <>
{![
  "/dashboard",
  "/workouts",
  "/diet",
  "/progress",
  "/settings",
].includes(location.pathname) && <Navbar />}
      <Routes>
  <Route path="/" element={<Landing />} />
  <Route path="/login" element={<Login />} />
  <Route path="/signup" element={<Signup />} />

  <Route element={<DashboardLayout />}>
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/workouts" element={<Workouts />} />
    <Route path="/diet" element={<Diet />} />
    <Route path="/progress" element={<Progress />} />
    <Route path="/settings" element={<Settings />} />
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