import { getReactNativePersistence } from "firebase/auth/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeAuth, getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC2tT3WcLmbGWHw2Km7HTUSbZaunvbdYSU",
  authDomain: "dudda-3f55b.firebaseapp.com",
  projectId: "dudda-3f55b",
  storageBucket: "dudda-3f55b.appspot.com",
  messagingSenderId: "295815088021",
  appId: "1:295815088021:web:103e3c54012711ca5e589c",
  measurementId: "G-XX8XKPQX0E"
};

let app = initializeApp(firebaseConfig);
initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const db = getFirestore(app);
export const auth = getAuth(app);
