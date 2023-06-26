// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCLDUJPv7Uqf_zNadHfRUYpFfMV-zsUSjU",
  authDomain: "fir-fashion-61276.firebaseapp.com",
  projectId: "fir-fashion-61276",
  storageBucket: "fir-fashion-61276.appspot.com",
  messagingSenderId: "488835107304",
  appId: "1:488835107304:web:5e03e9d96d141a2bfbfc5d",
  measurementId: "G-PDH1VSTVZT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
