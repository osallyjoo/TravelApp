function callZomato(location){
	var key = "da8b23fe22287eeb23c1070176f09b1f";
	var count = 5;
	var queryURL = "https://developers.zomato.com/api/v2.1/search?entity_type=city&count="+ count + "&apikey="+ key + "&q=" + location;
	
	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function(response){
		console.log(response);
		
		// loop over responses
		for (i=0;i<count;i++){
			// var restImg = response.restaurants[i].restaurant.featured_image;
			// var restName = response.restaurants[i].restaurant.name;
			// var restMenu = response.restaurants[i].restaurant.menu_url;
			// var newRest = $("<div>")
			// 	.append($("<p>").html(restName))
			// 	.append($("<img>").attr("src",restImg))
			// var title = $("<p>").html(restName);
			// var 

		}
		/* WHAT DO WITH DATA? */
	});

};