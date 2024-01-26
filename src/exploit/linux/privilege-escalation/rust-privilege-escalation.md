---
title: Rust Privilege Escalation
description: Rust is a multi-paradigm, general-purpose programming language that emphasizes performance, type safety, and concurrency. If we have a write permission of a Rust file, we may be able to inject arbitrary code to escalate privileges.
tags:
    - Linux
    - Privilege Escalation
refs:
    - https://book.hacktricks.xyz/linux-hardening/privilege-escalation
date: 2023-06-27
draft: false
---

## Reverse Shell

Reference: https://github.com/LukeDSchenk/rust-backdoors/blob/master/reverse-shell/src/main.rs

We can create a binary or module to reverse shell.

```bash
cd /path/to/rust/project/src
vim lib.rs
(In vim editor, insert a reverse shell code into a file)
cargo build
```
