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
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//  Database Connection
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/articledb";
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

// Models
var db = require("./models");

// HTML Route
require("./routes/html-routes.js")(app, db);
require("./routes/save-and-delete-routes.js")(app, db);

// Scrapes
function runBBC() {
    require("./scrape/bbc-scrape.js")(axios, cheerio, db.Article);
}
function runCNN() {
    require("./scrape/cnn-scrape.js")(axios, cheerio, db.Article);
}
function runNPR() {
    require("./scrape/npr-scrape.js")(axios, cheerio, db.Article);
}

runBBC();
runCNN();
runNPR();
var secondsInADay = 86400;
var millisecondsPerSecond = 1000;
setInterval(function () {
    runBBC();
}, secondsInADay * millisecondsPerSecond);
setInterval(function () {
    runNPR();
}, secondsInADay * millisecondsPerSecond + 10000);
setInterval(function () {
    runCNN();
}, secondsInADay * millisecondsPerSecond + 20000);

app.post("/scrape/:id", function (req, res) {
    var id = req.params.id;
    console.log(id);
    if (id === "BBC") {
        runBBC();
        res.send(200);
    } else if (id === "NPR") {
        runNPR();
        res.send(200);
    } else if (id === "CNN") {
        runCNN();
        res.send(200);
    }
    res.end();
});

// Posting comments
app.post("/comments/:id", function (req, res) {
    var id = req.params.id;
    db.Comment.create(req.body).then(function (dbComment) {
        console.log(dbComment._id);
        return db.Article.findOneAndUpdate(
            { _id: id },
            { $push: { comment: dbComment._id } },
            { new: true }
        ).then(function (dbArticle) {
            res.json(dbArticle);
        }).catch(function (err) {
            res.json(err);
        });
    });
});

app.listen(PORT, function () {
    console.log("Listening on port:" + PORT);
});

module.exports = app;