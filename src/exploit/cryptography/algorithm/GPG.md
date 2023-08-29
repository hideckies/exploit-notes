---
title: GPG (GNU Privacy Guard)
description: GPG is a free-software replacement for Symantec's PGP cryptographic software suite.
tags:
    - Cryptography
refs:
date: 2023-06-27
draft: false
---

## Decrypt

### 1. Crack Passphrase from Private Key

- **gpg2john**

    First of all, you need to format the private key to make the John to recognize it.

    ```sh
    gpg2john private.key > key.txt
    gpg2john private_key.asc > key.txt
    gpg2john private_key.sig > key.txt
    ```

    Crack the passphrase using the formatted text.

    ```sh
    john --wordlist=wordlist.txt key.txt
    ```

- **custom script**

    If you cannot crack the passphrase using gpg2john for some reasons (error, etc), you can use [the script](https://github.com/felip091837/gpg-crack/blob/master/crackgpg.sh) as alternative.

    ```sh
    ./crackgpg.sh example.gpg passwords.txt
    ```

### 2. Import the Private Key

```sh
gpg --import private.key
gpg --import private_key.asc
gpg --import private_key.sig
```

To list the imported keys,

```sh
gpg --list-keys
gpg --list-secret-keys
```

### 3. Decrypt GPG (PGP) using the Passphrase

At that time, you'll be asked for the passphrase, so enter the passphrase you gotten in the previous section.

```sh
# -d: decrypt
gpg -d example.gpg
gpg -d example.pgp
```

<br />

## Decrypt ASC File

We can decrypt **`.asc`** file by importing private key.

```bash
gpg --import private.key
gpg --decrypt example.asc
```

<br />

## Encrypt

We can encrypt a message using a PGP public key.  

### 1. Import a Public Key

If we have already a public key, we can import it by the following command.

```bash
gpg --import public_key.asc
```

To list public keys, run the following command.

```bash
# -k / --list-keys / --list-signatures
gpg -k
```

### 2. Encrypt a Message

If the public key was added, we can encrypt a message using it.

```bash
# -e: Encrypt
# -r: Recipient name
gpg -e -r "recipient name" example.txt

# -c: Encrypt only with symmetric cipher
gpg -c example.txt

# --cipher-algo: Encryption type
gpg --cipher-algo AES-256 -c example.txt
```

After that, `hello.txt.gpg` will be generated.

<br />

## Sign

To sign a message with GPG, of course we need to GPG keys.  
We can generate a public/secret key by running the command below.

```bash
gpg --gen-key

# Output
Real name: test
Email address: test@test.com
```

To display the contents of the public key, run the following command.

```bash
# -a: Ascii armored output
# --export: Export keys
# <key_name>: Optional. If you want to specify the key, specify the name.
gpg -a --export <key_name>

# Output the public key file
gpg -a -o public.key --export
```

After that, we can sign a message using the public key. At this time, we’re asked for a passphrase, so we need to enter it.

```bash
echo 'hello' | gpg --clear-sign
```

<br />

## Delete Keys

First off, we can list existing keys as below.

```bash
# List public keys
gpg --list-keys
# List secret keys
gpg --list-secret-keys
```

To delete specific key, run the following commands.

```bash
# Delete a public key
gpg --delete-key <key_id>
# e.g.
gpg --delete-key D6BA9423021A0839CCC6F3C8C61D429110B625D4

# Delete a secret key
gpg --delete-secret-key <key_id>
# e.g.
gpg --delete-secret-key D6BA9423021A0839CCC6F3C8C61D429110B625D4
```
