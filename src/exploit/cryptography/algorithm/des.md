---
title: DES (Data Encryption Standard)
description: The DES is a symmetric-key algorithm for the encryption of digital data.
tags:
    - Cryptography
refs:
    - https://en.wikipedia.org/wiki/Data_Encryption_Standard
    - https://en.wikipedia.org/wiki/Triple_DES
date: 2023-11-05
draft: false
---

## Basic Encryption/Decription with OpenSSL

### 1. Prepare Plain Text File

At first, we create a text file which contains a simple word "hello".

```sh
echo hello > hello.txt
```

### 2. Encrypt the Plain Text File

Using `openssl`, we can encrypt the file using **DES** algorithm. We're asked the password so enter the new one.

```sh
openssl des -e -in hello.txt -out encrypted.enc
```

After encryption, we can send the encrypted file to someone else. And someone can decrypt it with the DES algorithm.

### 3. Decrypt the Encrypted File

In the decryption process, we can also use the almost same command but specify `-d (decrypt)` option instead of `-e (encrypt)`. We'll be asked the password which is set when encryption so enter the same password.

```sh
openssl des -d -in encrypted.enc -out decrypted.txt
```

After decryption, confirm that the content of the `decrypted.txt` is the same as that of the original plain `hello.txt`.

```sh
cat decrypted.txt
# hello
```

<br />

## Triple DES

**Triple DES (3DES)** applies the **DES** cipher algorithm three times to each data block.  
This encryption/description process with `openssl` is almost the same as that of **DES** so I'll write it briefly here

```sh
# Encryption
openssl des -e -in hello.txt -out encrypted.enc

# Decryption
openssl des -d -in encrypted.enc -out decrypted.txt
```