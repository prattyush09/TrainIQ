import { NavLink } from "react-router-dom";
import { House, Barbell, ForkKnife, ChartLineUp, User } from "@phosphor-icons/react";
import "../styles/BottomNav.css";

function BottomNav() {
  return (
    <nav className="bottom-nav-v2">
      <NavLink to="/dashboard" className={({ isActive }) => `nav-item-v2 ${isActive ? 'active' : ''}`}>
        <House size={22} weight="regular" />
        <span>Home</span>
      </NavLink>

      <NavLink to="/workouts" className={({ isActive }) => `nav-item-v2 ${isActive ? 'active' : ''}`}>
        <Barbell size={22} weight="regular" />
        <span>Workouts</span>
      </NavLink>

      <NavLink to="/diet" className={({ isActive }) => `nav-item-v2 ${isActive ? 'active' : ''}`}>
        <ForkKnife size={22} weight="regular" />
        <span>Diet</span>
      </NavLink>

      <NavLink to="/progress" className={({ isActive }) => `nav-item-v2 ${isActive ? 'active' : ''}`}>
        <ChartLineUp size={22} weight="regular" />
        <span>Progress</span>
      </NavLink>

      <NavLink to="/profile" className={({ isActive }) => `nav-item-v2 ${isActive ? 'active' : ''}`}>
        <User size={22} weight="regular" />
        <span>Profile</span>
      </NavLink>
    </nav>
  );
}

export default BottomNav;