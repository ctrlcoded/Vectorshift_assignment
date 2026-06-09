import React, { useEffect } from 'react';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';

const selector = (state) => ({
    undo: state.undo,
    redo: state.redo,
    history: state.history,
    future: state.future,
});

export const Topbar = () => {
    const { undo, redo, history, future } = useStore(selector, shallow);

    const canUndo = history.length > 0;
    const canRedo = future.length > 0;

    useEffect(() => {
        const handleKeyDown = (e) => {
            const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
            const cmdOrCtrl = isMac ? e.metaKey : e.ctrlKey;
            
            if (cmdOrCtrl && !e.shiftKey && e.key.toLowerCase() === 'z') {
                e.preventDefault();
                if (canUndo) undo();
            } else if (cmdOrCtrl && e.shiftKey && e.key.toLowerCase() === 'z') {
                e.preventDefault();
                if (canRedo) redo();
            } else if (cmdOrCtrl && e.key.toLowerCase() === 'y') {
                e.preventDefault();
                if (canRedo) redo();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [canUndo, canRedo, undo, redo]);

    return (
        <header className="topbar">
            <div className="topbar-brand">
                Pipeline <span className="accent">Builder</span>
            </div>
            
            <nav className="topbar-nav">
                <div className="topbar-nav-link active">Canvas</div>
                <div className="topbar-nav-link">Library</div>
                <div className="topbar-nav-link">Monitors</div>
                <div className="topbar-nav-link">Deployments</div>
            </nav>

            <div className="topbar-actions">
                {/* Undo Button */}
                <button 
                    className="icon-btn" 
                    onClick={undo} 
                    disabled={!canUndo} 
                    title="Undo (Ctrl+Z)"
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="15 14 10 9 15 4"></polyline>
                        <path d="M10 9h5a5 5 0 0 1 5 5 5 5 0 0 1-5 5"></path>
                    </svg>
                </button>
                {/* Redo Button */}
                <button 
                    className="icon-btn" 
                    onClick={redo} 
                    disabled={!canRedo} 
                    title="Redo (Ctrl+Y)"
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 14 14 9 9 4"></polyline>
                        <path d="M14 9H9a5 5 0 0 0-5 5 5 5 0 0 0 5 5"></path>
                    </svg>
                </button>

                <div style={{width: '1px', height: '20px', background: 'var(--border-subtle)', margin: '0 8px'}}></div>

                <button className="icon-btn">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="3" y1="9" x2="21" y2="9"></line>
                        <line x1="9" y1="21" x2="9" y2="9"></line>
                    </svg>
                </button>
                <button className="icon-btn">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="3"></circle>
                        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                    </svg>
                </button>
                <button className="icon-btn">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                        <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                    </svg>
                </button>
                <div className="avatar">U</div>
            </div>
        </header>
    );
};
