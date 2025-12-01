import React from 'react';
import './CSS/EmployeeCard.css'; 

// Iconos
const PhoneIcon = () => <span className="icon">📞</span>;
const CalendarIcon = () => <span className="icon">📅</span>;
const DollarIcon = () => <span className="icon">💵</span>;
const UserIcon = () => <span className="icon user-icon">👤</span>;

function EmployeeCard({ employe, onEdit, onDelete }) {
    // Color para destacar el rol de Administrador
    const rolClass = employe.rol === 'Administrador' ? 'admin-role' : '';
    
    // Formatear fecha
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString('es-MX', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });
    };

    // Formatear salario
    const formatSalary = (salary) => {
        return `$${parseFloat(salary).toLocaleString('es-MX', { minimumFractionDigits: 2 })}`;
    };

    return (
        <div className="employee-card">
            {/* Sección superior con avatar e info principal */}
            <div className="card-top">
                <div className="avatar-container">
                    <UserIcon />
                </div>
                <div className="employee-info">
                    <h3 className="employee-name">{employe.nombre}</h3>
                    <span className={`employee-role-tag ${rolClass}`}>{employe.rol}</span>
                </div>
            </div>

            {/* Detalles del empleado */}
            <div className="details-section">
                <div className="detail-item">
                    <DollarIcon />
                    <span className="detail-label">Salario:</span>
                    <span className="detail-value salary">{formatSalary(employe.salario)}</span>
                </div>

                <div className="detail-item">
                    <PhoneIcon />
                    <span className="detail-label">Teléfono:</span>
                    <span className="detail-value">{employe.telefono || 'N/A'}</span>
                </div>

                <div className="detail-item">
                    <CalendarIcon />
                    <span className="detail-label">Ingreso:</span>
                    <span className="detail-value">{formatDate(employe.fechaIngreso)}</span>
                </div>
            </div>

            {/* Footer con ID y acciones */}
            <div className="card-footer">
                <span className="employee-id">ID: {employe.idEmpleado}</span>
                <div className="card-actions">
                    <button className="btn-edit" onClick={onEdit}>
                        ✏️ Editar
                    </button>
                    <button className="btn-delete" onClick={onDelete}>
                        🗑️ Eliminar
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EmployeeCard;
