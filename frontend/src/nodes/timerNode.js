// timerNode.js
import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const TimerNode = ({ id, data }) => {
  const [delay, setDelay] = useState(data?.delay || 1000);

  const handles = [
    { type: 'target', position: Position.Left, id: `${id}-input` },
    { type: 'source', position: Position.Right, id: `${id}-output` }
  ];

  return (
    <BaseNode id={id} label="Timer" icon="⏱" accentColor="var(--node-timer)" handles={handles}>
      <label>
        Delay (ms):
        <input type="number" value={delay} onChange={(e) => setDelay(e.target.value)} />
      </label>
    </BaseNode>
  );
}
