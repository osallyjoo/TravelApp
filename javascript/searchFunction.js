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

// when the search button is clicked, do something
$("#searchBtn").on("click", function() {
    // grab the text in the search term box
    var searchTerm = $("#searchTerm").val().trim();
    searchTerm = capitalizeFirstLetterEachWordSplitBySpace(searchTerm);
    // push search to database
    db.ref().push(searchTerm);
    // update list on html page
    $("#recentSearches").append($("<div>").html(searchTerm));
    
    // next we call ALL of the API functions at once

    // need to call google maps API
    // callGoogle(searchTerm);
    // call instagram API
    // callInstagram(searchTerm);
    // call weather API
    // callWeather(searchTerm);
    // call Zomato API
    callZomato(searchTerm);
    // call events

});

// function to capitalize first letter of each word
function capitalizeFirstLetterEachWordSplitBySpace(string) {
    var words = string.split(" ");
    var output = "";
    for (i = 0; i < words.length; i++) {
        lowerWord = words[i].toLowerCase();
        lowerWord = lowerWord.trim();
        capitalizedWord = lowerWord.slice(0, 1).toUpperCase() + lowerWord.slice(1);
        output += capitalizedWord;
        if (i != words.length - 1) {
            output += " ";
        }
    } //for
    output[output.length - 1] = '';
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
