import React from 'react';

export const StatusBar = () => {
    return (
        <footer className="status-bar">
            <div className="status-left">
                © 2024 NeuralPipeline v2.0
            </div>
            <div className="status-right">
                <div className="status-indicator">
                    <div className="status-dot"></div>
                    Status: Healthy
                </div>
                <div>v2.0.4-stable</div>
            </div>
        </footer>
    );
};
