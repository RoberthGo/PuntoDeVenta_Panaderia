import React, { useState, useRef, useEffect } from 'react';
import { employeeService } from '../services/employeeService';

import EmployeeCard from '../components/common/EmployeeCard'; 
import FormEmpleado from '../components/common/FormEmpleado';

import './CSS/EmployeeCRUDPage.css';
import '../components/common/CSS/EmployeeCard.css';

function EmployeeCRUDPage() {
    const [employees, setEmployees] = useState([]); // Lista real de la API
    const [showForm, setShowForm] = useState(false); // Controla visibilidad del form
    const formRef = useRef(null); // Referencia para scroll
    const [selectedEmployee, setSelectedEmployee] = useState(null); // Empleado a editar

    // Cargar empleados desde API al iniciar
    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await employeeService.getAllEmployees();
                setEmployees(response.data); // axios devuelve {data: [...]}
            } catch (error) {
                console.error('Error cargando empleados', error);
            }
        };
        fetchEmployees();
    }, []);

    const totalEmployees = employees.length;

    // Mostrar formulario para agregar nuevo empleado
    const handleShowForm = () => {
        setSelectedEmployee(null); // limpiar formulario
        setShowForm(true);
        setTimeout(() => formRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    };

    // Mostrar formulario para editar empleado
    const handleEditEmployee = (employee) => {
        setSelectedEmployee(employee); // cargar datos en el form
        setShowForm(true);
        setTimeout(() => formRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    };

    // Guardar o actualizar empleado (callback del form)
    const handleSubmitForm = async (employeeData) => {
        try {
            if (selectedEmployee) {
                // Actualizar
                await employeeService.updateEmployee(selectedEmployee.idEmpleado, employeeData);
            } else {
                // Crear
                await employeeService.createEmployee(employeeData);
            }
            // Refrescar lista de empleados
            const response = await employeeService.getAllEmployees();
            setEmployees(response.data);
            setSelectedEmployee(null); // limpiar form
        } catch (error) {
            console.error('Error guardando empleado', error);
        }
    };

    return (
        <div className="employees-crud-view">
            {/* Cabecera y botones de acción */}
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
                {employees.map(emp => (
                    <EmployeeCard
                        key={emp.idEmpleado}
                        employe={emp}
                        onEdit={() => handleEditEmployee(emp)}
                    />
                ))}
            </div>

            {/* Formulario oculto inicialmente */}
            <div
                ref={formRef}
                className="form-content"
                style={{ display: showForm ? 'block' : 'none' }}
            >
                <FormEmpleado
                    key={selectedEmployee?.idEmpleado || 'new'}
                    employee={selectedEmployee}
                    onSubmit={handleSubmitForm}
                />
            </div>
        </div>
    );
}

export default EmployeeCRUDPage;