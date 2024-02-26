// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAR_9FrpHM22VDTwhEHiXfapDk1k5IfiF4",
    authDomain: "nxtplay-9dbae.firebaseapp.com",
    projectId: "nxtplay-9dbae",
    storageBucket: "nxtplay-9dbae.appspot.com",
    messagingSenderId: "878726296022",
    appId: "1:878726296022:web:44c40340890845919c3477",
    measurementId: "G-BCD1F1YEYG"

};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
