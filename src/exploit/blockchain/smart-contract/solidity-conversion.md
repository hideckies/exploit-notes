---
title: Solidity Conversion
description: 
tags:
    - Blockchain
    - Ethereum
refs:
    - https://www.tutorialspoint.com/solidity/solidity_conversions.htm
    - https://coinsbench.com/12-privacy-ethernaut-explained-8ee480f303f2
date: 2023-09-30
draft: false
---

## Explicit Conversion

When we cast a smaller type to a bigger type, there's no problem. However, when we cast a bigger type to a smaller type, data may be lost partially.

### Uint/Int

```js
// uint32 -> uint16
uint32 a = 0x12345678;
uint16 b = uint16(a); // 0x5678

// uint16 -> uint32
uint16 a = 0x1234;
uint32 b = uint32(a); // 0x00001234
```

### Bytes

```js
// bytes2 -> bytes1
bytes2 a = 0x1234;
bytes1 b = bytes1(a); // 0x12

// bytes2 -> bytes4
bytes2 a = 0x1234;
bytes4 b = bytes4(a); // 0x12340000
```