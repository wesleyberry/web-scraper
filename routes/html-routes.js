var path = require("path");
module.exports = function(app) {
    app.get("/", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/html/landing.html"));
    });

    app.get("/saved", function(req, res) {
        res.render("saved");
    });

    app.get("/npr", function(req, res) {
        res.render("npr");
    });

    app.get("/bbc", function(req, res) {
        res.render("bbc");
    });

    app.get("/cnn", function(req, res) {
        res.render("cnn");
    });
}