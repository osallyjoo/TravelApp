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

function initMap() {
  var uluru = {lat: -25.363, lng: 131.044}; //need to look to see if we can search by city name instead of coordinates
  var map = new google.maps.Map(document.getElementById('map'), { 
  	//*NOTE* google.maps.Map doesnt work with jQuery I guess
    zoom: 15,
    center: uluru
  });
  var marker = new google.maps.Marker({
    position: uluru,
    map: map
  });
  return map;
}

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
		map.setCenter(loc); //center the map on the new location

		//doesn't hurt to include a marker I guess but probably important to wipe all other markers before hand
		createMarker(map,loc);
  		getPlaces(map,loc);
	})

}

function getPlaces (map,cityLoc){
	var request = {
		location: cityLoc,
		radius: '500',
		query: 'things to do' 
	}

	service = new google.maps.places.PlacesService(map);
	service.textSearch(request, callBack);

	function callBack(results, status) {
	  console.log(results);
	  for(var i = 0; i < 10; i++){
	  		placeLoc = results[i].geometry.location;

	  		placeImg = typeof results[i].photos !== 'undefined' 
       			? results[i].photos[0].getUrl({'maxWidth': 200, 'maxHeight': 200})
       			: results[i].icon;
       		placeAddress = results[i].formatted_address;
       		placeName = results[i].name;
	  		createMarker(map,placeLoc);
	  		addPlace(placeImg,placeAddress,placeName)
	  }
	  return results; //we can use this information to provide details of the places on the map 
	  //OR even pass that information to the tripAdvisor API assuming I can get my hands on a key...
	}
}

function createMarker(map,place) {
	console.log(place);
    var marker = new google.maps.Marker({
      map: map,
      position: place
	});
}

function addPlace(placeImg,placeAddress,placeName){
	var interestHolder = $("<div class='interestHolder'>");
	var interestText = $("<div class='interestText'>");
	var newImg = $("<img class='interestImage'>").attr("src",placeImg);
	var divName = $("<p class='interestName'>").html(placeName);
	var divAddress = $("<p class='interestAddress'>").html(placeAddress);
	interestText.append(divName).append(divAddress);
	interestHolder.append(newImg).append(interestText);
	$("#pointsOfInterest").append(interestHolder);
}