            // Initial array of gifs
            var gifs = ["Iron Man", "Hulk", "Captain America", "Thor"];

            function renderButtons() {

                $("#buttons-view").empty();

                // Looping through the array of gifs
                for (var i = 0; i < gifs.length; i++) {

                    var a = $("<button>");

                    a.addClass("gif");

                    a.attr("data-name", gifs[i]);

                    a.text(gifs[i]);

                    $("#buttons-view").append(a);
                }
            }

            $("#add-gif").on("click", function (event) {

                event.preventDefault();

                var gif = $("#gifs-input").val().trim();

                gifs.push(gif);

                renderButtons();
            });

            function displayGifs() {
                var animal = $(this).attr("data-name");
                console.log(animal)
                var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
                    animal + "&api_key=dc6zaTOxFJmzC&limit=10";

                $.ajax({
                    url: queryURL,
                    method: "GET"
                }).then(function (response) {

                    var results = response.data;

                    for (var i = 0; i < results.length; i++) {

                        var animalDiv = $("<div class='item'>");
                        var rating = results[i].rating;
                        var p = $("<p>").text(rating);
                        var animalImage = $("<img>");


                        animalImage.attr("src", results[i].images.fixed_height_still.url);
                        animalImage.attr("data-animate", results[i].images.fixed_height.url);
                        animalImage.attr("data-still", results[i].images.fixed_height_still.url);
                        animalImage.attr("data-state", "still");
                        animalImage.attr("class", "indGif");
                        animalDiv.append(p);
                        animalDiv.append(animalImage);
                        $("#gif-view").prepend(animalDiv);

                    }

                });
            };

            function gifState() {

                var state = $(this).attr("data-state");

                if (state === "still") {
                    $(this).attr("src", $(this).attr("data-animate"));
                    $(this).attr("data-state", "animate");
                } else {
                    $(this).attr("src", $(this).attr("data-still"));
                    $(this).attr("data-state", "still");
                }
            };

            $(document).on("click", ".gif", displayGifs);
            $(document).on("click", ".indGif", gifState);

            renderButtons();

    // var queryURL = "https://gateway.marvel.com:443/v1/public/characters?name=thor&orderBy=name&limit=1&apikey=e8497bc6cb044233eb5ed6b04299d47e";

    // $.ajax({
    //   url: queryURL,
    //   method: "GET"
    // }).then(function(response) {
    //   console.log(response);
    //   console.log("yay");
    // });

    $(function(){
        var marvelAPI = 'https://gateway.marvel.com/v1/public/comics';
        $.getJSON( marvelAPI, {
            apikey: 'e8497bc6cb044233eb5ed6b04299d47e'
          })
            .done(function( response ) {
              var results = response.data.results;
              var resultsLen = results.length;
              var output = '<ul>'; 

              console.log(response)
              console.log(results)
              console.log(resultsLen)
              
              for(var i=0; i<resultsLen; i++){
                if(results[i].images.length > 0) {
                  var imgPath = results[i].images[0].path + '/standard_xlarge.' + results[i].images[0].extension;
                  output += '<li><img src="' + imgPath + '"><br>'+results[i].title+'</li>';
                }
              }  
              output += '</ul>'
              $('#results').append(output);
          });
           
        });