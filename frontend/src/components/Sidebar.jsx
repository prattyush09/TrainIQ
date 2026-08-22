import { NavLink, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";

import {
  LayoutDashboard,
  Dumbbell,
  Apple,
  ChartColumn,
  Settings,
  User,
  LogOut,
} from "lucide-react";

import { auth } from "../firebase";
import "../styles/Sidebar.css";

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);

      console.log("TrainIQ logout successful.");

      navigate("/login", {
        replace: true,
      });
    } catch (error) {
      console.error(
        "TrainIQ logout error:",
        error
      );
    }
  };

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

        <NavLink to="/profile">
          <User size={20} />
          <span>Profile</span>
        </NavLink>

        <NavLink to="/settings">
          <Settings size={20} />
          <span>Settings</span>
        </NavLink>

      </nav>

      <div className="sidebar-bottom">

        <button
          className="logout-button"
          onClick={handleLogout}
          type="button"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>

      </div>

    </aside>
  );
}

export default Sidebar;