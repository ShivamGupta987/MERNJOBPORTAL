// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB8ce8avl9he8vMH4iKTaq6MX7dVfotP70",
  authDomain: "job-portal-client-be8c5.firebaseapp.com",
  projectId: "job-portal-client-be8c5",
  storageBucket: "job-portal-client-be8c5.appspot.com",
  messagingSenderId: "656844916395",
  appId: "1:656844916395:web:c28978afc6bf1bbfa799ee"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;