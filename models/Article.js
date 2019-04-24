var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ArticleSchema = new Schema({

    title: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },

    summary: {
        type: String,
        trim: true,
        required: false,
    },

    link: {
        type: String,
        trim: true
    },

    image: {
        type: String,
        trim: true
    },

    broadcaster: {
        type: String,
        trim: true
    },

    comment: {
        type: Schema.Types.ObjectId,
        ref: "Comment"
    },

    saved: {
        type: Boolean,
        required: true,
        default: false
    }
});

var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;