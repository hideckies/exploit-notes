---
title: ROT13, ROT47
description: ROT13 (rotate by 13 places), ROT47 (rotate by 47 places) are simple letter substitution ciphers.
tags:
    - Cryptography
refs:
date: 2022-12-22
draft: false
---

## Decode

**[CyberChef](https://gchq.github.io/CyberChef/)** is useful online tools to decode ROT13, ROT47.

<br />

## Encode

### ROT13

```sh
echo hello | tr 'A-Za-z' 'N-ZA-Mn-za-m'
```