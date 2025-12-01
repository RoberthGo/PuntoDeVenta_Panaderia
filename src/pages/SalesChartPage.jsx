import { useEffect, useState } from 'react';
import { productService } from '../services/productService';
import { salesService } from '../services/salesService';
import './CSS/SalesChartPage.css';

function SalesChartPage() {
    const [products, setProducts] = useState([]);
    
    // Estado para Reporte por Rango
    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaFin, setFechaFin] = useState('');
    const [rangoData, setRangoData] = useState([]);
    const [loadingRango, setLoadingRango] = useState(false);
    const [errorRango, setErrorRango] = useState(null);

    // Estado para Comparativo Mensual
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [month1, setMonth1] = useState('');
    const [month2, setMonth2] = useState('');
    const [salesData, setSalesData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Pestaña activa
    const [activeTab, setActiveTab] = useState('rango');

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

    // === FUNCIONES PARA REPORTE POR RANGO ===
    const handleGenerateRango = async () => {
        if (!fechaInicio || !fechaFin) {
            alert('Por favor selecciona fecha de inicio y fecha fin.');
            return;
        }

        setLoadingRango(true);
        setErrorRango(null);

        try {
            const data = await salesService.getReporteRango(fechaInicio, fechaFin, []);
            setRangoData(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error('Error generating range report:', err);
            setErrorRango('Error al generar el reporte. Por favor intenta de nuevo.');
        } finally {
            setLoadingRango(false);
        }
    };

    // === FUNCIONES PARA COMPARATIVO MENSUAL ===
    const handleProductToggle = (idProducto) => {
        setSelectedProducts(prev => 
            prev.includes(idProducto)
                ? prev.filter(id => id !== idProducto)
                : [...prev, idProducto]
        );
    };

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
            const [year1, month1Num] = month1.split('-');
            const [year2, month2Num] = month2.split('-');

            const [dataMes1, dataMes2] = await Promise.all([
                salesService.getReporteMensual(parseInt(month1Num), parseInt(year1), selectedProducts),
                salesService.getReporteMensual(parseInt(month2Num), parseInt(year2), selectedProducts)
            ]);

            const combinedData = selectedProducts.map(idProducto => {
                const product = products.find(p => p.idProducto === idProducto);
                const salesMes1 = dataMes1.find(d => d.clave === idProducto);
                const salesMes2 = dataMes2.find(d => d.clave === idProducto);
                
                return {
                    idProducto: idProducto,
                    clave: idProducto,
                    nombre: product?.nombre || salesMes1?.nombre || salesMes2?.nombre || 'Producto',
                    precio: product?.precio || 0,
                    ventasMes1: salesMes1?.montoTotal || 0, 
                    ventasMes2: salesMes2?.montoTotal || 0
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
        if (!monthString) return '';
        const [year, month] = monthString.split('-');
        const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
                            'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
        return `${monthNames[parseInt(month) - 1]} ${year}`;
    };

    const formatDate = (dateString) => {
        const [year, month, day] = dateString.split('-');
        return `${day}/${month}/${year}`;
    };

    const maxSales = salesData.length > 0 
        ? Math.max(...salesData.flatMap(d => [d.ventasMes1, d.ventasMes2]))
        : 1;

    // Max para la gráfica de rango
    const maxRangoMonto = rangoData.length > 0 
        ? Math.max(...rangoData.map(d => d.montoTotal))
        : 1;

    return (
        <div className="sales-chart-container">
            <h1 className="page-title">Reportes de Ventas</h1>

            {/* Tabs de navegación */}
            <div className="tabs-container">
                <button 
                    className={`tab-button ${activeTab === 'rango' ? 'active' : ''}`}
                    onClick={() => setActiveTab('rango')}
                >
                    📊 Reporte por Rango de Fechas
                </button>
                <button 
                    className={`tab-button ${activeTab === 'comparativo' ? 'active' : ''}`}
                    onClick={() => setActiveTab('comparativo')}
                >
                    📈 Comparativo Mensual
                </button>
            </div>

            {/* ========== SECCIÓN REPORTE POR RANGO ========== */}
            {activeTab === 'rango' && (
                <div className="section-container">
                    <h2 className="section-title">Reporte de venta por producto</h2>
                    
                    <div className="filters-section">
                        <div className="date-selectors">
                            <div className="date-input">
                                <label>Fecha inicio:</label>
                                <input 
                                    type="date" 
                                    value={fechaInicio} 
                                    onChange={(e) => setFechaInicio(e.target.value)}
                                />
                            </div>
                            <div className="date-input">
                                <label>Fecha fin:</label>
                                <input 
                                    type="date" 
                                    value={fechaFin} 
                                    onChange={(e) => setFechaFin(e.target.value)}
                                />
                            </div>
                        </div>

                        <button 
                            className="generate-button" 
                            onClick={handleGenerateRango}
                            disabled={loadingRango}
                        >
                            {loadingRango ? 'Generando...' : 'Generar Reporte'}
                        </button>
                    </div>

                    {errorRango && (
                        <div className="error-message">
                            <p>{errorRango}</p>
                        </div>
                    )}

                    {rangoData.length > 0 && (
                        <div className="results-section">
                            <div className="rango-info">
                                <p><strong>Fecha inicio:</strong> {formatDate(fechaInicio)}</p>
                                <p><strong>Fecha fin:</strong> {formatDate(fechaFin)}</p>
                            </div>

                            <div className="sales-table-container">
                                <table className="sales-comparison-table rango-table">
                                    <thead>
                                        <tr>
                                            <th>Clave</th>
                                            <th>Nombre</th>
                                            <th>Unidades</th>
                                            <th>Monto</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {rangoData.map((item, index) => (
                                            <tr key={index}>
                                                <td>{item.clave}</td>
                                                <td>{item.nombre}</td>
                                                <td className="centered">{item.unidadesVendidas}</td>
                                                <td className="sales-amount">{formatCurrency(item.montoTotal)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Gráfica de Rango */}
                            <div className="chart-container">
                                <h2 className="chart-title">Ventas por Producto ({formatDate(fechaInicio)} - {formatDate(fechaFin)})</h2>
                                <div className="bar-chart">
                                    <div className="chart-y-axis">
                                        <span className="y-label">{formatCurrency(maxRangoMonto)}</span>
                                        <span className="y-label">{formatCurrency(maxRangoMonto * 0.75)}</span>
                                        <span className="y-label">{formatCurrency(maxRangoMonto * 0.5)}</span>
                                        <span className="y-label">{formatCurrency(maxRangoMonto * 0.25)}</span>
                                        <span className="y-label">$-</span>
                                    </div>
                                    <div className="chart-bars">
                                        {rangoData.map((item, index) => (
                                            <div key={index} className="bar-group">
                                                <div className="bars">
                                                    <div 
                                                        className="bar bar-unidades" 
                                                        style={{ height: `${(item.unidadesVendidas / Math.max(...rangoData.map(d => d.unidadesVendidas))) * 100}%` }}
                                                        title={`Unidades: ${item.unidadesVendidas}`}
                                                    />
                                                    <div 
                                                        className="bar bar-monto" 
                                                        style={{ height: `${(item.montoTotal / maxRangoMonto) * 100}%` }}
                                                        title={`Monto: ${formatCurrency(item.montoTotal)}`}
                                                    />
                                                </div>
                                                <div className="bar-label">
                                                    <div>{item.nombre}</div>
                                                    <div className="product-id">{item.clave}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="chart-legend">
                                    <div className="legend-item">
                                        <span className="legend-color legend-unidades"></span>
                                        <span>Unidades Vendidas</span>
                                    </div>
                                    <div className="legend-item">
                                        <span className="legend-color legend-monto"></span>
                                        <span>Monto Total</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {!loadingRango && rangoData.length === 0 && fechaInicio && fechaFin && (
                        <div className="empty-message">
                            <p>No hay datos para el rango de fechas seleccionado.</p>
                        </div>
                    )}
                </div>
            )}

            {/* ========== SECCIÓN COMPARATIVO MENSUAL ========== */}
            {activeTab === 'comparativo' && (
                <div className="section-container">
                    <h2 className="section-title">Comparativo de Ventas por Producto</h2>

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

                    {error && (
                        <div className="error-message">
                            <p>{error}</p>
                        </div>
                    )}

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
                                        <span className="y-label">$0</span>
                                    </div>
                                    <div className="chart-bars">
                                        {salesData.map(item => (
                                            <div key={item.idProducto} className="bar-group">
                                                <div className="bars bars-two">
                                                    <div 
                                                        className="bar bar-month1" 
                                                        style={{ height: `${maxSales > 0 ? (item.ventasMes1 / maxSales) * 100 : 0}%` }}
                                                        title={`${formatMonth(month1)}: ${formatCurrency(item.ventasMes1)}`}
                                                    >
                                                        <span className="bar-value">{formatCurrency(item.ventasMes1)}</span>
                                                    </div>
                                                    <div 
                                                        className="bar bar-month2" 
                                                        style={{ height: `${maxSales > 0 ? (item.ventasMes2 / maxSales) * 100 : 0}%` }}
                                                        title={`${formatMonth(month2)}: ${formatCurrency(item.ventasMes2)}`}
                                                    >
                                                        <span className="bar-value">{formatCurrency(item.ventasMes2)}</span>
                                                    </div>
                                                </div>
                                                <div className="bar-label">
                                                    <div className="bar-product-name">{item.nombre}</div>
                                                    <div className="product-id">{item.idProducto}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="chart-legend">
                                    <div className="legend-item">
                                        <span className="legend-color legend-month1"></span>
                                        <span>{month1 && formatMonth(month1)}</span>
                                    </div>
                                    <div className="legend-item">
                                        <span className="legend-color legend-month2"></span>
                                        <span>{month2 && formatMonth(month2)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default SalesChartPage;
