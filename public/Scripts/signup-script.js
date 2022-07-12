import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.9/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/9.6.9/firebase-auth.js";

import {
  getDatabase,
  ref,
  set
} from "https://www.gstatic.com/firebasejs/9.6.9/firebase-database.js";

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
const auth = getAuth(app);
const database = getDatabase(app);

const steps = Array.from(document.querySelectorAll("form .step"));
const nextBtn = document.querySelectorAll("form .next-btn");
const prevBtn = document.querySelectorAll("form .previous-btn");
const form = document.querySelector("form");

nextBtn.forEach((button) => {
  button.addEventListener("click", (e) => {
    changeStep("next");
  });
});

prevBtn.forEach((button) => {
  button.addEventListener("click", (e) => {
    changeStep("prev");
  });
});

function changeStep(btn) {
  let index = 0;
  const currentStep = document.querySelector("form .step.active");
  index = steps.indexOf(currentStep);
  steps[index].classList.remove("active");
  if (btn === "next") {
    steps[index + 1].classList.add("active");
  }
  if (btn === "prev") {
    steps[index - 1].classList.add("active");
  }
}

var email = document.getElementById("email");
var password = document.getElementById("password");
var firstName = document.getElementById("firstName");
var lastName = document.getElementById("lastName");
var age = document.getElementById("age");
var phoneNumber = document.getElementById("phoneNumber");
var weight = document.getElementById("weight");
var height = document.getElementById("height");
var bloodType = document.getElementById("bloodType");
var allergies = document.getElementById("allergies");
var address = document.getElementById("address");
var city = document.getElementById("state");
var state = document.getElementById("sts");
var zip = document.getElementById("zip");
var gender = "";
var userType = "";

document.getElementById("radioBtn1").addEventListener("click", (e) => {
  gender = "Male";
});
document.getElementById("radioBtn2").addEventListener("click", (e) => {
  gender = "Female";
});
document.getElementById("radioBtn3").addEventListener("click", (e) => {
  gender = "Other";
});

document.getElementById("option-2").addEventListener("click", (e) => {
  document.getElementById("ifDonor").style.display = "flex";
  userType = "donor";
});

document.getElementById("option-1").addEventListener("click", (e) => {
  document.getElementById("ifDonor").style.display = "none";
  userType = "recipient";
});

document.getElementById("s0-btn").addEventListener("click", (e) => {
  document.getElementById("s1").classList.add("active");
  document.getElementById("s0").style.display = "none";
});

document.getElementById("back").addEventListener("click", (e) => {
  e.preventDefault();
  document.getElementById("s1").classList.remove("active");
  document.getElementById("s0").style.display = "block";
});

const createAccount = async () => {
  try {
    const userCredentails = await createUserWithEmailAndPassword(
      auth,
      email.value,
      password.value
    );

    const user = userCredentails.user;

    set(ref(database, "/user/" + user.uid), {
      email: email.value,
      password: password.value,
      firstName: firstName.value,
      lastName: lastName.value,
      age: age.value,
      gender: gender,
      phoneNumber: phoneNumber.value,
      weight: weight.value,
      height: height.value,
      bloodType: bloodType.value,
      allergy: allergies.value,
      address: address.value,
      city: city.value,
      state: state.value,
      zip: zip.value,
      userType: userType
    }).then(() => {
      console.log(userCredentails);
      form.action = "/signup";
      form.submit();
    });

    if (userType === "donor") {
      set(ref(database, "/donor/" + user.uid), {
        uid: user.uid
      });
    } else if (userType === "recipient") {
      set(ref(database, "/recipient/" + user.uid), {
        uid: user.uid
      });
    }
  } catch (error) {
    console.log(error);
  }
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  createAccount();

  let index = 0;
  const currentStep = document.querySelector("form .step.active");
  index = steps.indexOf(currentStep);
  steps[index].classList.remove("active");
  steps[0].classList.add("active");
  alert("Account sucessfully created,Redirecting to Login Page");
});
