function callWeather(searchTerm){
  $.simpleWeather({
    woeid: '', //2357536
    location: searchTerm,
    unit: 'f',
    success: function(weather) {
      var weatherContent =  '<p class="weatherCity">' + weather.city + ', ' + weather.region + '</p>';
      weatherContent += '<p class="currentTemp">'+weather.temp+'&deg;'+weather.units.temp+ ' / '+weather.alt.temp+'&deg;C</p>';
      weatherContent += '<p class="currentCond">'+weather.currently+'</p>';

      var forecastHolder = $('<div>').addClass("weekForecast");
      for (var i=0; i < weather.forecast.length; i++) {
        var dayDiv = $("<div class='dayForecast'>")
          .append($("<p>").html(weather.forecast[i].day))
          .append($("<p>").html(weather.forecast[i].high));
          console.log(weather.forecast[i].day + " " + weather.forecast[i].high);
        forecastHolder.append(dayDiv);
      };
      weatherContent += forecastHolder[0];
      
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
