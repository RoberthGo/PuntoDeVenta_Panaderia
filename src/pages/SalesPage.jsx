import { useEffect, useState } from "react";
import ProductCard from "../components/common/ProductCard";
import Table from "../components/common/TableProducts";
import "./CSS/SalesPage.css";
import { productService } from "../services/productService";
import { salesService } from "../services/salesService";

import img1 from "../Images/img-1.jpg";

function Main() {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        let isMounted = true;
        const fetchProducts = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await productService.getAllProducts();
                const withImages = (Array.isArray(data) ? data : []).map(p => ({
                    ...p,
                    imageUrl: p.imageUrl || img1,
                }));
                if (isMounted) setProductos(withImages);
            } catch (err) {
                console.error('Failed to load products for SalesPage:', err);
                if (isMounted) setError('No se pudieron cargar los productos.');
            } finally {
                if (isMounted) setLoading(false);
            }
        };
        fetchProducts();
        return () => { isMounted = false; };
    }, []);

    const handleAddToCart = (idProducto) => {
        // Verificar stock disponible primero
        const product = productos.find(p => p.idProducto === idProducto);
        if (!product || product.stock <= 0) {
            return;
        }

        // Reducir stock localmente
        setProductos(prev =>
            prev.map(p =>
                p.idProducto === idProducto && p.stock > 0
                    ? { ...p, stock: p.stock - 1 }
                    : p
            )
        );

        // Agregar a carrito o aumentar cantidad
        setCartItems(prevCart => {
            const exists = prevCart.find(item => item.idProducto === idProducto);

            if (exists) {
                return prevCart.map(item =>
                    item.idProducto === idProducto
                        ? { ...item, cantidad: item.cantidad + 1 }
                        : item
                );
            }

            return [...prevCart, { ...product, cantidad: 1 }];
        });
    };

    const handleRemoveFromCart = (idProducto) => {
        // 1) Actualiza productos (regresa 1 al stock)
        setProductos(prev =>
        prev.map(p =>
            p.idProducto === idProducto ? { ...p, stock: p.stock + 1 } : p
        )
        );

        // 2) Actualiza carrito usando el estado previo (evita usar cartItems directamente)
        setCartItems(prev => {
        const itemInPrev = prev.find(i => i.idProducto === idProducto);
        if (!itemInPrev) return prev; // nada que hacer

        if (itemInPrev.cantidad > 1) {
            // decrementar cantidad
            return prev.map(i =>
            i.idProducto === idProducto ? { ...i, cantidad: i.cantidad - 1 } : i
            );
        }

        // si cantidad === 1 -> remover el item
        return prev.filter(i => i.idProducto !== idProducto);
        });
    };

    const handleFinalizeSale = async () => {
        if (cartItems.length === 0) {
            alert('El carrito está vacío. Agrega productos antes de finalizar la venta.');
            return;
        }

        try {
            // Transformar cartItems al formato requerido por la API
            const saleData = {
                idEmpleado: 1, // TODO: Obtener del contexto de autenticación
                productos: cartItems.map(item => ({
                    idProducto: item.idProducto,
                    cantidad: item.cantidad,
                    precioUnitario: item.precio
                }))
            };

            const response = await salesService.createSale(saleData);
            console.log('Venta registrada exitosamente:', response);
            alert('¡Venta finalizada con éxito!');
            
            // Limpiar el carrito después de la venta exitosa
            setCartItems([]);
            
            // Opcional: Recargar productos para actualizar stock desde el servidor
            const data = await productService.getAllProducts();
            const withImages = (Array.isArray(data) ? data : []).map(p => ({
                ...p,
                imageUrl: p.imageUrl || img1,
            }));
            setProductos(withImages);
        } catch (err) {
            console.error('Error al finalizar la venta:', err);
            alert('Error al procesar la venta. Intenta nuevamente.');
        }
    };

    return (
        <div className="sales-page-container">
            <h1 style={{color: 'white', textAlign: 'center'}}> Menu de panes Wum bao</h1>

            {loading && (
                <p style={{ color: 'white', textAlign: 'center' }}>Cargando productos…</p>
            )}
            {error && (
                <p style={{ color: 'tomato', textAlign: 'center' }}>{error}</p>
            )}

            {!loading && !error && (
                <div className="bread-grid">
                    {productos.map(product => (
                        <ProductCard 
                            key={product.idProducto}
                            idProducto={product.idProducto}
                            nombre={product.nombre}
                            precio={product.precio}
                            descripcion={product.descripcion}
                            imageUrl={product.imageUrl || img1}
                            stock={product.stock}
                            onAdd={() => handleAddToCart(product.idProducto)}
                        />
                    ))}
                </div>
            )}

            <div className="seccion-tabla">
                <Table 
                    items={cartItems}
                    onRemove={handleRemoveFromCart}
                    onFinalizeSale={handleFinalizeSale}
                />
            </div>
        </div>
    );
}

export default Main;
