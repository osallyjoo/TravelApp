function callWeather(searchTerm){
  $.simpleWeather({
    woeid: '', //2357536
    location: searchTerm,
    unit: 'f',
    success: function(weather) {
    var weatherContent = $("<div>")
    	.append($('<p class="currentTemp">').html(weather.temp+'&deg;'+weather.units.temp+ ' / '+weather.alt.temp+'&deg;C'))
        .append($('<p class="currentCond">').html(weather.currently));

      var forecastHolder = $('<div>').addClass("weekForecast");
      for (var i=0; i < 7; i++) {
        var dayDiv = $("<div class='dayForecast'>")
          .append($("<p>").html(weather.forecast[i].day))
          .append($("<p>").html(weather.forecast[i].high+'&deg;'+weather.units.temp));
        forecastHolder.append(dayDiv);
      };
      weatherContent.append(forecastHolder);

      $("#weatherBox").html(weatherContent);
    },
    error: function(error) {
      $("#weatherBox").html('<p>'+error+'</p>');
    }
  });
}
