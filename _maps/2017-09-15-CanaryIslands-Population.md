---
title: Canary Island population
layout: projectmap
date: 2017-09-15
img: canarypop.jpg
alt: Canary Island population
tools: Python - Leaflet
category: Map
---

The other day with some friends, we were asking ourselves about the population of
the various municipalities in Gran Canaria, then in the rest of Canary Islands.
It was not too difficult to find the answer but we needed something more visual and also
a quicker way to find the population of a given place.

{% include_relative maps/canarypopulation.html %}

<br>

**Solution?** Create a [choropleth](https://en.wikipedia.org/wiki/Choropleth_map) map using [Leaflet](http://leafletjs.com/) library. To do so, we just had to combine the
population data obtained from the [Instituto National de Estadística](http://www.ine.es/) and the municipality geographical limits from the [Centro National de Información Geográfica](http://centrodedescargas.cnig.es). The result is a [`geoJSON`](http://geojson.org/) file
in which each feature (i.e. each municipality) has a *habitants* property that is used
to style the choropleth map.

**Just for fun:** [Betancuria](https://www.aytobetancuria.org/en/) (Fuerteventura) is the least populated municipality in the Canary Islands, with around 700 people.

<p align="center">
  <img src="/figures/photography/betancuria.jpg" alt="Betancuria" height="50%"/>
</p>
