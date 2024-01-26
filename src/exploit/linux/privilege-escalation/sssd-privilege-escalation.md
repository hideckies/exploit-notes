---
title: SSSD Privilege Escalation
description: SSSD (System Security Services Daemon) provides a set of daemons to manage access to remote directory services and authentication mechanisms.
tags:
    - Linux
    - Privilege Escalation
refs:
date: 2023-04-16
draft: false
---

## Find Credentials

```bash
ls -la /var/lib/sss/

# Find credentials
# If we find the hash, crack it using John or Hashcat.
strings /var/lib/sss/db/example.ldb
```
