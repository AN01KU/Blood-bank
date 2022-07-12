import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.9/firebase-app.js";
import {
  getDatabase,
  ref,
  child,
  get,
  set,
  onValue
} from "https://www.gstatic.com/firebasejs/9.6.9/firebase-database.js";

import {
  getAuth,
  onAuthStateChanged
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

const db = getDatabase(app);
const dref = ref(db, "/appointments");
const auth = getAuth();
var donarsUid = [];

// onValue(dref ,(snapshot) => {
//   snapshot.forEach(childSnapshot => {
//     if (childSnapshot.val().type == "donar") {
//      donarsUid.push(childSnapshot.val().userUid);
//     }
//   });
// });
var table = document.getElementById("dTable");
var i = 0;

onAuthStateChanged(auth, (user) => {
  if (user) {
    var uid = user.uid;

    onValue(dref, (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        if (childSnapshot.val().userUid === uid) {
          donarsUid.push(childSnapshot.val());
          var newRow = table.insertRow(1);
          var cell1 = newRow.insertCell(0);
          var cell2 = newRow.insertCell(1);
          var cell3 = newRow.insertCell(2);
          var cell4 = newRow.insertCell(3);
          var cell5 = newRow.insertCell(4);
          var cell6 = newRow.insertCell(5);
          var cell7 = newRow.insertCell(6);
          var cell8 = newRow.insertCell(7);
          var cell9 = newRow.insertCell(8);

          var today = new Date();

          var date =
            today.getFullYear() +
            "-0" +
            (today.getMonth() + 1) +
            "-" +
            today.getDate();

          var d1 = Date.parse(donarsUid[i].date);
          var d2 = Date.parse(date);

          if (d1 < d2) {
            cell6.innerHTML =
              '<h3 style="color:red" >' + donarsUid[i].date + "</h3>";
            cell9.innerHTML = '<h3 style="color:red" >' + "Done" + "</h3>";
          } else {
            cell6.innerHTML =
              '<h3 style="color:green" >' + donarsUid[i].date + "</h3>";
            cell9.innerHTML =
              '<h3 style="color:green" >' + "In process" + "</h3>";
          }

          cell2.innerHTML = donarsUid[i].name;
          cell3.innerHTML = donarsUid[i].email;
          cell1.innerHTML = donarsUid[i].newPostKey;
          cell4.innerHTML = donarsUid[i].phoneNumber;
          cell5.innerHTML = donarsUid[i].type.toUpperCase();
          cell7.innerHTML = donarsUid[i].time;
          cell8.innerHTML = donarsUid[i].BankName;

          i++;
        }
      });
    });
  }
});
