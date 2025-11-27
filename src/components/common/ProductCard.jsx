import React, { useState } from 'react';
import './ProductCard.css';
import BreadButton from './BreadButton';

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
        <div 
            className={`product-card ${isSelected ? 'selected' : ''} ${!isAvailable ? 'unavailable' : ''}`}
            onClick={handleInfoClick} 
        >
            <div className="product-info-top">
                <span className="product-label">
                    {!isAvailable ? 'AGOTADO' : 'DISPONIBLE'}
                </span>
                
                {descripcion && (
                    <div className="ingredients-popup">
                        <p className="popup-text">
                            **Descripción:** {descripcion}
                        </p>
                    </div>
                )}
            </div>

            <BreadButton 
                imageUrl={imageUrl} 
                name={nombre} 
                price={precio.toFixed(2)}
                weight={weight || `Stock: ${stock}`}
                onClick={handleInfoClick} 
            />
        </div>
    );
}

export default ProductCard;
    