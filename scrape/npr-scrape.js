
module.exports = function(axios, cheerio) {
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
            console.log("--------------------------------\n")
            console.log(title + "\n");
            console.log(summary+ "\n");
            console.log(link+ "\n");
            console.log(image);
            console.log(broadcaster);
        });
    });
}