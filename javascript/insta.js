var token = '39192664.89711c6.45827d0fb1804f46881c47def3087e7f',
    hashtag='kitten', // hashtag without # symbol
    num_photos = 4;

$.ajax({
  url: 'https://api.instagram.com/v1/tags/' + hashtag + '/media/recent',
  dataType: 'jsonp',
  type: 'GET',
  data: {access_token: token, count: num_photos},
  success: function(data){
    console.log(data);
    for(x in data.data){
      $('#instafeed').append('<li><img src="'+data.data[x].images.standard_resolution.url+'"></li>');
    }
  },
  error: function(data){
    console.log(data);
  }
});