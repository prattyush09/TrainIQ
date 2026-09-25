import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

export const userService = {
  /**
   * Fetches the user profile and preferences.
   * @param {string} uid - The Firebase Auth UID
   */
  async getProfile(uid) {
    if (!uid) throw new Error("UID is required to fetch profile");
    const userRef = doc(db, "users", uid);
    const snap = await getDoc(userRef);
    if (!snap.exists()) return null;
    return snap.data();
  },

  /**
   * Saves or merges user profile data.
   * @param {string} uid - The Firebase Auth UID
   * @param {Object} data - Profile data to save
   */
  async saveProfile(uid, data) {
    if (!uid) throw new Error("UID is required to save profile");
    const userRef = doc(db, "users", uid);
    await setDoc(userRef, data, { merge: true });
  }
};
