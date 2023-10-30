---
title: File & Directory Permission in Linux
description: We can change permissions of file/directory using `chmod` command.
tags:
    - Linux
refs:
date: 2023-10-30
draft: false
---

## Basic

|Permission|Number|Character|
|---|---:|---:|
|Read|`4`|`r`|
|Write|`2`|`w`|
|Execute|`1`|`x`|

We can use these value combination for changing permission.  
For example, 

|Permission|Number|Character|
|---|---|---|
|Read + Write + Execute|`4+2+1=7`|`rwx`|
|Read + Write|`4+2=6`|`rw`|
|Read|`4`|`r`|

<br />

## Cheat Sheet
    
### Read/Write/Execute

|Target|Command|
|---|---|
|User|`chmod 700 sample.txt`|
||`chmod u+rwx sample.txt`|
|Group|`chmod 070 sample.txt`|
||`chmod g+rwx sample.txt`|
|Others|`chmod 007 sample.txt`|
||`chmod o+rwx sample.txt`|
|All|`chmod 777 sample.txt`|
||`chmod a+rwx sample.txt`|


### Read/Write

|Target|Command|
|---|---|
|User|`chmod 600 sample.txt`|
||`chmod u+rw sample.txt`|
|Group|`chmod 060 sample.txt`|
||`chmod g+rw sample.txt`|
|Others|`chmod 006 sample.txt`|
||`chmod o+rw sample.txt`|
|All|`chmod 666 sample.txt`|
||`chmod a+rw sample.txt`|


### Read/Execute

|Target|Command|
|---|---|
|User|`chmod 500 sample.txt`|
||`chmod u+rx sample.txt`|
|Group|`chmod 050 sample.txt`|
||`chmod g+rx sample.txt`|
|Others|`chmod 005 sample.txt`|
||`chmod o+rx sample.txt`|
|All|`chmod 555 sample.txt`|
||`chmod a+rx sample.txt`|

### Write/Execute

|Target|Command|
|---|---|
|User|`chmod 300 sample.txt`|
||`chmod u+wx sample.txt`|
|Group|`chmod 030 sample.txt`|
||`chmod g+wx sample.txt`|
|Others|`chmod 003 sample.txt`|
||`chmod o+wx sample.txt`|
|All|`chmod 333 sample.txt`|
||`chmod a+wx sample.txt`|

<br />

## Set SUID/GUID

By adding **SUID** or **GUID**, we can execute the file as the file owner/group.  
This may cause **local privilege escalation**.
    
```bash
# SUID for user owner
chmod u+s /opt/example.sh

# GUID for group owner
chmod g+s /opt/example.sh
```