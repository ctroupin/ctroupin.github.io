---
layout: post
title: Installing Basemap and Cartopy in a virtual environment
date: 2020-11-27
img: mpl_basemap.jpg
alt: Basemap and Cartopy
tools: Python, matplotlib, Basemap, Cartopy
topic: Plots
---

A classical problem, I'm sure it is already well documented in different places, but
I've had recently some issues with the installation, hence this short post,
which may be useful only to me.

## Creation of the virtual environment

Nothing fancy here, we use the [virtualenvwrapper](https://virtualenvwrapper.readthedocs.io/en/latest/) and specify the python version we're using (3.8 as at the time of this post):
```bash
mkvirtualenv --python=/usr/local/bin/python3.8 Argo3.8
workon Argo3.8
```

## Basemap

Yes, we now it is deprecated in favor of `Cartopy`, but for some reasons,
let's say we want to continue with `Basemap` for some more time.

Download the last release from [https://github.com/matplotlib/basemap/releases/](here),
here we save it in a directory `~/Software`, for example.

__Update:__ I have encountered issues with `basemap-1.2.2rel`, while the previous version, `basemap-1.2.1rel` was working fine.

### Compile geos library

It is a necessary step before installing `Basemap`.
We need to specify the directory where the `libgeos.*` files are located.
In our case: `/usr/local/lib`. This is stored in the variable `GEOS_DIR`.

```bash
cd ~/Software/basemap-1.2.2rel
cd geos-3.3.3
export GEOS_DIR=/usr/local/lib
./configure --prefix=$GEOS_DIR
make
sudo make install
```
If you don't have the permissions to write in `/usr/local/lib` and similar
directories, for instance on a cluster, you can use another one, typically:
```bash
export GEOS_DIR=~/.local/
```
(ensuring the directory has already been created).

### Install Basemap

Almost done, just run the following command to install the module:
```bash
cd ..
python setup.py install
```
which should end with the message:
```bash
Finished processing dependencies for basemap==1.2.1
```

### Testing

Open a python terminal and run
```python
from mpl_toolkits.basemap import Basemap
```

We get the error:
```python
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
ModuleNotFoundError: No module named 'mpl_toolkits.basemap'
```
though we're sure the module has been properly installed,
since `pip list` returns:
```bash
Package                       Version
----------------------------- -----------
...
basemap                       1.2.1
...
```

#### What's the problem then?

I check the directory storing the different virtual environments:       
`{VIRTUALENVDIR}/Argo3.8/lib/python3.8/site-packages`      
and found, among many directories:
* `basemap-1.2.1-py3.8-linux-x86_64.egg/mpl_toolkits`, which was installed a few minutes before
* `mpl_toolkits`, installed some days ago.

So my assumption (and I must apologise because I won't take the time to verify it), is that `mpl_toolkits` has been installed at the same time as `matplotlib`. Seems plausible.

Then, when I run in Python `from mpl_toolkits import ...` it searches for `Basemap` in this older directory.

#### Solution

I created a link inside the old `mpl_toolkits` directory toward the newly installed
`basemap` directory:

```bash
cd ${VIRTUALENVDIR}/Argo3.8/lib/python3.8/site-packages/mpl_toolkits
ln -sfv ../basemap-1.2.1-py3.8-linux-x86_64.egg/mpl_toolkits/basemap/ .
```

This way, when typing `from mpl_toolkits.basemap import Basemap`, Python
find the expected directory.

#### With IPython

Side note: the command can work in a Python terminal but not with IPython. Why?

When you type `ipython` in a terminal, you need to be sure that it is the `ipython`
relative to the virtual environment that is run.

A possibility for that is to call it with
```bash
python -m IPython
```

Now we're done with `Basemap`.

### Problem with 'dedent'

In some installations I encountered this issue:
```python
ImportError: cannot import name 'dedent' from 'matplotlib.cbook'
```
It is documented [here](https://github.com/matplotlib/basemap/issues/494), and the solution detailed below.

#### Solution

Find the path of the file `proj.py` with the command:
```python
import pyproj
pyproj.__file__
```
In my case it ends with `basemap-1.2.1-py3.8-linux-x86_64.egg/mpl_toolkits/basemap/proj.py`.

In this file, replace      
`from matplotlib.cbook import dedent` with     
`from inspect import cleandoc as dedent`.

Okay, another dirty fix, but there is no time now to be much cleaner.

## Cartopy

Let's repeat: `Basemap` is deprecated and we should use [`Cartopy`](https://scitools.org.uk/cartopy/docs/latest/installing.html). Their documentation
starts with `Conda` stuffs, we're not using it too much as we prefer the classical
`pip` approach.

### pip

Let's start with a `pip install cartopy`.

On other occasions, we got error messages, but this time it seems everything
is in place to avoid us some troubles. Lucky me.
