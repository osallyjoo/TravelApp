function callWeather(searchTerm){
  $.simpleWeather({
    woeid: '', //2357536
    location: searchTerm,
    unit: 'f',
    success: function(weather) {
    var weatherContent = $("<div>")
    	.append($('<p class="weatherCity">').html(weather.city + ', ' + weather.region))
    	.append($('<p class="currentTemp">').html(weather.temp+'&deg;'+weather.units.temp+ ' / '+weather.alt.temp+'&deg;C'))
        .append($('<p class="currentCond">').html(weather.currently));

      var forecastHolder = $('<div>').addClass("weekForecast");
      console.log(forecastHolder);
      for (var i=0; i < 7; i++) {
        var dayDiv = $("<div class='dayForecast'>")
          .append($("<p>").html(weather.forecast[i].day))
          .append($("<p>").html(weather.forecast[i].high));
          console.log(weather.forecast[i].day + " " + weather.forecast[i].high);
        forecastHolder.append(dayDiv);
      };
      weatherContent.append(forecastHolder);
      
      // working code
      // for(var i=0; i < weather.forecast.length; i++) {
      //   html += '<p>'+weather.forecast[i].day+': '+weather.forecast[i].high+'</p>';
      // }

      $("#weatherBox").html(weatherContent);
    },
    error: function(error) {
      $("#weatherBox").html('<p>'+error+'</p>');
    }
  });
}
