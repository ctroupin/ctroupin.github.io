$(document).ready(function() {

$.get('./data/distanceTime.csv', function(csv) {
			$('#timeserie').highcharts({

					data: {
							csv: csv
					},
					chart: {
				type: 'column',
				zoomType: 'x'
			},
				title: {
				text: 'Distance, elevation and duration (2019)'
			},

			plotOptions: {
						series: {
								pointWidth: 6
						}
			 },

			tooltip: {
			formatter: function () {
				return 'The value for <b>' + this.x +
						'</b> is <b>' + this.y + '</b>';
				}
			},
			xAxis: {
					type: 'datetime',
					dateTimeLabelFormats: { // don't display the dummy year
							month: '%B',
							year: '%b'
					},
					title: {
							text: 'Date'
					},
					max: 1577833200000,
					min: 1546297200000
			},
			yAxis: {
				title: {
					text: null,
				},
				gridLineWidth: 1,
				gridLineDashStyle: 'longdash'
			},
			tooltip: {
				crosshairs: true
			},
			series: [{
				name: 'Participants',
			}],
			legend: {
				layout: 'vertical',
				align: 'left',
				verticalAlign: 'top',
				floating: true,
				borderColor: "#10929A",
				backgroundColor: '#E3E3E3',
				borderRadius: 7,
				borderWidth: 2,
				x: 90,
				y: 60,
				shadow: true
			}

			});
	});

});
