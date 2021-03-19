var gpxdir = 'GPX/GCraces/'
var last = {
	name: undefined, length: undefined, dplus: undefined,
	dminus: undefined,
};

var map = L.map('map', {
	fullscreenControl: true,
}).setView([27.9768, -15.5882], 11);

map.addLayer(CartoDB_DarkMatter)

var baseMaps = {
	"CartoDB": CartoDB,
	"OpenStreetMap": OpenStreetMap_Mapnik,
	"Stamen Terrain": Stamen_Terrain,
	"CartoDB Dark": CartoDB_DarkMatter,
};

var mygrad = {.6:'#2c7bb6', .7:'#abd9e9',.8:'#F9ED55',.9:'#fdae61',1:'#d7191c'};
var mygrad = {.5:'#FCFCFC', .7:'#FFE104',.8:'#FFAB1B', .9:'#FF040C', 1:'#000000'};

var heatStyle = {
	gradient : mygrad,
	minOpacity: 0.75,
	radius: 4,
	blur: 4,
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
		: 'Hover'
	);

};

info.addTo(map);

var latlon = [];

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

var nMoves = moves.length;
for (var i = 0; i < nMoves ; i++) {
	var moveGps = omnivore.gpx(gpxdir + moves[i], null, customLayer).addTo(map);
}

var heatmap = L.heatLayer(latlon, heatStyle);
heatlayer = L.layerGroup(heatmap);
heatlayer.addTo(map);


var overlayers = {
	"Tracks": moveGps,
	"🔥 Heat map ": heatmap,
};

L.control.scale().addTo(map);
L.control.layers(baseMaps, overlayers, {autoZIndex:true, collapsed:false}).addTo(map);
