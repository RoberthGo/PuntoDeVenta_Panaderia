import React from 'react';
import "../common/TableProducts.css"
// MOCK DATA para visualizar el diseño de un producto seleccionado
const MOCK_SALES_ITEMS = [
    {
        id: 1,
        nombre: "Croissant de Almendra",
        precio: 2.50,
        cantidad: 3,
        descripcion: "Crujiente masa de croissant rellena de crema de almendras y espolvoreada con azúcar glass.",
        imageUrl: "https://placehold.co/80x80/5D4037/A1887F?text=🥐"
    },
    {
        id: 2,
        nombre: "Pan de Masa Madre",
        precio: 5.00,
        cantidad: 1,
        descripcion: "Fermentación lenta, corteza crujiente y miga esponjosa.",
        imageUrl: "https://placehold.co/80x80/5D4037/A1887F?text=🍞"
    }
];

// Componente individual para mostrar un artículo de venta
const SalesItemCard = ({ item }) => {
    const total = (item.precio * item.cantidad).toFixed(2);
    
    // Usamos clases de Tailwind CSS para crear un diseño de bloque elegante
    return (
        <div className="tabla-products">
            
            {/* 1. Foto del Producto */}
            <div className="foto">
                <img 
                    src={item.imageUrl} 
                    alt={item.nombre} 
                    className="w-12 h-12 object-cover rounded-md shadow-md"
                />
            </div>

            {/* 2. Descripción y Nombre (Ocupa más espacio) */}
            <div className="descripccion">
                <p className="text-gray-100 font-semibold">{item.nombre}</p>
                <p className="text-sm text-gray-400 truncate">{item.descripcion}</p>
            </div>

            {/* 3. Precio Unitario */}
            <div className="precio">
                <span className="text-sm text-gray-400 block">Precio Unitario</span>
                <p className="text-brown-accent font-medium">${item.precio.toFixed(2)}</p>
            </div>

            {/* 4. Cantidad */}
            <div className="cantidad">
                <span className="text-sm text-gray-400 block">Cantidad</span>
                <p className="text-white font-medium">{item.cantidad}</p>
            </div>

            {/* 5. Total */}
            <div className="total">
                <span className="text-sm text-gray-400 block">Total</span>
                <p className="text-green-400 font-bold">${total}</p>
            </div>
        </div>
    );
};

// Componente principal del panel de resumen de ventas
const SalesOrderPanel = () => {
    // Definimos los colores con clases de Tailwind que replican el esquema oscuro/café
    // bg-gray-900 (dark), text-amber-500 (brown accent), border-amber-800 (brown base)

    const subtotal = MOCK_SALES_ITEMS.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
    const tax = subtotal * 0.16; // Asumimos un 16% de IVA
    const finalTotal = subtotal + tax;

    return (
        // Contenedor principal para el resumen de ventas
        <div className="contenedor-principal-datlle-venta">
            <h2 className="titulo-contenedor">
                Detalle de la Venta (Pedido Actual)
            </h2>

            {/* ESTRUCTURA TIPO TABLA (pero con DIVs en formato bloque) */}
            
            {/* Encabezado/Columnas Fijas */}
            <div className="encabezado-content">
                <div className="encbezado-foto">Foto</div>
                <div className="encbezado-producto">Producto / Descripción</div>
                <div className="encbezado-precio">Precio</div>
                <div className="encbezado-cantidad">Cant.</div>
                <div className="encbezado-total">Total</div>
            </div>

            {/* Contenedor de la Lista de Artículos */}
            <div className="contenedor-lista">
                {MOCK_SALES_ITEMS.map(item => (
                    <SalesItemCard key={item.id} item={item} />
                ))}

                {MOCK_SALES_ITEMS.length === 0 && (
                    <p className="sin-products">Aún no hay productos en el pedido.</p>
                )}
            </div>
            
            {/* Resumen de Totales */}
            <div className="detalle-venta-content">
                <div className="detalle-venta">
                    <div className="subtotal-content">
                        <span className="subtotal">Subtotal:</span>
                        <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="agregado">
                        <span className="impuestos">IVA (16%):</span>
                        <span>${tax.toFixed(2)}</span>
                    </div>
                    <div className="precio-final">
                        <span>TOTAL FINAL:</span>
                        <span>${finalTotal.toFixed(2)}</span>
                    </div>
                </div>
            </div>
            
            {/* Botón de Acción */}
            <div className="botones">
                <button className="btn-venta">
                    Finalizar Venta
                </button>
            </div>
        </div>
    );
};

export default SalesOrderPanel;