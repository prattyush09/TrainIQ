import { useNavigate, useParams } from "react-router-dom";
import workoutProgram from "../data/Workouts";
import { Button } from "@/components/ui/button";
import { Barbell, Clock, Flame, ArrowLeft, Play } from "@phosphor-icons/react";
import "../styles/WorkoutDetails.css";

function WorkoutDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const workout = workoutProgram.find(
    (w) => w.id === Number(id)
  );

  if (!workout) {
    return (
      <div className="workout-details-error">
        <h1>Workout not found</h1>
        <Button variant="default" onClick={() => navigate("/workouts")}>
          Return to Workouts
        </Button>
      </div>
    );
  }

  return (
    <div className="workout-details">
      <div className="workout-details-nav">
        <button className="back-link-btn" onClick={() => navigate("/workouts")}>
          <ArrowLeft size={18} />
          <span>Workouts</span>
        </button>
      </div>

      <div className="workout-header">
        <span className="workout-eyebrow">WORKOUT OVERVIEW</span>
        <h1>{workout.name}</h1>
        <p className="workout-focus-text">{workout.focus}</p>

        <div className="workout-stats">
          <div className="stat">
            <Barbell size={16} />
            <span>{workout.exercises.length} Exercises</span>
          </div>

          <div className="stat">
            <Clock size={16} />
            <span>45–60 min</span>
          </div>

          <div className="stat">
            <Flame size={16} />
            <span>{workout.difficulty || "Intermediate"}</span>
          </div>
        </div>
      </div>

      <section className="exercise-list-section">
        <div className="exercise-list-header">
          <h2>Exercises</h2>
          <span className="exercise-total">{workout.exercises.length} exercises</span>
        </div>

        <div className="exercise-cards-list">
          {workout.exercises.map((exercise, index) => (
            <div key={exercise.name} className="exercise-card">
              <div className="exercise-card-left">
                <span className="exercise-index">{index + 1}</span>
                <div className="exercise-card-title-group">
                  <h3>{exercise.name}</h3>
                  {exercise.movementPattern && (
                    <p className="exercise-pattern-hint">
                      {exercise.movementPattern.replace(/_/g, " ")}
                    </p>
                  )}
                </div>
              </div>
              <span className="sets-reps-pill">
                {exercise.sets} × {exercise.reps}
              </span>
            </div>
          ))}
        </div>
      </section>

      <div className="workout-details-footer">
        <Button
          variant="default"
          className="start-btn"
          onClick={() => navigate(`/workouts/${workout.id}/session`)}
        >
          <Play size={18} weight="fill" />
          Start Workout
        </Button>
      </div>
    </div>
  );
}

export default WorkoutDetails;