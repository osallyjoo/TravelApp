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
            //console.log(cityName);
        });
    });

// when the search button is clicked, do something
$("#searchBtn").on("click", function() {
    // use getSearchTerm function to clean up and get search term
    var searchTerm = getSearchTerm();
    // call function to pull API info
    getCityInfo(searchTerm);  
    // call function to put search term on page  
    putSearchTermOnPage(searchTerm);
});

// assign on click function to search history terms
$(document).on("click", "button", function() {
    var searchTerm = $(this).attr("data-term");
    getCityInfo(searchTerm);
});

// when enter is pressed, get search term and run the functions
$("#searchTerm").on("keyup", function(event){
    event.preventDefault();
    console.log(event.key);
    if (event.key==="Enter"){
        console.log("enter was pressed");
        var searchTerm = getSearchTerm();
        getCityInfo(searchTerm);
        putSearchTermOnPage(searchTerm);
    }
});

// function to clean up and validate search term
function getSearchTerm(){
    // get value from input box
    var searchTerm = $("#searchTerm").val().trim();
    // call function to validate if there are special characters
    var isValid = inputValidation(searchTerm);
    if (isValid) {
        // if it's valid, capitalize the first letter of every word
        searchTerm = capitalizeFirstLetterEachWordSplitBySpace(searchTerm);
    } else {
        // if it's not valid, update page to say it's not a valid string
        console.log(searchTerm+" is not a valid string");
        $("#YourElementHere").html("no special characters");
    }
    return searchTerm;
}

// function to update the page
function getCityInfo(searchTerm){
    // hide activities and restaurants box, only show overview
    $("#overviewBox").show();
    $("#activitiesBox").hide();
    $("#restaurantsBox").hide();

    // push searchTerm to firebase in an object
    db.ref().push({searchTerm});
    
    // call function to empty previous results
    clearBoxes();
    // initialize map
    var map = initMap();
    // call google API
    callGoogle(map,searchTerm);
    // call instagram API
    callInstagram(searchTerm);
    // call weather API
    callWeather(searchTerm);
    // call Zomato API
    callZomato(searchTerm);
}

// function to put database on page
function putSearchTermOnPage(searchTerm){
    // Create divs to update recent searches
    var newSearchTerm = $("<button>").html(searchTerm);
    newSearchTerm.addClass(".searchHistoryTerms");
    newSearchTerm.attr("data-term",searchTerm);
    // update list on html page
    $("#recentSearches").append(newSearchTerm);
}
// function to check if searchTerm is already in Firebase
function checkFirebaseForSearchTerm(searchTerm){
    ref.once("value")
    .then(function(snapshot){
        var checkCounter = 0;
        snapshot.forEach(function(childSnapshot){
            var cityName = childSnapshot.val().searchTerm;
            if (cityName===searchTerm){
                checkCounter++;
            };
        });
    });
    console.log(checkCounter)
    return checkCounter;
}

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
    $(".navTabs").removeClass("active").addClass("inactive");
    $("#overviewTab").addClass("active").removeClass("inactive");
});
// When activities nav link is clicked, 
// show the overview div and hide others
$("#activitiesTab").on("click", function() {
    $("#overviewBox").hide();
    $("#activitiesBox").show();
    $("#restaurantsBox").hide();
    $(".navTabs").removeClass("active").addClass("inactive");
    $("#activitiesTab").addClass("active").removeClass("inactive");
});
// When restaurant nav link is clicked, 
// show the overview div and hide others
$("#restaurantTab").on("click", function() {
    $("#overviewBox").hide();
    $("#activitiesBox").hide();
    $("#restaurantsBox").show();
    $(".navTabs").removeClass("active").addClass("inactive");
    $("#restaurantTab").addClass("active").removeClass("inactive");
});

function inputValidation(testString){
    return true;
    //This function tests if the argument is alphanumeric and returns true or false accordingly
    return (testString==/^([0-9]|[a-z])+([0-9a-z]+)$/i)? true: false;
}
