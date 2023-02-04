---
title: Certificates
description: An electronic document used to prove the validity of a public key.
tags:
    - Certificate
draft: false
---

## Connect to Remote Server with SSL/TLS

You need to have two files - certificate and private key.

```sh
nc --ssl-cert cert.pem --ssl-key private-key.pem <target-ip> <target-port>
# or
ncat --ssl-cert cert.pem --ssl-key private-key.pem <target-ip> <target-port>
```

<br />

## RSA Attack

- **Retrieve Private Key**

    - **[RsaCtfTool](https://github.com/Ganapati/RsaCtfTool)**

        RSA attack tool (mainly for ctf) - retreive private key from weak public key and/or uncipher data.

<br />

## PFX (PKCS#12) -> PEM -> RSA

1. **Crack Password of PFX**

    **[crackpkcs12](https://github.com/crackpkcs12/crackpkcs12)** is useful to crack password.

    ```sh
    crackpkcs12 -d wordlist.txt example.pfx
    ```

2. **Extract a Private Key**

    - **For Encrypted Key**

        ```sh
        openssl pkcs12 -in example.pfx -nocerts -out key.pem
        ```

    - **For No Encrypted Key**

        ```sh
        openssl pkcs12 -in example.pfx -nocerts -out key.pem -nodes
        ```

3. **Extract a Public Key (Cert)**

    ```sh
    openssl pkcs12 -in example.pfx -nokeys -out cert.pem
    ```

4. **Create RSA Key**

    Using the private key generated.

    ```sh
    openssl rsa -in key.pem -out rsa.key
    ```

<br />

## RSA Asymmetrick Encrypt/Decrypt

- **Encryption**

    1. **Generate a Private Key**

        ```sh
        openssl genrsa -aes256 -out private.key 8912
        ```

    2. **Generate a Public Key using the Private Key**

        ```sh
        openssl rsa -in private.key -pubout public.key
        ```

    3. **Encrypt using the Public Key**

        ```sh
        openssl rsautl -encrypt -pubin -inkey public.key -in plain.txt -out encrypted.txt
        ```

- **Decryption**

    1. **Decrypt a Private Key**

        ```sh
        openssl rsautl -decrypt -inkey private.key -in encrypted.txt -out plain.txt
        ```
