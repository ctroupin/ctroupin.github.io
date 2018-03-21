---
layout: post
title: Installing mayavi python module
---

This post started as a personal log to help me remember how to perform the installation, until
I thought it could help other people.

## Before to start

Working with a virtual environment is always a good idea. The virtual environment wrapper is particularly helpful.

```python
mkvirtualenv mayavi-plots
```

## Install prerequisites

Download sip:     
https://riverbankcomputing.com/software/sip/download

Download PyQt:     
http://pyqt.sourceforge.net/Docs/PyQt4/installation.html#downloading-pyqt4

Go into the directory where you have downloaded the `sip` and `PyQt`:
```bash
tar xvf sip-4.19.8.tar.gz
cd sip-4.19.8
python configure.py
make
sudo make install
```
(note that the python that runs `configure.py` is that of the virtual environment).

Process in a similar way for PyQt:
```bash
tar xvf PyQt4_gpl_x11-4.12.1.tar.gz
cd PyQt4_gpl_x11-4.12.1
python configure-ng.py
make
make install
```
Both packages will be installed in the `mayavi-plots` virtalenv.

## Install the module

With the version installed with `pip`,
```bash
pip install mayavi
```
I got the issue related to [undefined 'magnification' attribute of a 'WindowToImageFilter'](https://github.com/enthought/mayavi/issues/615), so I installed using `setup.py`:

```bash
pip_uninstall mayavi
git clone git@github.com:enthought/mayavi.git
python setup.py install
```

## Issues

Jupyter notebook 5.0 has an iopub.data_rate set to 10^7     
**Solution:** in bash, run
```bash
jupyter-notebook --NotebookApp.iopub_data_rate_limit=1.0e10
```
