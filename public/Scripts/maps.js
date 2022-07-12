import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.9/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/9.6.9/firebase-auth.js";

import {
  getDatabase,
  ref,
  set,
  get,
  child
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

const dref = ref(database);

var uid;
let address1 = [];
let city;

// Initialize and add the map
function initMap() {
  function mpas(address, index, callback) {
    var locations = [];
    for (var x = 0; x < address.length; x++) {
      console.log("TEST: " + address.toString());
      var geocoder = new google.maps.Geocoder();
      geocoder.geocode(
        {
          address: address[x]
        },
        function (results, status) {
          if (status === google.maps.GeocoderStatus.OK) {
            const uluru = {
              lat: results[0].geometry.viewport.Ab.h,
              lng: results[0].geometry.viewport.Va.j
            };
            locations.push(uluru);
            var map = new google.maps.Map(document.getElementById("map"), {
              zoom: 9,
              center: new google.maps.LatLng(uluru.lat, uluru.lng),
              mapTypeId: google.maps.MapTypeId.ROADMAP
            });

            var infowindow = new google.maps.InfoWindow();

            var marker, i;

            for (i = 0; i < locations.length; i++) {
              marker = new google.maps.Marker({
                position: new google.maps.LatLng(locations[i]),
                map: map
              });

              google.maps.event.addListener(
                marker,
                "click",
                (function (marker, i) {
                  return function () {
                    infowindow.setContent(locations[i][2]);
                    infowindow.open(map, marker);
                  };
                })(marker, i)
              );
            }
          }
        }
      );
    }
  }

  onAuthStateChanged(auth, (user) => {
    if (user) {
      uid = user.uid;

      get(child(dref, "/user/" + uid)).then((snapshot) => {
        if (snapshot.exists()) {
          var address = snapshot.val();
          city = address.city;
          var city1 = document.getElementById("city");
          city1.innerHTML = city;

          get(child(dref, "/user/")).then((snapshot) => {
            if (snapshot.exists()) {
              var address = snapshot.val();
              // console.log(address);

              if (address) {
                var array1 = Object.values(address);

                for (var i = 0; i < array1.length; i++) {
                  console.log(city.toLowerCase(), array1[i].city.toLowerCase());
                  if (city.toLowerCase() === array1[i].city.toLowerCase()) {
                    address1[i] = array1[i].address;
                  }
                  // console.log(opt.address);
                }
              }
            }
            address1 = address1.filter(function (element) {
              return element !== undefined;
            });

            mpas(address1);
          });
        }
      });
    }
  });
}

window.initMap = initMap;
