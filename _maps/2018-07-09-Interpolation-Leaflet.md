---
title: Data interpolation
layout: projectmap
date: 2018-07-09
img: airbnbHeatDark.jpg
alt: Data interpolation
tools: Leaflet, DIVA
category: Map
---

The idea came for a conference in which we had to present a spatial interpolation technique to a
public not very familiar with the topic. As usual, putting a lot of equations was discarded.

We decided to come up with a map with different layers, each layer corresponding to
 a step in the interpolation process.

### The storyline

We start by a question: given the sea water temperature in Porto (the meeting place) and
in Malta, what is the temperature near Ibiza (halfay)?

<img src="/figures/maps/map_distance.jpg" class="img-responsive" alt="What is the temperature at the question mark?">

The easy answer is the mean value, but of course it is not as simple:
* there are uncertainties and *noise* on the measurements,
* the different places are separated by land, so the problem is anysotropic,
* there are currents and other processes in the ocean that make things even more complex.

<img src="/figures/maps/map_results.jpg" class="img-responsive" alt="Gridded field of temperature">

### The interactive map

Just play with it!
{% include_relative maps/TemperatureInterp.html %}

<br>

### Afterthoughts

Ideally I would have presented the map directly, but I that time I was not sure it was
going to work so instead I prepared screen-shots of the different layers.

<img src="/figures/maps/map_conclusion.jpg" class="img-responsive" alt="Conclusions...">
