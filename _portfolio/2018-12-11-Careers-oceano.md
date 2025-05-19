---
layout: post
date: 2018-12-11
img: AlborexMission_V19.jpg
title: Careers in Oceanography
tools: Python - LaTeX (tikz, tcolorbox) - Basemap
category: Scientific illustration
img: Career_Oceano_cropped.jpg
img2: Career_Oceano.jpg
---

A weeks ago a colleague asked me to create a type of flyer for a conference she was organising about the careers and jobs one can expect after a Master in Oceanography.

The timing was tight and I must admit that I am (again) not totally happy with the final results, but still, it got good feedback and can be a good starting point for other editions.

### Concept

We wanted to show the diversity of careers in oceanography and at the same time to underline the international mobility, with some space reserved for the description of the meeting.

### Realisation

<img src="{{ site.url }}/figures/portfolio/{{ page.img2 }}" class="img-responsive" alt="{{ page.title }}">

#### Background

It consists of a global map with markers pointing to various locations around the world (mobility). In fact the positions were not chosen randomly but they indicate research centers active in ocean sciences, even if that does not really matter. The *hexbin* is build from measurements of the [*secci depth*](https://www.ontario.ca/faq/what-secchi-depth), obtained from the World Ocean Database. This data visualisation was selected to make reference to the architecture of the building where the conference took place.

#### Illustrations

Near the markers we added pictures illustrating different jobs in oceanography: search and rescue, numerical simulations, offshore industry... there we were probably missing other aspects and it was not clear how to arrange a larger set of images. In the end, it's easy to understand why I am not a designer.

#### Title and text

A clear, sans serif font (*Aileron-Light*) was used for the text. The title box was created using the amazing [`tcolorbox`](https://ctan.org/pkg/tcolorbox?lang=en) package for LaTeX. The shape of the box was emulating that of a ship (with some imagination).      
Finally, on each side of the title we added oscillating curves that recall the waves and their interaction.

### If I had more time to re-do it?

First I would like to have a wider range of topics in the picture: industry, chemistry, biology, geology. Then arranging those pictures into a wavy pattern, below the title, could give a nice look.

### Code

The LaTeX source is available on GitHub: [Career_Oceano.tex](https://github.com/gher-ulg/Liege-Colloquium-on-Ocean-Dynamics/blob/master/latex/Career_Oceano.tex).
