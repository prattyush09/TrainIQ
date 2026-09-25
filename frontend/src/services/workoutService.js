import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export const workoutService = {
  /**
   * Fetches the user's workout history.
   * @param {string} uid - The Firebase Auth UID
   */
  async getWorkoutHistory(uid) {
    if (!uid) throw new Error("UID is required");
    const progressRef = collection(db, "users", uid, "workoutProgress");
    const snapshot = await getDocs(progressRef);
    
    const history = [];
    snapshot.forEach((doc) => {
      history.push({ id: doc.id, ...doc.data() });
    });
    return history;
  },

  /**
   * Calculates the user's current workout streak.
   * @param {Array} workoutHistory - Array of workout progress documents
   */
  calculateStreak(workoutHistory) {
    if (!workoutHistory || workoutHistory.length === 0) return 0;
    
    // Extract unique dates of completed or saved workouts
    const dates = [...new Set(
      workoutHistory
        .map(w => (w.completedAt || w.savedAt)?.split('T')[0])
        .filter(Boolean)
    )].sort().reverse();
    
    if (dates.length === 0) return 0;
    
    let streak = 0;
    let current = new Date();
    current.setHours(0, 0, 0, 0);
    
    let firstDate = new Date(dates[0]);
    firstDate.setHours(0, 0, 0, 0);
    
    const diff = Math.floor((current - firstDate) / (1000 * 60 * 60 * 24));
    if (diff > 1) return 0; // Streak broken
    
    let expected = new Date(firstDate);
    for (const d of dates) {
      const dDate = new Date(d);
      dDate.setHours(0, 0, 0, 0);
      if (dDate.getTime() === expected.getTime()) {
        streak++;
        expected.setDate(expected.getDate() - 1);
      } else {
        break;
      }
    }
    return streak;
  }
};
