// connection to firebase
var config = {
    apiKey: "AIzaSyBEEv7CBXzPa2wgm2AVAynA6pJ0DC_kovs",
    authDomain: "trippy-c8caf.firebaseapp.com",
    databaseURL: "https://trippy-c8caf.firebaseio.com",
    storageBucket: "trippy-c8caf.appspot.com",
    messagingSenderId: "964170356211"
};
// initialze App
firebase.initializeApp(config);
// create shorter version to reference firebase db
var db = firebase.database();

// Load recent searches from Firebase
var ref = db.ref();
ref.once("value")
    .then(function(snapshot){
        snapshot.forEach(function(childSnapshot){
            var cityName = childSnapshot.val().searchTerm;
            console.log(cityName);
        });
    })
// when the search button is clicked, do something
$("#searchBtn").on("click", function() {
    var searchTerm = $("#searchTerm").val().trim();
    var isValid = inputValidation(searchTerm);
    if(isValid){
        console.log(searchTerm +" is a valid string");

        // grab the text in the search term box
        $("#overviewBox").show();
        $("#activitiesBox").hide();
        $("#restaurantsBox").hide();
        // call function to empty previous results
        clearBoxes();
        var map = initMap();
        
        searchTerm = capitalizeFirstLetterEachWordSplitBySpace(searchTerm);
        // push search to database
        db.ref().push({searchTerm});
        var newSearchTerm = $("<div>").html(searchTerm);
        newSearchTerm.addClass(".searchHistoryTerms");
        newSearchTerm.attr("data-term",searchTerm);
        // update list on html page
        $("#recentSearches").append(newSearchTerm);
        
        // next we call ALL of the API functions at once

        // need to call google maps API
        callGoogle(map,searchTerm);
        // call instagram API
        callInstagram(searchTerm);
        // call weather API
        callWeather(searchTerm);
        // call Zomato API
        callZomato(searchTerm);
        // call events
        // callEvents(searchTerm);
    }else{
        console.log(searchTerm+" is not a valid string")
        $("#YourElementHere").html("no special characters");
    }
    
});

// function to empty previous results
function clearBoxes(){
    $("#instafeed").empty();
    $("#weatherBox").empty();
    $("#activitiesResults").empty();
    $("#restaurantsResults").empty();
}

// function to capitalize first letter of each word
function capitalizeFirstLetterEachWordSplitBySpace(string) {
    var words = string.split(" ");
    var output = "";
    for (i = 0; i < words.length; i++) {
        // lowercase all letters, capitalize only the first letter
        lowerWord = words[i].toLowerCase();
        lowerWord = lowerWord.trim();
        capitalizedWord = lowerWord.slice(0, 1).toUpperCase() + lowerWord.slice(1);
        output += capitalizedWord;
        // add space to end fo capitalizedWord if not last word
        if (i != words.length - 1) {
            output += " ";
        }
    } //for
    output[output.length - 1] = '';
    console.log("Final output: " + output);
    return output;
}

// When overview nav link is clicked, 
// show the overview div and hide others
$("#overviewTab").on("click", function() {
    $("#overviewBox").show();
    $("#activitiesBox").hide();
    $("#restaurantsBox").hide();
});
// When activities nav link is clicked, 
// show the overview div and hide others
$("#activitiesTab").on("click", function() {
    $("#overviewBox").hide();
    $("#activitiesBox").show();
    $("#restaurantsBox").hide();
});
// When restaurant nav link is clicked, 
// show the overview div and hide others
$("#restaurantTab").on("click", function() {
    $("#overviewBox").hide();
    $("#activitiesBox").hide();
    $("#restaurantsBox").show();
});

function inputValidation(testString){
    return true;
    //This function tests if the argument is alphanumeric and returns true or false accordingly
    return (testString==/^([0-9]|[a-z])+([0-9a-z]+)$/i)? true: false;
}
