import React from 'react';
import "../common/CSS/TableProducts.css";

// Componente individual para mostrar un artículo de venta
const SalesItemCard = ({ item , onRemove}) => {
    const total = (item.precio * item.cantidad).toFixed(2);

    return (
        <div className="tabla-products">
            <div className="foto">
                <img 
                    src={item.imageUrl} 
                    alt={item.nombre} 
                    className="w-12 h-12 object-cover rounded-md shadow-md"
                />
            </div>

            <div className="descripccion">
                <p className="text-gray-100 font-semibold">{item.nombre}</p>
                <p className="text-sm text-gray-400 truncate">{item.descripcion}</p>
            </div>

            <div className="precio">
                <span className="text-sm text-gray-400 block">Precio Unitario</span>
                <p className="text-brown-accent font-medium">${item.precio.toFixed(2)}</p>
            </div>

            <div className="cantidad">
                <span className="text-sm text-gray-400 block">Cantidad</span>
                <p className="text-white font-medium">{item.cantidad}</p>
            </div>

            <div className="total">
                <span className="text-sm text-gray-400 block">Total</span>
                <p className="text-green-400 font-bold">${total}</p>
            </div>

            <div className="btn-quitar">
                <button
                    className="remove-button"
                    onClick={() => onRemove(item.idProducto)}
                >
                    Remover
                </button>
            </div>
        </div>
    );
};

// Componente principal del panel de resumen de ventas
const SalesOrderPanel = ({ items = [], onRemove }) => {

    // Si no llegan items, prevenimos errores
    const safeItems = items || [];

    // Calcular totales con los items reales
    const subtotal = safeItems.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
    const tax = subtotal * 0.16;
    const finalTotal = subtotal + tax;

    const handleSale = () => {
        // Lógica para finalizar la venta
        
    }

    return (
        <div className="contenedor-principal-datlle-venta">
            <h2 className="titulo-contenedor">
                Detalle de la Venta (Pedido Actual)
            </h2>

            <div className="encabezado-content">
                <div className="encbezado-foto">Foto</div>
                <div className="encbezado-producto">Producto / Descripción</div>
                <div className="encbezado-precio">Precio</div>
                <div className="encbezado-cantidad">Cant.</div>
                <div className="encbezado-total">Total</div>
            </div>

            <div className="contenedor-lista">
                {safeItems.length > 0 && safeItems.map(item => (
                    <SalesItemCard key={item.idProducto} item={item} onRemove={onRemove} />
                ))}

                {safeItems.length === 0 && (
                    <p className="sin-products">Aún no hay productos en el pedido.</p>
                )}
            </div>

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

            <div className="botones">
                <button className="btn-venta">
                    Finalizar Venta
                </button>
            </div>
        </div>
    );
};

export default SalesOrderPanel;
