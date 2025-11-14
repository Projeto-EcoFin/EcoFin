import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAKGBWQJXD3S05_BjcarKTFdoKE-EMpTb0", 
    authDomain: "ecofin-6f85d.firebaseapp.com",
    projectId: "ecofin-6f85d",
    storageBucket: "ecofin-6f85d.firebasestorage.app",
    messagingSenderId: "382720666209",
    appId: "1:382720666209:web:376b1884390bccf5fc5820",
    measurementId: "G-YE2EGNCE2B"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);