---
title: Grand Jogging de Verviers
layout: projectmap
date: 2017-06-30
img: joggverviers2.jpg
alt: Jogging de Verviers
tools: Leaflet
category: Map
---

### Grand Jogging de Verviers

The Jogging is probably the most popular sport event in the area, hence (maybe)
it deserves a modern, interactive map with the location of the supplying stops. Or you might prefer the [old-school map](http://www.verviers.be/loisirs/sport/jogging-de-verviers/plan-parcours-13km-.pdf).

<img src="{{ site.url }}/figures/blog/{{ page.img }}" class="img-responsive" alt="{{ page.alt }}">

Here is how we prepare it.

#### Modules

* [leaflet-omnivore](https://github.com/mapbox/leaflet-omnivore)
to parse the coordinates from the GPX file,
* [leaflet-distance-marker](https://github.com/adoroszlai/leaflet-distance-markers)
to add markers every kilometer,
* [leaflet.awesome-markers](https://github.com/lvoogdt/Leaflet.awesome-markers)-
for the start and finish locations.

#### Data source

The track has been acquired by a Suntoo Ambit 3 device on June 18, 2017 (the day of the race).
The file has been exported from [Movescount](http://www.movescount.com) interface in GPX format.
The total distance measured was slightly under 13 km.

#### Processing

No processing was applied to the coordinates. An auxiliary track was created with only the coordinates corresponding to the *Grand Prix de la Montagne* (GPM) and
then overlapped on the complete track.
