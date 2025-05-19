---
layout: post
modal-id: 4
title: Using BibTeX format for bibliography management
date: 2017-10-25
img: bibtex.jpg
alt: Using BibTeX format for bibliography management
tools: LaTeX, BibTeX
topic: Scientific tools
---

A typical concern for scientists relates to the papers they publish: how to manage the different repertories, portals, databases in an efficient way? Let's try to do something.

### The problem

Usually once the paper is published, it has to be archived in:
* the institutional repository
* the scientist's résumé
* the project database
* the [ORCID](http://orcid.org/), [ResearchGate](https://www.researchgate.net), LinkedIN (+ many more) profiles
* ...

Each of them, of course, has its specific format.     
In my previous job, once a year, we (then it became "I") also had to create a list of all the publications and presentations made by the group.   

### The solution

The `BibTeX` format () is used to describe and process lists of references.    
Nowadays, many platform can directly process this format and turn it into an entry in a database. Below is an example of an entry:

```bash
@Article{TROUPIN2010JMS,
  Title = {Seasonal variability of the oceanic upper layer and its modulation of biological cycles in the Canary Island region},
  Author = {C. Troupin and P. Sangrà and J. Arístegui},
  Journal = {Journal of Marine Systems},
  Year = {2010},
  Number = {3-4},
  Pages = {172-183},
  Volume = {80},
  Doi = {10.1016/j.jmarsys.2009.10.007}
}
```
so basically you have set of key-value pairs, some of them are mandatory while other are optional.


### How to create a BiBTeX entry?

There are now several ways to do it depending on the tools at your disposal.    
Obviously, adding the information manually is the first option but probably not the quickest.

#### JabRef

[JabRef](http://www.jabref.org/) really helps when it comes to manage different bibliographies. Depending on the type of entry (e.g., article, book, conference, ...), the tool indicates the mandatory fields and offers plug-ins to make easier the conversion to other formats. But still, it does not avoid you to type or copy/paste the different fields.

<img src="{{ site.url }}/figures/blog/jabref.jpg" class="img-responsive" alt="JabRef">

#### Import from journal web

Most of the journal web pages make available the BibTeX file along with the article itself. See below the example with *Journal of Geophysical Research*.        
Just download it and copy its content in a reference list managed with JabRef and you're done.

<img src="{{ site.url }}/figures/blog/jgr_bibtex.png" class="img-responsive" alt="BibTex export in JGR">

Time estimated for an entry: 1 minute.

#### Import from journal web

Another cool solution consists in using the Digital Object Identifier (DOI) to generate the BibTex.    
If you run the following command in a terminal:
```bash
curl -LH "Accept: text/bibliography; style=bibtex" http://dx.doi.org/10.1029/2009JC005512
```
you will quickly obtained the desired entry. It is then easy to redirect it to an existing reference list or to copy/paste its content wherever needed.    
Time estimated for an entry: 30 seconds.

### What's more?

In another post I'll explain how to use `BibTeX` to create lists of publications in other formats.
