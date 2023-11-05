---
title: Shell Scripting
description: 
tags:
    - Linux
refs:
date: 2023-11-03
draft: false
---

## For Loop

```sh
#!/bin/bash
for i in {1..5}
do
    echo "Hello $i"
done
```

### 4 Digits Loop

```sh
#!/bin/bash
for i in {0000..9999}
do
    echo $i
done
```

<br />

## Read Text Line by Line

read-text.sh

```sh
#!/bin/bash
while read line
do
    echo $line
done < example.txt
```

<br />

## Retrieve Arguments

**Getopts** is useful.  
Create "my_opt.sh".

```sh
#!/bin/bash

getopts c cmd
echo $cmd
```

Run. This output is the current username.

```sh
./my_opt.sh -cwhoami
```

- **While Loop and Retrieving Arguments**

    ```sh
    Create “my_while_opt.sh”.

    ```sh
    while getopts ab: flag
    do
        case "${flag}" in
            a) command1=${OPTARG};;
            b) command2=${OPTARG};;
        esac
    done

    cmd1=$($command1)
    echo $cmd1
    cmd2=$($command2)
    echo $cmd2
    ```

    Run. This output is the current username and current time.

    ```sh
    ./my_while_opt.sh -awhoami -btime
    # kali
    # real  1111.11s ...
    ```