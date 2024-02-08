---
title: HMAC
description: An HMAC is a specific type of message authentication code involving a cryptographic hash function and a secret cryptographic key.
tags:
    - Cryptography
refs:
date: 2023-02-10
draft: false
---

## Install HMAC Commands

If you don’t have `hmac256` command, you need to install the package.

```bash
# In debian
sudo apt install libgcrypt20-dev
```

<br />

## Decrypt

```bash
# HMAC
hmac256 <secret_key> example.txt

# HMAC-SHA256
sha256hmac example.txt --key <secret_key>

# HMAC-SHA384
sha384hmac example.txt --key <secret_key>

# HMAC-SHA512
sha512hmac example.txt --key <secret_key>
```