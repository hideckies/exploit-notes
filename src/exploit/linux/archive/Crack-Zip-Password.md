---
title: Crack Zip Password
description: When unzipping archived files, we're sometimes asked the passphrase. We may be able to crack the password with various ways.
tags: 
    - Archive
refs:
date: 2023-07-14
draft: false
---

## John The Ripper

Format the archived file to make the John to recognize it, then crack the hash using John.

```sh
zip2john example.zip > hash.txt
john --wordlist=wordlist.txt hash.txt
```

<br />

## Fcrackzip

```sh
# -u: unzip
# -D: dictionary
# -p: strgin as initial password/file
fcrackzip -u -D -p passwords.txt sample.zip
```

<br />

## Bkcrack

[bkcrack](https://github.com/kimci86/bkcrack) is useful for cracking legacy zip encryption with a known plaintext attack.

### Download the Tool

```bash
wget https://github.com/kimci86/bkcrack/releases/download/v1.5.0/bkcrack-1.5.0-Linux.tar.gz
tar -xf bkcrack-1.5.0-Linux.tar.gz
cd bkcrack-1.5.0-Linux.tar.gz
```

### Recover Internal Keys

First we check what files in the target zip file.

```bash
# List entries
./bkcrack -L encrypted.zip
```

Assume the **`encrypted.zip`** contains the **`secret.key`** file and we know that it contains the "secret is" string.  
Then we need to create a plain file with the same string "secret is".

```bash
echo -n "secret is" > plainfile
```

Now crack the keys using these files.

```bash
./bkcrack -C encrypted.zip -c secret.key -p plainfile
```

For example, we get the result **`8257499e 175bb63c fcbd5ff2`**.  
We can recover the password by running the following command.

```bash
./bkcrack -C encrypted.zip -c secret.key -p plainfile -k 8257499e 175bb63c fcbd5ff2 -d result.txt
```

After that, **`result.txt`** is generated so we can see the content of the file.
