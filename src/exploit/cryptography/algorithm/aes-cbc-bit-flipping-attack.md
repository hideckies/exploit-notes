---
title: AES-CBC Bit Flipping Attack
description: Bit Flipping Attack is an attack to change to result in a predictable change of the plaintext by making bitwise changes to ciphertext
tags:
    - Cryptography
refs:
    - https://en.wikipedia.org/wiki/Bit-flipping_attack
date: 2023-09-07
draft: false
---

## How It Works

Here is an CTF example.  
Assume that a plaintext and ciphertext pair as follow.

```sh
# plaintext
logged_username=admin&parsword=aNth3m2023&password=g0ld3n_b0y

# ciphertext generated from the plaintext
f9d300b808e4c5ab535bc2c71600b58c328d2dc808ffa98740253a9f1fd905a05ddc53999f7f515427212aad1ea8831d2833732d29529899a0ec964c2f23fb58
```

Usually, **CBC (Cipher Block Chaining)** mode encrypts a plaintext every 16 bytes after XORing with the previous ciphertext. By the way, the first block of the plaintext is XORed with **IV (initialization vector, generated random 16 bytes)**. Below depicts the process.

### Encryption Process

```sh
# Block 1
ENCRYPT(logged_username= ^ IV)
# ciphertext 1
f9d300b808e4c5ab535bc2c71600b58c

# Block 2
ENCRYPT(admin&parsword=a ^ f9d300b808e4c5ab535bc2c71600b58c)
# ciphertext 2
328d2dc808ffa98740253a9f1fd905a0

# Block 3
ENCRYPT(Nth3m2023&passwo ^ 328d2dc808ffa98740253a9f1fd905a0)
# ciphertext 3
5ddc53999f7f515427212aad1ea8831d

# Block 4
ENCRYPT(rd=g0ld3n_b0yxxx ^ 5ddc53999f7f515427212aad1ea8831d)
# ciphertext 4
2833732d29529899a0ec964c2f23fb58
```

### Decryption Process

We can reverse the above process as below. Decrypted ciphertext is XORed with the previous ciphertext every 16 bytes.

```python
# Block 1
DECRYPT(f9d300b808e4c5ab535bc2c71600b58c) ^ iv
# plaintext 1
logged_username=

# Block 2
DECRYPT(328d2dc808ffa98740253a9f1fd905a0) ^ f9d300b808e4c5ab535bc2c71600b58c
# plaintext 2
admin&parsword=a

# Block 3
DECRYPT(5ddc53999f7f515427212aad1ea8831d) ^ 328d2dc808ffa98740253a9f1fd905a
# plaintext 3
Nth3m2023&passw

# Block 4
DECRYPT(2833732d29529899a0ec964c2f23fb58) ^ 5ddc53999f7f515427212aad1ea8831d
# plaintext 4
rd=g0ld3n_b0yxxx
```

<br />

## Exploitation: Creating Fake Plaintext

In the previous CTF example, we can get the original plaintext by changing the value at the position of **'r'** in the **'parsword'** on the ciphertext to XORed value,. It does not affect other blocks. Extracting that part:

```sh
# Block 2 (change 53 -> 52 at the 9th byte)
DECRYPT(328d2dc808ffa98740253a9f1fd905a0) ^ f9d300b808e4c5ab 52 5bc2c71600b58c
# plaintext 2 (changed 'r' to 's' at the 9th byte)
admin&password=a
```

<br />

## Exploitation: Creating Fake IV

Reference: [https://cryptohack.org/courses/symmetric/flipping_cookie/](https://cryptohack.org/courses/symmetric/flipping_cookie/)

To create a **fake IV** which triggers to generate a **fake plaintext** (e.g. "admin&password=a") at the first block, we can abuse the XOR mechanism.  
Since elements can be replaced each other in XOR, we can calculate a fake IV as below.

```python
iv = ciphertext[:16]

plaintext = "admin=False&expi"
fake_plaintext = "admin=True&expir" # Add 'r' at the end to adjust 16-bytes for correct padding

DECRYPT(block1) = plaintext ^ iv
# We can replace each element: `iv = DECRYPT(block1) ^ plaintext`
fake_iv = DECRYPT(block1) ^ fake_plaintext

fake_ciphertext = fake_iv + ciphertext[16:]
```
