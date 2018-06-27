---
title: Airbnb in Mallorca
layout: projectmap
date: 2016-04-02
img: airbnbHeatDark.jpg
alt: Airbnb in Mallorca
tools: Leaflet, Python
category: Map
---

While it is interesting to observe the spatial distribution of properties managed by *Airbnb*, the density of properties (i.e. number of properties relative to the population of each municipality) can provide some surprises.

Most of this work has been prepared in airports, planes and trains... during an intense month of traveling.

### Processing

The coordinates of each property are extracted from the `CSV` file provided by [Inside Airbnb](http://insideairbnb.com/).
We combined this information with a `geoJSON` file storing the municipality limits, to which we added a new properties *roomsPerHabitants*. Once the file is prepared, leaflet can easily use it as a layer and add some control (`mouseover`, `mouseout` and `click`).

{% include_relative maps/airbnb.html %}

<br>


### Data sources

* [National Institute of Statistics](http://www.ine.es/) (INE, Spain).
* [InsideAirbnb](http://insideairbnb.com/), licensed by a  [Creative Commons BY 3.0.](http://creativecommons.org/licenses/by/3.0/)

### In the news

[Airbnb Búger](http://www.diariodemallorca.es/mallorca/2017/06/05/airbnbuger/1221084.html): *Búger* is one of the smallest village in Mallorca, but surprisingly the density
of offers by Airbnb in 2016-2017 was not so small...
