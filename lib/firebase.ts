import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCLfqHIsRYjEA7la617k31K37Fe7_rq2Fg",
    authDomain: "fir-app-e0756.firebaseapp.com",
    projectId: "fir-app-e0756",
    storageBucket: "fir-app-e0756.appspot.com",
    messagingSenderId: "106558242116",
    appId: "1:106558242116:web:e001d85829377df66dab11"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
