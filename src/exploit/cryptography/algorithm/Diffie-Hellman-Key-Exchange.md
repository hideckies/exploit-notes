---
title: Diffie-Hellman Key Exchange
description: Diffie-Hellman key exchange is a mathematical method for exchaning cryptographic key securely. The goal is to securely communicate with each other while preventing man-in-the-middle attack. It is also used for cryptographic algorithms such as AES, DES.
tags:
    - Cryptography
refs:
    - https://en.wikipedia.org/wiki/Diffie%E2%80%93Hellman_key_exchange
    - https://wiki.openssl.org/index.php/Diffie-Hellman_parameters
date: 2023-11-05
draft: false
---

## Overview

DH calculates shared secrets with public keys and secret keys. Below is a Python script to calculate shared secrets for A and B. These (`ss_A` and `ss_B`) should be the same value with each other.

```python
# Calculate public keys (A, B)
# p: public key (a prime number)
# g: public key (a primitive root modulo `p`)
# a, b: secret key
A = pow(g, a, p)
B = pow(g, b, p)

# Calculate shared secret
ss_A = pow(A, b, p)
ss_B = pow(B, a, p)

# Shared secrets should be the same value each other
print(ss_A == ss_B) # True
print(pow(pow(g, a, p), b, p) == pow(pow(g, b, p), a, p)) # True
```

<br />

## Key Exchange Flow using OpenSSL

Reference: [https://tryhackme.com/room/cauldron#](https://tryhackme.com/room/cauldron#)

Assume that Alice and Bob want to communicate each other secretly. In such a situation, we can use the Diffie-Hellman key exchange.

### 1. Generate DH Params for Key Agreement

First of all, we need to generate Diffi-Hellman parameters which include two prime numbers `p` and `g`. These parameters are used for calculating shared secret for Alice and Bob.  
We can use `openssl` with `dhparam` option for doing that.

```bash
# 2048: 2048-bit
openssl dhparam -out dhparams.pem 2048
```

For more robustness, we can use more longer bit length such as `4096` instead of `2048`,  but it requires more computational power and time.

### 2. Generate Private Keys

Next, generate private keys for both Alice and Bob. We can use `genpkey` option of `openssl` for doing that.

```bash
# Alice
openssl genpkey -paramfile dhparams.pem -out alice_private.pem

# Bob
openssl genpkey -paramfile dhparams.pem -out bob_private.pem
```

### 3. Generate Public Keys

Using the private keys, we also generate public keys. 

```bash
# Alice
openssl pkey -in alice_private.pem -pubout -out alice_public.pem

# Bob
openssl pkey -in bob_private.pem -pubout -out bob_public.pem
```

### 4. Generate Shared Secret

This time, Alice and Bob generate shared secrets using each other’s public key. Each shared secret will be the same (`alice_shared_secret == bob_shared_secret`).

```bash
# Alice
openssl pkeyutl -derive -inkey alice_private.pem -peerkey bob_public.pem -out alice_shared_secret.bin

# Bob
openssl pkeyutl -derive -inkey bob_private.pem -peerkey alice_public.pem -out bob_shared_secret.bin
```

By doing this, it’ll be difficult for an eavesdropper to recreate shared secrets unless he knows Alice and Bob’s private keys because.

### 5. Use Shared Secret for Secure Communication

Now Alice and Bob can use this shared secret with cryptographic algorithm such as **AES**.  
Assume Alice encrypts `hello.txt` which contains greeting message and sends the encrypted file to Bob. Then Bob decrypts the encrypted file with the same cryptographic algorithm and read the message.

```bash
# Encryption: Alice encrypts `hello.txt` with AES.
openssl enc -aes-256-cbc -pass file:alice_shared_secret.bin -in hello.txt -out encrypted.enc

# Decryption: Bob decrypts the encrypted `encrypted.enc` with the same algorithm.
openssl aes-256-cbc -d -in hello_encrypted.enc -pass file:bob_shared_secret.bin -out decrypted.txt
```

Unless the shared secret is published or stolen, their secret messages will never be seen by eavesdroppers.

<br />

## Decrypt Secret Message using Private Key and Public Key

If we have a private key and a public key with some reason, we can decrypt a secret message by recreating a shared secret using these keys.

### 1. Generate Shared Secret

Using a private key and a public key, we can generate a shared secret which is used for decrypting an encrypted message.

```bash
openssl pkeyutl -derive -inkey private.key -peerkey public.key -out shared_secret
```

### 2. Decrypt a Secret Message

Now we can decrypt a secret message using the shared secret.

```bash
openssl aes-256-cbc -d -in encrypted.enc -pass file:shared_secret -out decrypted.txt
```
