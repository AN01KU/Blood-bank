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
  getAuth
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
const dref = ref(db, "/user",);
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
var i =0;


onValue(dref, (snapshot) => {
  snapshot.forEach(childSnapshot => {
    if (childSnapshot.val().userType == "donor") {
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

      cell1.innerHTML = donarsUid[i].firstName;
      cell2.innerHTML = donarsUid[i].email;
      cell3.innerHTML = donarsUid[i].phoneNumber;
      cell4.innerHTML = donarsUid[i].bloodType;
      cell5.innerHTML = donarsUid[i].city;
      cell6.innerHTML = donarsUid[i].state;
      cell7.innerHTML = donarsUid[i].zip;
      i++;
    }
  });
});


