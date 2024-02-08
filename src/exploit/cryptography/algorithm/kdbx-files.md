---
title: KDBX Files
description: A KDBX file is a password database created by KeePass Password Safe.
tags:
    - Cryptography
refs:
date: 2023-09-01
draft: false
---

## Open KDBX File

If KeePass software does not exist in our system, run the following command.

```bash
sudo apt install keepassx
# or
sudo apt install keepass2
```

To open **KeePass*, run the following command.

```sh
keepassx
# or
keepass2
```

### Copy Password

Right-click on the password value then click **Copy Password**.

<br />

## Crack KDBX Password

When opening KDBX file in KeePass if you’re asked the Master Key, you need to crack the password of the KDBX file. **John The Ripper** can be used to crack the password.

```bash
keepass2john example.kdbx > hash.txt
john --wordlist=wordlist.txt hash.txt
```
