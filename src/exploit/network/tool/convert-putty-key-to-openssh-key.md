---
title: Convert PuTTY Key to OpenSSH Key
description:
tags:
    - Network
refs:
date: 2023-09-01
draft: false
---

## Install PuTTYgen

If you don’t have **`putty-tools`** on **Linux**, install it at first.

```bash
# Install in Linux
sudo apt install putty-tools
```

If you use **`puttygen`** on **Windows**, install the **PuTTYgen** in the official page.

<br />

## Generate Key Pair

```bash
# -t: key type
# -b: number of bits
# -C: key comment
# -o: output file
puttygen -t rsa -b 2084  -C "user@example.com" -o keyfile.ppk
```

<br />

### PuTTY to SSH Key

If you use **`puttygen`** on **Linux**, run the following command to convert PuTTY key to **OpenSSH** keys (private/public).

```bash
# SSH private key
puttygen keyfile.ppk -O private-openssh -o id_rsa

# SSH public key
puttygen keyfile.ppk -O public-openssh -o id_rsa.pub
```

If you use **`puttygen`** on **Windows**, follow these steps:

1. Open **PuTTYgen**.
2. Click on **Conversions → Import key** at the top menu. Then upload the PuTTY key file (**`.ppk`**).
3. After uploading, click on **Conversions → Export OpenSSH key**.
4. The **OpenSSH** private key will be downloaded.