import React from 'react';
import './CSS/EmployeeCard.css'; 

// iconos de ejemplo 
const PhoneIcon = () => <span className="icon">📞</span>;
const CalendarIcon = () => <span className="icon">📅</span>;
const DollarIcon = () => <span className="icon">💵</span>;

function EmployeeCard({ idEmpleado, nombre, telefono, rol, salario, fechaIngreso, imageUrl }) {
    
    // Formatear la fecha de ingreso
    const formattedDate = new Date(fechaIngreso).toLocaleDateString('es-MX', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });

    // Formatear el salario a moneda
    const formattedSalario = salario.toLocaleString('es-MX', {
        style: 'currency',
        currency: 'MXN',
        minimumFractionDigits: 2,
    });

    // Color para destacar el rol de Administrador
    const rolClass = rol === 'Administrador' ? 'admin-role' : 'employee-role';

    return (
        <div className="employee-card">
            <div className="card-header">
                {/* Menú de opciones de tarjeta (Editar/Eliminar) */}
                <div className="card-options">
                    <button className="option-button">...</button>
                </div>
            </div>

            <div className="profile-section">
                {/* Foto de Perfil (usamos una URL placeholder o el Base64 de la imagen) */}
                {/*Poner una imagen por defecto de usuario */}
                <img 
                    src={imageUrl || 'https://via.placeholder.com/150'} 
                    alt={nombre} 
                    className="profile-photo" 
                />
                
                <h3 className="employee-name">{nombre}</h3>
                <p className={`employee-role-tag ${rolClass}`}>{rol}</p>
            </div>

            <div className="details-section">
                {/* Salario */}
                <div className="detail-item">
                    <DollarIcon />
                    <span className="detail-label">Salario:</span>
                    <span className="detail-value">{formattedSalario}</span>
                </div>

                {/* Teléfono */}
                <div className="detail-item">
                    <PhoneIcon />
                    <span className="detail-label">Teléfono:</span>
                    <span className="detail-value">{telefono || 'N/A'}</span>
                </div>

                {/* Fecha de Ingreso */}
                <div className="detail-item">
                    <CalendarIcon />
                    <span className="detail-label">Ingreso:</span>
                    <span className="detail-value">{formattedDate}</span>
                </div>

                {/* ID del Empleado (Para uso interno, similar a "Department" o "Hired Date") */}
                <div className="detail-item internal-id">
                    <span className="detail-label">ID:</span>
                    <span className="detail-value">{idEmpleado}</span>
                </div>
            </div>
        </div>
    );
}

export default EmployeeCard;