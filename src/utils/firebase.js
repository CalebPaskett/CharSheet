// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD3tLIG7PVhAP8nVISf5m9F7x_iB8vB004",
  authDomain: "hero-sheet-c6e68.firebaseapp.com",
  projectId: "hero-sheet-c6e68",
  storageBucket: "hero-sheet-c6e68.appspot.com",
  messagingSenderId: "578981224798",
  appId: "1:578981224798:web:500cd1fcf5dcdc86a1efcf",
  measurementId: "G-R3082CFJNT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);