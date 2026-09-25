import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export const dietService = {
  /**
   * Fetches the user's diet logs for a specific date.
   * @param {string} uid - The Firebase Auth UID
   * @param {string} date - Date in YYYY-MM-DD format
   */
  async getDietLog(uid, date) {
    if (!uid || !date) throw new Error("UID and date are required");
    const dietRef = doc(db, "users", uid, "dietLogs", date);
    const snap = await getDoc(dietRef);
    if (!snap.exists()) return null;
    return snap.data();
  },

  /**
   * Fetches the user's diet logs for an array of dates.
   * @param {string} uid - The Firebase Auth UID
   * @param {string[]} dates - Array of dates in YYYY-MM-DD format
   */
  async getDietHistory(uid, dates) {
    if (!uid || !dates || dates.length === 0) return {};
    
    const promises = dates.map(date => this.getDietLog(uid, date));
    const results = await Promise.all(promises);
    
    const history = {};
    dates.forEach((date, index) => {
      if (results[index]) {
        history[date] = results[index];
      }
    });
    
    return history;
  }
};
