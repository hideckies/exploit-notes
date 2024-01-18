---
title: Read QASM
description: QASM (Quantum Assembly Language) is a language used to program quantum computers. It is similar in concept to assembly language used in classical computers, but instead of operating on bits, QASM operates on quantum bits (qubits).
tags: 
    - Machine Learning
refs:
    - https://github.com/Taoudi/Cyber_Apocalypse/blob/main/HTB.ipynb
date: 2023-03-26
draft: false
---

## Install Qiskit

```python
pip install oqi qiskit
```

<br />

## Read QASM

```python
from qiskit import QuantumCircuit, transpile
from qiskit.providers.aer import QasmSimulator
from qiskit.visualization import plot_histogram

simulator = QasmSimulator()
circuit = QuantumCircuit.from_qasm_file('example.qasm')
compiled_circuit = transpile(circuit, simulator)
job = simulator.run(compiled_circuit, shots=1000)
result = job.result()

counts = result.get_counts(compiled_circuit)
print(counts)
```