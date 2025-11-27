import React from 'react';
import './ProductCard.css';
import BreadButton from './BreadButton';

function ProductCard({ nombre, precio, weight, descripcion, imageUrl, stock }) {

    // Datos básicos para mostrar (sin lógica ni eventos)
    const isAvailable = stock > 0;

    return (
        <div 
            className={`product-card ${!isAvailable ? 'unavailable' : ''}`}
        >
            <div className="product-info-top">
                {/* Etiqueta simple */}
                <span className="product-label">
                    {!isAvailable ? 'AGOTADO' : 'DISPONIBLE'}
                </span>

                {/* Popup estático solo para visualizar */}
                {descripcion && (
                    <div className="ingredients-popup">
                        <p className="popup-text">
                            <strong>Descripción:</strong> {descripcion}
                        </p>
                    </div>
                )}
            </div>

            {/* Imagen y nombre */}
            <div className="product-image-container">
                <img src={imageUrl} alt={nombre} className="product-image" />

                <div className="product-name">
                    {nombre}
                </div>

                <div className="product-price">
                    ${precio?.toFixed(2)}
                </div>
            </div>

            {/* Parte inferior: peso o stock + botón dummy */}
            <div className="product-actions-bottom">
                <span className="product-weight">{weight || `Stock: ${stock}`}</span>

                <div className="add-button-container">
                    <button 
                        className={`add-button ${!isAvailable ? 'disabled' : ''}`} 
                        disabled={!isAvailable}
                    >
                        Add
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;
