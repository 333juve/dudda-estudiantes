import { getReactNativePersistence } from "firebase/auth/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeAuth, getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  RN_EXPO_FIREBASE_APIKEY,
  RN_EXPO_FIREBASE_AUTH_DOMAIN,
  RN_EXPO_FIREBASE_PROJECTID,
  RN_EXPO_FIREBASE_STORAGEBUCKET,
  RN_EXPO_FIREBASE_MESSAGINGSENDERID,
  RN_EXPO_FIREBASE_APPID,
  RN_EXPO_FIREBASE_MEASUREMENTID,
} from "@env";
const firebaseConfig = {
  apiKey: RN_EXPO_FIREBASE_APIKEY,
  authDomain: RN_EXPO_FIREBASE_AUTH_DOMAIN,
  projectId: RN_EXPO_FIREBASE_PROJECTID,
  storageBucket: RN_EXPO_FIREBASE_STORAGEBUCKET,
  messagingSenderId: RN_EXPO_FIREBASE_MESSAGINGSENDERID,
  appId: RN_EXPO_FIREBASE_APPID,
  measurementId: RN_EXPO_FIREBASE_MEASUREMENTID,
};

let app = initializeApp(firebaseConfig);
initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const db = getFirestore(app);
export const auth = getAuth(app);
