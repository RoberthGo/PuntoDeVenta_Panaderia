import { useState } from "react";
import ProductCard from "../components/common/ProductCard";
import Table from "../components/common/TableProducts"
import "./CSS/SalesPage.css";

import img1 from "../Images/img-1.jpg";


// Datos simulados
const PRODUCTOS_MOCK = [
    {
        idProducto: 1,
        nombre: "Whole Grain Spelt",
        descripcion: null,
        precio: 6.00,
        stock: 15,
        costo: 3.50,
        imageUrl: img1,
    },
    {
        idProducto: 2,
        nombre: "Mt Ida Multigrain",
        descripcion: "Ingredientes: harina integral orgánica, agua filtrada, avena orgánica, cebada orgánica, levadura, sal.",
        precio: 6.00,
        stock: 10,
        costo: 3.00,
        imageUrl: img1,
    },
    {
        idProducto: 3,
        nombre: "Four Seed Whole Wheat",
        descripcion: null,
        precio: 5.00,
        stock: 22,
        costo: 2.50,
        imageUrl: img1,
    },
    {
        idProducto: 4,
        nombre: "Bagel Multigrain",
        descripcion: "Panecillos de granos múltiples.",
        precio: 3.00,
        stock: 5,
        costo: 1.50,
        imageUrl: img1,
    },
    {
        idProducto: 5,
        nombre: "Bagel Sesame",
        descripcion: null,
        precio: 3.00,
        stock: 0,
        costo: 1.50,
        imageUrl: img1,
    },
    {
        idProducto: 6,
        nombre: "Puff Pastry (Strawberry)",
        descripcion: "Hojaldre con fresas frescas.",
        precio: 6.00,
        stock: 12,
        costo: 4.00,
        imageUrl: img1,
    },
    {
        idProducto: 7,
        nombre: "French Baguette",
        descripcion: null,
        precio: 6.00,
        stock: 30,
        costo: 3.50,
        imageUrl: img1,
    },
    {
        idProducto: 8,
        nombre: "Puff Pastry (Raspberry)",
        descripcion: "Hojaldre con frambuesas.",
        precio: 6.00,
        stock: 8,
        costo: 4.00,
        imageUrl: img1,
    },
];

function Main() {
    const [productos, setProductos] = useState(PRODUCTOS_MOCK);
    const [cartItems, setCartItems] = useState([]);

    const handleAddToCart = (idProducto) => {

        // Reducir stock
        setProductos(prev =>
            prev.map(p =>
                p.idProducto === idProducto && p.stock > 0
                    ? { ...p, stock: p.stock - 1 }
                    : p
            )
        );

        const product = productos.find(p => p.idProducto === idProducto);
        if (!product || product.stock <= 0) return;

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

    return (
        <div className="sales-page-container">
            <h1 style={{color: 'white', textAlign: 'center'}}> Menu de panes Wum bao</h1>

            <div className="bread-grid">
                {productos.map(product => (
                    <ProductCard 
                        key={product.idProducto}   
                        idProducto={product.idProducto}
                        nombre={product.nombre}
                        precio={product.precio}
                        descripcion={product.descripcion}
                        imageUrl={product.imageUrl}
                        stock={product.stock}
                        onAdd={() => handleAddToCart(product.idProducto)}
                    />
                ))}
            </div>

            <div className="seccion-tabla">
                <Table 
                    items={cartItems}
                    onRemove={handleRemoveFromCart}
                />
            </div>
        </div>
    );
}

export default Main;
