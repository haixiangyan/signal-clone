// Import the functions you need from the SDKs you need
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getApps, initializeApp, getApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import firebaseConfig from 'firebase.config';
import { Platform } from 'react-native';

let app;

if (getApps.length === 0) {
  // Initialize Firebase
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

const db = getFirestore(app);
const auth = initializeAuth(app, {
  persistence:
    Platform.OS === 'web' ? undefined : getReactNativePersistence(ReactNativeAsyncStorage),
});

export { db, auth };
