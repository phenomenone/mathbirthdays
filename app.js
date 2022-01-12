//jshit esversion: 6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

// Load the full build.
var _ = require('lodash');
const { raw } = require("express");

const numberOfDays = 10;

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// End Points 

app.get("/", function(req, res) {
    res.render('home',{});
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

app.post("/calculate", function(req, res){

    rawDate = req.body.postDate;
    const date = new Date();
    console.log("Today is: "+ date);
    console.log("Unformated birthDate: "+rawDate);
    const year = (rawDate).split('-')[0];
    const month = (rawDate).split('-')[1]-1;
    const day = (rawDate).split('-')[2];
    const birthDate = new Date(year, month, day);
    console.log("Birthdate: "+ birthDate);
    const tenDays = new Date();
    const hundredDays = new Date();
    const thousandDays = new Date();

    tenDays.setDate(birthDate.getDate() + numberOfDays);
    hundredDays.setDate(birthDate.getDate() + Math.pow(numberOfDays, 2));
    thousandDays.setDate(birthDate.getDate() + Math.pow(numberOfDays, 3));

    console.log("After 10 days: " + tenDays);
    console.log("After 100 days: " + hundredDays);
    console.log("After 1000 days: " + thousandDays);

    const mathBirthDays = {
        tenDays: tenDays.toDateString(),
        hundredDays: hundredDays.toDateString(),
        thousandDays: thousandDays.toDateString()
    };
    

    console.log(mathBirthDays);
    res.render("calculate", { mathBirthDays: mathBirthDays});
});

app.listen(process.env.PORT || 3000, function() {
    console.log("Server is running on port  3000.");
});
