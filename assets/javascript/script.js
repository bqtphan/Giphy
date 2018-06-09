var topics = ["Michael Scott", "Jim Halpert", "Dwight Schrute", "Pam Beasley", "The Office", "Jim Pranks"];

function generateButtons() {
    $("#tags").empty();
    for (var i = 0; i < topics.length; i++) {
        var addButton = $("<button>");
        addButton.addClass("btn btn-outline-dark btn-lg");
        addButton.attr("data-name", topics[i]);
        addButton.text(topics[i]);
        $("#tags").append(addButton);
    }
}

$("#submit").on("click", function (event) {
    event.preventDefault();
    var newButton = $("#yourInput").val().trim();
    var addInputButton = $("<button>");
    addInputButton.attr("data-name", newButton);
    addInputButton.addClass("btn btn-outline-dark btn-lg");
    addInputButton.text(newButton);
    $("#tags").append(addInputButton);
})

$("button").on("click", function () {
    var buttonClicked = $(this).attr("data-name");
    console.log(buttonClicked);

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + buttonClicked + "&api_key=dc6zaTOxFJmzC&limit=10";

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


generateButtons();