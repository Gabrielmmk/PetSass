// firebaseConfig.js

// Import the functions you need from the SDKs you need
import { initializeApp, getApp } from 'firebase/app';
import { initializeAuth ,getAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

import AsyncStorage from '@react-native-async-storage/async-storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAUne8RorbONEQ4__lRh4bZM6PHDE69Q6k",
  authDomain: "testesass-7831e.firebaseapp.com",
  projectId: "testesass-7831e",
  storageBucket: "testesass-7831e.firebasestorage.app",
  messagingSenderId: "788684104556",
  appId: "1:788684104556:web:a2be5028b984800ead4949",
  measurementId: "G-YM0S4WNPZT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Inicializa o Firebase Auth, Firestore e o Realtime Database
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
const db = getFirestore(app);

export { auth, db, app };
