// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCQ19H98v2KaDgKQQShin634KKr2qjPFOQ",
  authDomain: "weatherapp-firebase-pinia.firebaseapp.com",
  projectId: "weatherapp-firebase-pinia",
  storageBucket: "weatherapp-firebase-pinia.firebasestorage.app",
  messagingSenderId: "33802967500",
  appId: "1:33802967500:web:43a02c5b1c955c4f00e569"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app)
