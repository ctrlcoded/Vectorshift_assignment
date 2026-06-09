// draggableNode.js
// A single draggable chip in the sidebar representing a node type.

const nodeIcons = {
  customInput: { icon: '→]', color: 'var(--node-input)' },
  customOutput: { icon: '[→', color: 'var(--node-output)' },
  llm: { icon: '✦', color: 'var(--node-llm)' },
  text: { icon: 'T', color: 'var(--node-text)' },
  note: { icon: '✎', color: 'var(--node-note)' },
  api: { icon: '❖', color: 'var(--node-api)' },
  timer: { icon: '⏱', color: 'var(--node-timer)' },
  condition: { icon: '⑂', color: 'var(--node-condition)' },
  math: { icon: 'Σ', color: 'var(--node-math)' },
};

export const DraggableNode = ({ type, label }) => {
  const meta = nodeIcons[type] || { icon: '•', color: '#888' };

  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };
    event.target.style.cursor = 'grabbing';
    event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      className="draggable-node"
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => (event.target.style.cursor = 'grab')}
      draggable
    >
      <div
        className="draggable-node-icon"
        style={{ color: meta.color }}
      >
        {meta.icon}
      </div>
      <span>{label}</span>
    </div>
  );
};