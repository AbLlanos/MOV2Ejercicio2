// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDiqTZn1tu6qV84oLe7naux6mAVAWzn1E0",
  authDomain: "ejerciciosmov2.firebaseapp.com",
  databaseURL: "https://ejerciciosmov2-default-rtdb.firebaseio.com",
  projectId: "ejerciciosmov2",
  storageBucket: "ejerciciosmov2.firebasestorage.app",
  messagingSenderId: "610810639343",
  appId: "1:610810639343:web:690bc22e89e2caa6fd3c1a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();

export const db = getDatabase(app);