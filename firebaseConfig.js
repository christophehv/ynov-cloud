import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDa6OrKkyd1mGcGl-M3dGpzDPhoL4aSRzo",
  authDomain: "well-cloud-ynov.firebaseapp.com",
  projectId: "well-cloud-ynov",
  storageBucket: "well-cloud-ynov.firebasestorage.app",
  messagingSenderId: "462742736542",
  appId: "1:462742736542:web:3e8f291bc924f64159358f",
  measurementId: "G-N96P1DVMT1"
};

const app = initializeApp(firebaseConfig);
export default app;
