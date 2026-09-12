import { NavLink } from "react-router-dom";
import { LayoutDashboard, Dumbbell, Apple, ChartColumn, User } from "lucide-react";
import "../styles/BottomNav.css";

function BottomNav() {
  return (
    <nav className="bottom-nav">
      <NavLink to="/dashboard" className="nav-item">
        <LayoutDashboard size={22} />
        <span>Home</span>
      </NavLink>

      <NavLink to="/workouts" className="nav-item">
        <Dumbbell size={22} />
        <span>Workouts</span>
      </NavLink>

      <NavLink to="/diet" className="nav-item">
        <Apple size={22} />
        <span>Diet</span>
      </NavLink>

      <NavLink to="/progress" className="nav-item">
        <ChartColumn size={22} />
        <span>Progress</span>
      </NavLink>

      <NavLink to="/profile" className="nav-item">
        <User size={22} />
        <span>Profile</span>
      </NavLink>
    </nav>
  );
}

export default BottomNav;
