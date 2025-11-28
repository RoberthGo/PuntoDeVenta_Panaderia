import { useEffect, useState } from 'react';
import { productService } from '../services/productService';
import { salesService } from '../services/salesService';
import './CSS/SalesChartPage.css';

function SalesChartPage() {
    const [products, setProducts] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [month1, setMonth1] = useState('');
    const [month2, setMonth2] = useState('');
    const [salesData, setSalesData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Load products on mount
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await productService.getAllProducts();
                setProducts(Array.isArray(data) ? data : []);
            } catch (err) {
                console.error('Failed to load products:', err);
            }
        };
        fetchProducts();
    }, []);

    // Toggle product selection
    const handleProductToggle = (idProducto) => {
        setSelectedProducts(prev => 
            prev.includes(idProducto)
                ? prev.filter(id => id !== idProducto)
                : [...prev, idProducto]
        );
    };

    // Generate chart
    const handleGenerateChart = async () => {
        if (!month1 || !month2) {
            alert('Por favor selecciona dos meses.');
            return;
        }
        if (selectedProducts.length === 0) {
            alert('Por favor selecciona al menos un producto.');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            // Calculate date ranges for both months
            const [year1, month1Num] = month1.split('-');
            const [year2, month2Num] = month2.split('-');
            
            // First day and last day of month1
            const inicio1 = `${year1}-${month1Num}-01`;
            const lastDay1 = new Date(parseInt(year1), parseInt(month1Num), 0).getDate();
            const fin1 = `${year1}-${month1Num}-${lastDay1}`;
            
            // First day and last day of month2
            const inicio2 = `${year2}-${month2Num}-01`;
            const lastDay2 = new Date(parseInt(year2), parseInt(month2Num), 0).getDate();
            const fin2 = `${year2}-${month2Num}-${lastDay2}`;

            // Fetch sales data for both months
            const [dataMes1, dataMes2] = await Promise.all([
                salesService.getReporteRango(inicio1, fin1, selectedProducts),
                salesService.getReporteRango(inicio2, fin2, selectedProducts)
            ]);

            // Combine data for each product
            const combinedData = selectedProducts.map(idProducto => {
                const product = products.find(p => p.idProducto === idProducto);
                const salesMes1 = dataMes1.find(d => d.idProducto === idProducto);
                const salesMes2 = dataMes2.find(d => d.idProducto === idProducto);
                
                return {
                    idProducto,
                    nombre: product?.nombre || salesMes1?.nombre || salesMes2?.nombre || 'Producto',
                    precio: product?.precio || salesMes1?.precio || salesMes2?.precio || 0,
                    ventasMes1: salesMes1?.totalVentas || 0,
                    ventasMes2: salesMes2?.totalVentas || 0
                };
            });
            
            setSalesData(combinedData);
        } catch (err) {
            console.error('Error generating chart:', err);
            setError('Error al generar el reporte. Por favor intenta de nuevo.');
        } finally {
            setLoading(false);
        }
    };

    const formatCurrency = (amount) => {
        return `$${parseFloat(amount).toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    };

    const formatMonth = (monthString) => {
        const [year, month] = monthString.split('-');
        const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
                            'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
        return `${monthNames[parseInt(month) - 1]} ${year}`;
    };

    const maxSales = salesData.length > 0 
        ? Math.max(...salesData.flatMap(d => [d.ventasMes1, d.ventasMes2]))
        : 1;

    return (
        <div className="sales-chart-container">
            <h1 className="page-title">Comparativo de Ventas por Producto</h1>

            {/* Filters Section */}
            <div className="filters-section">
                <div className="month-selectors">
                    <div className="month-input">
                        <label>Primer Mes:</label>
                        <input 
                            type="month" 
                            value={month1} 
                            onChange={(e) => setMonth1(e.target.value)}
                        />
                    </div>
                    <div className="month-input">
                        <label>Segundo Mes:</label>
                        <input 
                            type="month" 
                            value={month2} 
                            onChange={(e) => setMonth2(e.target.value)}
                        />
                    </div>
                </div>

                <div className="product-selector">
                    <h3>Seleccionar Productos:</h3>
                    <div className="product-checkboxes">
                        {products.map(product => (
                            <label key={product.idProducto} className="checkbox-label">
                                <input
                                    type="checkbox"
                                    checked={selectedProducts.includes(product.idProducto)}
                                    onChange={() => handleProductToggle(product.idProducto)}
                                />
                                <span>{product.nombre}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <button 
                    className="generate-button" 
                    onClick={handleGenerateChart}
                    disabled={loading}
                >
                    {loading ? 'Generando...' : 'Generar Reporte'}
                </button>
            </div>

            {/* Error Message */}
            {error && (
                <div className="error-message">
                    <p>{error}</p>
                </div>
            )}

            {/* Results Section */}
            {salesData.length > 0 && (
                <div className="results-section">
                    {/* Table */}
                    <div className="sales-table-container">
                        <table className="sales-comparison-table">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Producto</th>
                                    <th>Precio</th>
                                    <th>Ventas del mes:<br/>{formatMonth(month1)}</th>
                                    <th>Ventas del mes:<br/>{formatMonth(month2)}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {salesData.map(item => (
                                    <tr key={item.idProducto}>
                                        <td>{item.idProducto}</td>
                                        <td>{item.nombre}</td>
                                        <td>{formatCurrency(item.precio)}</td>
                                        <td className="sales-amount">{formatCurrency(item.ventasMes1)}</td>
                                        <td className="sales-amount">{formatCurrency(item.ventasMes2)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Chart */}
                    <div className="chart-container">
                        <h2 className="chart-title">Comparativo de ventas en dos diferentes meses</h2>
                        <div className="bar-chart">
                            <div className="chart-y-axis">
                                <span className="y-label">{formatCurrency(maxSales)}</span>
                                <span className="y-label">{formatCurrency(maxSales * 0.75)}</span>
                                <span className="y-label">{formatCurrency(maxSales * 0.5)}</span>
                                <span className="y-label">{formatCurrency(maxSales * 0.25)}</span>
                                <span className="y-label">$-</span>
                            </div>
                            <div className="chart-bars">
                                {salesData.map(item => (
                                    <div key={item.idProducto} className="bar-group">
                                        <div className="bars">
                                            <div 
                                                className="bar bar-price" 
                                                style={{ height: `${(item.precio / maxSales) * 100}%` }}
                                                title={`Precio: ${formatCurrency(item.precio)}`}
                                            />
                                            <div 
                                                className="bar bar-month1" 
                                                style={{ height: `${(item.ventasMes1 / maxSales) * 100}%` }}
                                                title={`${formatMonth(month1)}: ${formatCurrency(item.ventasMes1)}`}
                                            />
                                            <div 
                                                className="bar bar-month2" 
                                                style={{ height: `${(item.ventasMes2 / maxSales) * 100}%` }}
                                                title={`${formatMonth(month2)}: ${formatCurrency(item.ventasMes2)}`}
                                            />
                                        </div>
                                        <div className="bar-label">
                                            <div>{item.nombre}</div>
                                            <div className="product-id">{item.idProducto}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="chart-legend">
                            <div className="legend-item">
                                <span className="legend-color legend-price"></span>
                                <span>Precio</span>
                            </div>
                            <div className="legend-item">
                                <span className="legend-color legend-month1"></span>
                                <span>Ventas del mes: {month1 && formatMonth(month1)}</span>
                            </div>
                            <div className="legend-item">
                                <span className="legend-color legend-month2"></span>
                                <span>Ventas del mes: {month2 && formatMonth(month2)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default SalesChartPage;
