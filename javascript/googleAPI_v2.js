//  ,----..                                    ,--,              
//  /   /   \                                 ,--.'|              
// |   :     :    ,---.     ,---.             |  | :              
// .   |  ;. /   '   ,'\   '   ,'\   ,----._,.:  : '              
// .   ; /--`   /   /   | /   /   | /   /  ' /|  ' |      ,---.   
// ;   | ;  __ .   ; ,. :.   ; ,. :|   :     |'  | |     /     \  
// |   : |.' .''   | |: :'   | |: :|   | .\  .|  | :    /    /  | 
// .   | '_.' :'   | .; :'   | .; :.   ; ';  |'  : |__ .    ' / | 
// '   ; : \  ||   :    ||   :    |'   .   . ||  | '.'|'   ;   /| 
// '   | '/  .' \   \  /  \   \  /  `---`-'| |;  :    ;'   |  / | 
// |   :    /    `----'    `----'   .'__/\_: ||  ,   / |   :    | 
//  \   \ .'                        |   :    : ---`-'   \   \  /  
//   `---`                           \   \  /            `----'   
//                                    `--`-'                      

var googleObj = {
	origin: {lat: -25.363, lng: 131.044}, //you need a location to initialize the map
	currentLoc: null, //current location
	currentLocName: null, //the name of the current location (holds a string value)
	map: null, //the map object
	mapDestinationElem: null, //the html element to which the map will be displayed to
	displayPlacesElem: null, //the html element to which the places will be displayed to (img, name, address, etc)
	//placesDestinationElem: null, 
	type: 'things to do', //initial type

	initialize: function(){
		/* This function initializes the google map object so it can be referred to later */
		var thisLocation = this.currentLoc!==null?this.currentLoc:this.origin //set the location to the currentLocation or the original location if there is no current location
		//The map object is initialized here
		var newMap = new google.maps.Map(this.mapDestinationElem,{
			zoom: 15,
			center: thisLocation,
		});
		this.createMarker(thisLocation) //add marker to the first address found
		this.map = newMap; //store the brand new map object so it can be referred to by other functions in the googleObj
	},

	createMarker: function(location){
		/* This function only adds a marker to the google map object paramater*/
		var marker = new google.maps.Marker({
			map: this.map,
			position: location
		});
	},

	getLocation: function(cityName){
		/* Search the google places API for a new location */
		var self = this; 
		this.currentLocName = cityName; //store the string into the currentLocName parameter
		thisMap = this.map; //get the map Obj so we can add things to it (aka markers)
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
			self.createMarker(self.currentLoc); //add markers 
			self.getPlaces(); //get some nearby places

			});
	},

	getPlaces: function(){
		var self = this;

		var request = {
			location: self.currentLoc!==null?self.currentLoc:self.origin, //search the currentLocation or the original location if there is no current location
			radius: '500',
			query: self.type, //it will search "things to do" or "restaraunts" unless things get hinky
		}

		service = new google.maps.places.PlacesService(self.map); //I believe this is a static API call (could be wrong with the terminology) but it definitely does not look like an AJAX call
		service.textSearch(request, callBack); //calls the callBack function once it's done

		function callBack(results, status) {
		  	self.addPlaces(results); //add the results to the page
		}
	},

	

	addPlaces: function(results){
		//Only do this if there is a place to display the things
		if(this.displayPlacesElem!==null){
			this.displayPlacesElem.empty(); //clear previous results
			for(var i = 0; i < 10&&i<results.length; i++){
		  		placeLoc = results[i].geometry.location; //grab the coordinates so you can add a marker to the map
		  		this.createMarker(placeLoc); //add that freaking marker

		  		placeImg = typeof results[i].photos !== 'undefined'  //grab the image (but if there is no image display -Photo - not available)
	       			? results[i].photos[0].getUrl({'maxWidth': 200, 'maxHeight': 200})
	       			: "https://challengeinequality.luskin.ucla.edu/wp-content/uploads/sites/4/2015/12/Photo-Not-Available.jpg";
	       		placeAddress = results[i].formatted_address; //grab that address
	       		placeName = results[i].name; //get the name
	       		googleSearch = this.currentLocName+" "+placeName; //form a string to search when the image is clicked
	       		googleSearch = googleSearch.split(' ').join('+');
	       		placeURL = "https://www.google.com/#safe=off&q="+googleSearch+"&*" //#safe=off baby
		  		
		  		var interestHolder = $("<div class='interestHolder'>");
				var interestText = $("<div class='interestText'>");
				var newPage = $("<a>").attr("href", placeURL).attr("target", "blank"); //This is all the elements we're going to add to the page
				var newImg = $("<img class='interestImage'>").attr("src",placeImg)
				var divName = $("<p class='interestName'>").html(placeName);
				var divAddress = $("<p class='interestAddress'>").html(placeAddress);
				
				newPage.append(newImg); //this makes the image clickable
				interestText.append(divName).append(divAddress);
				interestHolder.append(newPage).append(interestText);

				this.displayPlacesElem.append(interestHolder); //add it to the page to the target element!
			}
		}
	}
}