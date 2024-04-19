var gpxdir = 'GPX/Senderos/'

var last = {
	name: undefined, length: undefined, dplus: undefined,
	dminus: undefined,
};

var map = L.map('map', {
	fullscreenControl: true,
}).setView([27.9768, -15.5882], 11);

map.createPane('labels');
map.getPane('labels').style.zIndex = 650;
map.getPane('labels').style.pointerEvents = 'none';

var baseMaps = {
	"CartoDB": CartoDB,
	"OSM": OpenStreetMap_Mapnik,
	"ERSI": Esri_WorldImagery,
};

CartoDB.addTo(map);

var mygrad = {0.2: '#ffffb2', 0.4: '#fd8d3c', 0.6: '#fd8d3c', 0.8: '#f03b20', 1: '#bd0026'}

var heatStyle = {
	minOpacity: 0.75,
	radius: 7,
	blur: 7,
};

// control that shows state info on hover
var info = L.control({position: 'bottomright'});

info.onAdd = function (map) {
	this._div = L.DomUtil.create('div', 'info');
	//this.update();
	return this._div;
};

info.update = function (track) {
	this._div.innerHTML = (track ?
		'<b>' + track.get_name() + '</b><br/> <img src="../images/runner-.png" alt="Running" style="height:20px;"> ' + (0.001 * track.get_distance()).toFixed(1) + ' km' +
		'<br/> <b><i class="fa fa-arrow-circle-up" aria-hidden="true"></i></b> ' + track.get_elevation_gain().toFixed(1) + ' m' +
		'&emsp; <b><i class="fa fa-arrow-circle-down" aria-hidden="true"></i></b> ' + track.get_elevation_loss().toFixed(1) + ' m'
		: 'Hover over a track<br>to get more information'
	);

};

info.addTo(map);

var latlon = [];
var geojson;

geojson = L.geoJson(municipios, {
	style: municipiosstyle,
	onEachFeature: onEachFeature
});

function municipiosstyle(feature) {
	return {
		fillColor: '',
		weight: 1.,
		opacity: .75,
		color: '#4C4C4C',
		dashArray: '5, 5',
		fillOpacity: 0.0
	};
}

function randomColor() {
	cc = '#'+Math.floor(Math.random()*16777215).toString(16);
	//console.log(cc)
	return(cc);
}

var lastClicked = null;

// Define some functions to work on the line look
function highlightFeature(e) {

	var track = e.target;

	if (lastClicked !== null) {
		if(track !== lastClicked) {
			lastClicked.setStyle({
				weight: 3,
				dashArray: ' '
			});
		}
	};

	if(e.layer.selected) {
		track.setStyle({
			weight: 3,
			dashArray: ' '
		});
		e.layer.selected = false;
	  } else {
		track.setStyle({
			weight: 5,
		});
		e.layer.selected = true;
	  };
	
	if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
		track.bringToFront();
	}
	info.update(track);
	lastClicked = track;
}

function resetHighlight(e) {
	var layer = e.target;
	layer.setStyle({
		weight: 2,
	});
	info.update(layer);
}

function zoomToFeature(e) {
	map.fitBounds(e.target.getBounds());
}

var onEachFeature = function (feature, layer) {
	var layercolor = layer.options.color;
	layer.on({
		mouseover: highlightFeature,
		mouseout: resetHighlight,
		click: zoomToFeature
	});
	coords = feature.geometry.coordinates;
	for ( var i=0; i < coords.length; ++i ){
		latlon.push([coords[i][1], coords[i][0]]);
	}
};
var marker_options = {startIconUrl: '', endIconUrl: '', shadowUrl: ''}
//var polyline_options_circular = {color: randomColor(), opacity: 0.75, weight: 3}

// Create the layer groups

layerGroupsCirc = new L.LayerGroup();
layerGroupsShort = new L.LayerGroup();
layerGroupsLong = new L.LayerGroup();

var nMoves0 = moves["circular"].length;
var nMoves1 = moves["short"].length;
var nMoves2 = moves["long"].length;

for (var i = 0; i < nMoves0 ; i++) {
	console.log(moves["circular"][i]);

	new L.GPX(gpxdir + moves["circular"][i], {async: true, marker_options: marker_options}).on('loaded', function(e) {
		layerGroupsCirc.addLayer(e.target);;
	  }).addTo(map);
	
	/*
	L.GPX(gpxdir + moves["circular"][i], {
		async: true, 
		//marker_options: marker_options, 
		//polyline_options: {color: randomColor(), opacity: 0.75, weight: 2}	
	}).addTo(map);
	*/
	//.on('loaded', function(e) {
	//	layerGroupsCirc.addLayer(e.target);
	//}).addTo(map)
};

for (var i = 0; i < nMoves1 ; i++) {
	new L.GPX(gpxdir + moves["short"][i], {
		async: true, 
		marker_options: marker_options, 
		polyline_options: {color: randomColor(), opacity: 0.75, weight: 3}	
	}).on('loaded', function(e) {
		layerGroupsShort.addLayer(e.target);
	}).addTo(map)
};

for (var i = 0; i < nMoves2 ; i++) {
	new L.GPX(gpxdir + moves["long"][i], {
		async: true, 
		marker_options: marker_options, 
		polyline_options: {color: randomColor(), opacity: 0.75, weight: 3}	
	}).on('loaded', function(e) {
		layerGroupsLong.addLayer(e.target);
	}).on('click', function(e) {
		console.log(e.target.get_name());
		highlightFeature(e);
	}).addTo(map)
};


var overlayers = {
	"Circular": layerGroupsCirc,
	"Short": layerGroupsShort,
	"Long": layerGroupsLong,
	"Municipalities": geojson,
};


L.control.scale().addTo(map);
L.control.layers(baseMaps, overlayers, {autoZIndex:true, collapsed:false}).addTo(map);
