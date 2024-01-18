---
title: Solidity Storage Values Analysis
description: 
tags:
    - Blockchain
    - Ethereum
refs:
    - https://ethernaut.openzeppelin.com/level/0xcAac6e4994c2e21C5370528221c226D1076CfDAB
    - https://coinsbench.com/12-privacy-ethernaut-explained-8ee480f303f2
date: 2023-10-02
draft: false
---

## Data Byte Sizes

Reference: [https://tomatosauce.jp/datatype-bytesize/](https://tomatosauce.jp/datatype-bytesize/)

In Solidity, each data type has the following size:

|Type|Bytes|
|:---|---:|
|bool|1|
|bytes1|1|
|bytes8|8|
|bytes16|16|
|bytes32|32|
|address|20|
|contract|20|
|uint8/int8|1|
|uint16/int16|2|
|uint32/int32|4|
|uint64/int64|8|
|uint128/int128|16|
|uint256/int256|32|

<br />

## Access Storage Slot Values

Reference: https://coinsbench.com/12-privacy-ethernaut-explained-8ee480f303f2

Below is the Solidity contract example.  

The Solidity’s each slot can store data until 32 bytes. For example below, the ‘Slot 2’ stores multiple variables because each value is just 1 byte, which are 2 bytes in total so less than 32 bytes.

```js
contract Example {
    // Slot 0 (1 byte)
    bool public isOk = false;
    // Slot 1 (32 bytes)
    uint public money = 100;
    // Slot 2 (1 byte)
    uint8 private score = 10;
    // Slot 2 (1 byte)
    uint8 private quantity = 5;
    // Slot 3, 4, 5 (32 bytes for each element of array)
    bytes32[3] private data;
}
```

Using Web3.js, we can get values of the above variables from outside.

```js
// Access slot 0
web3.eth.getStorageAt(contract.address, 0);
// Access slot 1
web3.eth.getStorageAt(contract.address, 1);
// Access slot 2
web3.eth.getStorageAt(contract.address, 2);
// Access slot 3 (data[0])
web3.eth.getStorageAt(contract.address, 3);
// Access slot 4 (data[1])
web3.eth.getStorageAt(contract.address, 4);
// Access stlo 5 (data[2])
web3.eth.getStorageAt(contract.address, 5);

// Proxy storage slot (0x123...)
web3.eth.storageAt(contract.address, "0x123...");
```

### Display Values

There are methods to see the storage slot values in appropriate format.

```js
const slotValue = await web3.eth.getStorageAt(contract.address, 0);

// for string value
web3.utils.toAscii(slotValue);
```