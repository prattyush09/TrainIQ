import "../styles/Dashboard.css";

function Dashboard() {
  return (
    <div className="dashboard">

      <h1>Welcome to TrainIQ</h1>
      <p>Your fitness journey starts here.</p>

      <div className="dashboard-cards">

        <div className="dashboard-card">
          <h2>Today's Workout</h2>
          <p>Push Day</p>
          <button>View Workout</button>
        </div>


        <div className="dashboard-card">
          <h2>Nutrition</h2>
          <p>Protein: 120g</p>
          <p>Calories: 2500 kcal</p>
        </div>


        <div className="dashboard-card">
          <h2>Progress</h2>
          <p>Weight: 59 kg</p>
          <p>Goal: Muscle Gain</p>
        </div>

      </div>

    </div>
  );
}

export default Dashboard;