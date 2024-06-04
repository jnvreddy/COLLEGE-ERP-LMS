// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "college-erp-lms.firebaseapp.com",
  projectId: "college-erp-lms",
  storageBucket: "college-erp-lms.appspot.com",
  messagingSenderId: "108895317684",
  appId: "1:108895317684:web:d0897c9a9a31f149cb31e1"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);