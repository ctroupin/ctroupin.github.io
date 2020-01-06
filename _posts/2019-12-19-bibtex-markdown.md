---
layout: post
title: Converting BibTeX to Markdown
date: 2019-12-19
img: pandoc_bibtex.png
alt: Bibtex to Markdown
tools: Pandoc, BibTeX
topic: Writing, bibliography
---

In a [previous post](./2019-11-13-python-course.md) I already talked about a format I use a lot: [BibTeX](http://www.bibtex.org/). I like it because you can easily convert it to other formats. In  addition, you almost never really have to encode the BibTeX entries yourself: they are
* either directly downloadable from the journal webpage ("Export citation")
* or you can get it them from the publication Digital Object Identifier (DOI). Have a look at my script [`doi2bib`](https://github.com/ctroupin/ctroupin.github.io/blob/source/notebooks/bash/doi2bib) to see how easy it is.

Here is an example of such a BibTeX file:
```
@Article{TROUPIN2019,
  Title                    = {{The AlborEX dataset: sampling of sub-mesoscale features in the Alboran Sea}},
  Author                   = {Charles Troupin and Pascual, Ananda and Ruiz, Simon and Olita, Antonio and Casas, Benjamin and Margirier, Félix and Poulain, Pierre-Marie and Notarstefano, Giulio and Torner, Marc and Fernández, Juan Gabriel and Rújula, Miquel Àngel and Muñoz, Cristian and Alou, Eva and Ruiz, Inmaculada and Tovar-Sánchez, Antonio and Allen, John T. and Mahadevan, Amala and Tintoré, Joaquín},
  Journal                  = {Earth System Science Data},
  Year                     = {2019},
  Month                    = {Jan},
  Number                   = {1},
  Pages                    = {129–145},
  Volume                   = {11},
  Doi                      = {10.5194/essd-11-129-2019},
}
```

### Conversion tool
`pandoc` is a powerful tool that makes it possible to perform different format conversions, for instance from LaTeX to HTML, to pdf or to Word. Here are a few basic examples of calls:
```bash
pandoc input.tex -o output.pdf
pandoc input.md -o output2.pdf
pandoc input.md -o output3.docx
```
I must say I'm not a big fan of all those formats, but still, having a tool to convert from one to another is great.

Here we want to generate a Markdown from a list of references stored in a BibTeX file. In order to do so, we have to install [`pandoc-citeproc`](https://github.com/jgm/pandoc-citeproc), as documented [here](https://pandoc.org/demo/example19/Extension-citations.html).

### Procedure

1. Create a file that will *call* the bibliography, we will call it `nao_ref.md`.
```
---
bibliography: nao.bib
nocite: '@*'
...
```
Basically it says that it has to read the references from `nao.bib` and cite all of them.
2. Run the following command:
```
pandoc -t markdown_strict --filter=pandoc-citeproc nao_ref.md -o nao.md
```
Here it is: `nao.md` can now be used, for example in a presentation (well, maybe not a good idea to list references in a presentation), or in a web page. We just paste one reference of the list.
```
Narayan, N., A. Paul, S. Mulitza, and M. Schulz. 2010. “Trends in
Coastal Upwelling Intensity During the Late 20th Century.” *Ocean
Science* 6 (3): 815–23. <https://doi.org/10.5194/os-6-815-2010>
```

### Customizing

The result is a little blunt, let's see what we can do to improve it.

#### Add content
We can easily edit `nao_ref.md`, for instance:
```
---
bibliography: nao.bib
nocite: '@*'
...
### North Atlantic Oscillation
Here is a list of relevant publications related to the NAO.
```
After running again the `pandoc` command, the last 2 lines we've added at the end of the file will be present in the MarkDown file.

#### Changing style
Each journal has its style concerning the bibliography (the famous `bst` files, if you're using LaTeX). Here the equivalent is the so-called [Citation Style Language](https://citationstyles.org/) (.csl) files. You can browse a massive list of styles and chose the one that fits.     
Here we decided to go with `ocean-science.csl`. We add the option to the pandoc command:
```
pandoc -t markdown_strict --filter=pandoc-citeproc --csl ocean-science.csl nao_ref.md -o nao.md
```
and the resulting reference is now:
```
Narayan, N., Paul, A., Mulitza, S. and Schulz, M.: Trends in coastal
upwelling intensity during the late 20th century, Ocean Science, 6(3),
815–823,
doi:[10.5194/os-6-815-2010](https://doi.org/10.5194/os-6-815-2010),
2010.
```

#### Full control!
If you ever want to generate your own style, this [documentation](http://docs.citationstyles.org/en/1.0.1/primer.html) explains how to do it.
Nevertheless, with the available styles, it might not be necessary.
