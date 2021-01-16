---
layout: post
title: City running map
date: 2021-01-21
img: Sentinel2_0091.png
alt: City running
tools: bash, GPX, matplotlib
topic: Dataviz, running
---

If you have ever been running (a lot) in the same town or village, you might
want to know if you have covered most of the streets and trails. In this post
we will see how to create a map summarizing all the information.

## Getting the data

The plan is to get all the tracks from the platform you are using with your
device. Here we work with [Movescount](https://www.movescount.com) (Suunto), where we can easily request all the moves using the _export_ option, available in the _Settings_:
https://www.movescount.com/settings#export

<img src="{{ site.url }}/figures/blog/suunto_export.jpg" class="img-responsive" alt="Movescount export">

Usually the data arrives pretty fast, a few minutes later. What do we get?
An archived containing a folder _Moves_, in which we have all
the moves recorded with the device (more than 2500 in my case).

## Data preparation

### Converting to GPX

The format is `.fit`, and we can easily convert it to `.gpx` using the excellent
[`gpsbabel`](https://www.gpsbabel.org/) tool. The command for the conversion reads:
```bash
gpsbabel -i garmin_fit -f input.fit -o gpx -F output.gpx
```
and we can loop on all the files to apply this conversion.

### Selection by type of activity

What is nice is that the type of activity (_Running_, _Walking_, _Trekking_) is written in the file name, otherwise it might be necessary to implement a way to detect it from the total distance, the mean speed, or any other combination of relevant metrics.

We can remove static activities, such as _Stretching_, _Indoor_training_...

### Selection by region

If you have traveled and run in different places, it could be useful to classify the
track by region. How to do that? Probably there are many ways, using for example
geo-referencing. What we did is to base the classification on the distance between
* the mean coordinate of a track and
* a coordinate representative of a region or town, it can be its center for example.
If that computed distance is below a given threshold, then the track becomes to that region.

### Example

For Vienna, we consider the tracks for which the distance to the point
(48.20467°N, 16.343028°E) is lower than 12 km. The threshold distance depends on the
extension of the region.

In another example, we want to have all the tracks located in Mallorca island: the
distance is computed from (39.624293°N, 3.025380°E), with a threshold of 60 km.
