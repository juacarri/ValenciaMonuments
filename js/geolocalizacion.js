var options = {
	enableHighAccuracy: true, //Activa GPS en dispositivo movil
	timeout: 6000 //milisegundos
};

var lon, lat;
function getLocation(){
	if (window.navigator.geolocation){
		//alert("Geolocalizacion soporta en este navegador.");
		navigator.geolocation.getCurrentPosition(locationSuccess);
	} else {
		alert("Geolocalizacion No soporta en este navegador.");
	}


}
function locationSuccess(position){
	lon = position.coords.longitude;
	lat = position.coords.latitude;
	var acc = position.coords.accuracy;

	
	var control = L.Routing.control(L.extend(window.lrmConfig, {
	waypoints: [
		L.latLng(lat, lon),
		//L.latLng(39.459, -0.35),
		L.latLng(39.45, -0.35)
	],
	geocoder: L.Control.Geocoder.nominatim(),
	routeWhileDragging: true,
	reverseWaypoints: true,
	showAlternatives: true,
	altLineOptions: {
		styles: [
			{color: 'black', opacity: 0.15, weight: 9},
			{color: 'red', opacity: 0.8, weight: 6},
			{color: 'red', opacity: 0.5, weight: 2}
			]
		}
	})).addTo(map);
	
	
}

getLocation();
