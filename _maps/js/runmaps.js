var gpxdir = 'GPX/'
var currentTime = new Date()
var thisyear = currentTime.getFullYear();
var latlonmeanlist = [];
var	meanpositionLayer = L.layerGroup([]);
var last = {
	name: undefined, date: undefined,
	length: undefined, dplus: undefined,
	dminus: undefined,
};

var map = L.map('map', {
	fullscreenControl: true,
	}).setView([50.58,5.57], 13);

var Carto = L.layerGroup([L.tileLayer.provider('CartoDB.PositronNoLabels'), 		
	L.tileLayer.provider('CartoDB.PositronOnlyLabels')]);

var CartoDark = L.layerGroup([L.tileLayer.provider('CartoDB.DarkMatterNoLabels'), 
	L.tileLayer.provider('CartoDB.DarkMatterOnlyLabels')]).addTo(map);

var baseMaps = {
"CartoDB": Carto,
"CartoDB Dark": CartoDark,
"OSM": L.tileLayer.provider('OpenStreetMap'),
"ERSI World Map": L.tileLayer.provider('Esri.WorldImagery'),
};

L.control.coordinates({
	position:"bottomleft",
	decimals:4,
	decimalSeperator:".",
	labelTemplateLat:"Lat: {y}",
	labelTemplateLng:"Lon: {x}"
}).addTo(map);

var mygrad = {.6:'#2c7bb6', .7:'#abd9e9',.8:'#F9ED55',.9:'#fdae61',1:'#d7191c'};
var mygrad = {.5:'#FCFCFC', .7:'#FFE104',.8:'#FFAB1B', .9:'#FF040C', 1:'#000000'};

var heatStyle = {
	gradient : mygrad,
	minOpacity: 0.75,
	radius: 4,
	blur: 4,
};

var hexoptions = {
	radius : 12,
	opacity: 0.65	,
	duration: 200,
	colorScaleExtent: [ 1, 250 ],
	radiusScaleExtent: [ 1, undefined ],
	colorRange: [ '#EDEDED', '#FFE104', '#FFAB1B', '#FF040C', '#000000' ],
	colorValue: function(d) { return log(d.length); },
	radiusRange: [ 4, 12 ],
};

// control that shows state info on hover
var info = L.control({position: 'bottomright'});
// Another control for the total distance
var summary = L.control({position: 'topleft'});

info.onAdd = function (map) {
	this._div = L.DomUtil.create('div', 'info');
	//this.update();
	return this._div;
};

info.update = function (props, d, dp, dm, last) {
this._div.innerHTML = (props ?
	'<b>' + props.name + '</b><br/> <i class="fa fa-calendar" aria-hidden="true"></i> ' + props.time.substring(0, 10) +
	'&emsp; <img src="../images/runner-.png" alt="Running" style="height:20px;"> ' + d.toFixed(2) + ' km' +
	'<br/> <b><i class="fa fa-arrow-circle-up" aria-hidden="true"></i></b> ' + dp.toFixed(1) + ' m' +
	'&emsp; <b><i class="fa fa-arrow-circle-down" aria-hidden="true"></i></b> ' + dm.toFixed(1) + ' m'
	: '<b>Last track: </b>' + last["name"] +
	'<br/> <i class="fa fa-calendar" aria-hidden="true"></i> ' + last["date"] +
	'&emsp; <img src="../images/runner-.png" alt="Running" style="height:20px;">' + last["length"] + ' km' +
	'<br/> <b><i class="fa fa-arrow-circle-up" aria-hidden="true"></i></b> '  + last["dplus"] + ' m' +
	'&emsp; <b><i class="fa fa-arrow-circle-down" aria-hidden="true"></i></b> ' + last["dminus"] + ' m'
	);

};

info.addTo(map);

var latlon = [];
var lonlat = [];
var totaldist = 0.0;
var ntrackyear = 0;
var meanposition = [];
var markerMean = null;

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
	year = parseInt(feature.properties.time.substring(0, 4));
	coords = feature.geometry.coordinates;
	latmean = 0
	lonmean = 0
	for ( var i=0; i < coords.length; ++i ){
		latmean += coords[i][1]
		lonmean += coords[i][0]
		latlon.push([coords[i][1], coords[i][0]]);
		lonlat.push([coords[i][0], coords[i][1]]);
		}

	if (year === thisyear){
		trackLength = computeTrackLength(layer);
		ntrackyear += 1;
		totaldist += trackLength;
	}

	latmean = latmean / coords.length;
	lonmean = lonmean / coords.length;
	markerMean = L.circleMarker([latmean, lonmean], {color:layercolor, radius:5});
	meanpositionLayer.addLayer(markerMean);
};


var onEachFeatureLast = function (feature, layer) {
	trackLength = computeTrackLength(layer);
	elevation = computeElevationGain(layer);
	last = {
		name: feature.properties.name,
		date: feature.properties.time.substring(0,10),
		length: trackLength.toFixed(2),
		dplus: elevation[0].toFixed(1),
		dminus: elevation[1].toFixed(1),
	};
};

var customLayer = L.geoJson(null, {
	style: function(feature) {
		year = parseInt(feature.properties.time.substring(0, 4));
		if (year == currentTime.getFullYear()){
			coloryear = "#FF612B";
			linewidth = 1.5;
			lineopa = 0.9;
		} else if (year == currentTime.getFullYear() - 1) {
			coloryear = "#FFAE2B";
			linewidth = 1;
			lineopa = 0.75;
		} else {
			coloryear = "#FFE02B";
			linewidth = 1;
			lineopa = 0.6;
		};

		return {
			color: coloryear,
			weight: linewidth,
			opacity: lineopa,
			};
	},
	onEachFeature: onEachFeature
});


var customLayerLast = L.geoJson(null, {
	style: function(feature) {
		return {color: '#FF612B', weight: 6, opacity: 1};
	},
	onEachFeature: onEachFeatureLast
});

function done(totaldist, markerMean) {
	summary.onAdd = function (map) {
			this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
			this._div.innerHTML = '<b>Total ' + thisyear + ':</b>  <br> Distance: ' + totaldist.toFixed(1) + ' km <br>' +
			'Number of tracks: ' + ntrackyear;
			return this._div;
	};
	summary.addTo(map);
	latlonmeanlist.push(markerMean);
}

function doneLast(last) {
	info.update(undefined, undefined, undefined, undefined, last);
}

var nMoves = moves.length;
for (var i = 0; i < nMoves ; i++) {
	var moveGps = omnivore.gpx(gpxdir + moves[i], null, customLayer).on('ready', function() {
		done(totaldist, markerMean);
	}).addTo(map);
}
//moveGps.addTo(map);

var moveGpsLast = omnivore.gpx(gpxdir + moves[nMoves-1], null, customLayerLast).on('ready', function() {
	doneLast(last);
});
map.addLayer(moveGpsLast);
moveGpsLast.addTo(map);
moveGpsLast.bringToFront();

var heatmap = L.heatLayer(latlon, heatStyle);
heatlayer = L.layerGroup(heatmap);
heatlayer.addTo(map);

// Hexbin layer
var hexLayer = L.hexbinLayer(hexoptions);
hexLayer.data(lonlat);

// Distance circles
var startpoint = [50.582, 5.566];
var distCircles = []
for(count = 1; count < 5; count++){
	dCircle = L.circle(startpoint, count * 1000.,
		{color: "#298C15", fillColor: "None", "weight": 4, dashArray: '20,15'}
	);
	distCircles.push(dCircle);
}
circleLayer = L.layerGroup(distCircles);

// Points of interest
var pointsInterest = [[50.582, 5.566, "Start"],
											[50.552, 5.5502, "Roche aux Faucons"],
											[50.6024, 5.5957, "Lande de Streupas"],
											[50.5818, 5.6027, "Rochers du bout du monde"],
											[50.6006, 5.5554, "Point de vue"],
										];

var PI = []
for (var i = 0; i<pointsInterest.length ; i++){
	//console.log(pointsInterest[i]);
	var p = new L.LatLng(pointsInterest[i][0], pointsInterest[i][1]);
	var c = L.circle(p, {radius: 50, color: 'red', fillOpacity: .5});
	c.bindTooltip(pointsInterest[i][2], {permanent: true, className: "textlabel"});
	PI.push(c);
};
PIlayer = L.layerGroup(PI);
PIlayer.setZIndex(1000);

var overlayers = {
	"Previous tracks": moveGps,
	"Hexbin": hexLayer,
	"🔥 Heat map ": heatmap,
	"🏃 Last run": moveGpsLast,
	"📏 Distance circles": circleLayer,
	"📍 Mean positions": meanpositionLayer,
	"📷 Points of interest": PIlayer
};

L.control.scale().addTo(map);
L.control.layers(baseMaps, overlayers, {autoZIndex:true, collapsed:false}).addTo(map);
