---
title: Anonymize Traffic with Tor
description: We can anonymize our traffic using Tor proxy and proxychains. Please note that this method does not provide complete anonymity.
tags:
    - Network
    - Web
refs:
    - https://geekflare.com/anonymize-linux-traffic/
    - https://0x00sec.org/t/how-to-become-a-ghost-hacker-merozey-tips/591
    - https://0x00sec.org/t/anonymity-basics/722
date: 2023-10-30
draft: false
---

## Privacy Friendly OS

- Tails
- Qubes
- Whonix

<br />

## Anonymization

### 1. Configure Proxychains

First off, find the location of the proxychains configuration file.

```bash
find / -type f -name "*proxychains*" 2>/dev/null
```

Assume we found **`/etc/proxychains.conf`** then modify this file.

```bash
vim /etc/proxychains
```

We need to remove **`#`** in front of **`dynamic_chains`**, then comment out the **`strict_chain`** line and the **`random_chain`** line.  
In addition, check the **`proxy_dns`** is uncommented for avoiding our DNS to be leaked.

```bash
...

dynamic_chain

...

# strict_chain

...

# random_chain

...

proxy_dns
```

Add **`socks4 127.0.0.1 9050`** and **`socks5 127.0.0.1 9050`** in the **`ProxyList`** section. 

```bash
[ProxyList]
socks4  127.0.0.1 9050
socks5  127.0.0.1 9050
```

### 2. Start Tor Service

Before using proxychains, we need to start Tor service.

```bash
systemctl start tor

# Check the status
systemctl status tor
```

### 3. Use Proxychains

Now we can execute arbitrary command with proxychains. Our traffic should be anonymous thanks to Tor.

```bash
# Open Firefox browser.
proxychains firefox dnsleaktest.com

proxychains nmap x.x.x.x
```

- **Check Public IP**

To check our public ip address from command line, run the following command.

```bash
proxychains curl ifcfg.me
```

- **Proxhchains Bash**

If we don't want to append **`proxychains`** command every time, **`proxychains bash`** command eliminates the need to do that.

```bash
proxychains bash

# Confirm our public ip
curl ifcfg.me
```

### 4. Use Burp Suite

To use **Burp Suite** over **Tor proxy**, setup the **SOCKS** proxy in Burp Suite as below.

1. Open **Burp Suite**. We need to normally start Burp Suite **without `proxychains`** command.
2. Go to **Proxy** tab and click **Proxy** settings. **Settings** window opens.
3. In **Settings** window, go to **User** tab at the left pane, and click **Network → Connections**.
4. In **SOCKS proxy** section, click the switch **"Override options for this project only"**, and fill the following forms:

    ```sh
    SOCKS proxy host: 127.0.0.1
    SOCKS proxy port: 9050
    ```
5. After that, check **"Use SOCKS proxy"**.
6. Close the **Settings** window.

After setting up, we can use **Burp Suite built-in browser** over **Tor proxy**.

### 5. Stop Tor Service

After using proxychains and Tor, stop the Tor service.

```bash
systemctl stop tor
```