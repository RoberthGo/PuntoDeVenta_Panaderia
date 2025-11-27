import React from 'react';
import './Header.css';

{/* Barra de navegacion horizontal o nav-bar @leneza41*/}
function Header({ sections, activeSectionId, onSectionClick }) {
    
    return (
        <header className="header">
            <h1 className="app-logo">Panaderia Wum bao</h1> {/* Título de la App */}
            <nav className="nav-list">
                {sections.map(section => (
                    <button 
                        key={section.id} 
                        className={`nav-item ${activeSectionId === section.id ? 'active' : ''}`}
                        onClick={() => onSectionClick(section.id)}
                    >
                        <span className="nav-icon"></span>
                        <span className="nav-text">{section.title}</span>
                    </button>
                ))}
            </nav>
        </header>
    );
}

export default Header;