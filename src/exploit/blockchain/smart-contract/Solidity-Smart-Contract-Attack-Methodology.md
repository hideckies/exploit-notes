---
title: Solidity Smart Contract Attack Methodology
description: When attacking target contract, we can create an attack contract which loads the target contract and abuse it.
tags:
    - Blockchain
    - Ethereum
refs:
date: 2023-09-30
draft: false
---

## Create an Attack Contract

```js
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Define interface for victim contract
interface IVictim {
	// Set the Victim contract functions
	function example1() external;
	function example2(uint) external;
}

// Define Attack contract to compromise the victim contract
contract Attack {
	IVictim public victim;

	constructor(address _victimAddress) {
		// Initialize Victim contract (interface)
		victim = IVictim(_victimAddress);
	}

	// Create a function to be used for attacking the victim contract
	function attack() public {
		victim.example1();
		victim.example2(1);
	}
}
```