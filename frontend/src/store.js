// store.js

import { create } from "zustand";
import {
    addEdge,
    applyNodeChanges,
    applyEdgeChanges,
    MarkerType,
} from 'reactflow';

export const useStore = create((set, get) => {
    const saveStateToHistory = () => {
        const { nodes, edges, history } = get();
        // Deep clone to prevent reference mutation issues
        const clonedNodes = JSON.parse(JSON.stringify(nodes));
        const clonedEdges = JSON.parse(JSON.stringify(edges));
        
        const newHistory = [...history, { nodes: clonedNodes, edges: clonedEdges }];
        if (newHistory.length > 50) newHistory.shift();
        
        set({ history: newHistory, future: [] });
    };

    return {
        nodes: [],
        edges: [],
        nodeIDs: {},
        history: [],
        future: [],
        
        undo: () => {
            const { history, future, nodes, edges } = get();
            if (history.length > 0) {
                const prevState = history[history.length - 1];
                set({
                    nodes: prevState.nodes,
                    edges: prevState.edges,
                    history: history.slice(0, -1),
                    future: [{ nodes, edges }, ...future]
                });
            }
        },
        
        redo: () => {
            const { history, future, nodes, edges } = get();
            if (future.length > 0) {
                const nextState = future[0];
                set({
                    nodes: nextState.nodes,
                    edges: nextState.edges,
                    history: [...history, { nodes, edges }],
                    future: future.slice(1)
                });
            }
        },

        getNodeID: (type) => {
            const newIDs = {...get().nodeIDs};
            if (newIDs[type] === undefined) {
                newIDs[type] = 0;
            }
            newIDs[type] += 1;
            set({nodeIDs: newIDs});
            return `${type}-${newIDs[type]}`;
        },
        
        addNode: (node) => {
            saveStateToHistory();
            set({
                nodes: [...get().nodes, node]
            });
        },
        
        onNodesChange: (changes) => {
            const isSignificant = changes.some(c => 
                c.type === 'remove' || 
                (c.type === 'position' && c.dragging === false)
            );
            
            if (isSignificant) {
                saveStateToHistory();
            }

            set({
                nodes: applyNodeChanges(changes, get().nodes),
            });
        },
        
        onEdgesChange: (changes) => {
            const isSignificant = changes.some(c => c.type === 'remove');
            
            if (isSignificant) {
                saveStateToHistory();
            }

            set({
                edges: applyEdgeChanges(changes, get().edges),
            });
        },
        
        onConnect: (connection) => {
            saveStateToHistory();
            set({
                edges: addEdge({...connection, type: 'custom', animated: true, markerEnd: {type: MarkerType.Arrow, height: '20px', width: '20px'}}, get().edges),
            });
        },
        
        updateNodeField: (nodeId, fieldName, fieldValue) => {
            saveStateToHistory();
            set({
                nodes: get().nodes.map((node) => {
                    if (node.id === nodeId) {
                        node.data = { ...node.data, [fieldName]: fieldValue };
                    }
                    return node;
                }),
            });
        },
        
        removeEdge: (edgeId) => {
            saveStateToHistory();
            set({
                edges: get().edges.filter((e) => e.id !== edgeId)
            });
        },
    };
});
