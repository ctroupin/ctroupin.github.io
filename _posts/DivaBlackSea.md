---
title: Diva inputs and outputs
layout: projectmap
---

### Diva inputs and outputs

The various <a href="https://github.com/gher-ulg/DIVA" title="Diva">Diva</a> input (data, contours) and output files (mesh, analysis) can be easily displayed on an interactive map using Leaflet. Each layer can be made activated separately.

The file are simply transformed to [http://geojson.org/](geoJSON) format using Python modules. For the analysis field, the iso-contours are turned into a [multi-polygon](http://wiki.geojson.org/GeoJSON_draft_version_6#MultiPolygon) to
which a style is added.

{% include_relative maps/divaBlackSea.html %}

The legend (bottom-right corner) has to be adapted to the specific range of the observations, the *Mixed Layer Depth* (MLD) in this case.
