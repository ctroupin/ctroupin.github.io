---
title: Let's go flying (part I)!
layout: projectmap
date: 2017-12-12
img: airport_heatmap.jpg
alt: Airport density map
category: Map
tools: Leaflet, Julia
---

It don't remember how the story begins, but I think it's a cool problem easy to understand. I shared it with friends and colleagues working in geometry and geography so they could give it a go.

### The problem

I was wondering what is the place on Earth (land or sea) for which the closest
airport is at the largest distance.
Put it in other words: from that place, you don't find any airport in a *radius*
of *X* kilometers. We need to find the place for which *X* is the maximum.

### Let's get some data

I quickly found out a list of airports at [OpenFlights](https://openflights.org),
from which we can begin the analysis.
First of all I was curious to see a *heatmap*, it's the first image of this post.

{% include_relative maps/flying.html %}
<br>

What comes out of that map is that you almost don't need coastlines, they appear
clearly because of the airport locations. Seeing the U.S. and Europe like this is
not a surprise, what I especially like is how the Caribbean Islands are highlighted.

Concerning the point we are looking for, one might say it should be in the southern ocean, but
don't forget that we are working on a sphere (more or less) and that the projection
of our map can deform the reality.

### First thoughts

When I submit the problem to the mathematician colleague, he started with 2 questions:
1. Does a solution exist?
2. Is this solution unique?

Let's imagine there are only 2 airports on earth surface: Liège and Denver. If we consider the [*great circle*](http://mathworld.wolfram.com/GreatCircle.html) containing these two points:
* the location halfway of the great circle (<i class="fa-solid fa-check"></i>) is the point with the shortest distance to both airports,
* the point located at the antipode (<i class="fa-solid fa-star"></i>)
of the first one is the location we're looking for.

{% include_relative maps/flyingpoints.html %}
<br>
This [jsfiddle](http://jsfiddle.net/h1r3yagb/2/) was useful for the halfway point.

### Just for fun: the longest distance between 2 airports

The code to find out these 2 airports is not very clever: a loop over all the pairs
to compute the distance using the [*Haversine*](https://rosettacode.org/wiki/Haversine_formula) formula. I used [`Julia`](http://julialang.org/) for that part, first to
have something fast, second to force me to use this language.

{% include_relative maps/flyingfarthestairport.html %}
<br>
We learn that the maximal distance, 20015 km, is between _Sultan Mahmud Badaruddin II_ Airport (🇮🇩 Indonesia) and _Benito Salas_ Airport (🇨🇴 Colombia).

### First (and wrong) solution

My idea was to find the pair of airports separated by the largest distance, and then
the point between them would be the location we're looking for.
That's obviously not correct.

### What's next?

The next tries will be presented in another post.
