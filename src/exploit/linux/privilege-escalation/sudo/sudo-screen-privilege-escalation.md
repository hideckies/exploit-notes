---
title: Sudo Screen Privilege Escalation
description: Sudo screen command might be vulnerable to privilege escalation (PrivEsc).
tags:
    - Privilege Escalation
refs:
date: 2023-02-05
draft: false
---

## Investigation

```sh
sudo -l

(root) /usr/bin/screen -r testsession
```

If we can execute **"screen"** command as root, we can spawn a root shell from the screen session.

<br />

## Exploitation

First execute **"screen"** command as root, then a screen session will be start.  
Now we can spawn a root shell by pressing **“Ctrl+a+c”** in the screen session.
