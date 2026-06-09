// textNode.js
// Text node with auto-resizing textarea and dynamic variable handle generation.
// Variables wrapped in {{ }} are parsed and rendered as input handles on the left.

import { useState, useRef, useEffect, useMemo } from 'react';
import { Handle, Position } from 'reactflow';
import { BaseNode } from './BaseNode';

// Regex to match {{ variableName }} patterns
const VAR_REGEX = /{{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*}}/g;

/**
 * Extract unique, valid JS-identifier variable names from text.
 * @param {string} text - The text to parse.
 * @returns {string[]} - Array of unique variable names.
 */
const extractVariables = (text) => {
  const vars = [];
  let match;
  while ((match = VAR_REGEX.exec(text)) !== null) {
    if (!vars.includes(match[1])) {
      vars.push(match[1]);
    }
  }
  return vars;
};

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const textareaRef = useRef(null);
  const measureRef = useRef(null);

  // Parse variables from current text
  const variables = useMemo(() => extractVariables(currText), [currText]);

  // Auto-resize: adjust textarea dimensions based on content
  useEffect(() => {
    const textarea = textareaRef.current;
    const measure = measureRef.current;
    if (!textarea || !measure) return;

    // Mirror content into the hidden measurement div
    measure.textContent = currText || ' ';

    // Compute desired dimensions from measurement div
    const width = Math.max(180, measure.scrollWidth + 24);
    const height = Math.max(40, measure.scrollHeight + 8);

    textarea.style.width = width + 'px';
    textarea.style.height = height + 'px';
  }, [currText]);

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };

  // Build handles: output on right + dynamic variable handles on left
  const outputHandle = { type: 'source', position: Position.Right, id: `${id}-output` };

  return (
    <BaseNode id={id} label="Text" icon="T" accentColor="var(--node-text)" handles={[outputHandle]}>
      {/* Hidden measurement div for auto-sizing */}
      <div
        ref={measureRef}
        style={{
          position: 'absolute',
          visibility: 'hidden',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
          fontFamily: "'Inter', sans-serif",
          fontSize: '12px',
          padding: '6px 10px',
          maxWidth: '400px',
          pointerEvents: 'none',
        }}
        aria-hidden="true"
      />

      <label>
        Text:
        <textarea
          ref={textareaRef}
          value={currText}
          onChange={handleTextChange}
          style={{
            resize: 'none',
            overflow: 'hidden',
            minWidth: '180px',
            minHeight: '40px',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
          }}
        />
      </label>

      {/* Dynamic variable handles on the left */}
      {variables.length > 0 && (
        <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '2px' }}>
          Variables: {variables.join(', ')}
        </div>
      )}
      {variables.map((varName, index) => (
        <Handle
          key={`${id}-var-${varName}`}
          type="target"
          position={Position.Left}
          id={`${id}-${varName}`}
          style={{ top: `${((index + 1) / (variables.length + 1)) * 100}%` }}
        />
      ))}
    </BaseNode>
  );
};
