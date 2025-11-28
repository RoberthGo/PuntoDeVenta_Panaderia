import { useEffect, useState } from 'react';
import { auditoriaService } from '../services/auditoria';
import './CSS/AuditTablePage.css';

function AuditTablePage() {
    const [audits, setAudits] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;
        
        const fetchAudits = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await auditoriaService.getAllAudits();
                if (isMounted) {
                    setAudits(Array.isArray(data) ? data : []);
                }
            } catch (err) {
                console.error('Failed to load audit records:', err);
                if (isMounted) {
                    setError('No se pudieron cargar los registros de auditoría.');
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchAudits();
        return () => { isMounted = false; };
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-MX', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    };

    return (
        <div className="audit-container">
            <h1 className="audit-title">Registro de Auditoría</h1>

            {loading && (
                <div className="loading-message">
                    <p>Cargando registros de auditoría...</p>
                </div>
            )}

            {error && (
                <div className="error-message">
                    <p>{error}</p>
                </div>
            )}

            {!loading && !error && audits.length === 0 && (
                <div className="empty-message">
                    <p>No hay registros de auditoría.</p>
                </div>
            )}

            {!loading && !error && audits.length > 0 && (
                <div className="table-container">
                    <table className="audit-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Usuario</th>
                                <th>Acción</th>
                                <th>Tabla</th>
                                <th>Fecha</th>
                                <th>Detalles</th>
                            </tr>
                        </thead>
                        <tbody>
                            {audits.map((audit) => (
                                <tr key={audit.idAuditoria}>
                                    <td>{audit.idAuditoria}</td>
                                    <td>{audit.nombreUsuario || audit.idUsuario}</td>
                                    <td>
                                        <span className={`action-badge action-${audit.accion?.toLowerCase()}`}>
                                            {audit.accion}
                                        </span>
                                    </td>
                                    <td>{audit.tabla}</td>
                                    <td>{formatDate(audit.fecha)}</td>
                                    <td className="details-cell">{audit.detalles || 'N/A'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default AuditTablePage;
