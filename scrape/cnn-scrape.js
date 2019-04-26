
module.exports = function(axios, cheerio, Article) {
    console.log("-------------------------------\n" +
            "Grabbing data from CNN\n");

    axios.get("https://www.cnn.com/specials/us/energy-and-environment").then(function(response) {
        var $ = cheerio.load(response.data);
        var domain = "https://www.cnn.com";
        $("div.cn__column").each(function(i, element) {
            var title = $(element).find("span.cd__headline-text").text();
            title = title.trim();
            var link = domain + $(element).find("h3.cd__headline").find("a").attr("href");
            var image = $(element).find("div.media").find("img").attr("data-src-small");
            var broadcaster = "CNN";
            if (!image) {
                image = "https://cdn.cnn.com/cnn/.e1mo/img/4.0/logos/CNN_logo_400x400.png";
            }
            console.log("--------------------------------\n")
            console.log(title + "\n");
            console.log(link+ "\n");
            console.log(image);
            console.log(broadcaster);

            // Creates a document in the database
            Article.create({
                title: title,
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