import React from 'react';
import './MainContent.css';

{/* Contenedor principal que muestra las secciones de la pagina @leneza41*/}
function MainContent({ sections, activeIndex }) {
    
    // Calcula la cantidad de desplazamiento necesaria. 
    // Por ejemplo: si activeIndex es 1, se desplaza -100% (una página completa)
    const transformValue = `translateX(-${activeIndex * 100}%)`;

    return (
        // El contenedor que oculta el overflow
        <div className="main-content-wrapper"> 
            {/* El contenedor interior que se desplaza */}
            <div 
                className="page-slider" 
                style={{ transform: transformValue, width: `${sections.length * 100}vw` }} 
            >
                {sections.map(section => {
                    const Component = section.component;
                    return (
                        // Cada página ocupa exactamente el 100% del área visible
                        <div key={section.id} className="page-section">
                            <Component />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default MainContent;