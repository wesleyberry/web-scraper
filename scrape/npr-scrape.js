
module.exports = function(axios, cheerio, Article) {
    console.log("-------------------------------\n" +
            "Grabbing data from NPR\n");

    axios.get("https://www.npr.org/sections/news/").then(function(response) {
        var $ = cheerio.load(response.data);
        $("article.item.has-image").each(function(i, element) {
            var title = $(element).find("h2.title").text();
            var summary = $(element).find("p.teaser").not(".date").text();
            var link = $(element).find("p.teaser").find("a").attr("href");
            var image = $(element).find("div.imagewrap").find("img").attr("src");
            var broadcaster = "NPR";
            if (!image) {
                image = "https://static.radio.net/images/broadcasts/3f/64/3576/c300.png";
            }
            console.log("--------------------------------\n")
            console.log(title + "\n");
            console.log(summary+ "\n");
            console.log(link+ "\n");
            console.log(image);
            console.log(broadcaster);

            // Creates a document in the database
            Article.create({
                title: title,
                summary: summary,
                link: link,
                broadcaster: broadcaster,
                image: image
            }).then(function(dbArticle) {
                console.log(dbArticle)
            }).catch(function(err) {
                console.log(err);
            });
        });
    });
}