---
title: ML Model Analysis
description: 
tags: 
    - Machine Learning
refs:
    - https://pytorch.org/tutorials/beginner/saving_loading_models.html#save-load-entire-model
    - https://take-tech-engineer.com/pytorch-model-display/
date: 2023-08-22
draft: false
---

## Model Investigation

### Using Keras

```python
from tensorflow import keras
from keras.models import load_model

model = load_model("example.h5")

# Summarization
print(model.summary())

# Configuration
print(model.get_config())

# List inputs
print(model.inputs)
# List outputs
print(model.outputs)
```

### Using PyTorch

If we don’t have **`torchinfo`**, we need to install it at first.

```bash
pip install torchinfo
```

Here is the code for investigation.

```python
import torch
from torchinfo import summary

model = torch.load("example.pt")
model.eval() # it's not required for investigation only but required when inferening

batch_size = 16
print(summary(model=model, input_size=(batch_size, 3, 16, 16)))

# Also simply show model's state dict
print(model.state_dict)
```

<br />

## Scan Model

### ModelScan

[ModelScan](https://github.com/protectai/modelscan/tree/main) is a machine learning model scanner to protect againt Model Serialization Attacks.

```bash
# -p: Path to the file
modelscan -p example.h5
modelscan -p example.pt

# Scan all models in Hugging Face Repository
modelscan -hf owner/model-repository-name
```
