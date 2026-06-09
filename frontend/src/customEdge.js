import { getSmoothStepPath, EdgeLabelRenderer, BaseEdge } from 'reactflow';
import { useStore } from './store';

export const CustomEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
}) => {
  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const removeEdge = useStore((state) => state.removeEdge);

  return (
    <>
      <BaseEdge path={edgePath} markerEnd={markerEnd} style={style} />
      <EdgeLabelRenderer>
        <div
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
            fontSize: 12,
            pointerEvents: 'all',
          }}
          className="edge-button-container"
        >
          <button
            className="edge-delete-btn"
            onClick={(event) => {
              event.stopPropagation();
              removeEdge(id);
            }}
          >
            ×
          </button>
        </div>
      </EdgeLabelRenderer>
    </>
  );
};
