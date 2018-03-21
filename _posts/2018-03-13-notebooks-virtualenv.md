---
layout: post
title: Creating notebook kernels with virtualenv
---

What to do when you want to combine jupyter notebooks and virtual environments?

## Install virtual environment wrapper

The [wrapper](https://virtualenvwrapper.readthedocs.io/en/latest/) is installed
using `pip`:
```bash
pip install virtualenvwrapper
```
The configuration is done by setting up the environment directory and
sourcing `virtualenvwrapper.sh`:
```bash
export WORKON_HOME=~/Envs
mkdir -p $WORKON_HOME
source /usr/local/bin/virtualenvwrapper.sh
```
The previous *export* and *source* commands can be added in the `.bashrc` file so that
they are executed automatically.

## Create the new virtual environment
Note that the python version used in the virtualenv is specified using the `--python` option:
```bash
mkvirtualenv --python=/usr/local/bin/python3.6 3Dplot
```

## Create the new kernel
The instructions are found in the [ipython documentation](http://ipython.readthedocs.io/en/stable/install/kernel_install.html).     
Both the environment and the display names (visible in the notebook interface) can be specified:
```bash
pip install ipykernel
python -m ipykernel install --user --name 3Dplot --display-name "3D plotting"
```

## Open jupyter-notebook and select the kernel
```bash
jupyter-notebook
```
When you create a new notebook, a dropdown allows you to select the kernel of your choice.     
From an existing notebook window, you can also modify the kernel by clicking on `Kernel / Change kernel`.
