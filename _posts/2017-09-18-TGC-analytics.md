---
layout: post
title: TransGranCanaria and data analytics 
---


Just after the race (see this entry for a report) I decided to play a little bit with the data to see some cool stuffs. More than 6 months later, here they are.

![Race map]({{ site.url }}/figures/blog/TGCheat.png "Race map")

### Data extraction

First (and usual): get the data in a usable format. From the race web page we downloaded the pdf file with the results and copied its content in a text file. The result is pretty bad as everything (names, times, countries) is mixed up. Luckily with regular expressions we can easily extract the information needed.

### Time to finish the race

The dates extracted in the previous steps are converted to seconds to make easier the calculation of durations.

#### Time series

Here we show all the finishers' time along with basic diagnostics (mean, standard deviations from mean, ...). For the first runners, long gaps are visible especially below 22 hours. Such gaps tend to diminish for longer race times. The median time is slightly below 24 hours of race, almost twice the winner's time. The fact that participants are made up of both professional runners and amateurs can explain these observations. 

![Time series]({{ site.url }}/figures/blog/timeseriesTGC.png "Time series")


#### Histogram (classic)

The idea is simply to count the number of runners by bins of 1 hour. The distribution is clearly non-Gaussian and shows that in general more participants require more time to finish. The maximal time allowed to finish the race is 30 hours but it would be interesting to see how many persons can do it in less than, let's say, 32 hours.

![Histogram]({{ site.url }}/figures/blog/histogramTGC.png "Histogram")


### Distribution by countries

As expected, most of the finishers come from Spain and from France (holidays during that week). Nobody from Africa is maybe a surprise, but we should check with the registration data. 

![Country map]({{ site.url }}/figures/blog/TGCfinishers.png "Country map")


