---
layout: post
title: What happened at the Python course?
date: 2019-11-13
img: python-cadiz/Cadiz2019_4308.JPG
alt: Python course in Cádiz (Spain)
tools: Python, Basemap, git
topic: Oceanography, Maps, Data Analysis
---

Last week we were invited to give a course on _Python for oceanography_, at the [University of Cádiz](https://www.uca.es/?lang=en/), in the south of Spain. I already gave the course 3 or 4 years ago with another colleagues so I knew more or less what to expect and what could be a hard-to-achieve goal: to make participants use Python as a tool after the course. As I did not take picture during the course, I'll add a few photos of Cádiz, just to have something between the paragraphs.

<img src="{{ site.url }}/figures/blog/python-cadiz/Cadiz2019_4289.JPG" class="img-responsive" alt="Cádiz">

First minutes, my first question: "*what programming language are you using the most?*"
The reply was almost the same for everybody: MATLAB. Not a real surprise: in universities it is frequent that student make their projects with MATLAB, sometimes with a so-called "*cracked license*", sometimes with a university-wide license, whatever. Hence my goal was clear: show them that anything they do with MATLAB, they can do it with Python, maybe faster, probably more elegantly. By the way: I have nothing against MATLAB, I've been using it for years, they are doing a great job by providing excellent tools, and it totally makes sense that they get money out of the investment.

It was also clear in my mind, and I told them, that even I gave the best training of my life, it doesn't really matter if at the end nobody decides to use Python on a regular basis. And it doesn't matter if I give a horrible training, if a few of them switch to Python.

<img src="{{ site.url }}/figures/blog/python-cadiz/Cadiz2019_4309.JPG" class="img-responsive" alt="Cádiz">

It was also clear to me that most of the participants already had a bunch of tools written in MATLAB and that switching to another language really needed some kind of "excuse":
- my institute doesn't want to pay the license anymore;
- my code is getting to slow;
- my new boss wants me to only work in Python.
Without that excuse, it is hard to make that first step.

## How did I try?

There is a huge amount of resources to learn Python on the web: videos on Youtube, books, learning platforms... all of them often designed by people specialized in the topic, so no way we will reinvent the wheel. Instead, I thought that settling for a problem-solving approach would give the best results. We started simple: write a program to process strings, typically turning "name surname" into "Name SURNAME". Then quickly go to: represent a (real) time series of sea water temperature near Cádiz. That implied: finding the data, reading the file(s) (netCDF), applying quality control, and then creating the plot.

<img src="{{ site.url }}/figures/blog/python-cadiz/Cadiz2019_4315.JPG" class="img-responsive" alt="Cádiz">

For all exercises I tried to give them time to code and to fail. Quite similar to learn a language: the best is, at least for me, when we have time to read, write, listen, talk, and not spend hours listening to theory. At the end everybody could finish the exercises, with a little help from time to time.

## What went wrong?

It is always difficult to assess from one's perspective, but clearly there are certainly some points that could be improved:

### The interface
I deliberately chose to work with the Jupyter notebooks: I believe it's a nice and clean way to run small chunks of code, having the documentations and the results within the same document. Probably it was not convincing enough. And probably I should have used something to the MATLAB IDE, with different windows with the terminal, the history, the workspace.

<img src="{{ site.url }}/figures/blog/python-cadiz/Cadiz2019_4360.JPG" class="img-responsive" alt="Cádiz">

In fact many questions I had were like "how to you do that (from MATLAB) in Python?". For instance how to you see the workspace (variables + their size) in Python? I think they were the types of questions I asked myself when I started coding in Python, and now the answers are hidden in my memory.

### Not reading the doc

I know that many people, including myself, just don't read the doc. Let's just try, get an error, then fix it, till we get something that works. The problem arises when people don't read the error message, which is maybe worse than not reading the doc. I the case of Python I think the logs are quite explicit, for example

```python
import numpy as np
np.aray(1, 2)
---------------------------------------------------------------------------
AttributeError                            Traceback (most recent call last)
<ipython-input-3-01f3d7aa9d4a> in <module>()
----> 1 np.aray(1, 2)
```

but I must admit that most of the time when somebody called me for to solve an issue, it was:
1. a mistyping of a function or a variable name
2. a part of the code that was not run, for example `import ...`.
All in all, nothing significant, however putting a lot of small issues together can make things really difficult. In fact it reminds me the first months I tried to code with `Julia`: very similar to languages I knew, but small differences that can be annoying.

<img src="{{ site.url }}/figures/blog/python-cadiz/Cadiz2019_4382.JPG" class="img-responsive" alt="Cádiz">


## Next time?

Last time we did this course we hoped that a least a few participants would tell us: yes, we're now coding in Python. But that did not happen. This time we will see how it turns out, I've tried my best. However after talking to two colleagues there, I realized I might make more sense to have a course on Julia, mainly for 2 reasons:
1. it's closer to what participants already know.
2. it's very fast, and at some point this can really be a game-changer.

More important that just learning a new language, it's probably developing a flexibility, a capacity of adaptation that will be asset. Hope you liked the pictures.
