---
title: ARP (Address Resolution Protocol) Spoofing
description: ARP is used to find another computer’s MAC address based on its IP address.
tags:
    - Network
refs:
date: 2022-11-22
draft: false
---

## Basic Flow

1. **Check Interface and Gateway IP Address**

    ```sh
    # Interfaces
    ip addr

    # Default gateway
    ip route list
    ```

2. **Scan the Network to Find Target IP**

    ```sh
    nmap -sP <gateway-ip>/24
    nmap -sP <gateway-ip>/16
    ```

3. **Enable IP Forwarding**

    ```sh
    # Allow all forwading in the LAN
    # -A: append rules
    # -i: interface
    # -j: jump
    iptables -A FORWARD -i eth0 -j ACCEPT
    ```

<br />

## Find MAC Address

```sh
cat /sys/class/net/eth0/address
cat /sys/class/net/enp0s3/address
cat /sys/class/net/tun0/address
```