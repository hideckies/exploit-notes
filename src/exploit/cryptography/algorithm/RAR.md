---
title: RAR (Roshal Archive)
description: RAR is a proprietary archive file format that supports data compression, error correction and file spanning.
tags:
    - Cryptography
refs:
date: 2022-12-22
draft: false
---

## Decrypt

First of all, you need to format the RAR file to make the John to recognize it.

```sh
rar2john example.rar > hash.txt
```

Crack the password using the formatted text.

```sh
john --wordlist=wordlist.txt hash.txt
```