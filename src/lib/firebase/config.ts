// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA_JOQc2OamU-Gecp7-Km3pdUdVmUzH94M",
  authDomain: "timewise-3dbcf.firebaseapp.com",
  projectId: "timewise-3dbcf",
  storageBucket: "timewise-3dbcf.firebasestorage.app",
  messagingSenderId: "730337701477",
  appId: "1:730337701477:web:78f3b3cbd5dcad28f8608c",
  measurementId: "G-MR4ZHSCKDM"
};

// Initialize Firebase (handle hot-reload in dev)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();


// Analytics (only if supported and browser)
let analytics = null;
if (typeof window !== "undefined") {
  isSupported().then((yes) => {
    if (yes) analytics = getAnalytics(app);
  });
}

export { app, auth, db, analytics, googleProvider };
