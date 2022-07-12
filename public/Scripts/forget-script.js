import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.9/firebase-app.js";
import {
  getAuth,
  sendPasswordResetEmail
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
const auth = getAuth();

const forgetPasswordForm = document.querySelector(".forget-form");

forgetPasswordForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = forgetPasswordForm.email.value;
  if (email != "") {
    sendPasswordResetEmail(auth, email)
      .then(function () {
        alert("Email Verification Sent");
      })
      .catch(function (error) {
        alert(error.message);
      });
  } else {
    window.alert("Please enter your email address");
  }
});
