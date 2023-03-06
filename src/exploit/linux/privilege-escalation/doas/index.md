---
title: Doas Privilege Escalation
description: doas executes arbitrary commands as another user. It's similar to sudo command. doas.conf is interesting to privilege escalation.  
tags:
    - Linux
    - Privilege Escalation
refs:
date: 2023-03-07
draft: false
---

## Investigation

First of all, search location of doas.conf.

```sh
find / -type f -name "doas.conf" 2>/dev/null
```

Next check the configuration.

```sh
doas -C /path/to/doas.conf
doas -C /etc/doas.conf
# or
cat /etc/doas.conf
```

Execute doas as below.

```sh
doas -u root <command> <arg>
```

Please also refer to [GTFOBins](https://gtfobins.github.io/) to PrivEsc.