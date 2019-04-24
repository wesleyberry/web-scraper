
module.exports = function(axios, cheerio) {
    console.log("-------------------------------\n" +
            "Grabbing data from CNN\n");

    axios.get("https://www.cnn.com/specials/us/energy-and-environment").then(function(response) {
        var $ = cheerio.load(response.data);
        var domain = "https://www.cnn.com/specials/us/energy-and-environment";
        $("div.cn__column").each(function(i, element) {
            var title = $(element).find("span.cd__headline-text").text();
            title = title.trim();
            var link = domain + $(element).find("h3.cd__headline").find("a").attr("href");
            var image = $(element).find("div.media").find("img").attr("data-src-small");
            var broadcaster = "CNN";
            console.log("--------------------------------\n")
            console.log(title + "\n");
            console.log(link+ "\n");
            console.log(image);
            console.log(broadcaster);
        });
    });
}