var map = L.map('map').setView([39.45,-0.35], 11);

// GeoJSON layer (UTM30)
proj4.defs('EPSG:25830', '+proj=utm +zone=30 +ellps=GRS80 +datum=NAD83 +units=m +no_defs');

//Adicion de monumentos
var myIcon = L.icon({
    iconUrl: 'img/my-icon.png',
    iconRetinaUrl: 'my-icon@2x.png',
    iconSize: [95, 95],
	shadowSize:   [50, 64], 
    iconAnchor: [22, 94],
	shadowAnchor: [4, 62],  
    popupAnchor: [-3, -76],
});

var geoJsonLayer = L.Proj.geoJson(monumentos, {
  'pointToLayer': function(feature, latlng) {
    return L.marker(latlng, {icon: myIcon}).bindPopup(feature.properties.nombre);
  }
});

//Adicion de OSM
var tiles = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
	maxZoom: 20,
	maxNativeZoom: 22,
	attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
});
//Creacion del markerClusterGroup
map.addLayer(tiles);

var markers = L.markerClusterGroup();


markers.addLayer(geoJsonLayer);

map.addLayer(markers);



//Adicion de Tiles
var mbAttr = 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
		'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
		'Imagery © <a href="http://mapbox.com">Mapbox</a>',
	mbUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpandmbXliNDBjZWd2M2x6bDk3c2ZtOTkifQ._QA7i5Mpkd_m30IGElHziw';


var grayscale   = L.tileLayer(mbUrl, {maxZoom: 20, maxNativeZoom: 22, id: 'mapbox.light', attribution: mbAttr}),
	streets  = L.tileLayer(mbUrl, {maxZoom: 20,	maxNativeZoom: 22, id: 'mapbox.streets',   attribution: mbAttr});

var baseLayers = {
	"OpenStreetMap": tiles,
	"Grayscale": grayscale,
	"Streets": streets
};


var overlayMaps =[];
/*
var overlayMaps = {
    "Monumentos": geoJsonLayer
};
*/
L.control.layers(baseLayers, overlayMaps, {position: 'bottomleft'}).addTo(map);

var osmb = new OSMBuildings(map).load();

