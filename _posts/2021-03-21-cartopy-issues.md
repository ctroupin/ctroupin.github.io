---
layout: post
title: Solving issues with Cartopy
date: 2021-07-29
img: canary_map0001.png
alt: Cartopy
tools: Python, matplotlib, Cartopy
topic: Plots
---

Not to long ago I [posted]({% post_url 2021-04-17-cartopy-wms %}) about `Cartopy` and how it was easy to install it. Well, I must say it is not as easy as running
`pip install cartopy`. While the installation could go without a warning message,
the execution of some code could quickly lead to problems.

## The issue

Here is an example of code that created the problem (let's save it a file
`test_carto.py` to be used later):
```python
import cartopy.crs as ccrs
import matplotlib.pyplot as plt
ax = plt.axes(projection=ccrs.PlateCarree())
ax.coastlines()
plt.show()
```

which lead to the error message:

```python
Geometry must be a Point or LineString
python: geos_ts_c.cpp:3991: int GEOSCoordSeq_getSize_r(GEOSContextHandle_t, const geos::geom::CoordinateSequence*, unsigned int*): Assertion `0 != cs' failed.
Aborted (core dumped)
```

## Toward the solution

### Your friend: StackOverFlow

The first thing I found on a research was from StackOverFlow:
> The problem is a wrong version of shapely, with Cartopy the binary package shouldn't be used, it should be built from source instead.

But is it really a wrong version? (by the way, what is a wrong version?)?     
Let's check with `pip show shapely`:
```bash
Name: Shapely
Version: 1.7.1
Summary: Geometric objects, predicates, and operations
Home-page: https://github.com/Toblerity/Shapely
Author: Sean Gillies
Author-email: sean.gillies@gmail.com
License: BSD
Location: /home/ctroupin/Software/PythonEnvs/OpenDriftCanary/lib/python3.8/site-packages
Requires:
Required-by: Cartopy
```
1.7.1 was released in August 2020, maybe I should try a more recent version: 1.8a1,
released in March 2021. I tried
```bash
pip uninstall shapely
pip install shapely --no-binary shapely
```
then re-run the `cartopy` installation. Still failing.

### Reading the doc

According to [`shapely`](https://pypi.org/project/Shapely/) documentation,
one should run this:
```bash
GEOS_CONFIG=/path/to/geos-config pip install shapely
```
where `GEOS_CONFIG` environment variable has to be set according to the
[`GEOS`](https://github.com/libgeos/geos) library you are using. I did a quick
search with `find`:
```bash
find / -name 'geos-config' -type f
```
and it turned out I had 20 locations containing `geos-config`... Not sure which one to
use.
```bash
/bin/geos-config
/usr/bin/geos-config
/usr/local/lib/bin/geos-config
/usr/local/bin/geos-config
...
```
So I tried with the latest version I had previously installed, 3.9.1, but again,
that did not solve the initial problem. Then I tried with version 3.6.1:
```bash
GEOS_CONFIG=/home/ctroupin/Software/geos-3.6.1/tools/geos-config pip install shapely
```
Still failing when running the example.

### Building `cartopy` from source

According to [cartopy doc](https://github.com/SciTools/cartopy), we can do:
```bash
git clone https://github.com/SciTools/cartopy.git
cd cartopy
python setup.py install
```
which should work if all the prerequisites were installed. Here there is also
a subtlety: if the installation of done using the _master_ branch from the GitHub
repository, the last line issued on the screen is:
```bash
Finished processing dependencies for Cartopy==0.0.0
```
i.e., the version doesn't seem correct. Then in a Python session, the command
```python
import cartopy
```
yields this error:
```python
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
  File "/home/ctroupin/Software/PythonEnvs/ToDelete/lib/python3.8/site-packages/Cartopy-0.0.0-py3.8-linux-x86_64.egg/cartopy/__init__.py", line 7, in <module>
    from ._version import version as __version__  # noqa: F401
ImportError: cannot import name 'version' from 'cartopy._version' (/home/ctroupin/Software/PythonEnvs/ToDelete/lib/python3.8/site-packages/Cartopy-0.0.0-py3.8-linux-x86_64.egg/cartopy/_version.py)
```
which seems to be related to the version number.

__Solution:__
1. a dirty way to solve that is to comment the line 7 of `__init__.py`.
That works...
2. Otherwise, switch to another branch and re-run the installation:
```bash
git checkout v0.18.0
python setup.py install
```

### Missing GEOS library

Running again the example from the beginning leads to this error:
```python
OSError: /home/username/PythonEnvironments/GPXproc/lib/libgeos_c.so: cannot open shared object file: No such file or directory
```
which I solved in a not very clever way: by creating a soft link to the existing library `libgeos_c.so` in the `lib` directory of my virtual environment.

```bash
cd /home/username/PythonEnvironments/GPXproc/lib/
ln -sfv /usr/local/lib/lib/libgeos_c.so .
```

## Summary

<img src="{{ site.url }}/figures/blog/cartopy-wms/cartopytest01.jpg" class="img-responsive">

Here is the list of commands that lead to a working environment. For sure they
are things that can be improved, for example the step in which the `libgeos_c` file is linked in the lib directory of the virtual environment.
```bash
venvname="ToDelete"
mkvirtualenv --python=/usr/local/bin/python3.8 ${venvname}
pip install matplotlib
pip install scipy
pip install cython
pip uninstall shapely
pip install shapely --no-binary shapely
GEOS_CONFIG=/home/ctroupin/Software/geos-3.6.1/tools/geos-config pip install shapely
ln -sv /usr/local/lib/lib/libgeos_c.so ${WORKON_HOME}/${venvname}/lib/libgeos_c.so
git clone git@github.com:SciTools/cartopy.git
cd cartopy
git checkout v0.18.0
python setup.py install
cd ..
python test_carto.py
```
