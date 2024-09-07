import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCtGQcaswgenu4Tki_qpqKz7aK2LLxA3VU",
  authDomain: "bcpp-194bb.firebaseapp.com",
  projectId: "bcpp-194bb",
  storageBucket: "bcpp-194bb.appspot.com",
  messagingSenderId: "203365006916",
  appId: "1:203365006916:web:9e6540083dc21d11aac611",
  measurementId: "G-NRF7Z5G6P7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;