import React, { useState } from 'react';
import './ProductCard.css';

function ProductCard({  idProducto, nombre, precio, weight, descripcion, imageUrl, stock }) {
    const [isSelected, setIsSelected] = useState(false);

    const isAvailable = stock > 0;

    const handleAddClick =(e) =>{
        e.stopPropagation();
        if(!isAvailable){
            alert(`El producto ${nombre} esta agotado.`);
            return;
        }
        console.log(`Agregando ${nombre} (ID: ${idProducto}) al carrito.`);
        setIsSelected(!isSelected); 
    };

    const handleInfoClick = () => {
        alert(`Información:\n${nombre} - $${precio.toFixed(2)}\nDescripción: ${descripcion || 'No hay descripción disponible'}\nStock: ${stock} unidades`);
    };

    return (
        <>
        <div 
            className={`product-card ${isSelected ? 'selected' : ''} ${!isAvailable ? 'unavailable' : ''}`}
            onClick={handleInfoClick} 
        >
            <div className="product-info-top">
                {/* Etiqueta de 'RECETA' o 'AGOTADO' */}
                <span className="product-label">
                    {!isAvailable ? 'AGOTADO' : descripcion ? 'INFO' : 'NUEVO'}
                </span>
                
                {/* Pop-up de Descripción/Ingredientes */}
                {descripcion && (
                    <div className="ingredients-popup">
                        <p className="popup-text">
                            **Descripción:** {descripcion}
                        </p>
                    </div>
                )}
            </div>

            {/* Componente principal de visualización del pan */}
            <BreadButton 
                imageUrl={imageUrl} 
                name={nombre} 
                price={precio.toFixed(2)} // Formateamos el precio
                onClick={handleInfoClick} 
            />

            <div className="product-actions-bottom">
                {/* Mostramos el peso si lo tienes, sino puedes mostrar el stock */}
                <span className="product-weight">{weight || `Stock: ${stock}`}</span>
                
                {/* Testing */}
                {/* Botón de 'Add' o el ícono de 'Check' */}
                <div className="add-button-container">
                    {isSelected ? (
                        <span className="check-mark">✔️</span> 
                    ) : (
                        <button 
                            className={`add-button ${!isAvailable ? 'disabled' : ''}`} 
                            onClick={handleAddClick} 
                            disabled={!isAvailable}
                        >
                            {isAvailable ? 'Add' : '—'}
                        </button>
                    )}
                </div>
            </div>
            
        </div>
        </>
    );
}

export default ProductCard;
    