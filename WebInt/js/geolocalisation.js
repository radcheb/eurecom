 var coords;
 var geocoder;
 var map, marker;
 geocoder = new google.maps.Geocoder();

 function codeAddress() {}

 function success(position) {
     var mapcanvas = document.createElement('div');
     mapcanvas.id = 'mapcontainer';
     mapcanvas.style.height = '200px';
     mapcanvas.style.width = '300px';
     mapcanvas.style.align = 'right';

     document.querySelector('#Map_article').appendChild(mapcanvas);

     coords = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

     var options = {
         zoom: 15,
         center: coords,
         mapTypeControl: false,
         navigationControlOptions: {
             style: google.maps.NavigationControlStyle.SMALL
         },
         mapTypeId: google.maps.MapTypeId.ROADMAP
     };
     map = new google.maps.Map(document.getElementById("mapcontainer"), options);

     marker = new google.maps.Marker({
         position: coords,
         map: map,
         title: "You are here!"
     });
     setForm(position.coords.latitude, position.coords.longitude);
 }

 function set() {
     address = "";
     address += $('#street').val();
     address += " ";
     address += $('#zip').val();
     address += " ";
     address += $('#city').val();
     address += " ";
     address += $('#country').val();
     console.log(address);
     geocoder.geocode({
         'address': address
     }, function(results, status) {
         if (status == google.maps.GeocoderStatus.OK) {
             var latitude = results[0].geometry.location.lat();
             var longitude = results[0].geometry.location.lng();
             coords = new google.maps.LatLng(latitude, longitude);
             marker.setPosition(coords);
             map.setCenter(coords);         }
     });
 }

 function reset() {
     $("#mapcontainer").remove();
     if (navigator.geolocation) {
         navigator.geolocation.getCurrentPosition(success);
         $('#resetMap').click(reset);
         $('#setMap').click(set);
     } else {
         error('Geo Location is not supported');
     }
 }
 if (navigator.geolocation) {
     navigator.geolocation.getCurrentPosition(success);
     $('#resetMap').click(reset);
     $('#setMap').click(set);
 } else {
     error('Geo Location is not supported');
 }
function setForm(lat,lng){
  var latlng = new google.maps.LatLng(lat, lng);
  geocoder.geocode({'latLng': latlng}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      if (results[1]) {
  console.log(results);
     $('#street').val(results[0].address_components[1].long_name);
     $('#zip').val(results[0].address_components[6].long_name);
     $('#city').val(results[0].address_components[3].long_name);
     $('#country').val(results[0].address_components[5].long_name);
      } else {
        alert('No results found');
      }
    } else {
      alert('Geocoder failed due to: ' + status);
    }
  });
}