var haversineDistance = function (lon1, lat1, lon2, lat2) {
	var toRad = function (x) {
		return x * Math.PI / 180;
	};
	var R = 6371; // km
	var x1 = lat2 - lat1;
	var dLat = toRad(x1);
	var x2 = lon2 - lon1;
	var dLon = toRad(x2)
	var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
	Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
	Math.sin(dLon / 2) * Math.sin(dLon / 2);
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	var d = R * c;

	return d;
};

var computeTrackLength = function (layer){
	latlonalt = layer._latlngs;
	var gpxLength = 0;
	for ( var i=0; i < latlonalt.length-1; ++i ){
		gpxLength += haversineDistance(latlonalt[i].lng, latlonalt[i].lat, 
		latlonalt[i+1].lng, latlonalt[i+1].lat)
	}
	//console.log("Distance = " + cumDist.toFixed(3));
	return gpxLength;
				
};

var computeElevationGain = function (layer){
	latlonalt = layer._latlngs;
	var dplus = 0.
	var dminus = 0.
	for ( var i=0; i < latlonalt.length-1; ++i ){
		delta = latlonalt[i+1].alt - latlonalt[i].alt
		if (delta > 0 ){
			dplus += delta;
		}
		else {
			dminus += Math.abs(delta);
		}
	}
	return [dplus, dminus];
	
};
