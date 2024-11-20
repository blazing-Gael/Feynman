// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBqqdiUghFOUEuMj6Si7UzZsPFjVMqYvzk",
  authDomain: "feynman-5bf25.firebaseapp.com",
  projectId: "feynman-5bf25",
  storageBucket: "feynman-5bf25.firebasestorage.app",
  messagingSenderId: "968607750816",
  appId: "1:968607750816:web:cecefe2e00c0fa0fd247c5",
  measurementId: "G-76KZ4MCCWW"
};

// Initialize Firebase
//const app = initializeApp(firebaseConfig);
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
//const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { db };
export default app;
export { auth };

