---
title: DIVA inputs and outputs
layout: projectmap
date: 2017-02-01
img: leaflet_blacksea.png
alt: DIVA inputs and outputs
github: gher-ulg/DivaPythonTools
tools: Leaflet, Python, DIVA
category: Map
---

### Goals

The various [`DIVA`](https://github.com/gher-ulg/DIVA) input (data, contours) and output files (mesh, analysis) can be easily displayed on an interactive map using `Leaflet`. Each layer can be made activated separately. The following example illustrates this with data from the Black Sea.

### Processing

The file are simply transformed to [geoJSON](http://geojson.org/) format using Python modules. For the analysis field, the iso-contours are turned into a [multi-polygon](http://wiki.geojson.org/GeoJSON_draft_version_6#MultiPolygon) to which a style is added.

In the toolbox [DivaPythonTools](https://github.com/gher-ulg/DivaPythonTools), we provide the functions to convert each type of DIVA input or output into a geoJSON.

### Results

The maps obtained for mixed-layer depth measurements is shown below.

{% include_relative maps/divaBlackSea.html %}

The legend (bottom-right corner) has to be adapted to the specific range of the observations, the *Mixed Layer Depth* (MLD) in this case.
