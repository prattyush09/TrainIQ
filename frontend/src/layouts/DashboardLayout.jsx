import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import BottomNav from "../components/BottomNav";
import "../styles/DashboardLayout.css";

function DashboardLayout() {
  const location = useLocation();
  const isWorkoutSession = location.pathname.includes("/session");

  return (
    <div className={`dashboard-layout-v2 ${isWorkoutSession ? 'in-session' : ''}`}>
      <Sidebar />

      <main className="dashboard-main-v2">
        <Outlet />
      </main>

      {!isWorkoutSession && <BottomNav />}
    </div>
  );
}

export default DashboardLayout;