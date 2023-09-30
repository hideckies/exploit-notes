---
title: Image Analysis for Machine Learning
description: Investigate images to get sensitive/secret data or sensitive information hidden in the images.  
tags: 
    - Computer Vision
    - Machine Learning
refs:
date: 2023-09-30
draft: false
---

In advance, load an image using **Pillow (PIL)**.

```py
import numpy as np
from PIL import Image

img = Image.open("example.png")
```

## Basic Information

```py
# Filename
img.filename

# Image information
img.info

# Image format (PNG, JPG, etc.)
img.format

# Color mode (RPG, CMYK, etc.)
img.mode

# Image size
img.size

# Bytes
img.tobytes()

# Pixels
np.array(img.getdata())
```

### Plot Images

```py
import matplotlib.pyplot as plt

plt.imshow(img)
plt.axis('off') # Turn off axis and labels
plt.show()
```

## Hidden Information

Find hidden data in the image by slightly changing.

### Resize Image & Get Bytes

```py
img1 = img.resize((128, 128))
print(img1.tobytes())
```

### XOR Image Bytes

```py
# Convert image to bytes
bytes = img.tobytes()

key = 2 # specify the XOR key

xored = []
for byte in bytes:
	xored.append(byte ^ key)
xored_np = np.array(xored)
print(xored_np)
```

