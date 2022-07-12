import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.9/firebase-app.js";
import {
  getDatabase,
  ref,
  child,
  get,
  set,
  push
} from "https://www.gstatic.com/firebasejs/9.6.9/firebase-database.js";

import {
  getAuth,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/9.6.9/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBhIf3H_8lSICC5BuyLwu19QIc4ukcw7LI",
  authDomain: "blood-bank-aaf5d.firebaseapp.com",
  databaseURL: "https://blood-bank-aaf5d-default-rtdb.firebaseio.com",
  projectId: "blood-bank-aaf5d",
  storageBucket: "blood-bank-aaf5d.appspot.com",
  messagingSenderId: "278601540741",
  appId: "1:278601540741:web:3c77f1d4cb49606f4bf5ec",
  measurementId: "G-SKEZN876QV"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const dref = ref(database);
const auth = getAuth();
var isLoggedIn = document.getElementById("loggedIn");

var uid;

isLoggedIn.addEventListener("click", myFunction, false);

function myFunction() {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      uid = user.uid;
      console.log(user.uid);
      isLoggedIn.href = "/appointment";
    } else {
      isLoggedIn.href = "/login";
      alert("user not logged in!,redirecting to login page");
    }
  });
}
