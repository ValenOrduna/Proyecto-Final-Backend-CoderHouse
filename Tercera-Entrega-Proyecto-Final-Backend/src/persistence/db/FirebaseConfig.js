import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCsOwONgqbf8WDAFMpfImhgD3xupIWYWcs",
  authDomain: "coderhousebackend-567c3.firebaseapp.com",
  projectId: "coderhousebackend-567c3",
  storageBucket: "coderhousebackend-567c3.appspot.com",
  messagingSenderId: "189320625770",
  appId: "1:189320625770:web:aaea918716cb4607b0d413",
};

firebase.initializeApp(firebaseConfig);

const DBFirebase = firebase.firestore();

export default DBFirebase;
