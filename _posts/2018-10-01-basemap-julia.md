---
layout: post
modal-id: 12
title: Installing and using Basemap with Julia
date: 2018-10-01
img: julia-basemap.png
alt: Using Basemap with Julia
tools: Julia, Python, Basemap
topic: Oceanography, Maps
---

A quick post about an installation, something I never remember how to do but can be useful
to others.

### Download package
Get the most recent (and stable) version of Basemap:
```bash
wget https://github.com/matplotlib/basemap/archive/v1.1.0.zip
unzip basemap-1.1.0.zip
```

### Install package
Create a directory where the installation will be performed, for example:
```bash
mkdir ~/Software/Geos
```
Go into the `geos` directory:
```bash
cd basemap-1.1.0/
cd geos-3.3.3/
```
and start the installation of Basemap:
```bash
export GEOS_DIR="/home/ctroupin/Software/Geos"
./configure --prefix=$GEOS_DIR
make
make install
```
The `make` can take up to a few minutes to finish.

### pip install
Now the *tricky* part: you need to localise the `pip` and `python` executables
corresponding to your version of Julia to run the installation scripts.      

For Julia-0.6 I had:
```bash
~/.julia/v0.6/Conda/deps/usr/bin/pip install pyproj
~/.julia/v0.6/Conda/deps/usr/bin/python setup.py install
```

For Julia-1.0.0, I found 3 installed `pip`:
```bash
~/.julia/packages/Conda/m7vem/deps/usr/bin/pip
~/.julia/packages/Conda/hsaaN/deps/usr/bin/pip
~/.julia/packages/Conda/a196m/deps/usr/bin/pip
```
so I used the most recent one: `~/.julia/packages/Conda/hsaaN/deps/usr/bin/pip`

### Build Julia package
Now everything is ready for the installation of the module in Julia:

For Julia-0.6:
```julia-repl
ENV["PYTHON"]="~/.julia/v0.6/Conda/deps/usr/bin/python"
Pkg.build("PyCall")
```
For Julia-1.0.0:
```julia-repl
ENV["PYTHON"]="~/.julia/packages/Conda/hsaaN/deps/usr/bin/python"
```
and then in the package REPL:
```
pkg> build PyCall
```

### Use it
```julia-repl
using PyPlot, PyCall
@pyimport mpl_toolkits.basemap as basemap
```
so now you should be able to use `Basemap` almost as in Python.    
This [gist](https://gist.github.com/jpwspicer/bd738886467c56c5d029) provides several useful
examples to get inspiration from.
