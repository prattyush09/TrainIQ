import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "../styles/DashboardLayout.css";
<Route element={<DashboardLayout />}>
  <Route path="/dashboard" element={<Dashboard />} />
  <Route path="/workouts" element={<Workouts />} />
  <Route path="/workouts/:id" element={<WorkoutDetails />} />
  <Route path="/diet" element={<Diet />} />
  <Route path="/progress" element={<Progress />} />
  <Route path="/settings" element={<Settings />} />
</Route>
function DashboardLayout() {
  return (
    <div className="dashboard-layout">
      <Sidebar />

      <main className="dashboard-main">
        <Outlet />
      </main>
    </div>
  );
}

export default DashboardLayout;