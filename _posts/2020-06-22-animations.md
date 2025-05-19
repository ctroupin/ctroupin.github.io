---
layout: post
title: Creating animations from image sequences
date: 2020-06-22
img: Sentinel2_0091.png
alt: Animations
tools: bash, matplotlib, ffmpeg
topic: Animations
---

Creating animations is frequent in oceanography and modeling, as it is a perfect way
to show the temporal evolution of 2-dimensional fields, such as the sea water temperature.
This is also something useful to create *time-lapse*.
But how to create them? This is what I plan to explain here.

## The principle

There are several methods to produce animation, here we will use the image sequence technique:     
we first produce a bunch of images that we later put together into an animation or movie. Why this approach? I think it provides a lot of flexibility, and it is very easy to modify the parameters (speed, quality) of the movie afterward.

## The tools
First we need tools:
1. For the preparation of the images, we use `python + matplotlib` or `Julia + PyPlot`. I won't go into details here as the function [savefig](https://matplotlib.org/3.2.1/api/_as_gen/matplotlib.pyplot.savefig.html) is well documented.
2. For the animation creation, we work with [ffmpeg](https://ffmpeg.org/), my favorite tool to work on videos.

## Procedure

Now image we have a bunch a images, names sequentially, for example:     
```bash
north_sea001.png
north_sea002.png
north_sea003.png
...
```
and we want to create a movie called in `mp4` format.

<img src="{{ site.url }}/figures/blog/Sentinel2_0022.png" class="img-responsive" alt="Sentinel-2 image">

Here is an example of command we ca, use:
```bash
ffmpeg -framerate 6 -i north_sea%03d.png -c:v libx264 -pix_fmt yuv420p animation.mp4
```
and now some explanations:
* `-framerate 6` specifies the *framerate*, here 6 frames per second.
* `-i north_sea%03d.png` indicates the input files, with the `%03` for the zero-padding.
* `-c:v libx264` [optional] encodes the movie with `libx264`.
* `-pix_fmt yuv420p` [optional] to ensure the output work in `QuickTime` and most other players.

And that's all, the movie is ready to be played or uploaded to your favorite platform or even on social media (_Twitter_ has a size limit for the animations).

### Working with file patterns

In the initial example, the files were named sequentially. Usually I saved the
figures with a name containing the date, for instance `SST_201801.jpg`,
`SST_201802.jpg`, ..., `SST_202012.jpg`

Of course we can use some options to take care of that, in particular
the option `-pattern_type`. An example is better than explanations:

```bash
ffmpeg -framerate 12 -pattern_type glob -i "SST_*.jpg" -c:v libx264 -pix_fmt yuv420p  animation.mp4
```
It is always possible to check a priori the file order using this command:
```bash
echo SST_*.png
```
ensuring there is no surprise in the final animation.

### Errors

Sometimes I had an error like this:
```bash
libx264 @ 0x9a6460] width not divisible by 2 (2441x2402)
```
which was solved by adding this option `-vf "pad=ceil(iw/2)*2:ceil(ih/2)*2"`:

```bash
ffmpeg -framerate 6 -i north_sea%03d.png -c:v libx264 -pix_fmt yuv420p -vf "pad=ceil(iw/2)*2:ceil(ih/2)*2" animation.mp4
```

## Examples

Instead of showing an animation of ocean-related variables, I preferred an example of time-lapse
I did a few years ago: [https://vimeo.com/271162965](https://vimeo.com/271162965), hope you like it.
