// submit.js
import { useState } from 'react';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
});

export const SubmitButton = () => {
  const { nodes, edges } = useStore(selector, shallow);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:8000/pipelines/parse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nodes, edges }),
      });

      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err.message || 'Failed to connect to backend');
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setResult(null);
    setError(null);
  };

  return (
    <>
      <div className="fab-container">
        <button
          className="fab-btn"
          type="button"
          onClick={handleSubmit}
          disabled={loading}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="5 3 19 12 5 21 5 3"></polygon>
          </svg>
          {loading ? 'Running…' : 'Run Pipeline'}
        </button>
      </div>

      {/* Results Modal */}
      {(result || error) && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            {error ? (
              <>
                <div className="modal-title">Error</div>
                <div style={{ color: '#ef4444', fontSize: '14px', marginBottom: '12px' }}>
                  {error}
                </div>
              </>
            ) : (
              <>
                <div className="modal-title">Pipeline Analysis</div>
                <div className="modal-stat">
                  <span className="modal-stat-label">Nodes</span>
                  <span className="modal-stat-value">{result.num_nodes}</span>
                </div>
                <div className="modal-stat">
                  <span className="modal-stat-label">Edges</span>
                  <span className="modal-stat-value">{result.num_edges}</span>
                </div>
                <div className="modal-stat">
                  <span className="modal-stat-label">DAG</span>
                  <span className={`modal-stat-value ${result.is_dag ? 'dag-yes' : 'dag-no'}`}>
                    {result.is_dag ? 'Healthy ✓' : 'Cycle Detected ✗'}
                  </span>
                </div>
              </>
            )}
            <button className="modal-close-btn" onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};
