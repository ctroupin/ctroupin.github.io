---
layout: post
title: Data visualisation and colormaps
date: 2021-02-14
img: colormap_crop.png
alt: Colormaps
tools: Python, matplotlib, Julia
topic: Dataviz
---

In this post we will talk about a hot topics: the colormaps (or color palettes) used for data visualisation.

Let's be honest: while I think it is a relevant topic, I also believe it becomes a hype these days. Let's go!

A type of plot that is used a lot, including in geosciences, it the _pseudo-color_ plot (pcolor): each cell is 'painted' in a color according to the value of a property: temperature, humidity, wind speed...


## In the beginning...

__2006__ When I started working in #oceanography, everybody was using the famous "_jet_" or "_rainbow_" colormaps (I know they are not strictly the same, but no time/interest to discuss that).

<img src="{{ site.url }}/figures/blog/colormaps/newcolor.jpg" class="img-responsive">

__2007__ already, a paper entitled "[_Rainbow Color Map (Still) Considered Harmful_](https://www.computer.org/csdl/magazine/cg/2007/02/mcg2007020014/13rRUxYrbOE
)" was published. Yes, __2007__!

<img src="{{ site.url }}/figures/blog/colormaps/colormap003.jpg" class="img-responsive">

And in the references of this paper, we can find, among others, a paper from __1998__: "[_Data visualization: the end of the rainbow_](https://ieeexplore.ieee.org/abstract/document/736450)".

So yes, 2 decades ago, we were already trying to kill this colormap.

<img src="{{ site.url }}/figures/blog/colormaps/colormap004.jpg" class="img-responsive">

## More of the same

During my PhD I was using a lot the excellent [ncview](http://meteora.ucsd.edu/~pierce/ncview_home_page.html), and a friend of mine had a version "with new colormaps"!! So we were feeling like the bosses with these new superpowers. Nice colormaps, yes, but still no idea about what we were doing.

<img src="{{ site.url }}/figures/blog/colormaps/colormap005.png" class="img-responsive">

__2013__, starting to lean Python, I read more about data visualisation, at that time there was already a lot about colormap, for instance:
* [How The Rainbow Color Map Misleads](https://eagereyes.org/basics/rainbow-color-map)
* [How Bad Is Your Colormap?](https://jakevdp.github.io/blog/2014/10/16/how-bad-is-your-colormap)

<img src="{{ site.url }}/figures/blog/colormaps/colormap006.png" class="img-responsive">

On a side note: with the increasing number of available colormaps, we were never totally happy with our choice for the sea surface temperature: jet/rainbow created fake gradients, but other were too... smooth.

[Choosing Colormaps in Matplotlib](https://matplotlib.org/3.1.0/tutorials/colors/colormaps.html)

<img src="{{ site.url }}/figures/blog/colormaps/colormap007.png" class="img-responsive">

__2014__ At that time I was not using MATLAB a lot anymore, but I remember that [they changed their default colormap](https://www.mathworks.com/matlabcentral/answers/169307-why-has-the-default-colormap-of-surface-plots-changed-in-matlab-r2014b). That was a big move ;)


<img src="{{ site.url }}/figures/blog/colormaps/colormap008.jpg" class="img-responsive">

__2016__ another paper about colormaps, this time focused on the ocean: [True colors of oceanography](http://tos.org/oceanography/assets/docs/29-3_thyng.pdf)
For sure they are beautiful, and that could have been the end of the story...

More colormaps were created:
* [Colorcet](https://colorcet.holoviz.org/) (which I've discovered when I wrote this post)
* [Holoviews](http://holoviews.org/user_guide/Colormaps.html)
* [Seaborn](https://seaborn.pydata.org/tutorial/color_palettes.html)
* [yt](https://yt-project.org/doc/visualizing/colormaps/index.html)
* [CMasher](https://cmasher.readthedocs.io/): scientific colormaps for making accessible, informative and cmashing plots.

## Publications

Let's go back to publications:

__2018__: "[Geodynamic Diagnostics, Scientific Visualisation and StagLab 3.0.](https://gmd.copernicus.org/articles/11/2541/2018/)" by F. Crameri in _Geoscientific Model Development_

__2019__: "[The Importance of Colormaps](https://ieeexplore.ieee.org/document/9167329)" by K. M. Thyng in _Computing in Science & Engineering_

__2020:__ "[The misuse of colour in science communication](https://www.nature.com/articles/s41467-020-19160-7)" by F. Crameri in _Nature_

## Conclusions

<img src="{{ site.url }}/figures/blog/colormaps/end.jpg" class="img-responsive">


For more than 20 years, scientists have come up with new colormaps, with the idea of removing the possible distortion or problems. The message was often "_let's get rid of rainbow_". But, if you attend conferences, it's still alive (which is maybe not so bad)!

Now I'm wondering: is there a time when we will stop producing new colormaps? Isn't there enough? I believe that the answer is no: if papers are still published on the topic, this creates a demand, so why scientists should stop working on that?
