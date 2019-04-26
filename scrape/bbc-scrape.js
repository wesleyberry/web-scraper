
module.exports = function (axios, cheerio, Article) {
    console.log("-------------------------------\n" +
        "Grabbing data from BBC\n");
    // // Axios request for scraping BBC
    axios.get("https://www.bbc.com/news/world").then(function (response) {
        var $ = cheerio.load(response.data);
        var domain = "https://www.bbc.com";
        // Scraping
        $("div.sparrow-item.faux-block-link").each(function (i, element) {
            var title = $(element).find("span").text();
            title = title.trim();
            var summary = $(element).find("a").last().text();
            summary = summary.trim().replace("Full article", "");
            summary = summary.replace("From the section", "");
            var link = domain + $(element).find("a").attr("href");
            var broadcaster = "BBC";
            var image = "http://static.bbcverticals.com/wwfeatures/tv/assets/logos/16x9/bbc-world-news.png";
            console.log("--------------------------------\n")
            console.log(title);
            console.log(summary);
            console.log(link);
            console.log(broadcaster);

            // Creates a document in the database
            Article.create({
                title: title,
                summary: summary,
                link: link,
                broadcaster: broadcaster,
                image: image
            }).then(function (dbArticle) {
                console.log(dbArticle)
            }).catch(function (err) {
                console.log(err);
            });
        });
    });
}