import React, { useEffect, useState } from 'react';
import ProductCard from "../components/common/ProductCard";
import './CSS/ProductsPage.css';
import { productService } from "../services/productService";
import img1 from "../Images/img-1.jpg";

function ProductsPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;
        const fetchProducts = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await productService.getAllProducts();
                // Asegurar imagen por defecto si no viene del API
                const withImages = (Array.isArray(data) ? data : []).map(p => ({
                    ...p,
                    imageUrl: p.imageUrl || img1,
                }));
                if (isMounted) setProducts(withImages);
            } catch (err) {
                console.error('Failed to load products:', err);
                if (isMounted) setError('No se pudieron cargar los productos.');
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        fetchProducts();
        return () => { isMounted = false; };
    }, []);

    return (
        <div className="products-page-container">
            <h1 style={{ color: 'white', textAlign: 'center' }}>
                Menu de panes Wum bao
            </h1>

            {loading && (
                <p style={{ color: 'white', textAlign: 'center' }}>Cargando productos…</p>
            )}
            {error && (
                <p style={{ color: 'tomato', textAlign: 'center' }}>{error}</p>
            )}

            {!loading && !error && (
                <div className="bread-grid">
                    {products.map(product => (
                        <ProductCard
                            key={product.idProducto}
                            idProducto={product.idProducto}
                            nombre={product.nombre}
                            precio={product.precio}
                            descripcion={product.descripcion}
                            imageUrl={product.imageUrl || img1}
                            stock={product.stock}
                            onAdd={() => {}}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default ProductsPage;
