---
title: PGP (Pretty Good Privacy)
description: PGP is an encryption program that provides cryptographic privacy and authentication for data communication.
tags:
    - Cryptography
refs:
date: 2022-12-20
draft: false
---

## Decrypt

First off, you need to format the private key to make the John to recognize it.

```sh
gpg2john private.key > hash.txt
```

Crack the passphrase using John the Ripper.

```sh
john --wordlist=wordlist.txt hash.txt
```

<br />

## Decode Public Key

There are some online tools.

- **[PGPDump](https://8gwifi.org/pgpdump.jsp)**