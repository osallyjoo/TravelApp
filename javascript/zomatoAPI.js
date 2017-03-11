/*******************************
*    ZOMATO & YELP API CALL    *
*******************************/

function callZomato(location){
	var key = "da8b23fe22287eeb23c1070176f09b1f";
	var count = 5;
	var queryURL = "https://developers.zomato.com/api/v2.1/search?entity_type=city&count="+ count + "&apikey="+ key + "&q=" + location;
	
	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function(response){
		
		// loop over responses
		for (i=0;i<count;i++){
			var restImg = response.restaurants[i].restaurant.photos_url;
			var restName = response.restaurants[i].restaurant.name;
			var restMenu = response.restaurants[i].restaurant.menu_url;
			var newRest = $("<div>")
				.append($("<p>").html(restName))
				.append($("<img>").attr("src",restImg));
			$("#restaurantsResults").append(newRest);

		}
		/* WHAT DO WITH DATA? */
	});

};

function callYelp(location){
	var consumerKey = "N_VMARIdSGuCcEI2VZ2Irw";
	var consumerSecret = "RZ6EWKcSh9Rrm6wIbRq7af4UYDE";
	var token = "n7MGFWVXuJZ38lgeHNJNVGfPlPwGMH2O";
	var tokenSecret = "5EaxOwaSC8FDCoISjSDomXNSGX8";

	var queryURL = "https://api.yelp.com/v2/search/?term=Restaurants&sort=2&limit=10&location=" + location 

	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function(response){
		console.log("restaurants")
		console.log(response);
		
		// loop over responses
		for (i=0;i<count;i++){
			var restImg = response.businesses[i].image_url;
			var restName = response.businesses[i].name;
			var restMenu = response.businesses[i].menu_url;
			var newRest = $("<div>")
				.append($("<p>").html(restName))
				.append($("<img>").attr("src",restImg));
			$("#restaurantsBox").append(newRest);

		}
		/* WHAT DO WITH DATA? */
	});
}