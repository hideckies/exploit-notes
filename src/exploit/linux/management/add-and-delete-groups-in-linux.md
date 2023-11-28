---
title: Add & Delete Groups in Linux
description: We can easily add/delete groups in Linux using `groupadd`, `groupdel` commands.
tags:
    - Linux
refs:
date: 2023-10-30
draft: false
---

## Add/Delete Groups

```sh
# Add a group
groupadd <group>

# Delete a group
groupdel <group>
```

<br />

## Add User to Group

```sh
# -a: Append the user to the specific group
# -G: Group
usermod -a -G <group> <user>

# Change user's primary group
# -g: GID
usermod -g <group> <user>
```

### Sudo Group

Ussers who belong to `sudo` group can execute commands with `sudo`.
To add a user to the `sudo` group, run the following command.

```sh
usermod -a -G sudo <user>
```

After that, we can check the result.

```sh
# Switch to target user
su <user>
# List the user's privileges.
sudo -l
```

<br />

## List Groups

We can see groups exist in Linux using the following commands.

```sh
cat /etc/group

groups
# List groups where the specific user in
groups <user>
```

