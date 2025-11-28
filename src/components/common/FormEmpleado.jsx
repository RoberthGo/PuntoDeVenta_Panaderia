// FormEmpleado.jsx
import React, { useState } from 'react';
import '../common/CSS/FormEmpleado.css'

const FormEmpleado = ({ employee }) => {
    // Valores iniciales, seguros si employee es null o undefined
    const [nombre, setNombre] = useState(employee?.nombre ?? '');
    const [telefono, setTelefono] = useState(employee?.telefono ?? '');
    const [rol, setRol] = useState(employee?.rol ?? '');
    const [salario, setSalario] = useState(employee?.salario ?? '');
    const [fechaIngreso, setFechaIngreso] = useState(employee?.fechaIngreso ?? '');

    return (
        <div className="form-container">
        {/* Encabezado y Título */}
        <header className="form-header">
            <h1 className="form-title">Registrar Empleado</h1>
            <p className="form-subtitle">Completa los datos para dar de alta a un nuevo miembro del equipo.</p>
        </header>

        {/* Formulario */}
        <form id="employee-registration-form" className="employee-form">
            {/* Campo: Nombre */}
            <div className="form-group">
            <label htmlFor="nombre" className="form-label">Nombre Completo</label>
            <input
                type="text"
                id="nombre"
                name="nombre"
                placeholder="Nombre Completo"
                className="form-input"
                required
                value={nombre}
                onChange={e => setNombre(e.target.value)}
            />
            </div>

            {/* Campo: Teléfono */}
            <div className="form-group">
            <label htmlFor="telefono" className="form-label">Teléfono</label>
            <input
                type="tel"
                id="telefono"
                name="telefono"
                placeholder="Teléfono (ej: 555-1234)"
                className="form-input"
                value={telefono}
                onChange={e => setTelefono(e.target.value)}
            />
            </div>

            {/* Campo: Rol */}
            <div className="form-group">
            <label htmlFor="rol" className="form-label">Rol</label>
            <select
                id="rol"
                name="rol"
                className="form-select"
                required
                value={rol}
                onChange={e => setRol(e.target.value)}
            >
                <option value="" disabled>
                Selecciona el Rol
                </option>
                <option value="Empleado">Empleado</option>
                <option value="Administrador">Administrador</option>
            </select>
            </div>

            {/* Campo: Salario */}
            <div className="form-group">
            <label htmlFor="salario" className="form-label">Salario</label>
            <input
                type="number"
                id="salario"
                name="salario"
                placeholder="Salario (ej: 1500.00)"
                step="0.01"
                className="form-input"
                value={salario}
                onChange={e => setSalario(e.target.value)}
            />
            </div>

            {/* Campo: Fecha de Ingreso */}
            <div className="form-group">
            <label htmlFor="fechaIngreso" className="form-label">Fecha de Ingreso</label>
            <input
                type="date"
                id="fechaIngreso"
                name="fechaIngreso"
                className="form-input"
                value={fechaIngreso}
                onChange={e => setFechaIngreso(e.target.value)}
            />
            </div>

            {/* Botón de Registro */}
            <button type="submit">
                {employee ? 'Actualizar Empleado' : 'REGISTRAR EMPLEADO'}
            </button>
        </form>
        </div>
    );
};

export default FormEmpleado;
