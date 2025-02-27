import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB1h4FQ3SCt6g57bWLQXl2-SzOyGhwDaZE",
  authDomain: "logininternship-d9e01.firebaseapp.com",
  projectId: "logininternship-d9e01",
  storageBucket: "logininternship-d9e01.firebasestorage.app",
  messagingSenderId: "723573070254",
  appId: "1:723573070254:web:8ec03342d9ca3534b2d03f",
  measurementId: "G-B7NGN5T6F5",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
