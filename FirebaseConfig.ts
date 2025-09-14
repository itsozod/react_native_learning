import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCBVgM4brasZ4Fk9p0cSrhPwk6FDJAW1ts",
  authDomain: "quiz-app-61b96.firebaseapp.com",
  projectId: "quiz-app-61b96",
  storageBucket: "quiz-app-61b96.firebasestorage.app",
  messagingSenderId: "641170963326",
  appId: "1:641170963326:web:ca49b955f1b81535b3912f",
  measurementId: "G-4XQW85EB4Y",
};

export const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
export const db = getFirestore(app);
