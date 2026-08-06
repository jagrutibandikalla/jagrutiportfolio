import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAiO5YSV0X5tjgonlGFSIIP9hnDfnH2Z_0",
  authDomain: "portfolio-a62f4.firebaseapp.com",
  projectId: "portfolio-a62f4",
  storageBucket: "portfolio-a62f4.firebasestorage.app",
  messagingSenderId: "2395983264",
  appId: "1:2395983264:web:471c3f73c80e80cbb168c5"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const realtimeDb = getDatabase(app);
export const storage = getStorage(app);

export default app;
