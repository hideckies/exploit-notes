---
title: Solidity Overflow & Underflow
description: Solidity is vulnerable to overflow and underflow of uint variables on the version <0.8.
tags:
    - Blockchain
    - Ethereum
refs:
date: 2023-09-27
draft: false
---

## Overflow

```js
uint8 value = 255;
value++;
// Result: value = 0
```

<br />

## Underflow

```js
uint8 value = 0;
value--;
// Result: value = 255
```