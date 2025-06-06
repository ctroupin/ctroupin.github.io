---
layout: post
title: Computing positive elevation from GPX tracks
date: 2017-08-19
img: GPX_compare1_crop.png
alt: From Pépinster to Angleur and Aywaille
topic: Running, GPX
---

After a cool ride this morning, I wanted to compare (quickly) the numbers given by different platforms I've been using recently:
* [Movescount](http://www.movescount.com) (Suunto)
* [Strava](https://www.strava.com)
* [Wikiloc](http://wikiloc.com/)
* [Garmin](https://connect.garmin.com)

In addition, I compared with
* [QLandkarteGT](http://www.qlandkarte.org/), a good tool for the quick visualization of GPX tracks and
* a personal viewer I'm playing with (total distance and elevation computed in javascript).

<img src="{{ site.url }}/figures/blog/GPX_compare1.png" class="img-responsive" alt="From Pépinster to Angleur">

The same GPX file is used for the comparison, i.e., I did register the track using different devices. Here are the results.

|---
| Platform   | Total distance (km)  | Ascent (m) |
| ------------| --------------- | -------------- |
| Movescount  | 80.36           | 385            |
| Strava      | 80.50           | 1089           |
| Wikiloc     | 80.52           | 627            |
| Garmin      | 80.66           | 1077           |
| QLandkarteGT| 81.00		        | 399            |
| Own tool    | 80.52           | 734            |

<img src="{{ site.url }}/figures/blog/GPX_compare2.png" class="img-responsive" alt="Profile viewed using QLandkarteGT">

### What do we see?

The distance doesn't change a lot, which is probably expected: one only computes the cumulative sum of the distance between pairs of consecutive positions.    
Concerning the ascent, the values range from around 390 meters (Movescount and QLandkarte) to more than 1070 meters (Strava and Garmin Connect), almost 3 times more! For these, I was not sure whether that value was the sum of positive and negative elevations, but reading [their documentation](https://support.strava.com/hc/en-us/articles/216917087-Elevation-Gain) I would say that it's the positive elevation, called *Ascent* (↗) in Movescount.

### Why is that?

The altitude can be obtained from     
* a barometric altimeter: the atmospheric pressure is converted to an altitude;    
* the measured position: if you know where you are and have a *digital elevation model*, the altitude can be deduced;    
* the GPS signal itself: if I'm not wrong this method is no too accurate, but I'll ask the colleagues to be sure.

In any case, the signals are affected by errors and reducing them can be done using different methods, for example filtering the signal and remove unrealistic peaks. Also, if the digital model used in the calculation has more or less resolution and accuracy, the results will necessarily differ.

Still, the ratio between the largest and the smallest values is about 3, in other words, when one platform tells you've done a Vertical Kilometer, the other says that you effort had (merely) 300-400 meters of positive elevation... So yes, it would be nice to have some kind of a consensus.

### What about running?

The question is: do we find such a difference in elevation with other sports, in particular running? Let's check a medium-distance race.

<img src="{{ site.url }}/figures/blog/GPX_compare3.png" class="img-responsive" alt="Velocity along the race">

Platform      | Total distance (km) | Ascent (m) |
--------------|-----------------|----------|
Movescount    | 31.28           | 532      |
Strava        | 31.30           | 689      |
Wikiloc       | 31.29           | 572      |
Garmin        | 31.36           | 669      |
QLandkarteGT  | 31.00		        | 584      |
Manual        | 31.29           | 727      |

The total distances slightly differ between the tools, about 300 meters (1%), whereas the computed ascents range from 532 to 727 meters. The range of values appears tighter than in the case with the bike, even if a difference of 200 over 500 meters cannot be considered as negligible.

Finally, another example on an even shorter distance (Sart Tilman - Ougrée Haut - Colonster). Note that, since the start and end points are the same, ascent and descent should be equal.

|            | Distance (km) | ↗ (m)  | ↘ (m) | Highest (m)  | Lowest (m) |
| -----------|:-------------:|       -----:|       -----:|        -----:|      -----:|
| Movescount | 11.57         | 203         | 203         |  278         | 140        |
| Wikiloc    | 11.98         | 236         | 241         |  278         | 140        |
| [Strava](https://www.strava.com/activities/1116696476)     | 11.98          | 240         |             | 278         | 138        |
| QLandkarteGT| 12.00         |  227        | 222         | 278          | 140       |
| Manual     | 11.95         |  274         | 270         |              |            |


### What's next?

The plan will be to register the track on a trail that is totally uphill and see if we see again these discrepancies.
