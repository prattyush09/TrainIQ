import { Link } from "react-router-dom";
import "../styles/Landing.css";
import { Button } from "@/components/ui/button";

function Landing() {
  return (
    <div className="landing-page-v2">

      <div className="hero-content-v2">
        <h1>TrainIQ</h1>

        <h2>Your AI Fitness Companion</h2>

        <p>
          Personalized workouts, smart diet plans, and progress tracking
          powered by AI.
        </p>

        <div className="hero-buttons-v2">
          <Link to="/signup">
            <Button variant="default">Get Started</Button>
          </Link>

          <Link to="/login">
            <Button variant="secondary">Login</Button>
          </Link>
        </div>
      </div>


      <div className="features-v2">

        <div className="feature-card-v2">
          <h3>AI Workout Plans</h3>
          <p>
            Get personalized workout routines based on your goals,
            experience, and equipment.
          </p>
        </div>


        <div className="feature-card-v2">
          <h3>Smart Diet Tracking</h3>
          <p>
            Track your meals and get AI-powered nutrition guidance
            for your fitness goals.
          </p>
        </div>


        <div className="feature-card-v2">
          <h3>Progress Analytics</h3>
          <p>
            Monitor your weight, strength, and fitness progress over time.
          </p>
        </div>

      </div>

    </div>
  );
}

export default Landing;