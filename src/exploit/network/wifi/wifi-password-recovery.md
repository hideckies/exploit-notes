---
title: WiFi Password Recovery
description: If we forget WiFi password, we may be able to recover password from the history.
tags:
    - Network
refs:
date: 2023-07-15
draft: false
---

## Windows

Open Command Prompt as root privilege like Administrator.

```sh
# Show all network names you've accessed and saved
netsh wlan show profile

# Show the details of the specific network including password
netsh wlan show profile name="network-name" key=clear
```

<br />

## Linux

```sh
ls -al /etc/NetworkManager/system-connections/
cat /etc/NetworkManager/system-connections/example.nmconnection
```
