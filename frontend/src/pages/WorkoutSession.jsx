import Button from "../components/ui/Button/Button";
import { useNavigate, useParams } from "react-router-dom";import { useState } from "react";
import workoutProgram from "../data/workouts";import "../styles/WorkoutSession.css";
function WorkoutSession() {
  const { id } = useParams();
  const navigate = useNavigate();

  const workout = workoutProgram.find(
    (w) => w.id === Number(id)
  );

  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [workoutCompleted, setWorkoutCompleted] = useState(false);
const [completedSets, setCompletedSets] = useState(() =>
  workout.exercises.map(() => 0)
);
const [showQuitModal, setShowQuitModal] = useState(false);

  const exercise = workout.exercises[exerciseIndex];
  if (workoutCompleted) {
  return (
    <div className="workout-session">
      <h1>🎉 Workout Completed!</h1>
      <h2>{workout.name}</h2>

      <p>
        You completed {workout.exercises.length} exercises.
      </p>

      <button
  onClick={() => navigate("/dashboard")}
>
  Finish Workout
</button>
    </div>
  );
}
  

  return (
    <div className="workout-session">
      <h1>{workout.name}</h1>

      <h2>{exercise.name}</h2>

      <p>
        Exercise {exerciseIndex + 1} of {workout.exercises.length}
      </p>

      <p>
        {exercise.sets} Sets × {exercise.reps}
      </p>
      <p>
  Completed Sets: {completedSets[exerciseIndex]} / {exercise.sets}
</p>
<button
  onClick={() => {
    if (completedSets[exerciseIndex] < exercise.sets) {
      const updatedSets = [...completedSets];
      updatedSets[exerciseIndex] += 1;
      setCompletedSets(updatedSets);

     if (updatedSets[exerciseIndex] === exercise.sets) {
  if (exerciseIndex < workout.exercises.length - 1) {
    setTimeout(() => {
      setExerciseIndex((prev) => prev + 1);
    }, 800);
  } else {
    setTimeout(() => {
      setWorkoutCompleted(true);
    }, 800);
  }
}
    }
  }}
>
  Complete Set
</button>
      <button
  onClick={() => {
  if (exerciseIndex > 0) {
    setExerciseIndex(exerciseIndex - 1);
  }
}}
>
  Previous Exercise
</button>
      <button
  onClick={() => {
  if (exerciseIndex < workout.exercises.length - 1) {
    setExerciseIndex(exerciseIndex + 1);
  }
}}
>
  Next Exercise
</button>
<button
  onClick={() => setShowQuitModal(true)}
>
  Quit Workout
</button>
{showQuitModal && (
  <div className="quit-modal-overlay">
    <div className="quit-modal">
      <h2>Quit Workout?</h2>

      <p>
        You are currently on exercise {exerciseIndex + 1} of{" "}
        {workout.exercises.length}.
      </p>

      <p>Your workout progress will be lost if you discard it.</p>

      <Button
  variant="success"
  onClick={() => setShowQuitModal(false)}
>
  Continue Workout
</Button>

      <Button variant="primary">
  Save & Exit
</Button>

     <Button variant="danger">
  Discard Workout
</Button>
    </div>
  </div>
)}
    </div>
  );
}

export default WorkoutSession;