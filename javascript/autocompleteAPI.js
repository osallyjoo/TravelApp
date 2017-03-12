// function to get the autocomplete results from google places API
function getAutocompleteResults(searchTerm){
	var limit = 5; // amount of autofill results to show
	var queryObject = {
		input: searchTerm,
	};
	queryObject = $.param(queryObject);
	queryURL = "https://maps.googleapis.com/maps/api/place/autocomplete/json?" + queryObject + "&types=(cities)&key=AIzaSyBGNcO9R09tP2wolVLwVHGsVVNhtSUbDHQ";
	
	$.ajax({
		method:"POST",
		dataType:"json",
		url: "https://proxy-cbc.herokuapp.com/proxy",
		data: {
			url:queryURL
		}
		
	}).done(function(response){		
		for (i=0; i<limit; i++){
			cityName = response.data.predictions[i].structured_formatting.main_text;
		}

	});
}