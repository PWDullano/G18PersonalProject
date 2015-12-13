// http://api.songkick.com/api/3.0/artists/3277856/calendar.json?apikey=tZIW4JSPRTZrAMk3
// http://api.songkick.com/api/3.0/search/artists.json?query={search_query}&apikey={your_api_key}
var searchArtist;
var searchLocale;
var getter;
var getters;

$(document).ready(function(){
  console.log('working')
})

$('#asubmit').click(function(){
  searchArtist = $('#artist').val();
  getter = $.ajax({
    url:'http://api.songkick.com/api/3.0/search/artists.json?query='+searchArtist+'&apikey=tZIW4JSPRTZrAMk3&jsoncallback=?',
    method:'GET',
    dataType:'json'
  });

  getter.done(function(response){
    var idNumber = response['resultsPage']['results']['artist'][0]['id']

    var getters = $.ajax({
      url:'http://api.songkick.com/api/3.0/artists/'+idNumber+'/calendar.json?apikey=tZIW4JSPRTZrAMk3&jsoncallback=?',
      method:'GET',
      dataType:'json'
    })

    getters.done(function(responses){
      var artistInfo = responses['resultsPage']['results']['event']
      console.log(artistInfo[0]['performance'][0])
    })
  })
})

$('#bsubmit').click(function(){
  searchLocale = $('#location').val();
  getter = $.ajax({
    url:'http://api.songkick.com/api/3.0/search/venues.json?query='+searchLocale+'&apikey=tZIW4JSPRTZrAMk3&jsoncallback=?',
    method:'GET',
    dataType:'json'
})

getter.done(function(response){
  var locale = response['resultsPage']
  console.log(locale['results']['venue'])
  })
})
