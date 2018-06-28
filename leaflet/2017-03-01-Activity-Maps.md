---
title: Activity maps
layout: projectmap
date: 2017-03-01
img: airbnbHeatDark.jpg
alt: Running map
tools: Leaflet
category: Map
---

When I was working in Mallorca, I used to organize trekking in the *Tramuntana* and after a while I though we could have a visual summary of what we did, in the form of an interactive map. `Leaflet` was very popular where I was working, hence that was the natural choice. We then added other types of activities: trail running, bike, ...

<img src="/figures/maps/MallorcaActivities.jpg" class="img-responsive" alt="Mallorca running and trekking">

Once I was back in Belgium I obviously did the same and prepare a map of the running tracks that we did together with the group. Sometimes it helps to know where we've not been so often, and with [OpenStreetMap](http://openstreetmap.org/) we can even see tracks we didn't know.

### Pre-processing

The GPX files downloaded from [Movescount](http://movescount.com/) are a bit heavy, for example a track of about 9500 points is stored in a 4.5 MB file. This is because the files not only store the time and coordinates, but also the cadence, distance, altitude and speed. It's straightforward to remove that information (since we won't use it) with a bash script using `sed` commands for instance.

For the same file with the 9500 points, we end up with a new file of 1.3 MB. Finally, as we're not interested in having a high precision representation of the tracks, we re-sample them to 500 points. This turns out to be enough to properly display the tracks and at the time to have correct values for the total distance and the ascent.

### Implementation

The list of GPX files is stored in a simple file like this:
```
var moves = [
	"2017/sart-tilman-roche-aux-faucons.gpx",
	"2017/Sart-tilman-golf.gpx",
  ...
```
When we need to add a new activity, we just have to update the list and add the corresponding file.

Different metrics (distance, ascent, ...) are computed on the fly. The track is edited manually (no other way to do it) so that it can be displayed in an `info` box.

*Heatmap* and *hexbin* layers provide good ways to see the most frequent places and also locations where we never go. For example we almost never followed the national road "*Route du Condroz*", due to the traffic.

<img src="/figures/maps/sarttilmanhexbin.jpg" class="img-responsive" alt="Sart Tilman hexbin">
