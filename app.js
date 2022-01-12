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

// app.post('/test', (req, res) => {
//     res.render('loading', (err, html) => {
//       res.write(html + '\n');
//       setTimeout(() => { // mimick a calculation that takes some time
//         res.render('calculate', {}, (err, html) => {
//           res.end(html + '\n');
//         });
//       }, 2000);
//     });
//   });

app.post("/calculate", function (req, res) {
    let message = "is";
    const now = moment();
    console.log("POST: " + req.body.userBDate);
    const userBDate = req.body.userBDate;
    const userBirthDate = moment(userBDate);
    const userBirthDateThisYear = moment(userBirthDate).set('year', moment(now).year());
    console.log(userBDate);
    console.log(`userBirthDate: ${userBirthDate}`);
    console.log(`now: ${now}`);
    if( moment(userBirthDateThisYear).isBefore(now) ){
        console.log(`isBEfore`);
        message = "was";
    }
    // Addition of days to user inpput birthdate
    const mathBirthDays = {
        tenDays: userBirthDate.add(10,'d').format("YYYY MMMM DD"),
        hundredDays: userBirthDate.add(100,'d').format("YYYY MMMM DD"),
        thousandDays: userBirthDate.add(1000,'d').format("YYYY MMMM DD")
    }
    console.log(mathBirthDays);
    res.render("calculate", { 
        mathBirthDays: mathBirthDays,
        message: message
     });
});

app.listen(process.env.PORT || 3000, function () {
  console.log("Server is running on port  3000.");
});
