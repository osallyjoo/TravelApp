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
$("#searchBtn").on("click",function(){
	// grab the text in the search term box
	var searchTerm = $("#searchTerm").val().trim();
	// push search to database
	db.ref().push(searchTerm);
	// update list on html page
	$("#recentSearches").append($("<div>").html(searchTerm));
	// need to call google maps API
	//callGoogle(searchTerm);
	// call instagram API
	//callInstagram(searchTerm);
	// call weather API
	//callWeather(searchTerm);
});

// -------------------------------------------------
// When overview nav link is clicked, 
// show the overview div and hide others
$("#overviewTab").on("click",function(){
	$("#overviewBox").show();
	$("#activitiesBox").hide();
	$("#restaurantsBox").hide();
});

$("#activitiesTab").on("click",function(){
	$("#overviewBox").hide();
	$("#activitiesBox").show();
	$("#restaurantsBox").hide();
});

$("#restaurantTab").on("click",function(){
	$("#overviewBox").hide();
	$("#activitiesBox").hide();
	$("#restaurantsBox").show();
});
// -------------------------------------------------