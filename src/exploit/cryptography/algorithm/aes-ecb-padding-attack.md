---
title: AES-ECB Padding Attack
description: AES ECB (Electronic CodeBook) mode is vulnerable to guess plaintext/ciphertext without knowing the key by using padding.
tags:
    - Cryptography
refs:
    - https://cryptohack.org/courses/symmetric/ecb_oracle/
date: 2023-09-04
draft: false
---

## How It Works

In **ECB** mode, plaintext is separated into each block with fixed size (e.g. **16, 32, etc.**) and **encrypt individually**, then each block will be **concatenated** at the end. Below is the flow.

```python
# 1. Input plaintext ('1'*32) to encrypt
11111111111111111111111111111111

# 2. Separate into each block with 16-bytes size
1111111111111111 1111111111111111

# 3. Encrypt each block
ENC(1111111111111111) ENC(1111111111111111)

# 4. Concatenate each encrypted block
ENC(1111111111111111)+ENC(1111111111111111)

# 5. Convert to hex at the end for the output
HEX(ENC(1111111111111111)+ENC(1111111111111111))
```

If we input a plaintext which cannot be separated the same size e.g. **31 characters string (1-byte is missing)** as below, the plaintext needs to be padded for adjusting the byte size before separating.

```python
# 1. Input plaintext ('1'*31) to encrypt <- This is a half-assed!
1111111111111111111111111111111

# 2. Need to pad it for allowing to separate each block with the same size (31 bytes -> 32 bytes)
1111111111111111111111111111111\x01

# 3. Separate it into each block with 16-bytes size
1111111111111111 111111111111111\x01

# 4. Encrypt each block
ENC(1111111111111111) ENC(111111111111111\x01)

# 5. Concatenate each encrypted text
ENC(1111111111111111)+ENC(111111111111111\x01)

# 6. Convert to hex at the end
HEX(ENC(1111111111111111)+ENC(111111111111111\x01))
```

As above, we can read each encrypted block (**`ENC(1111111111111111)`** and **`ENC(111111111111111\x01)`**) from the encrypted text because these are just concatenated.  
Below is the example for reading each block.

```python
# ENC(block1) ENC(block2) ENC(block3) ...
10051f1ff9987235 98f9c701e7500cf4 0d2b81c920b42a89 054d01bc5ccf8eab ba37248efc4d894e c7b0f3499a478699 5ccdf3f5dff54477 8460b5acf8c2f931 
```

Using this separating mechanism, we can manipulate plaintext and retrieve the FLAG without knowing the secret key.

<br />

## Exploitation (Example Challenge)

The following Python script encrypts **'arbitrary plaintext'** + **FLAG** with **AES-ECB** mode. Assume that we don't know the secret key and FLAG text.  
Our challenge is to find the FLAG text.

```python
from Crypto.Cipher import AES
from Crypto.Util.Padding import pad

key = b'????????????????' # Unknown 16-byte key
FLAG = b'FLAG{???}' # Unknown flag

def encrypt(plaintext):
	padded = pad(plaintext + FLAG, 16)
	cipher = AES.new(key, AES.MODE_ECB)

	ciphertext = cipher.encrypt(padded)
	return ciphertext.hex()


plaintext = b'hello' # Arbitrary text
print(encrypt(plaintext))
```

Although we don't know the secret key, we can find the FLAG by exploiting how EBC mode works and padding mechanism.

### 1. Manipulate Plaintext

Since this script adds the unknown FLAG text to our plaintext as follow. 

```python
# Our plaintext 'test' + 'FLAG{unknown}'
testFLAG{unknown}
```

If we input **31-bytes** string (**'1' \* 31**), the string will be padded and separated into each block with **16-bytes** size. As a result, the middle block will be **'111111111111111F'**.

```python
# 1. Our plaintext ('1'*31) + 'FLAG{unknown}'
1111111111111111111111111111111FLAG{unknown}

# 2. Separate it into each block with 16-bytes. The last string is padded to 16-bytes.
1111111111111111 111111111111111F LAG{unknown}\x04\x04\x04\x04
```

At this point, try to input the string (**'1' \* 31** + **'F'**) as plaintext. What will be the each block?

```python
# 1. Our plaintext ('1'*31 + 'F') + 'FLAG{unknown}'
111111111111111111111111111111FFLAG{unknown}

# 2. Separate it.
1111111111111111 111111111111111F FLAG{unknown}\x03\x03\x03
```

As above, the middle block (**'111111111111111F'**) will be the same as the previous one.  
It means that our first input (**'1' \* 31**) and the second input (**'1' \* 31** + **'F'**) will lead the script to generate **the same middle block**.  

Next we compare the input (**'1' \* 30**) and the input (**'1' \* 30** + **'FL'**). The middle block will be such the following after separating.

```python
# Our plaintext ('1'*30) + 'FLAG{unknown}'
1111111111111111 11111111111111FL AG{unknown}\x05\x05\x05\x05\x05

# Our plaintext ('1'*30 + 'FL') + 'FLAG{unknown}'
1111111111111111 11111111111111FL FLAG{unknown}\x03\x03\x03
```

Representing the above in a Python script would look like this:

```python
# Extract the middle block by '[16:32]'.
print(encrypt(b'1'*31)[16:32] == encrypt(b'1'*31 + b'F')[16:32])
# True

print(encrypt(b'1'*30)[16:32] == encrypt(b'1'*30 + b'FL')[16:32]
# True
```

### 2. Brute Force

Using the above mechanism, we can find the **FLAG** by bruteforcing characters while decreasing the number of **'1'** (**'1'\*31, '1'\*30, '1'\*29, …**).  
Comparing the first input (**'1' \* N**) and the second input (**'1' \* N** + **'some characters'**), we will be able to find the FLAG.  
Below is the Python script for doing that.

```python
def bruteforce():
	flag = ''
  total = 32 - 1
  chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_-~!?#%&@{}'

  while True:
		payload = '1' * (total - len(flag))
    ciphertext_1 = encrypt(payload.encode())

    for c in chars:
		  ciphertext_2 = encrypt((payload + flag + c).encode())
			# Comapare the middle blocks ([32:64]) of each encrypted text
	    if ciphertext_2[32:64] == ciphertext_1[32:64]:
		    flag += c
        print(flag)
        break

bruteforce()
```

Run the script and the output will be as below.

```python
F
FL
FLA
FLAG
FLAG{
FLAG{h
FLAG{he
FLAG{hel
FLAG{hell
FLAG{hello
FLAG{hellow
FLAG{hellowo
FLAG{hellowor
FLAG{helloworl
FLAG{helloworld
FLAG{helloworld}
```

We could find the FLAG by bruteforcing plaintext without knowing the key.
