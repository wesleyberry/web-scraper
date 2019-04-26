var path = require("path");
module.exports = function(app, db) {
    app.get("/", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/html/landing.html"));
    });

    app.get("/saved", function(req, res) {
        db.Article.find( {
            saved: true
        }).populate("comment").then(function(docs) {
            var hbsObject = {
                articles: docs
            };
            res.render("saved", hbsObject);
        });
    });

    app.get("/npr", function(req, res) {
        db.Article.find({broadcaster: "NPR"}).then(function(docs) {
            var hbsObject = {
                articles: docs
            };
            res.render("npr", hbsObject);
        });
    });

    app.get("/bbc", function(req, res) {
        db.Article.find({broadcaster: "BBC"}).then(function(docs) {
            var hbsObject = {
                articles: docs
            };
            res.render("bbc", hbsObject);
        });
    });

    app.get("/cnn", function(req, res) {
        db.Article.find({broadcaster: "CNN"}).then(function(docs) {
            var hbsObject = {
                articles: docs
            };
            res.render("cnn", hbsObject);
        });
    });
}