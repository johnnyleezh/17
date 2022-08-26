// Import the functions you need from the SDKs you need

import  firebase  from 'firebase/compat';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBisxX4_jlsUGnIdrU2XwB9P2iU1i2m1hY",
  authDomain: "movie-35cad.firebaseapp.com",
  databaseURL: "https://movie-35cad-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "movie-35cad",
  storageBucket: "movie-35cad.appspot.com",
  messagingSenderId: "229576955407",
  appId: "1:229576955407:web:deaaf28a965f6cb0b2357a",
  measurementId: "G-NP2NQ9ZF13"
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app()
}

const auth = firebase.auth()

export { auth };