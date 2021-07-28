---
layout: post
title: Mounting SD or SDHC cards
date: 2021-03-04
img: mount.png
alt: Card mounting
tools: Bash
---

The other day I could not mount the camera card, so could not see the pictures
on the computer. After a unusually long search, I found those instructions, which
solved the problem.

```bash
sudo mknod mmcblk0 b 179 0
sudo mknod mmcblk0p1 b 179 1
sudo mount /dev/mmcblk0p1 /mnt/flash
cd /mnt/
```
### Explanations

Not clear yet why it works, and no time to dig. Let's just say this:     
`mknod`: this command creates a filesystem node

#### How do we find the card reader?

With the `dmesg` (diagnostic message) command. According to the doc: "the default action is to display all messages from the kernel ring buffer". `dmesg` is
typically used after a device is plugged in, to check the operation went fine.

#### What is the meaning of the arguments?

1. The letter that comes after the node means:
* `c` is for character device.
* `b` for block devices
* `p` for fifo (pipe).

2. The second parameter is the _major number_, it identifies the driver for the kernel to use. The major numbers can be found in [this document](https://git.kernel.org/pub/scm/linux/kernel/git/torvalds/linux.git/tree/Documentation/admin-guide/devices.txt).       
For the `179 block`, we have this information:
```bash
179 block       MMC block devices
		  0 = /dev/mmcblk0      First SD/MMC card
		  1 = /dev/mmcblk0p1    First partition on first MMC card
		  8 = /dev/mmcblk1      Second SD/MMC card
		    ...

		The start of next SD/MMC card can be configured with
		CONFIG_MMC_BLOCK_MINORS, or overridden at boot/modprobe
		time using the mmcblk.perdev_minors option. That would
		bump the offset between each card to be the configured
		value instead of the default 8.
```
__MMC__ stands for MultiMediaCard.

3. The third parameter is the _minor number_, it is passed to the driver for its internal usage.
