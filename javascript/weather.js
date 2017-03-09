$(document).ready(function() {
  $.simpleWeather({
    woeid: '2357536', //2357536
    location: '',
    unit: 'f',
    success: function(weather) {
      html = '<h2>'+weather.temp+'&deg;'+weather.units.temp+'</h2>';
      html += '<ul><li>'+weather.city+', '+weather.region+'</li>';
      html += '<li class="currently">'+weather.currently+'</li>';
      html += '<li>'+weather.alt.temp+'&deg;C</li></ul>';

      for(var i=0;i<weather.forecast.length;i++) {
        html += '<p>'+weather.forecast[i].day+': '+weather.forecast[i].high+'</p>';
      }
      console.log(html);

      $("#weatherBox").html(html);
    },
    error: function(error) {
      $("#weatherBox").html('<p>'+error+'</p>');
    }
  });
});
