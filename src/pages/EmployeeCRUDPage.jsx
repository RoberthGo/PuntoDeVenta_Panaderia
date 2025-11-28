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
                setEmployees(Array.isArray(response) ? response : []); // API devuelve array directo
            } catch (error) {
                console.error('Error cargando empleados', error);
                setEmployees([]); // Establecer array vacío en caso de error
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

    // Eliminar empleado
    const handleDeleteEmployee = async (idEmpleado) => {
        const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar este empleado?');
        if (!confirmDelete) return;

        try {
            await employeeService.deleteEmployee(idEmpleado);
            alert('Empleado eliminado exitosamente');
            
            // Refrescar lista de empleados
            const response = await employeeService.getAllEmployees();
            setEmployees(Array.isArray(response) ? response : []);
        } catch (error) {
            console.error('Error eliminando empleado', error);
            alert('Error al eliminar el empleado. Intenta nuevamente.');
        }
    };

    // Guardar o actualizar empleado (callback del form)
    const handleSubmitForm = async (employeeData) => {
        try {
            if (selectedEmployee) {
                // Actualizar
                await employeeService.updateEmployee(employeeData);
                alert('Empleado actualizado exitosamente');
            } else {
                // Crear
                await employeeService.createEmployee(employeeData);
                alert('Empleado creado exitosamente');
            }
            // Refrescar lista de empleados
            const response = await employeeService.getAllEmployees();
            setEmployees(Array.isArray(response) ? response : []);
            setSelectedEmployee(null); // limpiar form
            setShowForm(false); // Ocultar formulario
        } catch (error) {
            console.error('Error guardando empleado', error);
            alert('Error al guardar el empleado. Intenta nuevamente.');
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
                        onDelete={() => handleDeleteEmployee(emp.idEmpleado)}
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