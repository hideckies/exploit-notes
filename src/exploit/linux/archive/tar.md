---
title: Tar
description: Tar command is a utility that is used to create, manipulate, and extract archived files. "tar" stands for "tape archive".
tags: 
    - Archive
refs:
date: 2023-03-28
draft: false
---

## Archive Files

```sh
# -c: Create a new archive
# -f: Use archive file
tar -cf archive.tar example.txt
tar -cf archive.tar example1.txt example2.txt
# -z: filter the archive through gzip
tar -zcf example.tar.gz example/
```

<br />

## Extract Files

```sh
# -x: Extract files from an archive
# -f: Use archive file
tar -xf archive.tar
tar -xf archive.tar.gz
# output given directory
tar -xf archive.tar --directory archived
```

<br />

## Display Contents without Extracting

```sh
tar -tf archive.tar
```