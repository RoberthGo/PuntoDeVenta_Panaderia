import React from 'react';
import './MainContent.css';

function MainContent({children}) {
    return (
        <div className="main-content-wrapper">
            <div className="page-section">
                {children}
            </div>
        </div>
    );
}

export default MainContent;
