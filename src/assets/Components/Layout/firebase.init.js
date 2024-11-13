// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDCy9v1aHaKo2PGvrTP-2jIglduNGIthl0",
  authDomain: "email-password-auth-2-3ac3a.firebaseapp.com",
  projectId: "email-password-auth-2-3ac3a",
  storageBucket: "email-password-auth-2-3ac3a.firebasestorage.app",
  messagingSenderId: "229583021795",
  appId: "1:229583021795:web:36712873d84cb7029fc7d6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;