import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.9/firebase-app.js";
import {
  getDatabase,
  ref,
  child,
  get,
  set
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

const db = getDatabase(app);
const dref = ref(db);
const auth = getAuth();

var fname = document.getElementById("firstName");
var lname = document.getElementById("lastName");
var age = document.getElementById("age");
var gender = document.getElementById("gender");
var email = document.getElementById("email");
var pno = document.getElementById("phoneNumber");
var address = document.getElementById("address");
var ct = document.getElementById("city");
var st = document.getElementById("state");
var zp = document.getElementById("zip");
var bgrp = document.getElementById("bloodGroup");
var wt = document.getElementById("weight");
var ht = document.getElementById("height");
var alrgy = document.getElementById("allergies");
var pEmail = document.getElementById("profile-email");
var pname = document.getElementById("profile-name");
var elem = document.getElementById("login1");
var uid;

onAuthStateChanged(auth, (user) => {
  if (user) {
    uid = user.uid;
    elem.href = "/profile";
    elem.innerHTML = "<i class='fas fa-id-card' style='font-size:45px'></i>";

    get(child(dref, "/user/" + uid)).then((snapshot) => {
      if (snapshot.exists()) {
        fname.value = snapshot.val().firstName;
        lname.value = snapshot.val().lastName;
        age.value = snapshot.val().age;
        gender.value = snapshot.val().gender;
        email.value = snapshot.val().email;
        pno.value = snapshot.val().phoneNumber;
        address.value = snapshot.val().address;
        ct.value = snapshot.val().city;
        st.value = snapshot.val().state;
        zp.value = snapshot.val().zip;
        bgrp.value = snapshot.val().bloodType;
        wt.value = snapshot.val().weight;
        ht.value = snapshot.val().height;
        alrgy.value = snapshot.val().allergy;
        address.value = snapshot.val().address;
        pEmail.textContent = snapshot.val().email;
        pname.textContent =
          snapshot.val().firstName + " " + snapshot.val().lastName;
      } else {
        console.log("No data available");
      }
    });
  }
});

const logoutBtn = document.querySelector(".logout-btn1");
logoutBtn.addEventListener("click", (e) => {
  e.preventDefault();
  signOut(auth).then(() => {
    window.location = "/";
  });
});

const enableBtn = async () => {
  fname.disabled = false;
  lname.disabled = false;
  age.disabled = false;
  address.disabled = false;
  ct.disabled = false;
  st.disabled = false;
  zp.disabled = false;
  wt.disabled = false;
  ht.disabled = false;
  alrgy.disabled = false;
};
const disableBtn = async () => {
  fname.disabled = true;
  lname.disabled = true;
  age.disabled = true;
  gender.disabled = true;
  pno.disabled = true;
  address.disabled = true;
  ct.disabled = true;
  st.disabled = true;
  zp.disabled = true;
  bgrp.disabled = true;
  wt.disabled = true;
  ht.disabled = true;
  alrgy.disabled = true;
};

const updateData = async () => {
  set(ref(db, "/user/" + uid), {
    firstName: fname.value,
    lastName: lname.value,
    age: age.value,
    gender: gender.value,
    email: email.value,
    phoneNumber: pno.value,
    address: address.value,
    city: ct.value,
    state: st.value,
    zip: zp.value,
    bloodType: bgrp.value,
    weight: wt.value,
    height: ht.value,
    allergy: alrgy.value
  });
};

const updateBtn = document.querySelector(".edit-btn");
updateBtn.addEventListener("click", (e) => {
  e.preventDefault();
  enableBtn();
  updateBtn.innerHTML = "Update";
  updateBtn.addEventListener("click", (e) => {
    updateData();
    alert("Data Updated");
    disableBtn();
    updateBtn.innerHTML = "Edit Profile";
  });
});
