---
title: Orange Data Mining
description: Orange is a data-mining and machine learning software that allows users to analyze data, create visualizations, and build predictive models.
tags: 
    - Machine Learning
refs:
    - https://orange3.readthedocs.io/projects/orange-visual-programming/en/latest/index.html
date: 2023-03-20
draft: false
---

## Installation & Start

To install Orange, we can install it with pip in Linux.

```bash
pip install PyQt5 PyQtWebEngine
pip install orange3
```

<br />

## Basic Usage

### 1. Start Orange Software

```bash
python -m Orange.canvas
```

### 2. Open .OWS File

When the Orange starts, open the “.ows” file.

### 3. Import Data File

Add the File widget in the left pane, and import data file such as “.csv”.

### 4. Workflows

Connect the File widget with the Scatter Plot widget and open the Scatter Plot. We can see the data with plot.