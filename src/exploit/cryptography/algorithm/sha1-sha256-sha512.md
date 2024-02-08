---
title: SHA1, SHA256, SHA512
description: SHA is a set of cryptographic hash functions.
tags:
    - Cryptography
refs:
date: 2022-12-22
draft: false
---

## Decrypt

### SHA1
    
```bash
john --format=raw-sha1 --wordlist=wordlist.txt hash.txt

hashcat -m 100 -a 0 hash.txt wordlist.txt

# using mask e.g. 5 characters
# ?a: all type of character
hashcat -m 100  -a 3 ?a?a?a?a?a
# ?d: decimal
hashcat -m 100 -a 3 ?d?d?d?d?d
# ?l: alphabet (lowercase)
hashcat -m 100 -a 3 ?l?l?l?l?l
# ?u: alphabet (uppercase)
hashcat -m 100 -a 3 ?u?u?u?u?u
```

### SHA256

```bash
john --format=raw-sha256 --wordlist=wordlist.txt hash.txt

hashcat -m 1400 -a 0 hash.txt wordlist.txt

# using mask e.g. 5 characters
hashcat -m 1400 -a 3 ?a?a?a?a?a
```

### SHA512

```bash
john --format=raw-sha512 --wordlist=wordlist.txt hash.txt

hashcat -m 1700 -a 0 hash.txt wordlist.txt
hashcat -m 1800 -a 0 hash.txt wordlist.txt

# using mask e.g. 5 characters
hashcat -m 1700 -a 3 ?a?a?a?a?a
hashcat -m 1800 -a 3 ?a?a?a?a?a
```
    
### SHA512 (salted)
    
```bash
PASS='39a57...71bed'
SALT='72b5b...02a05'
echo -n $PASS > hash_and_salt.txt
echo -n '$' >> hash_and_salt.txt
echo -n $SALT >> hash_and_salt.txt
john --format=dynamic='sha512($p.$s)' --wordlist=wordlist.txt hash_and_salt.txt
```

<br />

## Encrypt

### SHA1
    
```bash
echo -n 'hello' | sha1sum
# or
echo -n 'hello' > password.txt
sha1sum password.txt
```

### SHA256

```bash
echo -n 'hello' | sha256sum
# or
echo -n 'hello' > password.txt
sha256sum password.txt
```

### SHA512

```bash
echo -n 'hello' | sha512sum
# or
echo -n 'hello' > password.txt
sha512sum password.txt
```

<br />

## Generate Passwords for Linux System

```sh
# -6: SHA512
# --salt: 'salt'
# password: 'password'
openssl passwd -6 -salt salt password
```