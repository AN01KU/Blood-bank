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
var Uname = document.getElementById("username");
var Date2 = document.getElementById("date");

var Time = document.getElementById("time");
var bankname = document.getElementById("bankname");
var mapbtn = document.getElementById("mapbtn");
var appointmentType = document.getElementById("appointmentType");

var map2 = document.getElementById("map2");
map2.style.visibility = "hidden";

var uid;

function myFunction(mail) {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "abhaysengar3250@gmail.com",
      pass: "vruusldavhfabssd"
    }
  });

  var mailOptions = {
    from: mail,
    to: "abhaysengar3250@gmail.com",
    subject: "Appointment",
    text: "Your Appointment is booked!",
    html: "<h1>Your Appointment is booked!</h1>"
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

onAuthStateChanged(auth, (user) => {
  if (user) {
    uid = user.uid;
    console.log(user);

    // myFunction(user.email);

    get(child(dref, "appointments/"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          var date = snapshot.val();
          if (date) {
            var array1 = Object.values(date);
            let lastValue = array1[Object.keys(array1).pop()];

            get(child(dref, "appointments/" + lastValue.newPostKey)).then(
              (snapshot) => {
                if (snapshot.exists()) {
                  console.log("success4");
                  var data = snapshot.val();
                  console.log(data.time);
                  Uname.innerHTML = data.name;
                  Date2.innerHTML = data.date;
                  Time.innerHTML = data.time;
                  bankname.innerHTML = data.BankName;
                  appointmentType.innerHTML = data.appointmentType;
                } else {
                  console.log("fail");
                }
              }
            );
          }
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }
});

function initMap() {
  function maps(address, callback) {
    console.log("TEST: " + address.toString());
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode(
      {
        address: address
      },
      function (results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
          console.log(results[0]);
          const uluru = {
            lat: results[0].geometry.viewport.Ab.h,
            lng: results[0].geometry.viewport.Va.j
          };
          console.log(uluru);

          var map = new google.maps.Map(map2, {
            zoom: 9,
            center: new google.maps.LatLng(uluru.lat, uluru.lng),
            mapTypeId: google.maps.MapTypeId.ROADMAP
          });
          map2.style.visibility = "visible";
          var marker;

          marker = new google.maps.Marker({
            position: new google.maps.LatLng(uluru),
            map: map
          });
        }
      }
    );
  }

  function print(params) {
    var banks = document.getElementById("bankname");
    console.log(banks.innerHTML);
    return banks.innerHTML;
  }

  mapbtn.addEventListener("click", (e) => {
    var address = print();
    maps(address);
  });
}

window.initMap = initMap;
