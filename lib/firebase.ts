import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDJ2ArCGTVH4viW-npCnA2VMe2OVFr5PKs",
    authDomain: "tavern-da128.firebaseapp.com",
    projectId: "tavern-da128",
    storageBucket: "tavern-da128.appspot.com",
    messagingSenderId: "833968805709",
    appId: "1:833968805709:web:b7156b832f95960bb30904",
    measurementId: "G-08RTYE1JB5",
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
