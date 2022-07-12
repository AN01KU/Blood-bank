const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");
const ejs = require("ejs");
var fs = require("fs");

var nodemailer = require("nodemailer");

const router = express.Router();

app.use(express.static(__dirname + "/public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.use(function (req, res, next) {
  setTimeout(next, 1000);
});

router.post("/findBlood", function (req, res) {
  fs.readFile("./Blood-data.json", function (err, data1) {
    if (err) throw err;
    data1 = JSON.parse(data1);

    // for (let index = 0; index < 6; index++) {
    //   if (data1.data[index][2] === "Eluru") {
    //     console.log(data1.data[index]);
    //   } else console.log("mhm");
    // }

    var group = req.body.group;
    var state = req.body.state;
    var district = req.body.district;
    var dataArray = [];
    var dataObj;

    for (let index = 0; index < 2000; index++) {
      var stateT = data1.data[index][1].toLowerCase();
      var cityT = data1.data[index][2].toLowerCase();
      var districtT = data1.data[index][3].toLowerCase();

      if (
        stateT === state.toLowerCase() // &&
        // (cityT === district.toLowerCase() ||
        //   districtT === district.toLowerCase())
      ) {
        //console.log(data1.data[index]);

        dataObj = data1.data[index];

        dataArray.push([dataObj]);

        //dataArray = [dataObj];
      }
    }
    //console.log(dataArray[0]);

    res.render("blood-info", { data: dataArray, data2: "test" });
  });
});

router.get("/", function (req, res) {
  res.render("index");
});

router.get("/login", function (req, res) {
  res.render("login");
});

router.post("/login", function (req, res) {
  res.render("login");
});
router.get("/profile", function (req, res) {
  res.render("profile");
});

router.post("/profile", function (req, res) {
  res.render("profile");
});
router.get("/appointment", function (req, res) {
  res.render("appoint");
});

router.post("/appointment", function (req, res) {
  res.render("find-blood", { data: "Appoint" });
});
router.get("/Contacts", function (req, res) {
  res.render("Contacts");
});

router.post("/Appoint-ty", function (req, res) {
  res.render("Appoint-ty");
});

router.get("/signup", function (req, res) {
  res.render("signup");
});

router.get("/locatebanks", function (req, res) {
  res.render("lcbanks");
});
router.post("/signup", function (req, res) {
  res.render("login");
});

router.get("/forget", function (req, res) {
  res.render("forget");
});

router.post("/forget", function (req, res) {
  res.render("forget");
});

router.get("/learn-more", function (req, res) {
  res.render("learn-more");
});

router.post("/learn-more", function (req, res) {
  res.render("learn-more");
});

router.get("/donors", function (req, res) {
  res.render("donors");
});

router.get("/AppointList", function (req, res) {
  res.render("AppointList");
});

router.post("/donors", function (req, res) {
  res.render("donors");
});

// router.get("/signUp", function (req, res) {
//   res.sendFile(path.join(__dirname + "/signUp/index.html"));
// });

router.get("/findBlood", function (req, res) {
  res.render("find-blood", {
    data: "test"
  });
});

router.post("/blood-info2", function (req, res) {
  fs.readFile("./Blood-data.json", function (err, data1) {
    if (err) throw err;
    data1 = JSON.parse(data1);

    var group = req.body.group;
    var state = req.body.state;
    var district = req.body.district;
    var dataArray = [];
    var dataObj;

    for (let index = 0; index < 2000; index++) {
      var stateT = data1.data[index][1].toLowerCase();
      var cityT = data1.data[index][2].toLowerCase();
      var districtT = data1.data[index][3].toLowerCase();

      if (
        stateT === state.toLowerCase() // &&
        // (cityT === district.toLowerCase() ||
        //   districtT === district.toLowerCase())
      ) {
        dataObj = data1.data[index];

        dataArray.push([dataObj]);
      }
    }
    res.render("blood-info", { data: dataArray, data2: "Appoint" });
  });
});

function myFunction(mail, name, message) {
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
    subject: name,
    text: message
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

router.post("/contactus", function (req, res) {
  console.log(req.body);
  myFunction(req.body.mail, req.body.name, req.body.message);
  res.redirect("/");
});

app.use("/", router);

app.listen(3000);

console.log("Running at Port 3000");
