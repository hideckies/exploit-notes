---
title: DoS/DDoS Attack
description: Denial-of-service (DoS) and distributed denial-of-service are attack methods to interfere with services by placing an excessive load in resources such as servers and networks running web services.
tags:
    - Network
refs:
    - https://www.cloudflare.com/learning/ddos/ddos-attack-tools/how-to-ddos/
date: 2023-09-27
draft: false
---

## Comprehensive Tools

- [LOIC (Low Orbit Ion Cannon)](https://github.com/NewEraCracker/LOIC)
    
    A network stress tool written in `C#`.
    
- [MHDDoS](https://github.com/MatrixTM/MHDDoS)
    
    A DDoS Attack Script written in Python3 with 56 methods.
    
<br />

## UDP Flood Attack

- [Python-UDP-Flood](https://github.com/XaviFortes/Python-UDP-Flood)
- [stress-udp-flood.c](https://github.com/ColinIanKing/stress-ng/blob/master/stress-udp-flood.c)
    
    This is a C code to stress test for UDP flood.

<br />

## NTP (Network Time Protocol) Amplification Attack

This attack often uses `monlist` command for sending packets to target without authentication.

<br />

## Low and Slow Attack (Slow HTTP Attack)

Low and Slow Attack sends traffic slowly then makes it impossible the legitimate user to access the web service. This attack uses HTTP headers, HTTP POST headers, etc.

### R.U.D.Y.  (R U Dead Yet?) Attack

R.U.D.Y. attack submits form data slowly for keeping a web server tied up, then legitimate users cannot access to the service.

- [rudyjs](https://github.com/sahilchaddha/rudyjs)
    
    RUDY implementation in NodeJS.
    
<br />

## SSDP (Simple Service Discovery Protocol) Flood Attack

SSDP flood attack exploits UPnP (Universal Plug and Play) protocol by sending traffic to a target for overwhelming a target infrastructure.

- [ssdp_attack.py](https://github.com/R00tS3c/DDOS-RootSec/blob/master/DDOS%20Scripts/AMP%20YUBINA%20SCRIPTS/ssdp_attack.py)