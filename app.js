//Require modules and models

var express = require("express");
var models = require("./models/index");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");

var app = express();

//Set view engine

app.set("view engine", "ejs");

//Middleware

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({
    extended:true
}));

app.use(methodOverride("_method"));

app.get("/", function(req, res) {
    res.redirect(301, "/chirps");
});

//Get all chirps
app.get("/chirps", (req, res) => {
  // Step 1: Retrieve all chirps from the database
  // Step 2: Generate HTML with all of the chirps inside
  // Step 3: Send back completed HTML to the browser
  models.Chirp.findAll().then((chirps) => {
    res.render("index", { chirps });
  });

  // View website at: http://localhost:3000/chirps
});

//Create new chirp
app.post("/chirps", (req, res) => {
  // Step 1: 
});

//Get specific chirp

//Edit a chirp

//Delete a chirp

app.listen(process.env.PORT || 3000);
