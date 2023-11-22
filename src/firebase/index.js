// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB4hMfo8xkUPLweiHen_ZWRFcVcSAfZcFM",
  authDomain: "autenticacion-vue-fc841.firebaseapp.com",
  projectId: "autenticacion-vue-fc841",
  storageBucket: "autenticacion-vue-fc841.appspot.com",
  messagingSenderId: "411106577416",
  appId: "1:411106577416:web:fc61da79266e71879f55bd",
  measurementId: "G-GZRS6PYGH7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
