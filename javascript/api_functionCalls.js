/***********************************************************
*____________________.____________________________.___.    *
*\__    ___/\______   \   \______   \______   \__  |   |   *
*  |    |    |       _/   ||     ___/|     ___//   |   |   *
*  |    |    |    |   \   ||    |    |    |    \____   |   *
*  |____|    |____|_  /___||____|    |____|    / ______|   *
*                   \/                         \/          *
***********************************************************/

/*******************************
*    GOOGLE MAPS API CALL      *
*******************************/
function callGoogle(map,cityName){
	//This function takes in a map and an address (it could be anything) grabs a location from the geolcation API and re-centers the map
	var queryObject = {
		//set search parameters
		address: cityName,
	}
	queryObject = $.param(queryObject); //convert to a passable string
	queryURL =  "https://maps.googleapis.com/maps/api/geocode/json?"+queryObject+"&key=AIzaSyB5oi96xh3OkmxpVvwpymxbWqXnGHe4vMY";
	console.log(queryURL);
	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function(response){
		console.log(response);
		console.log(response.results[0].geometry.location);
		var loc = response.results[0].geometry.location; //this is an object that holds lat and lng and thas it
		map.setCenter(loc); //the map was initialized earlier in the googleMaps.js

		//doesn't hurt to include a marker I guess but probably important to wipe all other markers before hand
		var marker = new google.maps.Marker({
    		position: loc,
    		map: map
  		});
		/* WHAT DO WITH DATA? */
	})

}

function callInstagram(){
	var queryObject = {
		//set search parameters
	}

	queryObject = $.param(queryObject); //convert to a passable string
	queryURL = /* INSERT GOOGLE URL HERE */ + /* INSERT API KEY HERE */ + queryObject;
	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function(response){
		console.log(response);

		/* WHAT DO WITH DATA? */
	})

}

function callWeather(){
	var queryObject = {
		//set search parameters
	}

	queryObject = $.param(queryObject); //convert to a passable string
	queryURL = /* INSERT GOOGLE URL HERE */ + /* INSERT API KEY HERE */ + queryObject;
	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function(response){
		console.log(response);

		/* WHAT DO WITH DATA? */
	})

}

function callExpedia(){
	var queryObject = {
		//set search parameters
	}

	queryObject = $.param(queryObject); //convert to a passable string
	queryURL = /* INSERT GOOGLE URL HERE */ + /* INSERT API KEY HERE */ + queryObject;
	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function(response){
		console.log(response);

		/* WHAT DO WITH DATA? */
	})

}

function callYelp(){
	var queryObject = {
		//set search parameters
	}

	queryObject = $.param(queryObject); //convert to a passable string
	queryURL = /* INSERT GOOGLE URL HERE */ + /* INSERT API KEY HERE */ + queryObject;
	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function(response){
		console.log(response);

		/* WHAT DO WITH DATA? */
	})

}