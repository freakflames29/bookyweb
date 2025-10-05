// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyC00ZAWbdgyQDDQebONgGMGw_4lQLsping",
  authDomain: "booklist-bbd85.firebaseapp.com",
  projectId: "booklist-bbd85",
  storageBucket: "booklist-bbd85.firebasestorage.app",
  messagingSenderId: "50073338887",
  appId: "1:50073338887:web:77496a227665976813d6a2",
  measurementId: "G-V74JJZ90QD",
  
};  

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();
// const analytics = getAnalytics(app);
