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
function callGoogle(){
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