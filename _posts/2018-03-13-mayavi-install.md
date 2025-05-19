---
layout: post
modal-id: 6
title: Installing mayavi python module
date: 2018-03-13
img: mayavi.jpg
alt: Installing mayavi
tools: Python
topic: Instructions
---

This post started as a personal log to help me remember how to perform the installation, until I thought it could help other people. Or help myself in a future in which I totally forget how to do it.

### Before to start

Working with a virtual environment is always a good idea. The pythono *virtual environment wrapper* is particularly helpful.

```python
mkvirtualenv mayavi-plots
```

### Install prerequisites

Download sip:     
[https://riverbankcomputing.com/software/sip/download](https://riverbankcomputing.com/software/sip/download)

Download PyQt:     
[http://pyqt.sourceforge.net/Docs/PyQt4/installation.html#downloading-pyqt4](http://pyqt.sourceforge.net/Docs/PyQt4/installation.html#downloading-pyqt4)

Go into the directory where you have downloaded the `sip` and `PyQt`:
```bash
tar xvf sip-4.19.8.tar.gz
cd sip-4.19.8
python configure.py
make
sudo make install
```
Note that the `python` that runs `configure.py` is that of the virtual environment), as we can see from the next command:

```bash
which python
/home/ctroupin/Software/PythonEnvs/mayavi/bin/python
```

Process in a similar way for `PyQt` (the compilation can take a few minutes):
```bash
tar xvf PyQt4_gpl_x11-4.12.1.tar.gz
cd PyQt4_gpl_x11-4.12.1
python configure-ng.py
make
make install
```
Both packages will be installed in the `mayavi-plots` virtalenv.

### Install the module

With the version installed with `pip`,
```bash
pip install mayavi
```
I got the issue related to [undefined 'magnification' attribute of a 'WindowToImageFilter'](https://github.com/enthought/mayavi/issues/615), so I made the installation using `setup.py`:

```bash
pip_uninstall mayavi
git clone git@github.com:enthought/mayavi.git
python setup.py install
```

### Issues

Jupyter notebook 5.0 has an iopub.data_rate set to 10^7     
**Solution:** in bash, run
```bash
jupyter-notebook --NotebookApp.iopub_data_rate_limit=1.0e10
```
