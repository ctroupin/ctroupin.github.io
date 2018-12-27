//#include 'GPX.js'
//#include 'rainbowvis.js'

(function () {

function getGradient (color, spectrum) {
	var rainbow = new Rainbow();
	rainbow.setNumberRange(0., 1.);
	if (spectrum == null) {
		rainbow.setSpectrum('green', 'yellow', 'red', 'white');
	}
	else {
		rainbow.setSpectrum.apply(this, spectrum);
	}
	return "#" + rainbow.colourAt(color);
}

function gpx2time (s) {
	var datetype1="2011-09-24T12:07:53Z"
	var datetype2="2017-10-21T06:01:59.000Z"
	if ((s.length !== datetype1.length) && (s.length !== datetype2.length)){
		return new Date();
	}
	return new Date(s);
}

L.GPX.include({
	options: {
		minSpeed: 0,
		maxSpeed: 20,
		chunks: 200,
		spectrum: ['red', 'yellow', 'green', 'white']
	},

	speedSplitEnable: function (options) {
		L.Util.setOptions(this, options);
		return this.on('addline', this.speed_split, this);
	},

	speedSplitDisable: function () {
		return this.off('addline', this.speed_split, this);
	},

	speed_split: function (e) {
		var l = e.line.pop(), ll = l.getLatLngs();
		var chunk = Math.floor(ll.length / this.options.chunks);
		console.log("Chunk = " + chunk);
		console.log("-------------------");
		if (chunk < 3) chunk = 3;
		var p = null;
		var dtotal = 0;
		for (var i = 0; i < ll.length; i += chunk) {
			var d = 0, t = null;
			console.log("___");
			console.log("i = " + i);
			if (i + chunk > ll.length)
				chunk = ll.length - i;
			for (var j = 0; j < chunk; j++) {
				if (p) {
					d += p.distanceTo(ll[i+j]);
					dtotal += p.distanceTo(ll[i+j]) / 1000.;
				};
				//console.log(" j = " + j + " Distance: " + d + " Time: " + t)
				p = ll[i + j];
				if (!t) {
					t = gpx2time(p.meta.time);
				}
			}
			p = ll[i + chunk - 1];
			t = (gpx2time(p.meta.time) - t) / (3600 * 1000);
			console.log("Distance: " + d + " Time : " + t);
			var speed = 0.001 * d / t;
			console.log("Speed: " + speed);
			var color = getGradient((speed - this.options.minSpeed) / (this.options.maxSpeed - this.options.minSpeed), this.options.spectrum);
			var poly = new L.Polyline(ll.slice(i, i+chunk+1), {color: color, weight: 3, opacity: 1});
			poly.bindTooltip('<b>Distance:</b> ' + dtotal.toFixed(1) + ' km <br> <b>Speed:</b> ' + speed.toFixed(1) + ' km/h');
			poly.bindPopup('<b>Distance:</b> ' + dtotal.toFixed(1) + ' km <br> <b>Speed:</b> ' + speed.toFixed(1) + ' km/h');
			e.line.push(poly);
		}
	}

});
})();
