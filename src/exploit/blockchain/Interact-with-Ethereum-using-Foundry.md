---
title: Interact with Ethereum using Foundry
description: Foundry is a blazing fast, portable and modular toolkit for Ethereum application development written in Rust. 
tags:
    - Blockchain
    - Ethereum
    - Web3
refs:
    - https://github.com/foundry-rs/foundry
    - https://book.getfoundry.sh/
date: 2023-08-14
draft: false
---

## Setup Foundry

Please refer to the [Foundry's repository](https://github.com/foundry-rs/foundry) for details.  
To install **`foundryup`**, run the following command to install **foundry** toolchain.

```sh
curl -L https://foundry.paradigm.xyz | bash
foundryup
```

We can set the environment variable for **Ethereum RPC URL** to interact the Ethereum blockchain so that we don’t need to set the RPC url flag when running each command.

```bash
export ETH_RPC_URL="http://10.0.0.1:12345/path/to/rpc"
```

<br />

## Investigating a Chain

**`cast`** command of Foundry performs Ethereum RPC calls.

```bash
# Get the Ethereum chain id
cast chain-id
# Get the symbolic name of the current chain
cast chain
# Get the current client version
cast client

# Get the current gas price
cast gas-price

# Get the latest block number
cast block-number
# Get information about a block
cast block
```

<br />

## Investigating Account

```bash
# Get the balance of an account in wei
cast balance <account_address or ens_name>
cast balance 0x123...
cast balance beer.eth
```

<br />

## Investigating Contract

```sh
# Get the source code of a contract from Etherscan
cast etherscan-source <contract_address>
cast etherscan-source 0x123...
```

<br />

## Send Transactions

We can interact with the contract that is already deployed in Ethereum chain if we have the private key of the account and the contract address.

```bash
# Call the function of the contract
cast send --private-key <private_key_addr> <contract_addr> "exampleFunc(uint256)" <argument_value_of_the_function>
cast send --private-key 0x123... 0xabc... "deposit(uint256)" 10

# Trigger the fallback function
# Call the nonexisting function e.g. "dummy"
cast send --private-key <private_key_addr> <contract_addr> "dummy()"
cast send --private-key 0x123... 0xabc... "dummy()"

# Trigger the receive function
# Send Ether to call the receive function
cast send --private-key <private_key_addr> <contract_addr> --value 10gwei
cast send --private-key 0x123... 0xabc... --value 10gwei
```