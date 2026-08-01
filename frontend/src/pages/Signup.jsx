import { Link } from "react-router-dom";
import "../styles/Auth.css";

function Signup() {
  return (
    <div className="auth-page">
      <div className="auth-box">

        <h1>Create Account</h1>

        <p className="subtitle">
          Join TrainIQ and start your fitness journey
        </p>

        <input 
          type="text" 
          placeholder="Full Name" 
        />

        <input 
          type="email" 
          placeholder="Email" 
        />

        <input 
          type="password" 
          placeholder="Password" 
        />

        <button>
          Sign Up
        </button>

        <p>
          Already have an account?
          <Link to="/login"> Login</Link>
        </p>

        <Link to="/">
          <button className="back-btn">
            Back Home
          </button>
        </Link>

      </div>
    </div>
  );
}

export default Signup;