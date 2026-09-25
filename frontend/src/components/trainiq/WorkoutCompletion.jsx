import { useState, useRef } from "react";
import { CheckCircle, Clock } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import "./WorkoutCompletion.css";

/**
 * WorkoutCompletion — celebration screen shown after a workout
 * is genuinely completed and saved to Firebase.
 *
 * Props:
 *   workout        — workout object { name, focus, exercises }
 *   completedSets  — array of completed set counts per exercise
 *   onReturnToDashboard — navigation callback
 */
function WorkoutCompletion({ workout, completedSets, elapsedTime, onReturnToDashboard }) {
  const [navigating, setNavigating] = useState(false);
  const hasNavigatedRef = useRef(false);

  const totalSets = completedSets.reduce((sum, s) => sum + s, 0);
  const exerciseCount = workout.exercises.length;

  const formatDuration = (totalSeconds) => {
    if (!totalSeconds || totalSeconds < 0) return "0 min";
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    
    if (hours > 0) {
      return `${hours} hr ${minutes.toString().padStart(2, '0')} min`;
    }
    if (minutes === 0) return "< 1 min";
    return `${minutes} min`;
  };

  const handleReturn = () => {
    // Prevent double-tap / repeated navigation
    if (hasNavigatedRef.current || navigating) return;
    hasNavigatedRef.current = true;
    setNavigating(true);
    onReturnToDashboard();
  };

  return (
    <div className="workout-completion">
      {/* Celebration icon with subtle particles */}
      <div className="completion-icon-area">
        <div className="completion-particles" aria-hidden="true">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className={`particle particle-${i}`} />
          ))}
        </div>
        <div className="completion-icon-wrapper">
          <CheckCircle size={64} weight="fill" className="completion-icon" />
        </div>
      </div>

      {/* Heading */}
      <h1 className="completion-heading">Workout Complete</h1>
      <p className="completion-subheading">{workout.name} completed</p>

      {/* Summary metrics */}
      <div className="completion-summary">
        <div className="completion-metric duration-metric">
          <div className="completion-metric-value-wrapper">
            <Clock size={20} weight="bold" className="metric-icon text-primary" />
            <span className="completion-metric-value">{formatDuration(elapsedTime)}</span>
          </div>
          <span className="completion-metric-label">Workout Time</span>
        </div>

        <div className="completion-metric-divider" />

        <div className="completion-metric">
          <span className="completion-metric-value">{totalSets}</span>
          <span className="completion-metric-label">Sets</span>
        </div>

        <div className="completion-metric-divider" />

        <div className="completion-metric">
          <span className="completion-metric-value">{exerciseCount}</span>
          <span className="completion-metric-label">Exercises</span>
        </div>
      </div>

      {/* CTA */}
      <Button
        variant="default"
        className="completion-cta"
        onClick={handleReturn}
        disabled={navigating}
      >
        Return to Dashboard
      </Button>
    </div>
  );
}

export default WorkoutCompletion;
