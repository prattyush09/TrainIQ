import { Link } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
  return (
    <nav className="navbar-v2">
      <span className="navbar-brand-v2">TrainIQ</span>

      <div className="nav-links-v2">
        <Link to="/dashboard" className="nav-link-v2">Dashboard</Link>
        <Link to="/workouts" className="nav-link-v2">Workouts</Link>
        <Link to="/diet" className="nav-link-v2">Diet</Link>
        <Link to="/progress" className="nav-link-v2">Progress</Link>
        <Link to="/profile" className="nav-link-v2">Profile</Link>
        <Link to="/settings" className="nav-link-v2">Settings</Link>
      </div>
    </nav>
  );
}

export default Navbar;