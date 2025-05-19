---
layout: post
modal-id: 10
title: Gran Canaria trail running race maps
date: 2021-07-28
img: GC_races.jpg
alt: Trail Races map
tools: gpsbabel, Leaflet, Python
topic: Maps
---

It's not a secret: I often mix 2 of my passions: trail running and maps. This time
I'm trying to display all the trail or mountain races taking place in the island
of Gran Canaria. This is how it goes.

<img src="{{ site.url }}/figures/blog/GCraces/GC_races.jpg" class="img-responsive">

## The data

There are 2 main ways to find the tracks:
1. By searching on the race web pages: there is often a section called "_Recorridos_", where the track is available.
2. By searching in [Wikiloc](wikiloc.com/): it is frequent that organisers or runners upload their tracks there.

The difficulty is to find the name of races that don't exist anymore. Sometimes there are still old calendars with the name of the competitions. This is the information I used to prepare the map.

## The tools

For most of the operations on the track files, I use [GPSBabel](https://www.gpsbabel.org/).     
For the visualisation part, the excellent [Leaflet](https://leafletjs.com/).

## The pre-processing

As usual, a few steps to clean or simplify the files. There is no need to show thousand of points for dozen of tracks, we can clearly simplify them.

As I prefer to work with `GPX` files, it happens that a conversion is needed, for example from a `kml` file:
```bash
gpsbabel -i kml -f doc.kml -o gpx -F la-brena-trail-20k.gpx
```

Some tracks also contain way points and routes, which we clearly don't need:
```bash
gpsbabel -i gpx -f Teror-ElAlamo-.gpx -x nuketypes,waypoints,routes -o gpx -F  Teror-ElAlamo-.gpx
```

Reducing each track to a set of 500 points also helps keep the file size low:
```bash
gpsbabel -r -i gpx -f Tejeda-CircularLarga-47km.gpx -x simplify,count=500 -o gpx -F Tejeda-CircularLarga-47km.gpx
```

Finally, we remove the time and just keeping the coordinates; I guess it can be done
with `GPSBabel`, I did it with `sed`:
```bash
sed -i '/<time>/d' *gpx
```

## The plotting

Python + matplotlib + cartopy will do the trick. I used a Sentinel-2 images as the map background, downloaded from [Sentinel hub](https://apps.sentinel-hub.com/eo-browser)
in geoTIFF format.

The GPX files are easily read, for instance using [gpxpy](https://github.com/tkrajina/gpxpy), then added to the map.

Finally, a little bit of decoration, with some points of interest, and we're done.

<img src="{{ site.url }}/figures/blog/GCraces/GC_races5.jpg" class="img-responsive">

What clearly appears is the heterogeneous coverage of the island. The northwestern
quadrant (Agaete, Artenra, Cruz de Tejeda...) seems very popular. The southestern side is almost empty, but that may be because we did not search enough. Or the dry landscapes are not so nice for a race.

There are a few tracks in the south, most of the time they are ultra-marathon that cross the island and start or finish there. This is what we show in the next map, which combines all the _TransGranCanaria_ races I could find.

<img src="{{ site.url }}/figures/blog/GCraces/TGC_all12.jpg" class="img-responsive">
