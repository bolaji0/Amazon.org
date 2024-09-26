// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDZ98Ix5hsx8rjAEiYAElS3cC2E67TOUmY",
  authDomain: "myclone-64254.firebaseapp.com",
  projectId: "myclone-64254",
  storageBucket: "myclone-64254.appspot.com",
  messagingSenderId: "235321471614",
  appId: "1:235321471614:web:493a54396de37b052e5e2f",
  measurementId: "G-4R2V66EG9S"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export default firebaseConfig