import { useEffect, useState } from 'react';
import { salesService } from '../services/salesService';
import './CSS/SalesHistoryPage.css';

function SalesHistoryPage() {
    const [sales, setSales] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedSale, setSelectedSale] = useState(null);
    const [saleDetails, setSaleDetails] = useState([]);
    const [loadingDetails, setLoadingDetails] = useState(false);

    useEffect(() => {
        let isMounted = true;
        
        const fetchSales = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await salesService.getAllSales();
                if (isMounted) {
                    setSales(Array.isArray(data) ? data : []);
                }
            } catch (err) {
                console.error('Failed to load sales history:', err);
                if (isMounted) {
                    setError('No se pudieron cargar las ventas.');
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchSales();
        return () => { isMounted = false; };
    }, []);

    const handleSaleClick = async (sale) => {
        // Si ya está seleccionada, cerrar el detalle
        if (selectedSale && selectedSale.idVenta === sale.idVenta) {
            setSelectedSale(null);
            setSaleDetails([]);
            return;
        }

        setSelectedSale(sale);
        setLoadingDetails(true);

        try {
            const details = await salesService.getSaleDetails(sale.idVenta);
            setSaleDetails(Array.isArray(details) ? details : []);
        } catch (err) {
            console.error('Error loading sale details:', err);
            setSaleDetails([]);
        } finally {
            setLoadingDetails(false);
        }
    };

    const closeDetails = () => {
        setSelectedSale(null);
        setSaleDetails([]);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-MX', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const formatCurrency = (amount) => {
        return `$${parseFloat(amount).toFixed(2)}`;
    };

    return (
        <div className="sales-history-container">
            <h1 className="sales-history-title">Historial de Ventas</h1>

            {loading && (
                <div className="loading-message">
                    <p>Cargando historial de ventas...</p>
                </div>
            )}

            {error && (
                <div className="error-message">
                    <p>{error}</p>
                </div>
            )}

            {!loading && !error && sales.length === 0 && (
                <div className="empty-message">
                    <p>No hay ventas registradas.</p>
                </div>
            )}

            {!loading && !error && sales.length > 0 && (
                <div className="table-container">
                    <table className="sales-table">
                        <thead>
                            <tr>
                                <th>ID Venta</th>
                                <th>Fecha</th>
                                <th>ID Empleado</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sales.map((sale) => (
                                <tr 
                                    key={sale.idVenta} 
                                    onClick={() => handleSaleClick(sale)}
                                    className={`clickable-row ${selectedSale?.idVenta === sale.idVenta ? 'selected' : ''}`}
                                >
                                    <td>{sale.idVenta}</td>
                                    <td>{formatDate(sale.fecha)}</td>
                                    <td>{sale.idEmpleado}</td>
                                    <td className="total-amount">{formatCurrency(sale.total)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Modal de detalles de la venta */}
            {selectedSale && (
                <div className="details-modal-overlay" onClick={closeDetails}>
                    <div className="details-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="details-modal-header">
                            <h2>Detalle de Venta #{selectedSale.idVenta}</h2>
                            <button className="close-btn" onClick={closeDetails}>×</button>
                        </div>
                        
                        <div className="details-modal-info">
                            <p><strong>Fecha:</strong> {formatDate(selectedSale.fecha)}</p>
                            <p><strong>Empleado ID:</strong> {selectedSale.idEmpleado}</p>
                            <p><strong>Total:</strong> <span className="total-highlight">{formatCurrency(selectedSale.total)}</span></p>
                        </div>

                        {loadingDetails && (
                            <div className="loading-details">
                                <p>Cargando productos...</p>
                            </div>
                        )}

                        {!loadingDetails && saleDetails.length === 0 && (
                            <div className="empty-details">
                                <p>No se encontraron productos para esta venta.</p>
                            </div>
                        )}

                        {!loadingDetails && saleDetails.length > 0 && (
                            <div className="details-table-container">
                                <table className="details-table">
                                    <thead>
                                        <tr>
                                            <th>Producto</th>
                                            <th>Cantidad</th>
                                            <th>Precio Unit.</th>
                                            <th>Subtotal</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {saleDetails.map((detail) => (
                                            <tr key={detail.idDetalle}>
                                                <td>{detail.producto}</td>
                                                <td className="centered">{detail.cantidad}</td>
                                                <td>{formatCurrency(detail.precioUnitario)}</td>
                                                <td className="subtotal-amount">{formatCurrency(detail.subtotal)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default SalesHistoryPage;