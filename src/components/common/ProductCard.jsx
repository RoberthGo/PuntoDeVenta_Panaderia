import React from 'react';
import './CSS/ProductCard.css';

function ProductCard({ idProducto, nombre, precio, descripcion, imageUrl, stock, onAdd }) {

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
        >
            {/* Badge de cantidad/estado */}
            <div className="product-badge">
                {!isAvailable ? (
                    <span className="badge-soldout">AGOTADO</span>
                ) : (
                    <span className="badge-id">{idProducto}</span>
                )}
            </div>

            {/* Overlay con descripción al hover - cubre toda la tarjeta */}
            {descripcion && (
                <div className="product-overlay">
                    <div className="overlay-content">
                        <span className="overlay-title">📋 Descripción</span>
                        <div className="overlay-text-container">
                            <p className="overlay-text">{descripcion}</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Imagen del producto */}
            <div className="product-image-wrapper">
                <img src={imageUrl} alt={nombre} className="product-image" />
            </div>

            {/* Info del producto */}
            <div className="product-details">
                <h3 className="product-name">{nombre}</h3>
                <span className="product-price">${precio?.toFixed(2)}</span>
            </div>

            {/* Footer con stock */}
            <div className="product-footer">
                <div className="stock-info">
                    <span className={`stock-dot ${stock > 10 ? 'high' : stock > 0 ? 'low' : 'out'}`}></span>
                    <span className="stock-text">Stock: {stock}</span>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;
