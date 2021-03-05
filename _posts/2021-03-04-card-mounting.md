---
layout: post
title: Mounting SD or SDHC cards
date: 2021-03-04
img: mount.png
alt: Card mounting
tools: Bash
---

The other day I could not mount the camera card, so could not see the pictures
on the computer. After a unusually long research, I found those instructions, which
solved the problem.

```bash
sudo mknod mmcblk0 b 179 0
sudo mknod mmcblk0p1 179 1
sudo mknod mmcblk0p1 b 179 1
sudo mount /dev/mmcblk0p1 /mnt/flash
cd /mnt/
```
### Explanations

Not clear yet why it works, and no time to dig. Let's just say this:

`mknod`: this command creates a filesystem node
