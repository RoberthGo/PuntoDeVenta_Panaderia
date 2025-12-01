import { useEffect, useState } from "react";
import ProductCard from "../components/common/ProductCard";
import Table from "../components/common/TableProducts";
import "./CSS/SalesPage.css";
import { productService } from "../services/productService";
import { salesService } from "../services/salesService";
import { authService } from "../services/authService";

import img1 from "../Images/img-1.jpg";

/**
 * Página principal de ventas.
 * Muestra productos disponibles y permite agregarlos al carrito.
 * @returns {JSX.Element}
 */
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
                const withImages = (Array.isArray(data) ? data : []).map(p => {
                    let imageUrl = img1;
                    
                    if (p.imagen) {
                        if (typeof p.imagen === 'string' && p.imagen.startsWith('data:image')) {
                            imageUrl = p.imagen;
                        } else if (typeof p.imagen === 'string') {
                            imageUrl = `data:image/jpeg;base64,${p.imagen}`;
                        }
                    } else if (p.imagenBase64) {
                        if (p.imagenBase64.startsWith('data:image')) {
                            imageUrl = p.imagenBase64;
                        } else {
                            imageUrl = `data:image/jpeg;base64,${p.imagenBase64}`;
                        }
                    } else if (p.imageUrl) {
                        imageUrl = p.imageUrl;
                    }
                    
                    return {
                        ...p,
                        imageUrl: imageUrl,
                    };
                });
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

    /** @param {number} idProducto - ID del producto a agregar al carrito */
    const handleAddToCart = (idProducto) => {
        const product = productos.find(p => p.idProducto === idProducto);
        if (!product || product.stock <= 0) {
            return;
        }

        setProductos(prev =>
            prev.map(p =>
                p.idProducto === idProducto && p.stock > 0
                    ? { ...p, stock: p.stock - 1 }
                    : p
            )
        );

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

    /** 
     * Quita 1 unidad del producto del carrito (click izquierdo)
     * @param {number} idProducto - ID del producto
     */
    const handleRemoveOneFromCart = (idProducto) => {
        setProductos(prev =>
            prev.map(p =>
                p.idProducto === idProducto ? { ...p, stock: p.stock + 1 } : p
            )
        );

        setCartItems(prev => {
            const itemInPrev = prev.find(i => i.idProducto === idProducto);
            if (!itemInPrev) return prev;

            if (itemInPrev.cantidad > 1) {
                return prev.map(i =>
                    i.idProducto === idProducto ? { ...i, cantidad: i.cantidad - 1 } : i
                );
            }

            return prev.filter(i => i.idProducto !== idProducto);
        });
    };

    /** 
     * Quita todo el producto del carrito (click derecho)
     * @param {number} idProducto - ID del producto
     * @param {number} cantidad - Cantidad a devolver al stock
     */
    const handleRemoveAllFromCart = (idProducto, cantidad) => {
        setProductos(prev =>
            prev.map(p =>
                p.idProducto === idProducto ? { ...p, stock: p.stock + cantidad } : p
            )
        );

        setCartItems(prev => prev.filter(i => i.idProducto !== idProducto));
    };

    /** Valida y procesa la venta actual */
    const handleFinalizeSale = async () => {
        if (cartItems.length === 0) {
            alert('El carrito está vacío. Agrega productos antes de finalizar la venta.');
            return;
        }

        const idEmpleado = authService.getUserId();
        if (!idEmpleado) {
            alert('Error: No se pudo identificar al empleado. Por favor, inicia sesión nuevamente.');
            return;
        }

        for (const item of cartItems) {
            if (!item.idProducto || item.idProducto <= 0) {
                alert('Error: Producto inválido en el carrito.');
                return;
            }
            if (!item.cantidad || item.cantidad <= 0) {
                alert('Error: Cantidad inválida para el producto ' + item.nombre);
                return;
            }
            if (!item.precio || item.precio <= 0) {
                alert('Error: Precio inválido para el producto ' + item.nombre);
                return;
            }
        }

        try {
            const saleData = {
                idEmpleado: idEmpleado,
                productos: cartItems.map(item => ({
                    idProducto: item.idProducto,
                    cantidad: item.cantidad,
                    precioUnitario: item.precio
                }))
            };

            const response = await salesService.createSale(saleData);
            console.log('Venta registrada exitosamente:', response);
            alert('¡Venta finalizada con éxito!');
            
            setCartItems([]);
            
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
                    onRemoveOne={handleRemoveOneFromCart}
                    onRemoveAll={handleRemoveAllFromCart}
                    onFinalizeSale={handleFinalizeSale}
                />
            </div>
        </div>
    );
}

export default Main;
