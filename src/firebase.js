import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyB5kWAx9ruJU8Ea3qnR5wbgPDjLehJrxNI",
    authDomain: "petshop-f1ca7.firebaseapp.com",
    projectId: "petshop-f1ca7",
    storageBucket: "petshop-f1ca7.firebasestorage.app",
    messagingSenderId: "479748491565",
    appId: "1:479748491565:web:5fd0efe7808758903baba4",
    measurementId: "G-SLFQLPY03T",
    databaseURL: "https://petshop-f1ca7-default-rtdb.asia-southeast1.firebasedatabase.app/"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);