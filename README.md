<div align="center">

# 🌊 VectorShift Pipeline Builder

**A high-performance, node-based visual programming interface powered by ReactFlow and FastAPI.**

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![React Flow](https://img.shields.io/badge/React_Flow-FF0072?style=for-the-badge&logo=react&logoColor=white)](https://reactflow.dev/)
[![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)](https://fastapi.tiangolo.com/)
[![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://python.org)

</div>

---

## 📖 Overview

The **VectorShift Pipeline Builder** is a highly interactive, drag-and-drop web application that allows users to construct complex directed graphs (pipelines). 

Built with scalability and maintainability in mind, the frontend utilizes a robust custom abstraction layer over **ReactFlow**, drastically reducing boilerplate. The backend is a lightning-fast **FastAPI** service responsible for graph analysis, including mathematical verification of **Directed Acyclic Graphs (DAG)** using Kahn's algorithm.

---

## ✨ Key Features

- **🎨 Modern Glassmorphic UI**: A dark-themed, premium interface with smooth micro-animations, custom CSS variables, and a highly polished design system.
- **🧩 Universal `BaseNode` Abstraction**: A single, powerful React component that drives 9 distinct node types declaratively, eliminating code duplication.
- **⚡ Dynamic Variable Extraction**: The Text Node uses Regex parsing to instantly detect `{{ variable }}` syntax as you type, generating responsive ReactFlow handles on the fly.
- **🔄 Real-time DAG Verification**: Submit your pipeline to the Python backend to instantly compute topological structures, edge/node counts, and mathematically verify if the graph is acyclic.
- **🔌 9 Versatile Node Types**: Includes Input, Output, LLM, Text, Note, API, Timer, Condition, and Math nodes.

---

## 🏛️ Architectural Deep Dive

### 1. Frontend: The `BaseNode` Engine

Instead of maintaining separate React components for every node type, this architecture utilizes a unified `BaseNode`. Nodes are defined purely through **declarative configuration objects**.

```javascript
// Example of how a node is defined via the abstraction
<BaseNode
  id={id}
  label="Condition Node"
  icon="⚖️"
  handles={[
    { type: 'target', position: Position.Left, id: `${id}-value` },
    { type: 'source', position: Position.Right, id: `${id}-true` },
    { type: 'source', position: Position.Right, id: `${id}-false` }
  ]}
  fields={[
    { name: 'conditionType', type: 'select', label: 'Condition', options: ['Equals', 'Contains', 'Greater Than'] },
    { name: 'compareValue', type: 'text', label: 'Value' }
  ]}
/>
```
**Benefits:**
- **O(1) Scaling**: Adding a new node type takes 2 minutes instead of 20.
- **Centralized State**: The `BaseNode` uses a generalized reducer to manage form state, dispatching updates to the global Zustand store automatically.

### 2. Backend: Graph Theory & DAG Detection

The backend does more than just receive data; it analyzes the topology of the pipeline graph. 
When the frontend submits the pipeline via `POST /pipelines/parse`, the backend parses the JSON payload into an Adjacency List and executes **Kahn's Algorithm** (a BFS-based topological sort) to detect cycles.

```python
# snippet from main.py
def is_dag(nodes: List[Node], edges: List[Edge]) -> bool:
    # 1. Build Adjacency List & In-Degree Map
    # 2. Seed Queue with In-Degree 0 nodes
    # 3. BFS Traversal
    # 4. If visited count == total nodes, it's a DAG!
    return visited_count == len(node_ids)
```

---

## 📁 System Design

```text
vectorshift_assignment/
├── frontend/                  # React + ReactFlow Application
│   ├── src/
│   │   ├── nodes/             # Contains the 9 node types & BaseNode
│   │   ├── store.js           # Zustand state management
│   │   ├── index.css          # Design System tokens & global styles
│   │   └── submit.js          # REST integration with backend
│   └── package.json           
│
└── backend/                   # FastAPI Python Server
    └── main.py                # DAG computation logic & API endpoints
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v16+)
- **Python** (v3.8+)

### 1️⃣ Start the Backend
Navigate to the `backend` directory, install FastAPI and Uvicorn, and start the server:
```bash
cd backend
pip install fastapi uvicorn pydantic
uvicorn main:app --reload
```
*The backend will now be running on http://127.0.0.1:8000*

### 2️⃣ Start the Frontend
Open a new terminal, navigate to the `frontend` directory, install dependencies, and start the React app:
```bash
cd frontend
npm install
npm start
```
*The frontend will launch at http://localhost:3000*

---

## 🎮 Usage Guide

1. **Drag and Drop**: Open the sidebar panel and drag any of the 9 available nodes onto the infinite canvas.
2. **Connect**: Click and drag from a node's output handle (right side) to another node's input handle (left side).
3. **Configure**: Use the inline form controls (inputs, dropdowns) on the nodes to configure their behavior.
4. **Dynamic Variables**: Add a Text Node and type `Hello {{ name }}`. Watch as a new input handle dynamically appears on the left side of the node!
5. **Run Analysis**: Click the **Submit** button in the top right. The UI will send the graph to the backend and present a sleek modal displaying the total nodes, edges, and whether your pipeline is a valid Directed Acyclic Graph (DAG).

---

<div align="center">
  <i>Engineered with precision for VectorShift.</i>
</div>
