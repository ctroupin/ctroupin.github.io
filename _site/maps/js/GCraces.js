var gpxdir = 'GPX/GCraces/'
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

var Carto = L.layerGroup([L.tileLayer.provider('CartoDB.PositronNoLabels'), 
						  L.tileLayer.provider('CartoDB.PositronOnlyLabels')]).addTo(map);
				  
var baseMaps = {
	"CartoDB": Carto,
	"OSM": L.tileLayer.provider('OpenStreetMap'),
	"ERSI World Map": L.tileLayer.provider('Esri.WorldImagery'),
};

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

info.update = function (props, d, dp, dm, last) {
	this._div.innerHTML = (props ?
		'<b>' + props.name + '</b><br/> <img src="../images/runner-.png" alt="Running" style="height:20px;"> ' + d.toFixed(2) + ' km' +
		'<br/> <b><i class="fa fa-arrow-circle-up" aria-hidden="true"></i></b> ' + dp.toFixed(1) + ' m' +
		'&emsp; <b><i class="fa fa-arrow-circle-down" aria-hidden="true"></i></b> ' + dm.toFixed(1) + ' m'
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
		weight: 3.,
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

// Define some functions to work on the line look
function highlightFeature(e) {
	var layer = e.target;
	trackLength = computeTrackLength(layer);
	elevation = computeElevationGain(layer);
	dplus = elevation[0];
	dminus = elevation[1];

	layer.setStyle({
		weight: 5,
		dashArray: ' '
	});
	if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
		layer.bringToFront();
	}
	info.update(layer.feature.properties, trackLength, dplus, dminus, last);
}

function resetHighlight(e) {
	var layer = e.target;
	layer.setStyle({
		weight: 2,
	});
	info.update(undefined, trackLength, dplus, dminus, last);
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


var onEachFeatureLast = function (feature, layer) {
	trackLength = computeTrackLength(layer);
	elevation = computeElevationGain(layer);
	last = {
		name: feature.properties.name,
		length: trackLength.toFixed(2),
		dplus: elevation[0].toFixed(1),
		dminus: elevation[1].toFixed(1),
	};
};

var customLayer = L.geoJson(null, {
	style: function(feature) {
		coloryear = randomColor();
		linewidth = 1.5;
		lineopa = 0.9;
		return {
			color: coloryear,
			weight: linewidth,
			opacity: lineopa,
		};
	},
	onEachFeature: onEachFeature
});

var ultraLayer = L.geoJson(null, {
	style: function(feature) {
		coloryear = randomColor();
		linewidth = 2;
		lineopa = 0.9;
		return {
			color: coloryear,
			weight: linewidth,
			opacity: lineopa,
		};
	},
	onEachFeature: onEachFeature
});

var nMoves1 = moves["short"].length;
for (var i = 0; i < nMoves1 ; i++) {
	var moveGps = omnivore.gpx(gpxdir + moves["short"][i], null, customLayer).addTo(map);
}

var nMoves2 = moves["ultra"].length;
for (var i = 0; i < nMoves2 ; i++) {
	var moveGpsUltra = omnivore.gpx(gpxdir + moves["ultra"][i], null, ultraLayer).addTo(map);
}

var heatmap = L.heatLayer(latlon, heatStyle);
heatlayer = L.layerGroup(heatmap);
heatlayer.addTo(map);


var overlayers = {
	"Races": moveGps,
	"Ultras": moveGpsUltra,
	"🔥 Heat map ": heatmap,
	"Municipios": geojson,
};

L.control.scale().addTo(map);
L.control.layers(baseMaps, overlayers, {autoZIndex:true, collapsed:false}).addTo(map);
