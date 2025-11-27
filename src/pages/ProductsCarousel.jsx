import { useState } from "react";
import React from 'react';
import ProductCard from "../components/common/ProductCard";
import BreadButton from "../components/common/BreadButton";
import "./ProductsCarousel.css";

function ProductsCarousel() {
    const [scrollPosition, setScrollPosition] = useState(0);
    const itemWidth = 200; // Approximate width including gap
    const visibleItems = 5; // Number of items visible at once

    const handleScrollLeft = () => {
        setScrollPosition(prev => Math.max(prev - itemWidth, 0));
    };

    const handleScrollRight = () => {
        const maxScroll = (PRODUCTOS_MOCK.length - visibleItems) * itemWidth;
        setScrollPosition(prev => Math.min(prev + itemWidth, maxScroll));
    };

    return (
        <div className="products-page-container">
            <div className="carousel-container">
                <button 
                    className="carousel-arrow carousel-arrow-left" 
                    onClick={handleScrollLeft}
                    disabled={scrollPosition === 0}
                >
                    &#8249;
                </button>
                
                <div className="bread-carousel">
                    <div 
                        className="bread-carousel-track" 
                        style={{ transform: `translateX(-${scrollPosition}px)` }}
                    >
                        {PRODUCTOS_MOCK.map(product => (
                            <ProductCard 
                                key={product.idProducto}
                                idProducto={product.idProducto}
                                nombre={product.nombre}
                                precio={product.precio}
                                weight={product.weight}
                                descripcion={product.descripcion}
                                imageUrl={product.imageUrl}
                                stock={product.stock}
                            />
                        ))}
                    </div>
                </div>

                <button 
                    className="carousel-arrow carousel-arrow-right" 
                    onClick={handleScrollRight}
                    disabled={scrollPosition >= (PRODUCTOS_MOCK.length - visibleItems) * itemWidth}
                >
                    &#8250;
                </button>
            </div>

        </div>
    );
}

export default ProductsCarousel;