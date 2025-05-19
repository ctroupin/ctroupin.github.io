---
layout: post
date: 2019-01-28
title: From a publication to Orbi repository
alt: Conference participation map
tools: LaTeX - BibTeX - bash
img: myorbi05.png
---

It's not a surprise, but I am a big fan of the BibTeX format. It works fine for the scientific publication, but also for this blog, as the <a href="{{ site.url }}/publications">Publications</a> section and the [CV](CV/Ctroupin_CVacademic.pdf) are both created from the same BibTeX file.

[Orbi](https://orbi.uliege.be/) is the institutional repository for publications at the University of Liège. It's nice because you can store there all you publications and even conferences, then generate a report in the form of a list in pdf, html or even a widget that can be included in your web page. What's not funny maybe is when you have to update your *myOrbi*.

Something that works well is to import one (or more) references in the form a BibTeX file.

### Getting the BibTeX

#### From the journal web page

Nowadays almost of the (serious) journals allow you to export a reference in this format. Below is the example for *Earth System Science Data*:

<img src="{{ site.url }}/figures/blog/myorbi00.png" class="img-responsive" alt="BibTex export">

#### Using the DOI

Another quick solution is to use a bash script to get the BibTeX entry from the publication DOI (Digital Object Identifier), which is also straightforward to obtain.

In a terminal, just execute
```bash
curl -LH "Accept: text/bibliography; style=bibtex" http://dx.doi.org/10.5194/essd-11-129-2019
```
which returns:
```bash
@article{Troupin_2019, title={The AlborEX dataset: sampling of sub-mesoscale features in the Alboran Sea}, volume={11}, ISSN={1866-3516}, url={http://dx.doi.org/10.5194/essd-11-129-2019}, DOI={10.5194/essd-11-129-2019}, number={1}, journal={Earth System Science Data}, publisher={Copernicus GmbH}, author={Troupin, Charles and Pascual, Ananda and Ruiz, Simon and Olita, Antonio and Casas, Benjamin and Margirier, Félix and Poulain, Pierre-Marie and Notarstefano, Giulio and Torner, Marc and Fernández, Juan Gabriel and et al.}, year={2019}, month={Jan}, pages={129–145}}
```
Ideally you would prefer to write it to a file, like this:
```bash
curl -LH "Accept: text/bibliography; style=bibtex" http://dx.doi.org/10.5194/essd-11-129-2019 >> reference.bib
```
and finally, as you don't want to remember that command, you create a script `doi2bib` that you can call easily:
```bash
doi2bib 10.5194/essd-11-129-2019 reference.bib
```
where the DOI and the file to which it will be written have to be adapted.

*Issue:* with this technique the list of authors is not complete. It can probably be fixed using other options with `curl`.

#### Other technique

Also, my colleague just showed me that with [googleScholar](https://scholar.google.be/), it's pretty easy as well (but maybe you don't want to use google tools). You just have to click on the double-quote below the reference, then select the format to export.

<img src="{{ site.url }}/figures/blog/myorbi04.png" class="img-responsive" alt="BibTex export">


### Importing into Orbi

1. From the homepage, click on "Import external references":
<img src="{{ site.url }}/figures/blog/myorbi01.png" class="img-responsive" alt="BibTex export">

2. and then simply select the file storing the references:
<img src="{{ site.url }}/figures/blog/myorbi02.png" class="img-responsive" alt="BibTex export">
Note that other formats are also available, depending on what you prefer.

3. Last step: you have to edit the imported reference(s). Some fields are obviously not obtained from BibTeX: funding, discipline, name of the project... but at least all the *donkey work* is done.

Orbi will automatically detect if:
* the reference has already been added into the catalog;
* if you are one of the authors. To make sure that's the case, check if your name is the same in the BibTeX entry than in Orbi.
