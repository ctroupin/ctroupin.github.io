---
layout: biblio
title: "Photography"
---

I have not always been thrilled by photography, I remember at school back in 2000 everybody was crazy about taking 100 times the same pictures of the same people. So for me things dates back to 2006 when I bought a small compact camera when I was in Gran Canaria during an ERASMUS exchange. In 2008 I got my first reflex and now I enjoy taking pictures of landscapes, conferences and sport events (when I'm not participating to them).

<img src="{{ site.url }}/figures/photography/Australia_1834.png" alt="Magnetic Island (Australia)" class="img-centered">

A good picture is about being at the right place and at the right time, not spending minutes (or hours) with the editing software or using the *instagram* filters.

<img src="{{ site.url }}/figures/photography/Valleseco_sunrise.jpg" alt="Early morning in Valleseco" class="img-centered">

My Instagram account was recently turned off, first because I was tired of these posts with hundreds of hashtags, then because it belongs to facebook, who is not my friend...

Anyway, if you want to see more, check my galleries in these social media.

<center>
<ul class="list-inline">
    {% for network in site.socialpic %}
    <li>
        <a href="{{ network.url }}" class="btn-social btn-outline"><i class="fab fa-{{ network.title }} fa-2x"></i></a>
    </li>
    {% endfor %}
</ul>
</center>
