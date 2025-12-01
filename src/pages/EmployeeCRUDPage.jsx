import React, { useState, useRef, useEffect } from 'react';
import { employeeService } from '../services/employeeService';

import EmployeeCard from '../components/common/EmployeeCard'; 
import FormEmpleado from '../components/common/FormEmpleado';

import './CSS/EmployeeCRUDPage.css';
import '../components/common/CSS/EmployeeCard.css';

/**
 * Página de gestión CRUD de empleados.
 * Permite ver, crear, editar y eliminar empleados.
 * @returns {JSX.Element}
 */
function EmployeeCRUDPage() {
    const [employees, setEmployees] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const formRef = useRef(null);
    const [selectedEmployee, setSelectedEmployee] = useState(null);

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

    /** Muestra el formulario para agregar un nuevo empleado */
    const handleShowForm = () => {
        setSelectedEmployee(null);
        setShowForm(true);
        setTimeout(() => formRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    };

    /** @param {Object} employee - Datos del empleado a editar */
    const handleEditEmployee = (employee) => {
        setSelectedEmployee(employee);
        setShowForm(true);
        setTimeout(() => formRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    };

    /** @param {number} idEmpleado - ID del empleado a eliminar */
    const handleDeleteEmployee = async (idEmpleado) => {
        const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar este empleado?');
        if (!confirmDelete) return;

        try {
            await employeeService.deleteEmployee(idEmpleado);
            alert('Empleado eliminado exitosamente');
            const response = await employeeService.getAllEmployees();
            setEmployees(Array.isArray(response) ? response : []);
        } catch (error) {
            console.error('Error eliminando empleado', error);
            alert('Error al eliminar el empleado. Intenta nuevamente.');
        }
    };

    /** @param {Object} employeeData - Datos del empleado a guardar */
    const handleSubmitForm = async (employeeData) => {
        try {
            if (selectedEmployee) {
                await employeeService.updateEmployee(employeeData);
                alert('Empleado actualizado exitosamente');
            } else {
                await employeeService.createEmployee(employeeData);
                alert('Empleado creado exitosamente');
            }
            const response = await employeeService.getAllEmployees();
            setEmployees(Array.isArray(response) ? response : []);
            setSelectedEmployee(null);
            setShowForm(false);
        } catch (error) {
            console.error('Error guardando empleado', error);
            alert('Error al guardar el empleado. Intenta nuevamente.');
        }
    };

    return (
        <div className="employees-crud-view">
            <div className="header-actions">
                <h2 className="employee-count">{totalEmployees} Empleados</h2>
                <div className="action-buttons">
                    <button onClick={handleShowForm} className="add-candidate-button">
                        + Agregar Empleado
                    </button>
                </div>
            </div>

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