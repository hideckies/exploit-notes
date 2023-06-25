---
title: Subdomain Takeover
description: Subdomain Takeover is a malicious activity that the victim’s subdomain allows attackers to control and impersonate.
tags:
    - Reconnaissance
refs:
    - https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/02-Configuration_and_Deployment_Management_Testing/10-Test_for_Subdomain_Takeover
date: 2023-06-25
draft: false
---

## Automation

- [dnsReaper](https://github.com/punk-security/dnsReaper)
    
    ```bash
    git clone https://github.com/punk-security/dnsReaper.git
    cd dnsReaper
    python3 -m venv venv
    source venv/bin/activate
    pip3 install -r requirements.txt
    
    # Fetching from AWS
    python3 main.py aws --aws-access-key-id AWS_ACCESS_KEY_ID --domain example.com
    # Fetching from Azure
    python3 main.py azure --az-subscription-id AZ_SUBSCRIPTION_ID --domain example.com
    # Reading BIND zone file
    python3 main.py bind --bind-zone-file /path/to/zone/file --domain example.com
    # Fetching from Cloudflare
    python3 main.py cloudflare --cloudflare-token CLOUDFLARE_TOKEN --domain example.com
    # Fetching from DigitalOcean
    python3 main.py digitalocean --do-api-key DO_API_KEY --domain example.com
    # Reading specific file
    python3 main.py file --filename /path/to/file --domain example.com
    # Scanning a single domain
    python3 main.py singla --domain example.com --domain example.com
    ```

<br />

## Testing - A, CNAME Subdomain Takeover

### 1. Enumerate Subdomains

There are various ways to enumerate subdomains.

```bash
subfinder -d example.com

# https://github.com/darkoperator/dnsrecon
./dnsrecon.py -d example.com
```

Please refer to [Subdomain Discovery](/exploit/reconnaissance/subdomain-discovery/) to check more details.

### 2. Identify Misconfigurations for Subdomains

Check DNS records for identifying what’s on the destination of the subdomain.

```bash
dig A app.example.com
dig CNAME app.example.com
```

Also we can try to access them with web browser or command-line. For example,

```bash
# -L: Follow redirect
# -v: Verbose mode
curl -Lv app.example.com
curl -v cloud.example.com
curl -v mail.example.com
```

### 3. Spoof with the Subdomain

If a certain subdomain can be accessible but the error page of the specific provider (e.g. GitHub, Google Cloud, Wix, etc.)  appeared, it means that the subdomain of the settings in the service provider was removed but the DNS record (e.g. A, CNAME) remains yet.   

In short, attackers can spoof as a legitimate site by claiming this subdomain in the provider.

Here’s an abstract example:

1. Login the target provider.
2. Create a malicious website.
3. Add the target subdomain (e.g. app.example.com) as custom domain in the setting page.
4. If users visit app.example.com, they have now visited a malicious website created by an attacker.

<br />

## Testing - NS Subdomain Takeover

It’s more dangerous If NS record is vulnerable because if the nameserver is taken over, an attacker can take full control of victim’s domains.

To gather NS records for the target domain, use `dig` command.

```bash
dig ns example.com +short

# Result examples
ns-100.abcde.org
ns-120.abcde.co.uk
```

Next, check if the gathered domains can be purchased with domain name registrar like GoDaddy, NameCheap.

For example, search `[abcde.org](http://abcde.org)` in the domain search page of NameCheap. If this domain can be purchased, attackers can buy this domain then take control the name resolution of a victim by creating the custom nameserver which pointed to this domain.