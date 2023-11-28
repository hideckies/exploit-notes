---
title: Add & Delete Users in Linux
description: We can easily add/delete users in Linux using `useradd`, `userdel` commands.
tags:
    - Linux
refs:
date: 2023-10-30
draft: false
---

## Add Users

We can use `useradd` or `adduser` command to add users in Linux.

```sh
useradd <user>
adduser <user>

# -p: Specify password
useradd <user> -p <password>

# -u: Specify UID
# -g: Specify GID
useradd -u 1000 -g 1000 <user>
```

### Set Password for User

```sh
# Set passwords. It's stored in "/etc/shadow"
passwd <user>
```

<br />

## Delete Users

We can use `userdel` or `deluser` command to delete users in Linux.

```sh
userdel <user>
deluser <user>

# -r: Remove home directory and mail spool
userdel -r <user>
```

<br />

## List Users in Linux

To list users exist in Linux, run the following commands.

```sh
cat /etc/passwd
cat /etc/shadow
```
    
### Allow Users to Run Commands as Root Privilege
    
Add users to the “sudo” group.

```sh
usermod -a -G sudo <user>

# Check the permissions
su <user>
sudo -l
```
