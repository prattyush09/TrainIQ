import { Link } from "react-router-dom";
import "../styles/Landing.css";

function Landing() {
  return (
    <div className="landing">

      <div className="hero-content">
        <h1>TrainIQ</h1>

        <h2>Your AI Fitness Companion</h2>

        <p>
          Personalized workouts, smart diet plans, and progress tracking
          powered by AI.
        </p>

        <div className="buttons">
          <Link to="/signup">
            <button>Get Started</button>
          </Link>

          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
      </div>


      <div className="features">

        <div className="feature-card">
          <h3>🏋️ AI Workout Plans</h3>
          <p>
            Get personalized workout routines based on your goals,
            experience, and equipment.
          </p>
        </div>


        <div className="feature-card">
          <h3>🥗 Smart Diet Tracking</h3>
          <p>
            Track your meals and get AI-powered nutrition guidance
            for your fitness goals.
          </p>
        </div>


        <div className="feature-card">
          <h3>📈 Progress Analytics</h3>
          <p>
            Monitor your weight, strength, and fitness progress over time.
          </p>
        </div>

      </div>

    </div>
  );
}

export default Landing;