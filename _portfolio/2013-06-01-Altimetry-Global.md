---
layout: post
modal-id: 6
title: Global map of sea level anomalies
date: 2013-06-01
img: global_analysis_mesh.jpg
alt: image-alt
tools: Python (matplotlib, basemap), DIVA (interpolation)
category: Scientific illustration
---

The figure was specifically created for a scientific meeting in Boulder: we were happy to be able to generate such global maps by interpolating more than a million data points using with the [`DIVA`](https://github.com/gher-ulg/DIVA) software tool, in just a few seconds. And we wanted to show it.

### Concept

The sea level anomaly field obtained with `DIVA` is shown on a sphere, along with the finite-element mesh used in the interpolation process.

### Afterthoughts

Interestingly the audience response was rather neutral or even unhappy, since other methods were preferred, even if they tool hours instead of seconds.
