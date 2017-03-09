
function initMap() {
  var uluru = {lat: -25.363, lng: 131.044}; //need to look to see if we can search by city name instead of coordinates
  var map = new google.maps.Map(document.getElementById('map'), { 
  	//*NOTE* google.maps.Map doesnt work with jQuery I guess
    zoom: 8,
    center: uluru
  });
  var marker = new google.maps.Marker({
    position: uluru,
    map: map
  });
  $("#searchBtn").on("click",function(){
  	var address = $("#searchTerm").val().trim();
  	callGoogle(map,address);
  });
}
