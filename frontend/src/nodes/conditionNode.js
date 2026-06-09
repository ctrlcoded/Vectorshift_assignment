// conditionNode.js
import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const ConditionNode = ({ id, data }) => {
  const [operator, setOperator] = useState(data?.operator || '==');
  const [value, setValue] = useState(data?.value || '');

  const handles = [
    { type: 'target', position: Position.Left, id: `${id}-input` },
    { type: 'source', position: Position.Right, id: `${id}-true`, style: { top: '30%' } },
    { type: 'source', position: Position.Right, id: `${id}-false`, style: { top: '70%' } }
  ];

  return (
    <BaseNode id={id} label="Condition" icon="⑂" accentColor="var(--node-condition)" handles={handles}>
      <label>
        Operator:
        <select value={operator} onChange={(e) => setOperator(e.target.value)}>
          <option value="==">==</option>
          <option value="!=">!=</option>
          <option value=">">&gt;</option>
          <option value="<">&lt;</option>
        </select>
      </label>
      <label>
        Value:
        <input type="text" value={value} onChange={(e) => setValue(e.target.value)} />
      </label>
    </BaseNode>
  );
}
