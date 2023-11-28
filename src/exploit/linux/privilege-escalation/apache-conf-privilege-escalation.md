---
title: Apache Conf Privilege Escalation
description: 
tags:
  - Privilege Escalation
  - Web
refs:
date: 2023-03-07
draft: false
---

## Investigation

```bash
ls -al /etc/apache2

-rwxrwxrwx  1 root root  7094 NOV 7  2023 apache2.conf
```

If we can modify the apache configuration file, we can update the web owner (www-data) to arbitrary user.

<br />

## Exploitation

### 1. Update Apache.Conf

First modify “apache.conf” file to change the web user with new one.

```bash
# These need to be set in /etc/apache2/envvars
User www-data
Group www-data
```

### 2. Insert Reverse Shell Script

In the web directory (e.g. `/var/www/html`), create the script to reverse shell.  
Assume the website uses PHP, so we can create “shell.php” in the web root and insert [PHP reverse shell](https://github.com/pentestmonkey/php-reverse-shell/blob/master/php-reverse-shell.php) script.

### 3. Restart Apache Server

### 4. Get a Shell

We need to start a listener in local terminal.

```bash
nc -lvnp 1234
```

Then access to the web page e.g. `https://example.com/shell.php`.

We should get a shell as the desired user.