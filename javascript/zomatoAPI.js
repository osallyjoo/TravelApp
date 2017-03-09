function callZomato(location){
	var key = "da8b23fe22287eeb23c1070176f09b1f";
	
	//queryURL = "https://developers.zomato.com/api/v2.1/search?entity_type=city&q=" + location + "user_key" + key;
	var queryURL = "https://developers.zomato.com/api/v2.1/search?entity_type=city&count=5&apikey="+ key + "&q=" + location;
	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function(response){
		console.log(response);

		/* WHAT DO WITH DATA? */
	});

};