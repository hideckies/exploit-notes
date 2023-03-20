---
title: Interact with Ethereum using Python
description: 
tags:
    - Blockchain
    - Web3
refs:
date: 2023-03-20
draft: false
---

## Preparation

To use **“py-solc”**, the Ethereum and Solidity are required in our system. So if you don’t have them yet, install them.

```python
sudo add-apt-repository ppa:ethereum/ethereum
sudo apt-get update
sudo apt-get install solc
```

<br />

## Install Python Packages

```bash
pip3 install py-solc
pip3 install web3
```

<br />

## Compile Contract

```python
import solc

with open('MyContract.sol', 'r') as f:
	contract_source_code = f.read()

compiled_sol = solc.compile_source(contract_source_code)

contract_bytecode = compiled_sol['<stdin>:MyContract']['bin']
contract_abi = compiled_sol['<stdin>:MyContract']['abi']
```

<br />

## Interact with Ethereum Chain

Create the Python script using web3 to interact with blockchain.

```python
from web3 import Web3

rpc_url = "http://10.0.0.1:8545"
private_key = "0x1234..."
addr = "0x1234..."
contract_addr = "0x1234..."

# Connect
w3 = Web3(Web3.HTTPProvider(rpc_url))
print(w3.is_connected())

# Get the latest block
print(w3.get_block('latest'))

# Get the balance of specified address
balance = w3.eth.get_balance(addr)
print(f"Balance is {balance}")
```