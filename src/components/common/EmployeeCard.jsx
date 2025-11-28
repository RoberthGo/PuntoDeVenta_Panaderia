import React from 'react';
import './CSS/EmployeeCard.css'; 

// iconos de ejemplo 
const PhoneIcon = () => <span className="icon">📞</span>;
const CalendarIcon = () => <span className="icon">📅</span>;
const DollarIcon = () => <span className="icon">💵</span>;

function EmployeeCard({ employe, onEdit, onDelete }) {
    // Color para destacar el rol de Administrador
    const rolClass = employe.rol === 'Administrador' ? 'admin-role' : 'employee-role';

    return (
        <div className="employee-card">
            <div className="card-header">
                {/* Menú de opciones de tarjeta (Editar/Eliminar) */}
                <div className="card-options">
                    {/* Aquí pasamos la función onEdit desde el padre */}
                    <button className="option-button edit-button" onClick={onEdit}>
                        Editar
                    </button>
                    <button className="option-button delete-button" onClick={onDelete}>
                        Eliminar
                    </button>
                </div>
            </div>

            <div className="profile-section">
                {/* Foto de Perfil */}
                <img 
                    src={employe.imageUrl || 'https://via.placeholder.com/150'} 
                    alt={employe.nombre} 
                    className="profile-photo" 
                />
                
                <h3 className="employee-name">{employe.nombre}</h3>
                <p className={`employee-role-tag ${rolClass}`}>{employe.rol}</p>
            </div>

            <div className="details-section">
                {/* Salario */}
                <div className="detail-item">
                    <DollarIcon />
                    <span className="detail-label">Salario:</span>
                    <span className="detail-value">{employe.salario}</span>
                </div>

                {/* Teléfono */}
                <div className="detail-item">
                    <PhoneIcon />
                    <span className="detail-label">Teléfono:</span>
                    <span className="detail-value">{employe.telefono || 'N/A'}</span>
                </div>

                {/* Fecha de Ingreso */}
                <div className="detail-item">
                    <CalendarIcon />
                    <span className="detail-label">Ingreso:</span>
                    <span className="detail-value">{employe.fechaIngreso}</span>
                </div>

                {/* ID del Empleado */}
                <div className="detail-item internal-id">
                    <span className="detail-label">ID:</span>
                    <span className="detail-value">{employe.idEmpleado}</span>
                </div>
            </div>
        </div>
    );
}

export default EmployeeCard;
