var path = require("path");
module.exports = function (app, db) {
    // Updates Article.saved to be true
    app.put("/save/:id", function (req, res) {
        var id = req.params.id;
        db.Article.update({ _id: id }, { saved: true })
            .then(function (response) {
                res.send(response);
                console.log(response);
            }).catch(function (err) {
                if (err) console.log(err);
            });
    });

    // Deletes an article from the database
    app.delete("/delete/:id", function (req, res) {
        var id = req.params.id;
        db.Article.remove({ _id: id })
            .then(function (response) {
                res.send(response);
                console.log(response);
            }).catch(function (err) {
                if (err) console.log(err);
            });
    });
}