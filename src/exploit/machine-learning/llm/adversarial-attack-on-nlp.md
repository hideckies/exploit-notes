---
title: Adversarial Attack on NLP
description: Adversarial examples causes NLP models to misrecognition.
tags: 
    - LLM
    - Machine Learning
refs:
date: 2023-10-05
draft: false
---

## Automation

### Using TextAttack

[TextAttack](https://github.com/QData/TextAttack) is a Python framework for adversarial attacks, training models in NLP. 

```bash
# TextFooler
textattack attack --model bert-base-uncased-mr --recipe textfooler --num-examples 100

# DeepWordBug
textattack attack --model distilbert-base-uncased-cola --recipe deepwordbug --num-examples 100
```
