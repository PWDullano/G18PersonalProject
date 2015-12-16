// http://api.songkick.com/api/3.0/artists/3277856/calendar.json?apikey=tZIW4JSPRTZrAMk3
// http://api.songkick.com/api/3.0/search/artists.json?query={search_query}&apikey={your_api_key}
//
// http://api.songkick.com/api/3.0/search/locations.xml?query={search_query}&apikey=tZIW4JSPRTZrAMk3
// http://api.songkick.com/api/3.0/metro_areas/6404/calendar.json?apikey=tZIW4JSPRTZrAMk3
// http://api.songkick.com/api/3.0/events.json?location=clientip&apikey={your_api_key}&jsoncallback=?

// 'http://developer.echonest.com/api/v4/artist/biographies?api_key=DVMHKXTBO5LYPLMXE&id=songkick:artist:'+idNumber+'&format=json&results=1&start=0'

$('#asubmit').click(function(){
  searchLocation = $('#location').val();
  $('p').remove();
  $('a').remove();
  searchDate = JSON.stringify( $('#date').val() );
  getter = $.ajax({
    url:'https://api.songkick.com/api/3.0/search/locations.json?query='+searchLocation+'&apikey=tZIW4JSPRTZrAMk3&jsoncallback=?',
    method:'GET',
    dataType:'json'
  });

  getter.done(function(response){
    var locationID = response['resultsPage']['results']['location'][0]['metroArea']['id']

  getters = $.ajax({
    url:'https://api.songkick.com/api/3.0/metro_areas/'+locationID+'/calendar.json?apikey=tZIW4JSPRTZrAMk3&jsoncallback=?',
    method:'GET',
    dataType:'json'
  })

  getters.done(function(responses){
    var events = responses['resultsPage']['results']['event']

    events.forEach(function(results){
      if(searchDate === JSON.stringify(results['start']['date']) ){
        var lng = results['location']['lng']
        var lat = results['location']['lat']
        var eventInfo = results['displayName']

        function createMap(){
          var mapCanvas = document.getElementById('map')
          var mapOptions = {
              center: new google.maps.LatLng(39.753211, -104.9924934),
              zoom: 15,
              mapTypeId: google.maps.MapTypeId.ROADMAP
            }
          var map = new google.maps.Map(mapCanvas, mapOptions);
          var position = new google.maps.LatLng(lat, lng);
          marker = new google.maps.Marker({
                   position: position,
                   map: map,
                   title: eventInfo

               });
             };
        $('#container').append('<p id="appended">'+results['displayName']+' '+results['start']['time']+'<br>'+results['location']['city']+'<br><a href='+results['uri']+' "</a>Click here for additional event info from Songkick page! '+'</p>');
        // $('#container').append('<p>'+results['venue']['displayName']+'</p>');
        // $('#container').append('<p>'+results['location']['city']+'</p>')
        // $('#container').append('<br><a href='+results['uri']+' "</a>Click here for additional event info from Songkick page! ')
        createMap();
      }
   })
  })
 })
})

// var eventInfo = x['displayName']
//   console.log(eventInfo);
// var eventVenue = events["venue"]["displayName"]
// var eventCity = events['location']['city']
// var eventActs = events['performance'][0]['displayName']
// var eventLink = events['uri']
// $('#container').append('<p>'+eventInfo+'</p>')
// $('#container').append('<p>'+eventVenue+' in '+eventCity+'</p>')
// $('#container').append('<ul><li>'+eventActs+'</li><ul>')
// $('#container').append('<a href='+eventLink+' "</a>Click here for additional info from Songkick page! ')











// $('#asubmit').click(function(){
//   searchArtist = $('#artist').val();
//   getter = $.ajax({
//     url:'http://api.songkick.com/api/3.0/search/artists.json?query='+searchArtist+'&apikey=tZIW4JSPRTZrAMk3&jsoncallback=?',
//     method:'GET',
//     dataType:'json'
//   });
//
//   getter.done(function(response){
//     var idNumber = response['resultsPage']['results']['artist'][0]['id']
//
//     getters = $.ajax({
//       // url:'http://api.songkick.com/api/3.0/artists/'+idNumber+'/calendar.json?apikey=tZIW4JSPRTZrAMk3&jsoncallback=?',
//     url:'http://developer.echonest.com/api/v4/artist/biographies?api_key=DVMHKXTBO5LYPLMXE&id=songkick:artist:'+idNumber+'&format=json&results=1&start=0',
//     method:'GET',
//     dataType:'json'
//     })
//
//     console.log(idNumber);
//     getters.done(function(responses){
//     var artistInfo = responses['response']['biographies'][0]['text']
//       $('#container').append('<p>'+artistInfo+'</p>')
//     })
//   })
// })

// $('#bsubmit').click(function(){
//   searchLocale = $('#location').val();
//   getter = $.ajax({
//     url:'http://api.songkick.com/api/3.0/search/locations.json?query='+searchLocale+'&apikey=tZIW4JSPRTZrAMk3&jsoncallback=?',
//     method:'GET',
//     dataType:'json'
// })
//
// getter.done(function(response){
//   var locale = response['resultsPage']
//   console.log(locale['results']['venue'])
//   })
// })
