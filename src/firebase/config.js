// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBF-A8MSD_dVExWxTCNaitOu_iprUwf53M",
  authDomain: "note-tortious.firebaseapp.com",
  projectId: "note-tortious",
  storageBucket: "note-tortious.firebasestorage.app",
  messagingSenderId: "904926031729",
  appId: "1:904926031729:web:68f84ec79bd32b2ee6d0d0",
  measurementId: "G-891YD4YEZN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { app, analytics, auth };