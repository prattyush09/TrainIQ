import { useState } from "react";
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
  Menu,
  X,
} from "lucide-react";

import { auth } from "../firebase";
import "../styles/Sidebar.css";

function Sidebar() {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

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

  const closeMobile = () => setMobileOpen(false);

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="mobile-header">
        <div className="logo">
          <h2>Train<span>IQ</span></h2>
          <span className="pro-tag">PRO</span>
        </div>
        <button
          className="mobile-menu-btn"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle Navigation"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Overlay for mobile drawer */}
      {mobileOpen && (
        <div className="sidebar-overlay" onClick={closeMobile} />
      )}

      {/* Sidebar Aside */}
      <aside className={`sidebar ${mobileOpen ? "open" : ""}`}>
        <div className="logo">
          <h2>Train<span>IQ</span></h2>
          <span className="pro-tag">PRO</span>
        </div>

        <nav>
          <NavLink to="/dashboard" onClick={closeMobile}>
            <LayoutDashboard size={19} />
            <span>Dashboard</span>
          </NavLink>

          <NavLink to="/workouts" onClick={closeMobile}>
            <Dumbbell size={19} />
            <span>Workouts</span>
          </NavLink>

          <NavLink to="/diet" onClick={closeMobile}>
            <Apple size={19} />
            <span>Diet</span>
          </NavLink>

          <NavLink to="/progress" onClick={closeMobile}>
            <ChartColumn size={19} />
            <span>Progress</span>
          </NavLink>

          <NavLink to="/profile" onClick={closeMobile}>
            <User size={19} />
            <span>Profile</span>
          </NavLink>

          <NavLink to="/settings" onClick={closeMobile}>
            <Settings size={19} />
            <span>Settings</span>
          </NavLink>
        </nav>

        <div className="sidebar-bottom">
          <button
            className="logout-button"
            onClick={handleLogout}
            type="button"
          >
            <LogOut size={19} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;