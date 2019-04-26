// Saves an Article
$(document).on("click", ".save-button", function () {
    var id = $(this).attr("id");
    console.log(id);

    $.ajax({
        type: "PUT",
        url: "/save/" + id
    }).then(function (data) {
        location.reload();
        console.log(data);
    });
});

// Deletes an Article
$(document).on("click", ".delete-button", function () {
    var id = $(this).attr("id");
    console.log(id);

    $.ajax({
        type: "DELETE",
        url: "/delete/" + id
    }).then(function (data) {
        location.reload();
        console.log(data);
    });
});

$(document).on("click", ".scrape", function () {
    var id = $(this).attr("data-id");
    console.log(id);

    $.ajax({
        type: "POST",
        url: "/scrape/" + id
    }).then(function (data) {
        location.reload();
        console.log(data);
    });
});

$(document).on("click", ".comment-button", function () {
    var id = $(this).attr("id");
    console.log(id);

    $(".modal." + id).modal("show");

});

$(document).on("click", "button.submit-comment", function () {
    var text = $("textarea#message-text").val();
    var id = $(this).attr("id");
    // console.log(text + " " + id);

    $.ajax({
        type: "POST",
        url: "/comments/" + id,
        data: {
            text: text
        }
    }).then(function (data) {
        console.log(data);
        $("#message-text").empty();
        location.reload();
    })
});