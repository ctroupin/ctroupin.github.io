---
layout: post
title: Digital terrain model processing
date: 2021-07-31
img: GCaltitude_nocbab_rain_m.png
alt: Gran Canaria altitude
tools: QGIS, gdal
topic: Data visualisation
---

Some instructions to work on digital terrain model data using `gdal` tool.

1. Convert `.asc` file to `.geotiff`:
```bash
gdal_translate -of GTiff -a_srs "EPSG:9059" -co "COMPRESS=LZW" MDS05_REGCAN95_H28_1087_COB1.asc lp03.geotiff
```
Data are downloaded from the [CNIG](https://centrodedescargas.cnig.es); several files
to cover one island.

2. Generate `.vrt` files:
```bash
gdalbuildvrt geotiff.vrt *.tif
```
The `.vrt` stands for Virtual Format, it allows a virtual dataset to be composer from
other datasets.

3. Merge the geotiff:
```bash
gdaltranslate -of GTiff -a_srs "EPSG:9059" -co "COMPRESS=LZW" geotiff.vrt master.tif
```

4. Change projection:
```bash
gdalwarp -s_srs EPSG:9059 -t_srs EPSG:4326 in.tiff out.tiff
```
* [EPSG:9059](http://epsg.io/9059): Geodetic coordinate system for Europe - onshore and offshore
* [EPSG:4326](https://epsg.io/4326): Geodetic coordinate system for World.

5. Extract region of interest
```bash
gdal_translate -projwin 5.6 50.6 5.9 50.4 out.tiff subset.tiff
```
The bounding box is specified by the northwest and southeast corners.

## Final result

After merging all the tiles, I extracted each municipality.      
The figure shows Agaete (northwest of Gran Canaria) with a _hill-shading_ plot.

<img src="{{ site.url }}/figures/blog/agaete.png" class="img-responsive">
