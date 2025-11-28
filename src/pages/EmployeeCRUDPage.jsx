import React, { useState, useRef } from 'react';
import EmployeeCard from '../components/common/EmployeeCard'; 
import '../components/common/CSS/EmployeeCard.css';
import './CSS/EmployeeCRUDPage.css';
import FormEmpleado from '../components/common/FormEmpleado';

import img1 from '../Images/img-1.jpg';
// Datos de ejemplo simulados
const EMPLOYEES_MOCK = [
    { idEmpleado: 101, nombre: "Ricardo Cueva", telefono: "555-123-4567", rol: "Administrador", salario: 15000.00, fechaIngreso: "2020-07-27", imageUrl: img1 },
    { idEmpleado: 102, nombre: "Elena Pérez", telefono: "555-987-6543", rol: "Empleado", salario: 8500.50, fechaIngreso: "2021-10-28", imageUrl: img1},
    { idEmpleado: 103, nombre: "Javier López", telefono: "555-111-2222", rol: "Empleado", salario: 9200.00, fechaIngreso: "2022-09-06", imageUrl: img1},
    // Agrega más empleados según sea necesario...
];

function EmployeeCRUDPage() {
    const totalEmployees = EMPLOYEES_MOCK.length;

    const [showForm, setShowForm] = useState(false); // <- Controla visibilidad
    const formRef = useRef(null); // <- Referencia para scroll
    const [selectedEmployee, setSelectedEmployee] = useState(null); // Almacena empleado a editar

    const handleShowForm = () => {
        setShowForm(true); // Mostrar el form
        setTimeout(() => {
            // Scroll suave hacia el formulario
            formRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    };

     // Mostrar formulario para editar empleado
    const handleEditEmployee = (employee) => {
        setSelectedEmployee(employee); // Cargar datos en formulario
        setShowForm(true);
        setTimeout(() => formRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    };

    return (
        <div className="employees-crud-view">
            {/* 1. Cabecera y Botones de Acción (Reutilizando la estructura anterior) */}
            <div className="header-actions">
                <h2 className="employee-count">{totalEmployees} Empleados</h2>
                
                <div className="action-buttons">
                    <button onClick={handleShowForm} className="add-candidate-button">
                        + Agregar Empleado
                    </button>
                </div>
            </div>

            {/* Cuadrícula de empleados */}
            <div className="employee-grid">
                {EMPLOYEES_MOCK.map(emp => (
                    <EmployeeCard
                        key={emp.idEmpleado}
                        employe={emp}
                        onEdit={() => handleEditEmployee(emp)} // Pasamos función
                    />
                ))}
            </div>

            <div
                ref={formRef}
                className="form-content"
                style={{ display: showForm ? 'block' : 'none' }}
            >
                <FormEmpleado key={selectedEmployee?.idEmpleado || 'new'} employee={selectedEmployee} />
            </div>
        </div>
    );
}

export default EmployeeCRUDPage;