import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";

import {
  House,
  Barbell,
  ForkKnife,
  ChartLineUp,
  Gear,
  User,
  SignOut,
  List,
  X,
} from "@phosphor-icons/react";

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
      <div className="mobile-header-v2">
        <div className="logo">
          <h2 className="mobile-header-brand-v2">TrainIQ</h2>
        </div>
        <button
          className="mobile-menu-btn"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle Navigation"
        >
          {mobileOpen ? <X size={22} weight="regular" /> : <List size={22} weight="regular" />}
        </button>
      </div>

      {/* Overlay for mobile drawer */}
      {mobileOpen && (
        <div className="sidebar-overlay-v2" onClick={closeMobile} />
      )}

      {/* Sidebar Aside */}
      <aside className={`sidebar-v2 ${mobileOpen ? "open" : ""}`}>
        <div className="logo">
          <h2>Train<span>IQ</span></h2>
        </div>

        <nav>
          <NavLink to="/dashboard" onClick={closeMobile} className="sidebar-nav-link">
            <House size={19} weight="regular" />
            <span>Dashboard</span>
          </NavLink>

          <NavLink to="/workouts" onClick={closeMobile} className="sidebar-nav-link">
            <Barbell size={19} weight="regular" />
            <span>Workouts</span>
          </NavLink>

          <NavLink to="/diet" onClick={closeMobile} className="sidebar-nav-link">
            <ForkKnife size={19} weight="regular" />
            <span>Diet</span>
          </NavLink>

          <NavLink to="/progress" onClick={closeMobile} className="sidebar-nav-link">
            <ChartLineUp size={19} weight="regular" />
            <span>Progress</span>
          </NavLink>

          <NavLink to="/profile" onClick={closeMobile} className="sidebar-nav-link">
            <User size={19} weight="regular" />
            <span>Profile</span>
          </NavLink>

          <NavLink to="/settings" onClick={closeMobile} className="sidebar-nav-link">
            <Gear size={19} weight="regular" />
            <span>Settings</span>
          </NavLink>
        </nav>

        <div className="sidebar-bottom">
          <button
            className="logout-button"
            onClick={handleLogout}
            type="button"
          >
            <SignOut size={19} weight="regular" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;