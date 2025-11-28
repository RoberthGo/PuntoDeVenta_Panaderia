import React from 'react';
import './CSS/ProductCard.css';

function ProductCard({ idProducto, nombre, precio, descripcion, imageUrl, stock, onAdd }) {

    // Datos básicos para mostrar (sin lógica ni eventos)
    const isAvailable = stock > 0;

    const handleCardClick = () => {
        if (isAvailable && onAdd) {
            onAdd();
        }
    };

    return (
        <div 
            className={`product-card ${!isAvailable ? 'unavailable' : ''}`}
            onClick={handleCardClick}
            style={{ cursor: isAvailable ? 'pointer' : 'not-allowed' }}
        >
            <div className="product-info-top">
                {/* Etiqueta simple */}
                <span className="product-label">
                    {!isAvailable ? 'AGOTADO' : descripcion ? idProducto : 'NUEVO'}
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
                <span className="product-weight">Stock: {stock}</span>

                <div className="add-button-container">
                    <button 
                        className={`add-button ${!isAvailable ? 'disabled' : ''}`} 
                        disabled={!isAvailable}
                        onClick={(e) => {
                            e.stopPropagation();
                            onAdd();
                        }}
                    >
                        Add
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;
