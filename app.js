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
  // Step 1: Retrieve new chirp from the front end (user input)
  // Step 2: Store new chirp in the database
  // Step 3: Redirect back to GET /chirps
  var newChirpFromUser = req.body;

  models.Chirp.create(newChirpFromUser).then(() => {
    res.redirect("/chirps");
  });
});

//Get specific chirp
app.get("/chirps/:id/edit", (req, res) => {
  // Step 1: Retrieve chirp from the database via its ID
  // Step 2: Generate HTML for edit page with specific chirp inside
  // Step 3: Send back completed HTML to browser
  var chirpId = req.params.id;

  models.Chirp.findById(chirpId).then((chirp) => {
    res.render("edit", { chirp });
  });
});

//Edit a chirp
app.put("/chirps/:id", (req, res) => {
  // Step 1: Retrieve updated chirp text from user input
  // Step 2: Retrieve specific chirp via its ID
  // Step 3: Update that specific chirp with new data
  // Step 4: Redirect user back to GET /chirps
  var updatedUserText = req.body;
  var chirpId = req.params.id;

  models.Chirp.findById(chirpId).then((chirp) => {
    chirp.updateAttributes(updatedUserText).then(() => {
      res.redirect("/chirps");
    });
  });
});

//Delete a chirp
// Hint: .destroy() is the method to delete a record (nothing inside the parentheses)
app.delete("/chirps/:id", (req, res) => {
  // Step 1: Retrieve specific chirp via its ID
  // Step 2: Destroy that specific chirp
  // Step 3: Redirect back to GET /chirps
  var chirpId = req.params.id;

  models.Chirp.findById(chirpId).then((chirp) => {
    chirp.destroy().then(() => {
      res.redirect("/chirps");
    });
  });
});

app.listen(process.env.PORT || 3000);
