/*******************************
*    PIXABAY API CALL        *
*******************************/
function callPixabay(searchTerm) {


    var queryURL = "https://pixabay.com/api/?username=mjweaver01&key=1631539-db8210cabd2636c6df59812df&q=" + searchTerm + "&image_type=photo";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(response) {

        console.log(response);


        for (var i = 0; i < 10; i++) {
            var image = response.hits[i].previewURL;
            console.log(image);
            var newImgElem = $("<img>").attr("src", image);

            $(".slidee").append(newImgElem);
        }

    });

}
