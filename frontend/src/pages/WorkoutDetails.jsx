
import workoutProgram from "../data/Workouts";import "../styles/WorkoutDetails.css";
import { useNavigate, useParams } from "react-router-dom";

function WorkoutDetails() {
 const { id } = useParams();
const navigate = useNavigate();

  const workout = workoutProgram.find(
    (w) => w.id === Number(id)
  );

  if (!workout) {
    return <h1>Workout not found</h1>;
  }

  return (
    <div className="workout-details">

      <div className="workout-header">
        <h1>{workout.name}</h1>
        <p>{workout.focus}</p>

        <div className="workout-stats">
          <div className="stat">
            🏋 {workout.exercises.length} Exercises
          </div>

          <div className="stat">
            🕒 60–70 min
          </div>

          <div className="stat">
            🔥 Intermediate
          </div>
        </div>
      </div>

      <div className="exercise-list">
        <h2>Exercise List</h2>

        {workout.exercises.map((exercise, index) => (
          <div className="exercise-card" key={index}>
            <h3>
              {index + 1}. {exercise.name}
            </h3>

            <p>
              {exercise.sets} sets × {exercise.reps}
            </p>
          </div>
        ))}
      </div>

      <button
  className="start-btn"
  onClick={() => navigate(`/workouts/${id}/session`)}
>
  Start Workout
</button>

    </div>
  );
}

export default WorkoutDetails;
