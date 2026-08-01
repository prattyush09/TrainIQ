import { Link } from "react-router-dom";
import "../styles/Auth.css";

function Login() {
  return (
    <div className="auth-page">
      <div className="auth-box">
        <h1>Login</h1>

        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />

        <button>Login</button>

        <p>
          Don't have an account?
          <Link to="/signup"> Sign Up</Link>
        </p>

        <Link to="/">
          <button className="back-btn">Back Home</button>
        </Link>
      </div>
    </div>
  );
}

export default Login;