/*******************************
*    PIXABAY API CALL        *
*******************************/
function callPixabay(searchTerm) {
    $(".slidee").html("")

    var queryURL = "https://pixabay.com/api/?username=mjweaver01&key=1631539-db8210cabd2636c6df59812df&q=" + searchTerm + "&image_type=photo";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(response) {
        console.log(response);
        for (var i = 0; i < 12; i++) {
            var imageURL = response.hits[i].webformatURL;
            var newImgElem = $("<img class='pixabayImg'>").attr("src", imageURL);
            $(".slidee").append(newImgElem);
        }
    });

}

// test
//$(".pixabayImg").hover(function() {
////                $(this).addClass('transition');
////            }. function() {
////                $(this).removeClass('transition');
////            });
