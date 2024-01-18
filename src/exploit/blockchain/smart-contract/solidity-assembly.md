---
title: Solidity Assembly
description: 
tags:
    - Blockchain
    - Ethereum
refs:
    - https://docs.soliditylang.org/en/latest/assembly.html
    - https://blog.dixitaditya.com/ethernaut-level-18-magicnumber
date: 2023-10-05
draft: false
---

## Simple Example

```js
pragma solidity ^0.8.0;

contract Simple {
	constructor(address _addr) {
		assembly {
			// Get the size of the code
			let size := extcodesize(_addr);
			// Allocate output byte array
			code := mload(0x40);
			// New "memory end" including padding
			mstore(0x40, add(code, and(add(add(size, 0x20), 0x1f), not(0x1f))));
			// Store length in memory
			mstore(code, size);
			// Retrieve the code
			extcodecopy(addr, add(code, 0x20), 0, size);
		}
	}
}
```

<br />

## From Opcode

```js
pragma solidity ^0.8.0;

contract Opcode {
  constructor() {
		address myContract;
    bytes memory opcode = "\x60\x0a\x60\x0c\x60\x00\x39\x60\x0a\x60\x00\xf3\x60\x2a\x60\x80\x52\x60\x20\x60\x80\xf3";

    assembly {
        myContract := create(0, add(opcode, 0x20), mload(opcode))
    }

    // Some code here...
  }
}
```
