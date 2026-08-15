import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBKoyZwohTik5XMf16qUlqUBCt5IDEKh9M",
  authDomain: "trainiq-5c6b6.firebaseapp.com",
  projectId: "trainiq-5c6b6",
  storageBucket: "trainiq-5c6b6.firebasestorage.app",
  messagingSenderId: "567839106354",
  appId: "1:567839106354:web:5fd1540af5cbf18b45e32b",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export default app;