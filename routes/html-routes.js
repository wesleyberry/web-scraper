var path = require("path");
module.exports = function (app, db) {
    // Sends Landing PAge
    app.get("/", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/html/landing.html"));
    });

    // Renders Saved Page
    app.get("/saved", function (req, res) {
        db.Article.find({
            saved: true
        }).populate("comment").then(function (docs) {
            var hbsObject = {
                articles: docs
            };
            res.render("saved", hbsObject);
        });
    });

    // Renders NPR Page
    app.get("/npr", function (req, res) {
        db.Article.find({ broadcaster: "NPR" }).then(function (docs) {
            var hbsObject = {
                articles: docs
            };
            res.render("npr", hbsObject);
        });
    });

    // Renders BBC Page
    app.get("/bbc", function (req, res) {
        db.Article.find({ broadcaster: "BBC" }).then(function (docs) {
            var hbsObject = {
                articles: docs
            };
            res.render("bbc", hbsObject);
        });
    });

    // Renders CNN Page
    app.get("/cnn", function (req, res) {
        db.Article.find({ broadcaster: "CNN" }).then(function (docs) {
            var hbsObject = {
                articles: docs
            };
            res.render("cnn", hbsObject);
        });
    });
}