// BaseNode.js
// Reusable base abstraction for all pipeline nodes.
// Renders a glassmorphic card with a colored accent bar, icon header, handles, and children.

import { Handle } from 'reactflow';

export const BaseNode = ({ id, label, icon, accentColor, handles = [], children, style }) => {
  return (
    <div
      className="base-node"
      style={{ '--node-accent': accentColor, ...style }}
    >
      {/* Handles */}
      {handles.map((h, index) => (
        <Handle
          key={`${id}-handle-${index}`}
          type={h.type}
          position={h.position}
          id={h.id}
          style={h.style}
        />
      ))}

      {/* Header */}
      <div className="base-node-header">
        {icon && (
          <div className="base-node-header-icon">
            {icon}
          </div>
        )}
        <span className="base-node-header-label">{label}</span>
      </div>

      {/* Body (form controls, etc.) */}
      <div className="base-node-body">
        {children}
      </div>
    </div>
  );
};
