---
title: OpenVPN Troubleshooting
description: 
tags:
    - Network
refs:
date: 2023-05-30
draft: false
---

## Set Correct MTU (Maximum Transmission Unit)

1. **Get correct MTU**

    Start Ping at the 1500 mtu and decrease the 1500 value by 10 each time.  
    On Linux,

```sh
# -M: mtu discovery
# -s: data size
ping -M do -s 1500 -c 1 <target-ip>

# if the packet loss, 
ping -M do -s 1490 -c 1 <target-ip>

# if the packet loss yet,
ping -M do -s 1480 -c 1 <target-ip>

# if packet loss yet,
ping -M do -s 1470 -c 1 <target-ip>

# continue until packet is received...
```

2. **Get correct MSS (Maximum Segment Size)**

After you find the correct MTU, now you need to get the MSS from the MTU.  
To get the correct one, subtract 40 from the value of the MTU.

```txt
mss = mtu - 40
```

For example, if you get 1470 value of the MTU in the previous `ping` section, the MSS is 1430.

3. **Set correct MSS into the config file of OpenVPN**

Set **mssfix** in the configuration file (.ovpn) of the OpenVPN.

```txt
mssfix 1430
```

Replace the 1430 value with the value you found.


<br />

## Data Cipher Errors

If you got the error such as **"ERROR: failed to negotiate cipher with server. Add the server's cipher ('AES-256-CBC') to --data-ciphers (currently 'AES-256-GCM:AES-128-GCM:CHACHA20-POLY1305') if you want to connect to this server."** when starting **`openvpn`** with the **`.ovpn`** config file, it may be helpful to add the following line to the **`.ovpn`** file for fixing this error.

```bash
# example.ovpn

data-ciphers AES-256-CBC
```
