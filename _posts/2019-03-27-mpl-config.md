---
layout: post
title: Configuring matplotlib with a virtual environment
date: 2019-03-01
img2: mpl_virtualenv.png
img: mpl_virtualenv_crop.png
tools: python, matplotlib, virtualenv
category: Tools and tips
---

Quite a short post, rather a reminder for me maybe, hoping that it can help others saving a few
precious minutes.

<img src="{{ site.url }}/figures/blog/{{ page.img2 }}" class="img-responsive" alt="{{ page.alt }}">

### Problem

You have created a new *virtualenv* to work on your favorite code, but
get tired to always specify the same options when saving a figure with
`matplotlib`:

```python
import matplotlib.pyplot as plt
...
plt.savefig(figname, dpi=300, bbox_inches='tight', ...)
```

### Solution

For each of the *virtualenv* you create (provided `matplotlib` is installed),
there is a file called `matplotlibrc` that defines the different options. With
my installation, I found it in the virtualenv directory, in the folder
`lib/python3.6/site-packages/matplotlib/mpl-data`

In my case I will edit the following lines:

```python
#figure.dpi       : 300      # figure dots per inch
#savefig.bbox     : tight    # 'tight' or 'standard'.
```
