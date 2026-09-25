import { NavLink } from "react-router-dom";
import { House, Barbell, ForkKnife, ChartLineUp, User } from "@phosphor-icons/react";
import "../styles/BottomNav.css";

function BottomNav() {
  return (
    <nav className="bottom-nav">
      <NavLink to="/dashboard" className="nav-item">
        <House size={22} weight="regular" />
        <span>Home</span>
      </NavLink>

      <NavLink to="/workouts" className="nav-item">
        <Barbell size={22} weight="regular" />
        <span>Workouts</span>
      </NavLink>

      <NavLink to="/diet" className="nav-item">
        <ForkKnife size={22} weight="regular" />
        <span>Diet</span>
      </NavLink>

      <NavLink to="/progress" className="nav-item">
        <ChartLineUp size={22} weight="regular" />
        <span>Progress</span>
      </NavLink>

      <NavLink to="/profile" className="nav-item">
        <User size={22} weight="regular" />
        <span>Profile</span>
      </NavLink>
    </nav>
  );
}

export default BottomNav;
