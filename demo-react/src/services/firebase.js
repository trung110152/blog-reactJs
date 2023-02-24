import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBEeuc5h9lXVdFBD9f4zU1ICvR6foavC4Q",
    authDomain: "blog-reactjs-4074e.firebaseapp.com",
    projectId: "blog-reactjs-4074e",
    storageBucket: "blog-reactjs-4074e.appspot.com",
    messagingSenderId: "366723734041",
    appId: "1:366723734041:web:fc6a90dfa25a659e786888",
    measurementId: "G-REVKTWL4CG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

