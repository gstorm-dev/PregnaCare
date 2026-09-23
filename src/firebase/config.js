// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD5TVTS7f96FKyBTSTIgCpa5EvVS9yZ808",
  authDomain: "pregnacare-88f1d.firebaseapp.com",
  projectId: "pregnacare-88f1d",
  storageBucket: "pregnacare-88f1d.firebasestorage.app",
  messagingSenderId: "811774121721",
  appId: "1:811774121721:web:f6ec5921f8d38f56543428",
  measurementId: "G-N1FXPB25H2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);