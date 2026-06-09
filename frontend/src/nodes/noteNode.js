// noteNode.js
import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const NoteNode = ({ id, data }) => {
  const [note, setNote] = useState(data?.note || '');

  return (
    <BaseNode id={id} label="Note" icon="✎" accentColor="var(--node-note)" handles={[]}>
      <label>
        Text:
        <textarea 
          value={note} 
          onChange={(e) => setNote(e.target.value)}
          style={{ width: '90%', minHeight: '60px' }}
        />
      </label>
    </BaseNode>
  );
}
