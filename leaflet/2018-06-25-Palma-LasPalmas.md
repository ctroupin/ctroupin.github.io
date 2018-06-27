---
title: Palma, Las Palmas, La Palma...
layout: projectmap
date: 2018-06-25
img:
alt: "[La(s)] Palma(s)"
category: Map
tools: Leaflet
---

If you've ever been in the Canary Islands, you surely know that there is some confusion about the names of the place: La Palma, Las Palmas, Palma... Even the Spaniards get confused with that, there are even people saying that people got on a place flying to La Palma thinking they were going to Las Palmas (I think it's an urban legend.)

<img src="/figures/photography/VueltaNbublo4209.png" class="img-responsive" alt="A famous place in the Canary Islands">

### The places

Now you will understand why it's so complicated.

**Las Palmas de Gran Canaria:** the capital city of the island of Gran Canaria. It is also the capital city of the Province of Las Palmas.

**Las Palmas** (without "de Gran Canaria"): the name of the eastern province of the Canary Islands, made up of *Lanzatore*, *Fuerteventura* and *Gran Canaria*.

**La Palma:** another island of the Canary archipelago.

**Palma (de Mallorca):** the main city of the Balearic islands (quite far away from the Canary islands).

**Santa Cruz de Tenerife:** capital of *Tenerife*.

**Santa Cruz de La Palma:** capital of *La Palma*.

**Santa Cruz** (without "de ..."): name of the western province of the Canary Islands, made up of *El Hierro*, *La Gomera*, *La Palma* and *Tenerife*.

### The map

Hopefully the map makes all this more explicit. Basically we represent the different entities (cities, provinces, islands) using `geoJSON` files. The plugin `...` is nice to have different categories in the layer menu.

{% include_relative maps/LasPalmas-LaPalma.html %}
