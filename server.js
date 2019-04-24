var express = require("express");
var mongojs = require("mongojs");
var exphbs = require("express-handlebars");
var mongoose = require('mongoose');
var path = require("path");
var cheerio = require("cheerio");
var axios = require("axios");
var logger = require("morgan");

var app = express();

app.use(express.static("public"));
var PORT = process.env.PORT || 3000;
app.use(logger("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Sets up Handlebars
app.engine("handlebars",exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

//  Database Connection
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/articledb";
mongoose.connect(MONGODB_URI, {useNewUrlParser: true});

// Models
var db = require("./models");

// HTML Route
require("./routes/html-routes.js")(app);

// API Routes
// require("./routes/bbc-routes.js")(app);
// require("./routes/npr-routes.js")(app);
// require("./routes/cnn-routes.js")(app);

// Scrapes
require("./scrape/bbc-scrape.js")(axios, cheerio, db.Article);
// require("./scrape/npr-scrape.js")(axios, cheerio, db.Article);
// require("./scrape/cnn-scrape.js")(axios, cheerio, db.Article);

app.listen(PORT, function() {
    // eslint-disable-next-line no-console
    console.log("Listening on port:" + PORT);
});

module.exports = app;