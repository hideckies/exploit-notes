---
title: File & Directory Ownership in Linux
description: We can easily change ownership of file/directory using `chown` command.
tags:
    - Linux
refs:
date: 2023-10-30
draft: false
---

## Change Ownership to Specific User

```sh
chown <user> <file>
chown <user> <dir>
# -R: Recursive
chown -R <user> <dir>
```

### Examples

```sh
chown tester example.txt
chown tester ./example
chown -R tester ./example
```

<br />

## Change Ownership to Specific Group

```sh
chown :<group> <file>
chown :<group> <dir>
# -R: Recursive
chown -R :<group> <dir>
```

### Examples

```sh
chown :testers example.txt
chown :testers ./example
chown -R :testers ./example
```

<br />

## Change Ownership to Specific User&Group

We can give ownership of file/directory to specific both use and group at the same time.

```sh
chown <user>:<group> <file>
chown <user>:<group> <dir>
# -R: Recursive
chown -R <user>:<group> <dir>
```

### Examples

```sh
chown tester:testers example.txt
chown tester:testers ./example
chown -R tester:testers ./example
```