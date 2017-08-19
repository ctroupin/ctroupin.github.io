---
layout: post
title: Elevation in sport social network 
---

After a cool ride this morning I wanted to compare (quickly) the numbers given by different platforms I'm using:
* [Movescount](http://www.movescount.com) (Suunto)
* [Strava](https://www.strava.com)
* [Wikiloc](http://wikiloc.com/)

In addition we compare with [QLandkarteGT](http://www.qlandkarte.org/), a tool I really like for quick visualisation of GPX tracks and with a personal viewer I'm playing with (total distance and elevation computed in javascript).    
Here are the results.

| Platform    | Total distance  | Ascension      | Calories      |
|             | (km)            | (m)            | (kcal)        |
| ------------| --------------- | -------------- | ------------- |
| Movescount  | 80.36           | 385            | 1623          |
| Strava      | 80.5            | 1089           | 2881          |
| Wikiloc     | 80.52           | 627            |               | 
| QLandkarteGT| 81.00		| 399            |               |
| Own tool    | 80.52           | 734            |               |

When the table cell is empty, it simply means that the value is not computed or made available.

### What do we see?

The distance doesn't change a lot, which is probably expected: one only computes the cumulative sum of the distance between pairs of consecutive positions.    
Concerning the ascencion, the values range from around 390 meters (Movescount and QLandkarte) to 1089 meters (Strava). I was not sure whether that value was the sum of positive and negative elevations, but reading [their documentation](https://support.strava.com/hc/en-us/articles/216917087-Elevation-Gain) I would say that it's the positive elevation, called *Ascension* in Movescount. 

### Why is that?

The altitude can be obtained from     
* a barometric altimeter: the air pressure is converted to an altitude);    
* the measured position: if you know where you are and have a *digital elevation model*, the altitude can be deduced;    
* the GPS signal: if I'm not wrong this method is no too accurate, but I'll ask the colleagues to be sure.

In any case, the signals are affected by errors and reducing them can be done using different methods, for example filtering the signal and remove unrealistic peaks. Also, if the digital model used in the calculation has more or less resolution and accuracy, the results will necessarily differ.






