var characters = ["Albus Dumbledore ", "Argus Filch", "Filius Flitwick"];

function renderButtons() {
    $(".buttonsView").empty();

    for (var i = 0; i < characters.length; i++) {
        var button = $("<button>");
        button.text(characters[i]);
        button.attr("data-character", characters[i]);
        $(".buttonsView").append(button);
    }
}

renderButtons();

$("#addCharacter").on("click", function (event) {
    event.preventDefault();

    var character = $("#characterInput").val();
    characters.push(character);
    renderButtons();
    console.log(characters);
});

$(document).on("click", "button", function () {
    console.log("fds");
    var person = $(this).attr("data-character");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        person + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
            url: queryURL,
            method: "GET"
        })
        .then(function (response) {
            var results = response.data;
            console.log(response);
            // var state = $(this).attr("data-state");
            for (var i = 0; i < results.length; i++) {
                var newGif = $("<div>");
                var rating = results[i].rating;
                var p = $("<p>").text("Rating: " + rating);
                var characterGif = $("<img>");
                characterGif.addClass("gif");
                characterGif.attr("src", results[i].images.fixed_height_still.url);
                characterGif.attr("data-state", "still");
                characterGif.attr("data-still", results[i].images.fixed_height_still.url);
                characterGif.attr("data-animate", results[i].images.fixed_height.url);
                newGif.prepend(characterGif);
                newGif.prepend(p);

                $("#gifs").prepend(newGif);

            }

            $(".gif").on("click", function () {
                var state = $(this).attr("data-state");
                console.log(state);
                if (state === "still") {
                    $(this).attr("src", $(this).attr("data-animate"));
                    $(this).attr("data-state", "animate");
                } else if (state === "animate") {
                    $(this).attr("src", $(this).attr("data-still"));;
                    $(this).attr("data-state", "still");
                }

            });





        });
});