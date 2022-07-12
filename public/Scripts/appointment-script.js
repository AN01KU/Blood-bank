// const form = document.getElementById("appointment-form");
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

const form = document.getElementById("appointment-form");

var email = document.getElementById("email");
var name = document.getElementById("name");
var phoneNumber = document.getElementById("phone");
var date = document.getElementById("date");
var appointmentType = "donar";
document.getElementById("donar").addEventListener("click", (e) => {
  appointmentType = "donar";
});
var type1 = document.getElementById("donar3");
var type2 = document.getElementById("reciever3");

document.getElementById("reciever").addEventListener("click", (e) => {
  appointmentType = "reciever";
});
// function writeUserData() {

//   var myRef = database.ref().push();
//   var key = myRef.key();

//   var newData = {
//     id: key,
//     Website_Name: this.web_name.value,
//     Username: this.username.value,
//     Password: this.password.value,
//     website_link: this.web_link.value
//   };

//   myRef.push(newData);
// }

function randomTime() {
  var hrs = Math.round(Math.random() * 12) + 6;
  var mins = Math.round(Math.random() * 60);
  var hFormat = hrs < 10 ? "0" : "";
  var mFormat = mins < 10 ? "0" : "";
  var amPm = hrs < 12 ? "AM" : "PM";
  return String(hFormat + hrs + ":" + mFormat + mins + " " + amPm);
}

function appointmentData() {
  var uid;

  onAuthStateChanged(auth, (user) => {
    if (user) {
      uid = user.uid;

      const newPostKey = push(child(ref(database), "/appointments/")).key;
      var resultTime = randomTime();
      console.log(resultTime);

      set(ref(database, "/appointments/" + newPostKey), {
        newPostKey: newPostKey,
        email: email.value,
        name: name.value,
        phoneNumber: phoneNumber.value,
        date: date.value,
        userUid: uid,
        time: resultTime,
        type: appointmentType
      }).then(() => {
        console.log("data submitted");
        form.action = "/appointment";
        form.submit();
      });
    } else {
      console.log("User not Logged in");
      alert("You are not logged in!");
      form.action = "/login";
      form.submit();
    }
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  appointmentData();
});
