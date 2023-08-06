---
title: Honeypots
description: A honeypot is a computer security mechanism set to detect, deflect, or in some manner, counteract attempts at unauthorized use of information systems.
tags:
    - Network
refs:
date: 2023-08-06
draft: false
---

## Detecting Honeypot

When entered target system, then if we felt something is wrong. For example,

- Cannot execute common OS commands e.g. **`ls`**, **`cat`**, etc.
- There are few files under **`/home/<user>`** unnaturally.
- There are few users or uncommon users exist in **`/etc/passwd`** unnaturally.
- Found either **`cowrie-env`**, **`cowrie.cfg`**, **`tpot.yml`**, **`dionaea.cfg`** in system.

We may be able to suspect the system is a honeypot.

<br />

## Cowrie

[Cowrie](https://github.com/cowrie/cowrie) is an SSH/Telnet honeypot.

### Directories & Files

```bash
etc/cowrie.cfg
etc/userdb.txt
var/log/cowrie/
```

Or we can find the associated files by the following command.

```bash
find / -name "*cowrie*" 2>/dev/null
```

### Reconnaissance

```bash
# OS
uname -a
cat /etc/issue

# CPU
nproc
cat /proc/cpuinfo
```

<br />

## T-Pot

[T-Pot](https://github.com/telekom-security/tpotce) is the all in one, optionally distributed, multiarch (amd64, arm64) honeypot platform.

<br />

## Dionaea

[Dionaea](https://github.com/DinoTools/dionaea)

<br />

## Mailoney

[Mailoney](https://github.com/phin3has/mailoney) is an SMTP honeypot.