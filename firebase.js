// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "@firebase/firestore";
import { getStorage } from 'firebase/storage';

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC1ChFui6NP0p38tpVTqF46g4yTRXs4ns0",
  authDomain: "task7-2d-aee26.firebaseapp.com",
  projectId: "task7-2d-aee26",
  storageBucket: "task7-2d-aee26.appspot.com",
  messagingSenderId: "1096621910232",
  appId: "1:1096621910232:web:ab9ba462e44891dea94fad",
  measurementId: "G-2WL5BET10V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore(app); 
export const storage = getStorage(app);