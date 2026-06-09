# main.py
# FastAPI backend for the VectorShift Pipeline Builder.
# Provides a POST /pipelines/parse endpoint that:
#   1. Counts total nodes and edges
#   2. Determines if the pipeline graph is a DAG (using Kahn's topological sort)

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from collections import defaultdict, deque

app = FastAPI()

# Allow the React dev server to communicate with this backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# --- Request / Response Models ---

class Node(BaseModel):
    id: str

    class Config:
        extra = "allow"   # Accept any additional fields from React Flow


class Edge(BaseModel):
    source: str
    target: str

    class Config:
        extra = "allow"


class PipelineRequest(BaseModel):
    nodes: List[Node]
    edges: List[Edge]


class PipelineResponse(BaseModel):
    num_nodes: int
    num_edges: int
    is_dag: bool


# --- Helpers ---

def is_dag(nodes: List[Node], edges: List[Edge]) -> bool:
    """
    Determine whether the graph is a Directed Acyclic Graph using
    Kahn's algorithm (BFS-based topological sort).
    Returns True if no cycles are detected.
    """
    node_ids = {n.id for n in nodes}
    in_degree = defaultdict(int)
    adjacency = defaultdict(list)

    # Initialise in-degree for every known node
    for nid in node_ids:
        in_degree[nid] = in_degree.get(nid, 0)

    for edge in edges:
        adjacency[edge.source].append(edge.target)
        in_degree[edge.target] += 1

    # Seed the queue with all zero-in-degree nodes
    queue = deque([nid for nid in node_ids if in_degree[nid] == 0])
    visited_count = 0

    while queue:
        node = queue.popleft()
        visited_count += 1
        for neighbour in adjacency[node]:
            in_degree[neighbour] -= 1
            if in_degree[neighbour] == 0:
                queue.append(neighbour)

    # If we visited every node, no cycle exists → it's a DAG
    return visited_count == len(node_ids)


# --- Routes ---

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}


@app.post('/pipelines/parse')
def parse_pipeline(pipeline: PipelineRequest) -> PipelineResponse:
    return PipelineResponse(
        num_nodes=len(pipeline.nodes),
        num_edges=len(pipeline.edges),
        is_dag=is_dag(pipeline.nodes, pipeline.edges),
    )
