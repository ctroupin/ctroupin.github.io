---
title: Running in Sart Tilman
layout: projectmap
date: 2017-05-01
img: sarttilmanhexbin_crop.jpg
alt: Sart Tilman running map
tools: Leaflet
category: Map
---

With colleagues we've been [running in the Sart Tilman](../maps/Running-SartTilman.html) domain for more than 10 years now.     
In the last years I could register the tracks using a GPS device and wanted to see we frequently go (Roches aux Faucons, Lande de Streupas, Colonster) but also the trails we don't see a lot, for example the *Rochers du bout du monde*.

<div class="row">
		<div class="col-sm-4 portfolio-item">
				<img src="/figures/maps/SartTilman01.JPG" class="img-responsive" alt="Sart Tilman">
		</div>
		<div class="col-sm-4 portfolio-item">
				<img src="/figures/maps/SartTilman02.JPG" class="img-responsive" alt="Sart Tilman">
		</div>
		<div class="col-sm-4 portfolio-item">
				<img src="/figures/maps/SartTilman03.JPG" class="img-responsive" alt="Sart Tilman">
		</div>
</div>
<br>

<div class="row">
		<div class="col-sm-4 portfolio-item">
				<img src="/figures/maps/SartTilman04.JPG" class="img-responsive" alt="Sart Tilman">
		</div>
		<div class="col-sm-4 portfolio-item">
				<img src="/figures/maps/SartTilman05.JPG" class="img-responsive" alt="Sart Tilman">
		</div>
		<div class="col-sm-4 portfolio-item">
				<img src="/figures/maps/SartTilman06.JPG" class="img-responsive" alt="Sart Tilman">
		</div>
</div>

### Implementation

Quite similar to the [Mallorca map](../2017-03-01-Activity-Maps/). Different metrics (distance, ascent, ...) are computed on- the-fly. After download from [Movescount]() platform, the GPX files are cleaned, simplified (only 500 points are kept) and edited manually so that the title can be displayed in an `info` box.

*Heatmap* and *hexbin* layers provide good ways to see the most frequent places and also locations where we never go. For example we almost never followed the national road "*Route du Condroz*", due to the traffic.

<div class="row">
		<div class="col-sm-6 portfolio-item">
				<img src="/figures/maps/runST01.jpg" class="img-responsive" alt="Sart Tilman map">
		</div>
		<div class="col-sm-6 portfolio-item">
				<img src="/figures/maps/runST02.jpg" class="img-responsive" alt="Sart Tilman map">
		</div>
		<div class="col-sm-6 portfolio-item">
				<img src="/figures/maps/runST03.jpg" class="img-responsive" alt="Sart Tilman map">
		</div>
		<div class="col-sm-6 portfolio-item">
				<img src="/figures/maps/runST04.jpg" class="img-responsive" alt="Sart Tilman map">
		</div>

</div>
