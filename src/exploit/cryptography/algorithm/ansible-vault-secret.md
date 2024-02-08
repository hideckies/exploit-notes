---
title: Ansible Vault Secret
description: Ansible Vault can encrypt a file which includes sensitive data. However, we may be able to decrypt the file with password or by cracking hash to retrieve password.
tags:
    - Cryptography
refs:
    - https://docs.ansible.com/ansible/2.9/user_guide/vault.html#
date: 2023-08-26
draft: false
---

## Decryption

First check the file encrypted with Ansible Vault.

```bash
cat example.yml

# -- output --
$ANSIBLE_VAULT;1.1;AES256
62313365396662343061393464336163383764373764613633653634306231386433626436623361
6134333665353966363534333632666535333761666131620a663537646436643839616531643561
63396265333966386166373632626539326166353965363262633030333630313338646335303630
3438626666666137650a353638643435666633633964366338633066623234616432373231333331
6564
```

We can use **`ansible2john`** to generate the hash to make it crackable.

```bash
ansible2john example.yml > hash.txt
```

Then crack this hash using **John The Ripper** or **Hashcat**.

```bash
john --wordlist=wordlist.txt hash.txt
# or
hashcat -a 0 -m 16900 hash.txt wordlist.txt
```

After cracking and retrieving the passwrod, we can use it to decrypt the file as below.

```bash
ansible-vault decrypt example.yml --output decrypted.txt
```