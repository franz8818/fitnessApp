// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration - CREDENCIALES DE FIREBASE
const firebaseConfig = {
  apiKey: "AIzaSyA86Hnfht5BtUY4TBHrwTx68qfduEHfEH4",
  authDomain: "sena-3186259.firebaseapp.com",
  projectId: "sena-3186259",
  storageBucket: "sena-3186259.firebasestorage.app",
  messagingSenderId: "336265672290",
  appId: "1:336265672290:web:4c3481bb9170bbc2f9433b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Usa esta app y conectala a Firestore
const db = getFirestore(app);


console.log("Firebase inicializado");

// Importate para poder usarla en otras pantallas
export { db, app };