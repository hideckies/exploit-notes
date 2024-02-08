---
title: ECDSA (Elliptic Curve Digital Signature Algorithm)
description: ECDSA offers a variant of the DSA which uses elliptic curve cryptography.
tags:
    - Cryptography
refs:
date: 2023-09-09
draft: false
---

## ECDSA in Python

[python-ecdsa](https://github.com/tlsfuzzer/python-ecdsa) can be used for ECDSA.

```bash
pip install ecdsa
```

### Verifying

```python
from ecdsa import SigningKey, NIST384p

sk = SigningKey.generate(curve=NIST384p)
vk = sk.verifying_key
signature = sk.sign(b"message")
print(vk.verify(signature, b"message"))
```

### Generating SigningKey

```python
from ecdsa import SigningKey, NIST384p

sk = SigningKey.generate(curve=NIST384p)
sk_string = sk.to_string()
print(sk_string.hex())

sk2 = SigningKey.from_string(sk_string, curve=NIST384p)
print(sk2.to_string().hex())
```
