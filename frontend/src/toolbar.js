import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {

    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <h2 className="sidebar-title">Node Library</h2>
                <div className="sidebar-subtitle">Drag to Canvas</div>
            </div>
            
            <div className="sidebar-nodes">
                <DraggableNode type='customInput' label='Input Data' />
                <DraggableNode type='llm' label='LLM Processor' />
                <DraggableNode type='customOutput' label='Output' />
                <DraggableNode type='api' label='API Call' />
                <DraggableNode type='text' label='Text Logic' />
                <DraggableNode type='condition' label='Condition' />
                <DraggableNode type='math' label='Math Op' />
                <DraggableNode type='timer' label='Timer' />
                <DraggableNode type='note' label='Sticky Note' />
            </div>

            <div className="sidebar-footer">
                <button className="btn-ghost">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                    Create Custom Node
                </button>
            </div>
        </aside>
    );
};
