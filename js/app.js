var lat;
var lng;
var eventInfo;
var map;

$(document).on('click','#appended',function(){
  console.log(lat, lng)
})

$(document).ready(function(){
  var mapOptions = {
    center: new google.maps.LatLng(39.754434,-104.978614),
    zoom: 3,
    mapTypeId: google.maps.MapTypeId.ROADMAP
}
    map = new google.maps.Map(document.getElementById('map'), mapOptions)
});

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
        lat = results['location']['lat']
        lng = results['location']['lng']
        eventInfo = results['displayName']
        var position = new google.maps.LatLng(lat, lng);
        marker = new google.maps.Marker({
          position: position,
          map: map,
          title: eventInfo
        });
        $('#container').append('<p id="appended">'+results['displayName']+' '+results['start']['time']+'<br>'+results['location']['city']+'<br><a href='+results['uri']+' "</a>Click here for additional event info from Songkick page! '+'</p>');
      }
   })
  })
 })
})
