import React from 'react';
import './Sidebar.css';

{/* Barra de navegacion o nav-bar @leneza41*/}
function Sidebar({ sections, activeSectionId, onSectionClick }) {
    
    // Un simple mapa de iconos de ejemplo (reemplaza con tu librería de iconos)
    const getIcon = (id) => {
        const icons = {
            ventas: '🛒',
            productos: '📦',
            grafico: '📊',
            historial: '📜',
            empleados: '👥',
            auditoria: '🔒',
        };
        return icons[id] || '⚙️';
    };
    
    return (
        <nav className="sidebar">
            <h1 className="app-logo">Panaderia Wum bao</h1> {/* Título de la App como en la imagen */}
            <ul className="nav-list">
                {sections.map(section => (
                    <li 
                        key={section.id} 
                        className={`nav-item ${activeSectionId === section.id ? 'active' : ''}`}
                        onClick={() => onSectionClick(section.id)}
                    >
                        <span className="nav-icon">{getIcon(section.id)}</span>
                        {section.title}
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default Sidebar;