var topics = ["Michael Scott", "Jim Halpert", "Dwight Schrute", "Pam Beasley", "The Office", "Jim Pranks"];

function generateButtons() {
    $("#tags").empty();
    for (var i = 0; i < topics.length; i++) {
        var addButton = $("<button>");
        addButton.addClass("btn btn-outline-dark btn-lg");
        addButton.attr("data-value", topics[i]);
        addButton.text(topics[i]);
        $("#tags").append(addButton);
    }
}
generateButtons();

$("#submit").on("click", function (event) {
    event.preventDefault();
    var newButton = $("#yourInput").val().trim();
    var addInputButton = $("<button>");
    addInputButton.addClass("btn btn-outline-dark btn-lg");
    addInputButton.attr("data-value", newButton);
    addInputButton.text(newButton);
    $("#tags").append(addInputButton);
})

$(".btn").on("click", function () {
    event.preventDefault();
    // $("#gifs").remove();
    var searchItem = $(this).attr("data-value");
    console.log(searchItem);
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchItem + "&api_key=rBjSvGhSZWu1qGzVb1HfMBfWlmHKSAVP&limit=10";

    $.ajax({
            url: queryURL,
            method: "GET"
        })
        .then(function (response) {
            var results = response.data;
            console.log(results)

            for (var i = 0; i < results.length; i++) {
                var gifDiv = $("<div class='item'>");

                var rating = results[i].rating;

                var p = $("<p>").text("Rating: " + rating);

                var personImage = $("<img>");
                personImage.attr("src", results[i].images.fixed_height.url);

                gifDiv.prepend(p);
                gifDiv.prepend(personImage);

                $("#gifs").prepend(gifDiv);
            }
        });
});

