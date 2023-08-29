---
title: RPNG (Pseudo Random Number Generator) Guessing
description: We may be able to predict numbers from the previous generated numbers because PRNG does not generate truly random numbers.
tags:
    - Cryptography
refs:
date: 2023-07-30
draft: false
---

## Investigation

Suppose that the following RPNG program in Python. The seed, which is used for the random number generator, is generated from the time when the program runs.

```python
import random
import time

seed = int(time.time())

random.seed(seed)

num = random.randint(1, 100)
print("Generated number: ", num)
```

If we can get the seed, we can generate the same number as this program.

<br />

## Exploitation

There are several ways to guess the number. Here are some of the examples.

### Run Program at the Same Time

If we can retrieve the program source code, we can run the custom exploit inherited from it, then run it at the same time.

### Get the Seed from Target System Time

If we can know when the program executed in target system, we may be able to calculate the seed from the system time of the target.  
We can calculate it in online tools like [Epoch Converter](https://www.epochconverter.com/).  
When retrieving the seed, we can put it on the original code as below.

```python
# This is the seed which is retrieved from the time generated random numbers.
seed = 1724169824
random.seed(seed)
```

As a result, we can get the same number whenever we run the program.