// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAJ5nm1RtbS2f_hi9oP3cXkFADFlasLDmo",
    authDomain: "virtuabotanica.firebaseapp.com",
    projectId: "virtuabotanica",
    storageBucket: "virtuabotanica.appspot.com",
    messagingSenderId: "865506136918",
    appId: "1:865506136918:web:07c889eb3d95c14aacfcf7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {
    db
}