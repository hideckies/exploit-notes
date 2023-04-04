---
title: Base32, Base64
description: Base-* are numeral systems. Especially Base32 and Base64 are often used.
tags:
    - Cryptography
refs:
date: 2023-04-04
draft: false
---

## Decode

### Base16

```sh
base16 -d encoded.txt
echo -n '68656c6c6f0a' | base16 -d
```

### Base32

```sh
base32 -d encoded.txt
echo -n 'NBSWY3DP' | base32 -d
```

### Base64

```sh
base64 -d encoded.txt
echo -n 'aGVsbG8=' | base64 -d
```

- **PowerShell Encoded Command**

    If we found the PowerShell command contained `-encodedcommand` when malware analysis, we can decode it with **CyberChef**.

    1. Paste the PowerShell command.
    2. Add the **"From Base64"** operation to Recipe.
    3. Add the **"Decode Text"** operation to Recipe and choose the **"UTF-16LE"** Encoding.

<br />

## Encode

### Base16

```sh
base16 example.txt
echo -n 'hello' | base16
```

### Base32

```sh
base32 example.txt
echo -n 'hello' | base32
```

### Base64

```sh
base64 example.txt
echo -n 'hello' | base64
```

<br />

## Generate Random Passwords

### Base64

```sh
openssl rand -base64 3
```