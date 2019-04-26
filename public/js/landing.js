$(document).ready(function () {
    window.setInterval("changeImage()", 3000);
});

// Cycles through these images every 3 seconds
function changeImage() {
    var imgs = ["url(../images/bbc.png)",
        "url(../images/cnn.jpg)",
        "url(../images/npr.jpg)"];
    var i = Math.floor((Math.random() * 3));
    $("body").css("background-image", imgs[i]);
    // background = background.css("background-image", imgs[i]);
}