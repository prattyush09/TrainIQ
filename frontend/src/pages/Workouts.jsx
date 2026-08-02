import { useNavigate } from "react-router-dom";
import workoutProgram from "../data/workouts";
import "../styles/Workouts.css";

function Workouts() {
  const navigate = useNavigate();

  const currentWorkout = workoutProgram[0];
  const upcomingWorkouts = workoutProgram.slice(1);

  return (
    <div className="workouts-page">
      <h1>Workout Program</h1>
      <p>Stay consistent. Complete your next workout to progress.</p>

      <div className="next-workout-card">
        <h2>Next Workout</h2>
        <h3>{currentWorkout.name}</h3>
        <p>{currentWorkout.focus}</p>
        <p>{currentWorkout.exercises.length} Exercises</p>

        <button onClick={() => navigate(`/workouts/${currentWorkout.id}`)}>
          Start Workout
        </button>
      </div>

      <h2 className="section-title">Upcoming Workouts</h2>

      <div className="workout-grid">
        {upcomingWorkouts.map((workout) => (
          <div className="workout-card" key={workout.id}>
            <h3>{workout.name}</h3>
            <p>{workout.focus}</p>
            <p>{workout.exercises.length} Exercises</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Workouts;

