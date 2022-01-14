//jshit esversion: 6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

var moment = require('moment'); // require
moment().format(); 

// Load the full build.
var _ = require("lodash");
const { raw } = require("express");

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// End Points

app.get("/", function (req, res) {
  res.render("home", {});
});

app.post("/calculate", function (req, res) {
    let message = "will be";
    const now = moment();
    const userBDate = req.body.userBDate;
    const userBirthDate = moment(userBDate).year(moment(now).year());
    const userBirthDateThisYear = moment(userBirthDate).set('year', moment(now).year());
    if( moment(userBirthDateThisYear).isBefore(now) ){
        message = "was";
    }
    // Addition of days to user inpput birthdate
    const mathBirthDays = {
        tenDays: userBirthDate.add(10,'d').format("YYYY MMMM DD"),
        hundredDays: userBirthDate.add(100,'d').format("YYYY MMMM DD"),
        thousandDays: userBirthDate.add(1000,'d').format("YYYY MMMM DD")
    }
    res.render("calculate", { 
        mathBirthDays: mathBirthDays,
        message: message,
        userBDate: moment(userBDate).format("LL") 
     });
});

app.listen(process.env.PORT || 3000, function () {
  console.log("Server is running on port  3000.");
});
