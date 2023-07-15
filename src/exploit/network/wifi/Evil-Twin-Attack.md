---
title: Evil Twin Attack
description: Attackers can impersonate the legitimate WiFi and abuse victims packets.
tags:
    - Network
    - WiFi
refs:
date: 2023-07-15
draft: false
---

## Exploitation

### 1. Build a Fake WiFi Hotspot

First off, attackers need to connect public WiFi e.g. Free WiFi on cafes. Then set up the mobile hot spot on their PC. On Windows, attackers can easily setup the Mobil Hot Spot.  See [the official docs](https://support.microsoft.com/en-us/windows/use-your-windows-pc-as-a-mobile-hotspot-c89b0fad-72d5-41e8-f7ea-406ad9036b85#WindowsVersion=Windows_11) for details.

To impersonate as public Free WiFi, attackers need to set **the same SSID and password as the legitimate WiFi**. Otherwise, set the similar SSID or easy to connect name (e.g. **"Free WiFI"**) and password (e.g. **"password"**).  
Additionally, physical proximity to the victim is critical to making the attacker's access points appear preferred over public WiFi.

### 2. Create a Fake Captive Portal

When users connect to public WiFi, users need to submit password on the login page. Attackers have to create a fake login page to impersonate the legitimate portal.

### 3. Capture Victim Data

When users connect to the fake WiFi and log in on the fake captive portal, attackers can capture the victim's traffic with capturing tools such as Wireshark. 

For example, enter the following text in the filter field in Wireshark. Assume the victim ip address is `192.168.123.456` . Attackers can easily see the victim ip address in the Mobile Hot Spot settings page on Windows.

```bash
# Filter the target ip and HTTP traffic
ip.addr == 192.168.123.456 && http
```
