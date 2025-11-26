import React from 'react';
import EmployeeCard from '../components/common/EmployeeCard'; 
import '../components/common/EmployeeCard.css';
import './EmployeeCRUDPage.css';

// Datos de ejemplo simulados
const EMPLOYEES_MOCK = [
    { idEmpleado: 101, nombre: "Ricardo Cueva", telefono: "555-123-4567", rol: "Administrador", salario: 15000.00, fechaIngreso: "2020-07-27", imageUrl: "https://randomuser.me/api/portraits/men/1.jpg" },
    { idEmpleado: 102, nombre: "Elena Pérez", telefono: "555-987-6543", rol: "Empleado", salario: 8500.50, fechaIngreso: "2021-10-28", imageUrl: "https://randomuser.me/api/portraits/women/2.jpg" },
    { idEmpleado: 103, nombre: "Javier López", telefono: "555-111-2222", rol: "Empleado", salario: 9200.00, fechaIngreso: "2022-09-06", imageUrl: "https://randomuser.me/api/portraits/men/3.jpg" },
    // Agrega más empleados según sea necesario...
];

function EmployeeCRUDPage() {
    const totalEmployees = EMPLOYEES_MOCK.length;

    return (
        <div className="employees-crud-view">
            {/* 1. Cabecera y Botones de Acción (Reutilizando la estructura anterior) */}
            <div className="header-actions">
                <h2 className="employee-count">{totalEmployees} Empleados</h2>
                
                <div className="action-buttons">
                    <button className="filter-button">
                        <span className="icon">🔍</span> Filtrar
                    </button>
                    <button onClick={() => alert("Formulario Agregar Empleado")} className="add-candidate-button">
                        + Agregar Empleado
                    </button>
                </div>
            </div>

            {/* 2. Cuadrícula de Empleados */}
            <div className="employee-grid">
                {EMPLOYEES_MOCK.map(emp => (
                    <EmployeeCard
                        key={emp.idEmpleado}
                        {...emp} 
                    />
                ))}
            </div>
        </div>
    );
}

export default EmployeeCRUDPage;