---
title: File Transfer in Linux
description: 
tags:
    - Linux
refs:
date: 2023-11-03
draft: false
---

## Using Wget

In machine A, Start a web server.

```sh
python -m http.server

# We can specify which directory to host by `--directory` option.
python -m http.server --directory /usr/bin
```

In machine B, download a file from the web server of machine A.

```sh
wget http://<ip-for-machine-A>:8000/example.txt

# Download recursively
# -r: recursive
# -np: no parent
# Don't forget "/" after the directory name
wget -r -np http://<ip-for-machine-A>/somedir/
```

<br />

## Using Netcat

### Transfer a File

In machine A, start a listener for receiving a file.

```sh
# -l: Listen mode
# -p: Port
nc -lp 4444 > example.txt
```

In machine B, send a file to machine A.

```sh
nc <local-ip> 4444 < example.txt
```

### Transfer a Directory
    
In machine A, start a listener for receiving a directory.

```sh
nc -lvnp 4444 > out.tar
```

In machine B, compress a directory using `tar` and transfer it.

```sh
tar -cf - example/ | nc <local-ip> 4444
```

In machine A, decompress the tar file and get the directory.

```sh
tar -xf out.tar
```

<br />

## Using Base64

In machine A, encode a file with `base64` and copy the encoded Base64 string.

```sh
# -w 0: disabe line wrapping
base64 exploit.sh -w 0
```

In machine B, paste the encoded Base64 string.

```sh
echo '123...def==' | base64 -d > exploit.sh
```