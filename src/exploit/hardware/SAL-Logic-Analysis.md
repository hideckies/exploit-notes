---
title: SAL Logic Analysis
description: A SAL file is a capture file in Saleae Logic Analyzer.
tags:
    - Hardware
refs:
    - https://support.saleae.com/user-guide/using-logic/using-protocol-analyzers
date: 2023-03-26
draft: false
---

## Analysis

**[Saleae's Logic Analyzer](https://www.saleae.com/)** is a tool for hardware analysis.  
Download **Logic 2** and start it.

```sh
chmod +x ./Logic-x.x.x-master.AppImage
./Logic-x.x.x-master.AppImage
```

In the analyzer, click **"Open a capture"** and select the target file such as **".sal"**.  
Open **"Analyzer"** tab on the right of the windows and click on the **"Async Serial"**.  
The dialog opens, then configure some value e.g. **`Bit Rate`**. And click save button.

After configuration, we can see the data analyzed in the Data section. Click the terminal icon then we can see what data was transmitted.  
To add another Async Serial analyer, click the “+” icon on the right of the Analyzers header.

<br />

## Read Code

1. Click **File → Export Data** then select **CSV** in the Export Raw Data popup.  
2. Click **Export**.

<br />

## Calculate Bit Rate from Intervals

```txt
Bit rate (bit/s) = 1 second / (interval(microseconds) x 10^(-6)) seconds
```
