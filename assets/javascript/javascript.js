
//=============================Rendering Existing Buttons================================
let topicsArray = ["salamanders", "otters", "lemur"];
for (i=0; i < topicsArray.length; i++) {
    let buttonInitial = $("<button>").text(topicsArray[i])
                                     .attr("data-topic", topicsArray[i])
                                     .attr('id', 'aButton')
                                     .addClass("clickMe")
                                     .addClass('m-3');
    $("#buttons").append(buttonInitial);
}

//===============================Rendering The Clear Button=================================
let clearButton = $('<button>').text('Clear')
                               .addClass('clear')
                               .attr('id', 'aButton');
$('#buttons').append(clearButton);
$(clearButton).on('click', function(event) {
    $("#userButton").remove();
});


//=============================Adding New User Input Buttons==============================
$("#add-topic").on("click", function(event) {
    event.preventDefault();
    let newTopic = $("#topic-input").val().trim();
    let buttonNew = $('<button>').text(newTopic)
                                 .attr("data-topic", newTopic)
                                 .attr('id', 'userButton')
                                 .addClass("clickMe")
                                 .addClass('m-3');
                                 
    $('#buttons').append(buttonNew);
});

//=================================Clicking Gif Buttons======================================
$( document ).ready(function() {

$('#buttons').on('click','.clickMe', function (event) {
    $("#gifs").empty();
    let topic = $(this).attr("data-topic");
            console.log(topic);
    let queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=Ge1SfcGlTb9DupOUNff1xwPdFKPyMZhk&limit=10";
            console.log(queryURL);
    $.ajax({
      url: queryURL,
      method: "GET"
    })
    .then(function(response) {
        let results = response.data;
        console.log(results);
        for (i = 0; i < results.length; i++)  {
            let gifDiv = $("<div>").attr('id', 'gifDiv')
                                   .addClass('p-1')
                                   .addClass('m-3');
            let rating = results[i].rating;
            let ratingText = $("<h5>").text("Rating: " + rating).addClass('text-center');
            let gifImage = $("<img>");

            gifImage.attr("src", results[i].images.fixed_height_still.url)
                    .attr('data-still', results[i].images.fixed_height_still.url)
                    .attr('data-animate', results[i].images.fixed_height.url)
                    .attr('data-state', 'still')
                    .attr('id', 'gifImage')
                    .addClass('gif')
                    .addClass('m-3');
            gifDiv.append(ratingText);
            gifDiv.prepend(gifImage);
            $('#gifs').append(gifDiv);
        }
    });
});


//=======================================Animating Gifs=============================================
$("#gifs").on("click", ".gif", function() {
        
      var state = $(this).attr("data-state");
      console.log(state);
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    });
});   