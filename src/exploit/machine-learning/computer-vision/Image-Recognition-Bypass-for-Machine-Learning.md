---
title: Image Recognition Bypass for Machine Learning
description: We can trick image recognizer or classifier by adding filters or obfuscating an image.
tags: 
    - Computer Vision
    - Machine Learning
refs:
date: 2023-08-18
draft: false
---

The following techniques include those that are ineffective currently or in the future..

## Blurring

```python
from PIL import Image
from PIL import ImageFilter

img = Image.open("example.png")

# Box blur
img1 = img.filter(ImageFilter.BoxBlur(5))
# Gaussian blur
img2 = img.filter(ImageFilter.GaussianBlur(5))
# Median filter
img3 = img.filter(ImageFilter.MedianFilter(size=5))
# Rank filter
img4 = img.filter(ImageFilter.RankFilter(size=13, rank=5))
```

<br />

## Cropping/Rotating

```python
from PIL import Image
from PIL import ImageFilter

img = Image.open("example.png")
img = img.resize((512, 512))

img1 = img.crop((0, 0, 300, 280)).rotate(-60)
```
