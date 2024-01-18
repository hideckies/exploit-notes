---
title: Model Inversion Attack
description: Model Inversion Attack is the method to create a model which is about the same functions of  the target model that attackers does not know the architecture (so-called black-box model) by the outputs of that.  
tags: 
    - Machine Learning
refs:
    - https://github.com/OpenMined/PySyft/blob/a27deed0d07c199de039fafd323164640c9c8f6d/examples/tutorials/advanced/privacy_attacks/Tutorial%201%20-%20Black%20box%20model%20inversion.ipynb
date: 2023-08-24
draft: false
---

## Model Inversion Attack

Reference: [OpenMined Tutorial](https://github.com/OpenMined/PySyft/blob/a27deed0d07c199de039fafd323164640c9c8f6d/examples/tutorials/advanced/privacy_attacks/Tutorial%201%20-%20Black%20box%20model%20inversion.ipynb)

### 1. Import Modules

```python
import numpy as np
from collections import namedtuple
import torch
import torch.nn as nn
from torch.utils.data import DataLoader
import torchvision.transforms as transforms
from torchvision.datasets import EMNIST, MNIST
from tqdm.notebook import tqdm, trange

import matplotlib.pyplot as plt
```

### 2. Set Hyperparameters of Each Model

Next, we prepare the hyperparemeters for each model. These values will be used for training, splitting dataset, etc.

```python
hyperparams = namedtuple("hyperparams", "batch_size,epochs,learning_rate,n_data")

# Hyperparameters for victim model
victim_hyperparams = hyperparams(
    batch_size=256,
    epochs=10,
    learning_rate=1e-4,
    n_data=20_000, # no required all dataset
)

# Hyperparamerters for evil model used to attack
evil_hyperparams = hyperparams(
    batch_size=32,
    epochs=10,
    learning_rate=1e-4,
    n_data=500,
)
```

### 3. Load/Preprocess Dataset and Create DataLoader

We use **MNIST** dataset for this explanation purpose.

```python
preprocess = transforms.Compose(
    [transforms.ToTensor(), transforms.Normalize((0.1307,), (0.3081,)),]
)

# Load datasets
train_data = MNIST("mnist", train=True, download=True, transform=preprocess)
test_data = MNIST("mnist", train=False, download=True, transform=preprocess)

# Extract requried only data
train_data.data = train_data.data[:victim_hyperparams.n_data]
train_data.targets = train_data.targets[:victim_hyperparams.n_data]

# Create data loaders
train_loader = DataLoader(train_data, batch_size=victim_hyperparams.batch_size)
test_loader = DataLoader(test_data, batch_size=1_000)
```

### 4. Prepare Victim Model

Since this article is for educational purpose, we need to create target model to be inversed at first. In practice, we don’t have the architecture of target model.  
Here we create the neural network named `VictimNet` as an example.  
The layers are separated the two stages. We will intercept the `stage1` in the later process.

```python
class VictimNet(nn.Module):
  def __init__(self, first_network, second_network) -> None:
    super().__init__()

    self.stage1 = first_network
    self.stage2 = second_network

  def mobile_stage(self, x):
    return self.stage1(x)

  def forward(self, x):
    out = self.mobile_stage(x)
    out = out.view(out.size(0), -1)
    return self.stage2(out)
```

After that, initialize the model. 

```python
first_network = nn.Sequential(
    nn.Conv2d(1, 32, kernel_size=5, padding=0, stride=1),
    nn.ReLU(),
    nn.MaxPool2d(kernel_size=2),
    nn.Conv2d(32, 32, kernel_size=5, padding=0, stride=1),
    nn.ReLU(),
    nn.MaxPool2d(kernel_size=2),
)

second_network = nn.Sequential(
    nn.Linear(512, 256),
    nn.ReLU(),
    nn.Linear(256, 10),
    nn.Softmax(dim=-1),
)

victim_model = VictimNet(first_network, second_network)
```

To train the victim model, execute the following.

```python
optim = torch.optim.Adam(victim_model.parameters(), lr=victim_hyperparams.learning_rate)
loss_criterion = nn.CrossEntropyLoss()

for epoch in trange(victim_hyperparams.epochs):
  train_correct = 0
  train_loss = 0.

  for data, targets in train_loader:
    optim.zero_grad()

    output = victim_model(data)

    # Calculate loss and backpropagate
    loss = loss_criterion(output, targets)
    loss.backward()
    optim.step()

    # Record the statistics
    _, predicted = output.max(1)
    train_correct += predicted.eq(targets).sum().item()
    train_loss += loss.item()

train_loss /= len(train_data)

# Check test accuracy
test_correct = 0
test_loss = 0.

for data, targets in test_loader:
  with torch.no_grad():
    output = victim_model(data)

  loss = loss_criterion(output, targets)

  _, predicted = output.max(1)
  test_correct += predicted.eq(targets).sum().item()
  test_loss += loss.item()

test_loss /= len(test_data)

print(
    f"Training loss: {train_loss:.3f}\n"
    f"Test loss: {test_loss:.3f}"
)

print(
    f"Training accuracy: {100 * train_correct / victim_hyperparams.n_data:.3f}\n"
    f"Test accuracy: {100 * test_correct / len(test_data):.3f}"
)
```

### 5. Create Evil Model

Next, create the inverse model against the target model.  We call it as `EvilNet` here.

```python
class EvilNet(nn.Module):
  def __init__(self):
    super().__init__()

    self.layers = nn.Sequential(
        nn.ConvTranspose2d(
            in_channels=32,
            out_channels=32,
            kernel_size=7,
            padding=1,
            stride=2,
            output_padding=1,
        ),
        nn.ReLU(),
        nn.ConvTranspose2d(
            in_channels=32,
            out_channels=32,
            kernel_size=5,
            padding=1,
            stride=2,
            output_padding=1,
        ),
        nn.ReLU(),
        nn.ConvTranspose2d(
            in_channels=32, out_channels=1, kernel_size=5, padding=1, stride=1,
        ),
    )

  def forward(self, x):
    return self.layers(x)
```

After that, initialize the model.

```python
evil_model = EvilNet()
```

In addition, we need to prepare dataset and data loader for this evil model.

```python
evil_dataset = EMNIST("emnist", "letters", download=True, train=False, transform=preprocess)

# Use the last n_data images in the test set to train the evil model
evil_dataset.data = evil_dataset.data[:evil_hyperparams.n_data]
evil_dataset.targets = evil_dataset.targets[:evil_hyperparams.n_data]

# Dataloader
evil_loader = DataLoader(evil_dataset, batch_size=evil_hyperparams.batch_size)
```

To train, execute the following script.

```python
# Optimizer
evil_optim = torch.optim.Adam(evil_model.parameters(), lr=evil_hyperparams.learning_rate)

# Train by each epoch
for epoch in trange(evil_hyperparams.epochs):
  for data, targets in evil_loader:
    data.float()
    targets.float()

    # Intercept the output of the mobile device's model.
    # This is the input of the evil model.
    with torch.no_grad():
      evil_input = victim_model.mobile_stage(data)

    output = evil_model(evil_input)

    # Calculate the mean squared loss between the predicted output and the original input data
    loss = ((output - data)**2).mean()
    loss.backward()
    evil_optim.step()
```

### 6. Attack

Since we have all equipment, start inversing the target model and generate images which are about the same as the output of the target model.  
At first, we create a function to plot the generated images.

```python
def plot_images(tensors):
  fig = plt.figure(figsize=(10, 5))

  n_tensors = len(tensors)
  n_cols = min(n_tensors, 4)
  n_rows = int((n_tensors - 1) / 4) + 1

  # De-normalize on MNIST tensor
  mu = torch.tensor([0.1307], dtype=torch.float32)
  sigma = torch.tensor([0.3081], dtype=torch.float32)
  Unnormalize = transforms.Normalize((-mu / sigma).tolist(), (1.0 / sigma).tolist())

  for row in range(n_rows):
    for col in range(n_cols):
      idx = n_cols * row + col

      if idx > n_tensors - 1:
        break

      ax = fig.add_subplot(n_rows, n_cols, idx + 1)
      tensor = Unnormalize(tensors[idx])

      # Clip image values
      tensor[tensor < 0] = 0
      tensor[tensor > 1] = 1

      tensor = tensor.squeeze(0) # remove batch dim

      ax.imshow(transforms.ToPILImage()(tensor), interpolation="bicubic")

  plt.tight_layout()
  plt.show()
```

Then define the function to generate images.

```python
def attack(evil_model, victim_model, dataset):
  images = []

  for i in range(6):
    actual_image, _ = dataset[i]

    with torch.no_grad():
      victim_output = victim_model.mobile_stage(actual_image.unsqueeze(0))
      reconstructed_image = evil_model(victim_output).squeeze(0)

    images.append(actual_image)
    images.append(reconstructed_image)

  plot_images(images)
```

Now execute this function. We should see that the generated images of the evil model are about the same as them of the target model.

```python
attack(evil_model, victim_model, test_data)
```