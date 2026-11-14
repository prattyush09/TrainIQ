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
    <div className="workout-completion-v2">
      {/* Celebration icon with subtle particles */}
      <div className="completion-icon-area-v2">
        <div className="completion-particles-v2" aria-hidden="true">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className={`particle-v2 particle-v2-${i}`} />
          ))}
        </div>
        <div className="completion-icon-wrapper-v2">
          <CheckCircle size={64} weight="fill" className="completion-icon-v2" />
        </div>
      </div>

      {/* Heading */}
      <h1 className="completion-heading-v2">Workout Complete</h1>
      <p className="completion-subheading-v2">{workout.name} completed</p>

      {/* Summary metrics */}
      <div className="completion-summary-v2">
        <div className="completion-metric-v2 duration-metric-v2">
          <div className="completion-metric-value-wrapper-v2">
            <Clock size={20} weight="bold" className="metric-icon-v2" />
            <span className="completion-metric-value-v2">{formatDuration(elapsedTime)}</span>
          </div>
          <span className="completion-metric-label-v2">Workout Time</span>
        </div>

        <div className="completion-metric-divider-v2" />

        <div className="completion-metric-v2">
          <span className="completion-metric-value-v2">{totalSets}</span>
          <span className="completion-metric-label-v2">Sets</span>
        </div>

        <div className="completion-metric-divider-v2" />

        <div className="completion-metric-v2">
          <span className="completion-metric-value-v2">{exerciseCount}</span>
          <span className="completion-metric-label-v2">Exercises</span>
        </div>
      </div>

      {/* CTA */}
      <Button
        variant="default"
        className="completion-cta-v2"
        onClick={handleReturn}
        disabled={navigating}
      >
        Return to Dashboard
      </Button>
    </div>
  );
}

export default WorkoutCompletion;