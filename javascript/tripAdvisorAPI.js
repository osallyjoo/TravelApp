/*******************************
*    TRIP ADVISOR API CALL     *
*******************************/

function callTA(cityName){
	//This function takes in a map and an address (it could be anything) grabs a location from the geolcation API and re-centers the map
	var queryObject = {
		//set search parameters
		location: cityName,
		count: 10, //10 restaraunts hopefully
		item: restaraunts,
	}
	queryObject = $.param(queryObject); //convert to a passable string
	queryURL =  "http://api.tripadvisor.com/api/partner/2.0/map/"+queryObject+"&key=AIzaSyB5oi96xh3OkmxpVvwpymxbWqXnGHe4vMY";
	console.log(queryURL);
	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function(response){
		console.log(response); //hopefully this API will provide the data needed  
		//Add a marker to the nearest location
		var marker = new google.maps.Marker({
    		position: loc,
    		map: map
  		});
	})

}