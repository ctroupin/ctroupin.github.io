---
layout: post
modal-id: 3
title: MEDESS-GIB drifter trajectories
date: 2016-03-01
img: Medgib_drifters_currents_crop.png
alt: MEDESS-GIB drifter trajectories
project-name: MEDESS
category: Scientific illustration
tools: Python (matplotlib)
doi: 10.5194/essd-8-141-2016
---

The authors needed an illustration showing the drifter trajectories and the main oceanic structures as an overlay.

### Concept

In addition to the trajectories, the sea water temperature measured by the drifters can also constitute a relevant information.

### Realization

For the temperature scatter plot, a diverging color-map is selected to highlight the contrast between the cool Atlantic Water and the warmer Mediterranean Water.

The Western and Eastern Atlantic Gyres (WAG and EAG) are represented as circle in projected coordinates. The arrows are added as a small segment of the circle annotated with a specific arrow style.

<img src="{{ site.url }}/figures/portfolio/Medgib_drifters_currents.png" class="img-responsive" alt="Temperature measured by the MEDGIB drifters">

The Atlantic Jet are designed in 2 steps:
1. with a *click-and-save* technique: the coordinates of a series of points are captured and stored in an intermediate file;
2. a spline function is applied on the coordinates to obtain a smooth line.
