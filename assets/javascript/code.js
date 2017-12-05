$( document ).ready(function() {

  //this part of the code is designed to display the gif

	function displayAnimalGif() {

    //ensures that the string in the URL is 

		var animalGif = $(this).attr("animal-data");

		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animalGif + "&api_key=dc6zaTOxFJmzC&limit=10"

		 $.ajax({

          url: queryURL,

          method: "GET"

        }).done(function(response) {

          console.log( response );

        	//var makeAnimalDiv = $( "#animalDiv" );

         // console.log(response.data[0].images.downsized.url);  

        	//$( "#animalDiv" ).append( response.data[0].images.downsized.url );

          var results = response.data; //response is the full object and data is the method (it returns the data)

          for (var i = 0; i < results.length; i++) { //we need to do a loop because we need to GO THROUGH AN ARRAY OF DATA

            var gifDiv = $("<div class='item'>"); //this dynamically creates a div 

            var rating = results[i].rating; //this var stores the index of the array //accessing an index of the results array and storing it in our rating var 

            var p = $("<p>").text("Rating: " + rating); //dynamically creates a paragraph tag and we set it equal to string and value of rating var

            var animalImage = $("<img>"); //create an image element

            animalImage.attr("src", results[i].images.fixed_height.url); //add the source attribute //fixed height.url is part of an object all same height

            gifDiv.prepend(p); //tacking the <p> tag we created above which contains our rating

            gifDiv.prepend(animalImage); //tacking on the animal gif

            $("#displayGif").prepend(gifDiv); //prepend to an existing DOM element 

            var stillAnimalImage = $( "<img>" ); //create a dynamic image tag for a still image

            stillAnimalImage.attr("src", results[i].images.fixed_height_still.url); //set the still image's source equal to the still image in the object

            gifIsMoving = true; //create a boolean to initialize the state of the gif moving to be true

            $( ".item" ).on("click", function() { //when you click on the gif div "item"...


              if (gifIsMoving) {
             // var arr = [results];

              //for (var j = 0; j < arr.length; j++){

              this.animalImage = this.stillAnimalImage; //the animal image tag will equal the still animal image tag

              $( animalImage ).hide(); //the animalImage will hide

              gifDiv.prepend(stillAnimalImage); //the still animal image will display in its place

              $("#displayGif").prepend(gifDiv); //tack it onto the div

              gifIsMoving === false; //the gifIsMoving variable will become false

            }else if (gifIsMoving === false) { //this code only worked for the uppermost gif and only paused it once. it could not be unpaused. 

              this.animalImage = this.stillAnimalImage;

                 $( stillAnimalImage ).hide();

                  gifDiv.prepend(animalImage);

                  $("#displayGif").prepend(gifDiv);

                  gifIsMoving === true;
            }
               // $( ".item" ).on("click", function() { //do an on-click function that reverses the process

               //   //when the gif is NOT moving

               //   if (gifIsMoving === false) {

                //  this.animalImage = this.stillAnimalImage;

               //  $( stillAnimalImage ).hide();

              //    gifDiv.prepend(animalImage);

              //    $("#displayGif").prepend(gifDiv);

              //    gifIsMoving = true;
           
            //}

        })

	   }

 })

}



	 //create an array of animals that will render as buttons
    
    var animalLst = ["cat", "dog", "mouse", "hamster", "chipmunk", "panda", "seal", "tiger", "lion", "elephant"];

    //create a function to render the buttons and let it take a parameter called "topics"

    function renderButtons (topics) {

    //create a for loop that creates a button for each string

    for (var i = 0; i < topics.length; i++) {

    	//create a variable and set it equal to a dynamically created button

    	var makeButton = $( "<button>" );

    	//add a class to this dynamically created button

    	makeButton.addClass( "animal" );

    	//create an ID attribute for this new class and a value for that data set to the index of the array

    	makeButton.attr( "animal-data", topics[i] );

    	//display the text on each dynamically created button corresponding to the string at each index of the array

    	makeButton.text( topics[i] );

    	//tack all of these buttons onto the div 

    	$( "#displayButton" ).append( makeButton );

    	}
	}


      $("#add-animal").on("click", function(event) {

        event.preventDefault();
  
        var inputAnimal = $("#animal-input").val().trim();


        var newTopic = inputAnimal.split();


        renderButtons(newTopic);

      })


      $(document).on("click", ".animal", displayAnimalGif );

      renderButtons(animalLst);

  

  });