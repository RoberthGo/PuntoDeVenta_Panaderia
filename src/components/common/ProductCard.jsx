import React from 'react';
import './CSS/ProductCard.css';

/**
 * Tarjeta de producto.
 * Muestra información del producto con imagen, precio y stock.
 * @param {Object} props
 * @param {number} props.idProducto - ID del producto
 * @param {string} props.nombre - Nombre del producto
 * @param {number} props.precio - Precio unitario
 * @param {string} props.descripcion - Descripción del producto
 * @param {string} props.imageUrl - URL de la imagen
 * @param {number} props.stock - Cantidad en stock
 * @param {Function} props.onAdd - Callback al agregar al carrito
 * @returns {JSX.Element}
 */
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
            <div className="product-badge">
                {!isAvailable ? (
                    <span className="badge-soldout">AGOTADO</span>
                ) : (
                    <span className="badge-id">{idProducto}</span>
                )}
            </div>

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

            <div className="product-image-wrapper">
                <img src={imageUrl} alt={nombre} className="product-image" />
            </div>

            <div className="product-details">
                <h3 className="product-name">{nombre}</h3>
                <span className="product-price">${precio?.toFixed(2)}</span>
            </div>

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
