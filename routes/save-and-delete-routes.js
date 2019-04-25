var path = require("path");
module.exports = function(app, db) {
    app.put("/save/:id", function(req, res) {
        var id = req.params.id;
        db.Article.update({_id:id}, {saved: true})
        .then(function(response) {
            res.send(response);
            console.log(response);
        }).catch(function(err) {
            if (err) console.log(err);
        });
    });

    app.delete("/delete/:id", function(req, res) {
        var id = req.params.id;
        db.Article.remove({_id:id})
        .then(function(response) {
            res.send(response);
            console.log(response);
        }).catch(function(err) {
            if (err) console.log(err);
        });
    });
}