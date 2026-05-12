// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

// for storing images
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB1mCANsi71MJkNExh2zs_OyG3cC73LKyI",
  authDomain: "fir-course-50329.firebaseapp.com",
  projectId: "fir-course-50329",
  storageBucket: "fir-course-50329.firebasestorage.app",
  messagingSenderId: "792318756221",
  appId: "1:792318756221:web:4becc0f5a62ca78198b814",
  measurementId: "G-G7MHKVWXV4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// signin with google
export const  googleProvider = new GoogleAuthProvider();

//db connection from firestore
export const db = getFirestore(app);

// image storage
export const storage = getStorage(app);
