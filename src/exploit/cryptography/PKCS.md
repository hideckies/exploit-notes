---
title: PKCS (Public-Key Cryptography Standards)
description: PKCS are a group of public-key cryptography standards.
tags:
    - Cryptography
refs:
date: 2022-12-01
draft: false
---

## Decrypt

### PKCS#12

First of all, you need to format the PKCS file to make the John to recognize it.

```sh
pfx2john example.pfx > hash.txt
```

Crack the password using the formatted text.

```sh
john --wordlist=wordlist.txt hash.txt
```
