---
title: Zip & Unzip
description: Zip is a command-line tool used for creating and manipulating compressed archive files in Unix, Linux, and other Unix-like operating systems.
tags: 
    - Archive
refs:
date: 2023-09-13
draft: false
---

## Compress

```sh
zip <output> <target1> <target2> ...

zip example.zip example1.txt example2.txt
# -r: recursive (zip folder)
zip -r example.zip ./example
```

### Symbolic Links

We can store symbolic links in a zip file.

```php
ln -s /etc/passwd test.txt
zip --symlink test.zip test.txt
```

<br />

## Decompress

```sh
unzip example.zip
# Specify the directory to decompress
unzip example.zip -d ./example
```

### List Files without Decompressings

To list files in a zip file without extracting, use **`-l`** flag.

```bash
unzip -l example.zip
```

<br />

## Unzip with Python

Also we can decompress an archived file using Python script.

```py
import zipfile

filename = "./sample.zip"
extdir = "./"
password = "password123"

with zipfile.ZipFile(filename, 'r') as zp:
    try:
        zp.extractall(path=extdir, pwd=password.encode('utf-8'))
    except RuntimeError as e:
        print(e)
```
