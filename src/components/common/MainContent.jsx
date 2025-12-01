import React from 'react';
import './CSS/MainContent.css';

/**
 * Contenedor principal del contenido.
 * Envuelve el contenido de cada página con estilos consistentes.
 * @param {Object} props
 * @param {React.ReactNode} props.children - Contenido a renderizar
 * @returns {JSX.Element}
 */
function MainContent({ children }) {
    return (
        <div className="main-content-wrapper">
            <div className="page-section">
                {children}
            </div>
        </div>
    );
}

export default MainContent;
