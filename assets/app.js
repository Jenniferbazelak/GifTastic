//set variables

var feelArray = ["excited", "happy", "mad", "sad", "annoyed", "joy", "frustrated", "angry", "nervous"]

//makes new buttons for new feels
function renderButtons() {
    $("#buttonDiv").empty();
    for (var i = 0; i < feelArray.length; i++) {
        var a = $("<button>");
        a.addClass("feel-btn");
        a.attr("data-feel", feelArray[i]);
        a.text(feelArray[i]);
        $("#buttonDiv").append(a);

    }
}

$(document).ready(function () {

    renderButtons();


    //diplays gif in div and gives the still and animate attributes
    $(document).on("click", "button", function () {
        var feel = $(this).attr("data-feel");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + feel + "&api_key=pR9GLPKmk6dnd1lZ1D4kIMJ7fFJHqgxE&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            var results = response.data;
            for (var i = 0; i < results.length; i++) {

                var feelDiv = $("<div>");
                var p = $("<p>");
                p.text("Rating: " + results[i].rating);
                var feelImage = $("<img>");
                feelDiv.append(p);
                feelDiv.append(feelImage);
                $("#gifs-appear-here").prepend(feelDiv);
                feelImage.addClass("gif");
                feelImage.attr("src", results[i].images.fixed_height_still.url);
                feelImage.attr("data-still", results[i].images.fixed_height_still.url);
                feelImage.attr("data-animate", results[i].images.fixed_height.url);
            }
        })


    });

    //when clicked can animate or pause
    $(document).on("click", ".gif", function () {
        var state = $(this).attr("data-state");

        if (state === "still") {
            $(this).attr("src", $(this).data("animate"));
            $(this).attr("data-state", "animate");
        }
        else {
            $(this).attr("src", $(this).data("still"));
            $(this).attr("data-state", "still");
        }


    });

    $(document).on("click", "#find-feel", function(event) {
        event.preventDefault();
        var feel = $("#feel-input").val().trim();
        feelArray.push(feel);
        $("");
        renderButtons();
    });

   

});



