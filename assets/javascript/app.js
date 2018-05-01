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
                var hero = $(this).attr("data-name");
                console.log(hero)
                var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
                    hero + "&api_key=dc6zaTOxFJmzC&limit=10";

                $.ajax({
                    url: queryURL,
                    method: "GET"
                }).then(function (response) {

                    var results = response.data;

                    for (var i = 0; i < results.length; i++) {

                        var heroDiv = $("<div class='item'>");
                        var rating = results[i].rating;
                        var p = $("<p>").text(rating);
                        var heroImage = $("<img>");


                        heroImage.attr("src", results[i].images.fixed_height_still.url);
                        heroImage.attr("data-animate", results[i].images.fixed_height.url);
                        heroImage.attr("data-still", results[i].images.fixed_height_still.url);
                        heroImage.attr("data-state", "still");
                        heroImage.attr("class", "indGif");
                        heroDiv.append(heroImage);
                        heroDiv.append(p);
                        $("#gif-view").prepend(heroDiv);

                    }

                });

                //-------------------------------------------
                
                $(function(){
                    var marvelAPI = 'https://gateway.marvel.com/v1/public/characters';
                    $.getJSON( marvelAPI, {
                        apikey: 'e8497bc6cb044233eb5ed6b04299d47e',
                        name: hero
                      })
                        .done(function( response ) {
                          var results = response.data.results;
                          var output = '<ul>'; 
            
                          console.log(response)
                          console.log(results)

                              var imgPath = results[i].images[0].path + '/standard_xlarge.' + results[i].images[0].extension;
                              output += '<li><img src="' + imgPath + '"><br>'+results[i].title+'</li>';
                                                    ]
                          output += '</ul>'
                          $('#results').append(output);
                      });
                       
                    });

                    //--------------------------------------------
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

            console.log('yay2')

