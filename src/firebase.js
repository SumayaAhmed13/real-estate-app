
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
const firebaseConfig = {
  apiKey: "AIzaSyDe1567v3s_yb9aCQLTXnJ5k13FHgCKCkY",
  authDomain: "realestate-65ca9.firebaseapp.com",
  projectId: "realestate-65ca9",
  storageBucket: "realestate-65ca9.appspot.com",
  messagingSenderId: "617600392158",
  appId: "1:617600392158:web:e37a8d02e3628fb01a1b4f"
};

// Initialize Firebase
 initializeApp(firebaseConfig);

 export const db= getFirestore();