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
        db.Article.find({broadcaster: "NPR"}).limit(10).then(function(docs) {
            var hbsObject = {
                articles: docs
            };
            console.log(hbsObject);
            res.render("npr", hbsObject);
        });
    });

    app.get("/bbc", function(req, res) {
        db.Article.find({broadcaster: "BBC"}).limit(10).then(function(docs) {
            var hbsObject = {
                articles: docs
            };
            console.log(hbsObject);
            res.render("bbc", hbsObject);
        });
    });

    app.get("/cnn", function(req, res) {
        db.Article.find({broadcaster: "CNN"}).limit(10).then(function(docs) {
            var hbsObject = {
                articles: docs
            };
            console.log(hbsObject);
            res.render("cnn", hbsObject);
        });
    });
}