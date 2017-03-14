var googleObj = {
	origin: {lat: -25.363, lng: 131.044},
	currentLoc: null,
	currentLocName: null,
	map: null,
	mapDestinationElem: null,
	displayPlacesElem: null,
	placesDestinationElem: null,
	type: 'things to do',

	initialize: function(){
		var thisLocation = this.currentLoc!==null?this.currentLoc:this.origin
		var newMap = new google.maps.Map(this.mapDestinationElem,{
			zoom: 15,
			center: thisLocation,
		});
		console.log(thisLocation);
		this.createMarker(thisLocation)
		this.map = newMap;
	},

	createMarker: function(location){
		var marker = new google.maps.Marker({
			map: this.map,
			position: location
		});
	},

	getLocation: function(cityName){
		var self = this;
		this.currentLocName = cityName;
		thisMap = this.map;
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
			//you have to do all the data manipulation here when you get a response from the google server
			self.currentLoc = response.results[0].geometry.location; //this is an object that holds lat and lng of whatever was searched
			thisMap.setCenter(self.currentLoc); //center the map on the new location
			self.createMarker(self.currentLoc);
			self.getPlaces();

			});
	},

	getPlaces: function(){
		var self = this;
		var request = {
			location: self.currentLoc!==null?self.currentLoc:self.origin,
			radius: '500',
			query: self.type,
		}

		service = new google.maps.places.PlacesService(self.map);
		service.textSearch(request, callBack);

		function callBack(results, status) {
			console.log(results);
		  	self.addPlaces(results);
		}
	},

	

	addPlaces: function(results){
		this.displayPlacesElem.empty();
		for(var i = 0; i < 10&&i<results.length; i++){
	  		placeLoc = results[i].geometry.location;
	  		this.createMarker(placeLoc);

	  		placeImg = typeof results[i].photos !== 'undefined' 
       			? results[i].photos[0].getUrl({'maxWidth': 200, 'maxHeight': 200})
       			: "https://challengeinequality.luskin.ucla.edu/wp-content/uploads/sites/4/2015/12/Photo-Not-Available.jpg";
       		placeAddress = results[i].formatted_address;
       		placeName = results[i].name;
       		googleSearch = this.currentLocName+" "+placeName;
       		googleSearch = googleSearch.split(' ').join('+');
       		placeURL = "https://www.google.com/#safe=off&q="+googleSearch+"&*" //#safe=off baby
	  		
	  		var interestHolder = $("<div class='interestHolder'>");
			var interestText = $("<div class='interestText'>");
			var newPage = $("<a>").attr("href", placeURL).attr("target", "blank");
			var newImg = $("<img class='interestImage'>").attr("src",placeImg)
			var divName = $("<p class='interestName'>").html(placeName);
			var divAddress = $("<p class='interestAddress'>").html(placeAddress);
			newPage.append(newImg);
			interestText.append(divName).append(divAddress);
			interestHolder.append(newPage).append(interestText);
			this.displayPlacesElem.append(interestHolder);
		}
	}
}