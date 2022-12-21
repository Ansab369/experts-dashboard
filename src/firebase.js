 import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyAy7qesS3rItb8HwkbV1GkaPg3Um-ugvaw",
    authDomain: "totto-experts-dashboard.firebaseapp.com",
    projectId: "totto-experts-dashboard",
    storageBucket: "totto-experts-dashboard.appspot.com",
    messagingSenderId: "905565926702",
    appId: "1:905565926702:web:519159126723e73d5db6bf"
};

const app = initializeApp(firebaseConfig);  
const auth = getAuth();
const db = getFirestore();





export {app ,auth ,db}