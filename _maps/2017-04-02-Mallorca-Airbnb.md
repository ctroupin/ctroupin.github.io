---
title: Airbnb in Mallorca
layout: projectmap
date: 2017-04-02
img: mallorca-airbnb.png
alt: Airbnb in Mallorca
tools: Leaflet, Python
category: Map
---
After 4 years spent in Mallorca, it's not a surprise to know that *Airbnb* is creating a lot of trouble there (and I guess also making some people richer). Once I discovered the nice work done by [Inside Airbnb](http://insideairbnb.com/) and decided to work a little bit on their datasets.

Most of this work has been prepared in airports, planes and trains... during an intense month of traveling.

### Data density

The spatial distribution of properties managed by *Airbnb* is a good starting point: we see that almost all the island is covered, not only the coastline of the Palma town. What caught my eyes was in fact the areas without (almost) any properties: in the northern part of the island, but ok, that's expected (if you know the island): the *Tramuntana* is there. But still, even in the small villages (Sóller, Deià, Valldemossa, ...), once can find a place to stay.

<img src="{{ site.url }}/figures/blog/mallorca-heat.png" class="img-responsive" alt="Mallorca heatmap">

### Choropleth

Here the plan is to show the density of properties (i.e. the number of properties relative to the population of each municipality), because having 100 in Palma is not the same as having 100 in Santa Margalida.

{% include_relative maps/airbnb.html %}

<br>

For me the most striking feature I see here is the high density in Búger, a small village where I never really heard of, except when I was driving from Palma to Pollença. It seems other people were surprised by that, as you can see in this newspaper article: [Airbnb Búger](http://www.diariodemallorca.es/mallorca/2017/06/05/airbnbuger/1221084.html).

#### Top 3
1. Deyá
2. Banyalbufar
3. Búger
all of them with more than 1 property for 10 habitants. The first two are located in the Tramuntana, but not far from the coast, with amazing views on the sea. 

#### Least *popular* places
1. Marratxí
2. Consell
3. Inca
Marratxí is located very near to Palma, and some friends used to call it "a dormitory town", a place where people live to save money on the loan, but that has not a lot of services and activities to offer. I must admit I don't know if it's true.     
Number 3, Inca, is in fact one of the largest town of the Balearic Islands, it has a lot of shops, restaurants, even an hospital, and it is not far from the Tramuntana, but tourists don't seem to like it to stay for a long time.


### Processing

The coordinates of each property are extracted from the `CSV` file provided by [Inside Airbnb](http://insideairbnb.com/).
We combined this information with a `geoJSON` file storing the municipality limits, to which we added a new properties *roomsPerHabitants*. Once the file is prepared, leaflet can easily use it as a layer and add some control (`mouseover`, `mouseout` and `click`).

#### Data sources

* [National Institute of Statistics](http://www.ine.es/) (INE, Spain).
* [InsideAirbnb](http://insideairbnb.com/), licensed by a  [Creative Commons BY 3.0.](http://creativecommons.org/licenses/by/3.0/)

#### Code

It is available on GitHub: []().     
With some time I would like to do the same for different years (2016, 2017, 2018), unfortunately there are more urgent topics at the moment.
