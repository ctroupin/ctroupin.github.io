---
layout: post
modal-id: 4
title: Flyer for the 48th Liège Colloquium
date: 2016-05-01
img: CLQ2016_poster_V14.jpg
alt: Flyer for the 48th Liège Colloquium
tools: LaTeX (tikz)
category: Conference flyer
---

The objective was to create a clean and modern flyer for the 48th Edition of the Liège Colloquium focused on the *Submesoscale Processes* (that I was co-organizing).

We really wanted to be independent from an external designer, otherwise we would have had to request them a change every time we got a new sponsor or when the conference deadlines changed.

### Concept

The left-hand side illustration is a satellite image showing *sub-mesoscale* features on the sea surface. Three circular spots are enlarged to provide a higher-resolution view of the features, with the underlying idea of highlighting the multi-scale nature of the ocean dynamics.
Finally, each of the enlarged illustrations are linked to the 12 main conference topics.

### Realization

The flyer was created with the [LaTeX](https://www.latex-project.org/) typesetting system and the following packages:
* [TikZ](https://www.ctan.org/pkg/pgf) for the lines joining the different objects and for the magnifying glass effect,
* [marvosym](https://www.ctan.org/pkg/marvosym) and [fontawesome](https://www.ctan.org/pkg/fontawesome) for the icons.

The source code (approx. 250 lines, including blank lines!) is available at [https://github.com/gher-ulg/Liege-Colloquium-on-Ocean-Dynamics](https://github.com/gher-ulg/Liege-Colloquium-on-Ocean-Dynamics)

### Afterthoughts

*Wasn't an overkill to use `LaTeX` instead of the popular design tools (from the Adobe family for example)?*

Part of the answer lies in the previous section: it is always cool to use free tools and share the code. For this type of work, `LaTeX` offers a really fine control of all the details (image and text positions, transparency) and `TikZ` has many nice features that can give an artistic touch to the final product.
