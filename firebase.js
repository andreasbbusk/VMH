// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDay280GmI2uGVjxTZAYbD8HvWCkuUzv-c",
  authDomain: "vejle-mod-hudcancer.firebaseapp.com",
  projectId: "vejle-mod-hudcancer",
  storageBucket: "vejle-mod-hudcancer.firebasestorage.app",
  messagingSenderId: "678652079317",
  appId: "1:678652079317:web:814d7c35109ed97437465c",
  measurementId: "G-QRBBP97YBD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export { db };