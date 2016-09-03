

var shanghai = {lat: 30.77145, lng: 121.62378};
var singapore = {lat: 1.28954, lng: 103.76689};
var dubai = {lat: 25.21375, lng: 55.28970};
var mumbai = {lat: 18.97785, lng: 72.90078};
var rotterdam = {lat: 51.89437, lng: 4.42163};

var ship1 = "3E48D766770569F72A93293AF2885316970B0C9E";
var ship2 = "5BE2475C8A9B7C962CC7B04E7C8338FFC5A03E75";
var ship3 = "619985435153D7439BF38037C0E3FDD246106246"

var ship1Coordinates = [
          shanghai,
          {lat: 22.10484, lng: 124.75626},
          {lat: 17.81027, lng: 113.85782},
          {lat: 8.40593, lng: 111.30899},
          singapore
        ];
var ship1Path = new google.maps.Polyline({
  path: ship1Coordinates,
  geodesic: true,
  strokeColor: '#FF0000',
  strokeOpacity: 1.0,
  strokeWeight: 2
});

var ship2Coordinates = [
          singapore,
          {lat: 6.35774, lng: 97.33438},
          {lat: 3.73146, lng: 74.48282},
          {lat: 24.08545, lng: 62.00235},
          dubai,
          {lat: 24.08545, lng: 62.00235},
          {lat: 17.18159, lng: 61.29923},
          {lat: 11.73708, lng: 44.42423},
          {lat: 32.73079, lng: 31.76798},
          {lat: 38.30620, lng: 10.32266},
          {lat: 35.63843, lng: -13.75937},
          {lat: 48.48666, lng: -6.37656},
          rotterdam
        ];
var ship2Path = new google.maps.Polyline({
  path: ship2Coordinates,
  geodesic: true,
  strokeColor: '#00004D',
  strokeOpacity: 1.0,
  strokeWeight: 2
});

var ship3Coordinates = [
          mumbai,
          {lat: 23.92487, lng: 63.40860},
          dubai,
        ];

var ship3Path = new google.maps.Polyline({
  path: ship3Coordinates,
  geodesic: true,
  strokeColor: '#264d00',
  strokeOpacity: 1.0,
  strokeWeight: 2
});

var shipicon = {
    url: "./Containership.png", // url
    scaledSize: new google.maps.Size(50, 50), // scaled size
    origin: new google.maps.Point(0,0), // origin
    anchor: new google.maps.Point(0, 0) // anchor
};

var ship1Marker = new google.maps.Marker({
      position: {lat: 15.31527, lng: 111.64699},
      map: map,
      icon: shipicon
    });


var ship2Marker = new google.maps.Marker({
      position: {lat: 42.57682, lng: -22.64988},
      map: map,
      icon: shipicon
    });

var ship3Marker = new google.maps.Marker({
      position: {lat: 25.73440	, lng: 63.54885},
      map: map,
      icon: shipicon
    });

var factoryicon = {
    url: "./factory.png", // url
    scaledSize: new google.maps.Size(30, 30), // scaled size
    origin: new google.maps.Point(0,0), // origin
    anchor: new google.maps.Point(0, 0) // anchor
};

var officeicon = {
    url: "./office.png", // url
    scaledSize: new google.maps.Size(30, 30), // scaled size
    origin: new google.maps.Point(0,0), // origin
    anchor: new google.maps.Point(0, 0) // anchor
};

var officeMarker = new google.maps.Marker({
      position: {lat: 51.57907, lng: 4.93953},
      map: map,
      icon: officeicon
    });

var factoryMarker = new google.maps.Marker({
  position: {lat: 35.65974, lng: 113.07424},
  map: map,
  icon: factoryicon
});



$(document).ready(function () {
	initMap();
    console.log("page ready");
});

var map;
function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
	  center: {lat:24.40600,lng:58.48673},
	  zoom: 3
	});
	setMarker(shanghai,"Shanghai");
	setMarker(singapore,"Singapore");
	setMarker(dubai,"Dubai");
	setMarker(mumbai, "Mumbai");
	setMarker(rotterdam, "Rotterdam");

	ship1Path.setMap(map);
	ship2Path.setMap(map);
	ship3Path.setMap(map);

	ship1Marker.setMap(map);
	ship2Marker.setMap(map);
	ship3Marker.setMap(map);

	factoryMarker.setMap(map);
	officeMarker.setMap(map);

	ship1Marker.addListener('click', function() {
          // jump to next screen with ship id;
          console.log("ship 1 id: "+ship1);

        });

	ship2Marker.addListener('click', function() {
           // jump to next screen with ship id;
          console.log("ship 2 id: "+ship2);
        });

	ship3Marker.addListener('click', function() {
         // jump to next screen with ship id;
          console.log("ship 3 id: "+ship3);
        });
}

function setMarker(position,text) {
	var marker = new google.maps.Marker({
          position: position,
          map: map,
          label: text
        });
}



