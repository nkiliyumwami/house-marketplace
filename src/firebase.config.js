import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyADCs4q4KJitM1MlWNgJyf5hdu4ulk7JQ8",
  authDomain: "house-marketplace-app-d0468.firebaseapp.com",
  projectId: "house-marketplace-app-d0468",
  storageBucket: "house-marketplace-app-d0468.appspot.com",
  messagingSenderId: "895522628906",
  appId: "1:895522628906:web:c112eae5361de13a8bea53"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
 export const db = getFirestore()