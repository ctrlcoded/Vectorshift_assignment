// mathNode.js
import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const MathNode = ({ id, data }) => {
  const [operation, setOperation] = useState(data?.operation || 'add');

  const handles = [
    { type: 'target', position: Position.Left, id: `${id}-a`, style: { top: '30%' } },
    { type: 'target', position: Position.Left, id: `${id}-b`, style: { top: '70%' } },
    { type: 'source', position: Position.Right, id: `${id}-output` }
  ];

  return (
    <BaseNode id={id} label="Math" icon="Σ" accentColor="var(--node-math)" handles={handles}>
      <label>
        Operation:
        <select value={operation} onChange={(e) => setOperation(e.target.value)}>
          <option value="add">Add (+)</option>
          <option value="subtract">Subtract (-)</option>
          <option value="multiply">Multiply (*)</option>
          <option value="divide">Divide (/)</option>
        </select>
      </label>
    </BaseNode>
  );
}
