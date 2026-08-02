import "../styles/Dashboard.css";

function Dashboard() {
  return (
    <div className="main-content">

      <div className="welcome">
        <h1>Welcome Back 👋</h1>
        <p>Ready to crush today's workout?</p>
      </div>

      <div className="stats">

        <div className="stat-card">
          <h3>Calories</h3>
          <h2>2500</h2>
        </div>

        <div className="stat-card">
          <h3>Protein</h3>
          <h2>120g</h2>
        </div>

        <div className="stat-card">
          <h3>Water</h3>
          <h2>3L</h2>
        </div>

        <div className="stat-card">
          <h3>Workout Streak</h3>
          <h2>🔥 5</h2>
        </div>

      </div>

      <div className="cards">

        <div className="card">
          <h2>Today's Workout</h2>

          <p>Push Day</p>
          <p>Chest • Shoulders • Triceps</p>

          <button>Start Workout</button>
        </div>

        <div className="card">
          <h2>Nutrition</h2>

          <p>Calories Remaining</p>
          <h3>450 kcal</h3>

          <p>Protein Remaining</p>
          <h3>35 g</h3>
        </div>

        <div className="card">
          <h2>Recent Activity</h2>

          <p>✔ Push Day</p>
          <p>✔ Pull Day</p>
          <p>✔ Leg Day</p>
        </div>

        <div className="card">
          <h2>Goal</h2>

          <p>Current Goal</p>
          <h3>Muscle Gain</h3>

          <p>Weekly Target</p>
          <h3>6 Workouts</h3>
        </div>

      </div>

    </div>
  );
}

export default Dashboard;