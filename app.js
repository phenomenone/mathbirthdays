//jshit esversion: 6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

// Load the full build.
var _ = require('lodash');

const app = express();

app.set('view engine', 'ejs');

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get("/", function(req, res) {
    res.render('home',{});
});

app.listen(process.env.PORT || 3000, function() {
    console.log("Server is running on port  3000.");
})
