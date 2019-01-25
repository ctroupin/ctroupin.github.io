---
title: Running in Sart Tilman
layout: projectmap
date: 2017-05-01
img: sarttilmanhexbin_crop.jpg
alt: Sart Tilman running map
tools: Leaflet
category: Map
---

We've been running in the Sart Tilman area for many years, probably for about 10 years.     
In the last years I could register the tracks using a GPS device and wanted to see we frequently go (Roches aux Faucons, Lande de Streupas, Colonster) but also the trails we don't see a lot, for example the *Rochers du bout du monde*.

<img src="/figures/maps/runningSartTilman.JPG" class="img-responsive" alt="The Sordey river">


### Implementation

Quite similar to the [Mallorca map](../2017-03-01-Activity-Maps/). Different metrics (distance, ascent, ...) are computed on the fly. The track is edited manually (no other way to do it) so that the title can be displayed in an `info` box.

*Heatmap* and *hexbin* layers provide good ways to see the most frequent places and also locations where we never go. For example we almost never followed the national road "*Route du Condroz*", due to the traffic.

<img src="/figures/maps/runnningSartTilman.png" class="img-responsive" alt="Sart Tilman hexbin">

### The map

Just click on the image below.

<a href="../maps/Running-SartTilman.html"> <img src="/figures/maps/sarttilmantracks.jpg" class="img-responsive" alt="Sart Tilman hexbin"></a>
