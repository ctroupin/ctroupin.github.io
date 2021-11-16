---
layout: post
title: La Palma topography
date: 2021-07-31
img: mpl_basemap.jpg
alt: La Palma topography
tools: QGIS, gdal
topic: Data visualisation
---

1. Convert `.asc` file to `.geotiff`:
```bash
gdal_translate -of GTiff -a_srs "EPSG:9059" -co "COMPRESS=LZW" MDS05_REGCAN95_H28_1087_COB1.asc lp03.geotiff
```
2. Generate `.vrt` files:
```bash
gdalbuildvrt geotiff.vrt *.tif
```
3. Merge the geotiff:
```bash
gdaltranslate -of GTiff -a_srs "EPSG:9059" -co "COMPRESS=LZW" geotiff.vrt master.tif
```
4. Change projection:
gdalwarp -s_srs EPSG:9059 -t_srs EPSG:4326 in.tiff out.tiff
