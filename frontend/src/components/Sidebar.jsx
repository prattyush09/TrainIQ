import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Dumbbell,
  Apple,
  ChartColumn,
  Settings,
} from "lucide-react";
import "../styles/Sidebar.css";

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="logo">
        <h2>TrainIQ</h2>
      </div>

      <nav>
        <NavLink to="/dashboard">
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/workouts">
          <Dumbbell size={20} />
          <span>Workouts</span>
        </NavLink>

        <NavLink to="/diet">
          <Apple size={20} />
          <span>Diet</span>
        </NavLink>

        <NavLink to="/progress">
          <ChartColumn size={20} />
          <span>Progress</span>
        </NavLink>

        <NavLink to="/settings">
          <Settings size={20} />
          <span>Settings</span>
        </NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;