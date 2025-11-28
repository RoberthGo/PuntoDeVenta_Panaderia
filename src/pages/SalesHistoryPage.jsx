import { useEffect, useState } from 'react';
import { salesService } from '../services/salesService';
import './CSS/SalesHistoryPage.css';

function SalesHistoryPage() {
    const [sales, setSales] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
                                <tr key={sale.idVenta}>
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
        </div>
    );
}

export default SalesHistoryPage;