import React, { useState } from 'react';
import '../common/CSS/FormEmpleado.css';

// Constantes de validación basadas en la BD
const VALIDATION = {
    nombre: { maxLength: 120, required: true },
    telefono: { maxLength: 30, required: false, pattern: /^[0-9\-\+\s\(\)]*$/ },
    rol: { required: true, values: ['Empleado', 'Administrador'] },
    salario: { min: 0, max: 99999999.99, required: false }
};

const FormEmpleado = ({ employee, onSubmit }) => {
    // Valores iniciales, seguros si employee es null o undefined
    const [nombre, setNombre] = useState(employee?.nombre ?? '');
    const [telefono, setTelefono] = useState(employee?.telefono ?? '');
    const [rol, setRol] = useState(employee?.rol ?? '');
    const [salario, setSalario] = useState(employee?.salario ?? '');
    const [fechaIngreso, setFechaIngreso] = useState(employee?.fechaIngreso ?? '');
    const [errors, setErrors] = useState({});

    // Función de validación
    const validateForm = () => {
        const newErrors = {};
        
        // Validar nombre
        if (!nombre.trim()) {
            newErrors.nombre = 'El nombre es obligatorio';
        } else if (nombre.length > VALIDATION.nombre.maxLength) {
            newErrors.nombre = `Máximo ${VALIDATION.nombre.maxLength} caracteres`;
        }
        
        // Validar teléfono
        if (telefono && telefono.length > VALIDATION.telefono.maxLength) {
            newErrors.telefono = `Máximo ${VALIDATION.telefono.maxLength} caracteres`;
        } else if (telefono && !VALIDATION.telefono.pattern.test(telefono)) {
            newErrors.telefono = 'Solo números, guiones, espacios y paréntesis';
        }
        
        // Validar rol
        if (!rol) {
            newErrors.rol = 'Selecciona un rol';
        } else if (!VALIDATION.rol.values.includes(rol)) {
            newErrors.rol = 'Rol no válido';
        }
        
        // Validar salario
        if (salario !== '' && salario !== null) {
            const salarioNum = parseFloat(salario);
            if (isNaN(salarioNum) || salarioNum < VALIDATION.salario.min) {
                newErrors.salario = 'El salario debe ser un número positivo';
            } else if (salarioNum > VALIDATION.salario.max) {
                newErrors.salario = 'El salario excede el límite permitido';
            }
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Sincronizar el form cuando cambie el empleado seleccionado

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }
        
        onSubmit({
            idEmpleado: employee?.idEmpleado,
            nombre: nombre.trim(), 
            telefono: telefono.trim(), 
            rol, 
            salario: parseFloat(salario) || 0 
        });
    };

    return (
        <div className="form-container">
            {/* Encabezado y Título */}
            <header className="form-header">
                <h1 className="form-title">Registrar Empleado</h1>
                <p className="form-subtitle">
                    Completa los datos para dar de alta a un nuevo miembro del equipo.
                </p>
            </header>

            {/* Formulario */}
            <form
                id="employee-registration-form"
                className="employee-form"
                onSubmit={handleSubmit}
            >
                {/* Campo: Nombre */}
                <div className="form-group">
                    <label htmlFor="nombre" className="form-label">Nombre Completo *</label>
                    <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        placeholder="Nombre Completo"
                        className={`form-input ${errors.nombre ? 'input-error' : ''}`}
                        maxLength={120}
                        value={nombre}
                        onChange={e => setNombre(e.target.value)}
                    />
                    {errors.nombre && <span className="error-text">{errors.nombre}</span>}
                    <small className="char-count">{nombre.length}/120</small>
                </div>

                {/* Campo: Teléfono */}
                <div className="form-group">
                    <label htmlFor="telefono" className="form-label">Teléfono</label>
                    <input
                        type="tel"
                        id="telefono"
                        name="telefono"
                        placeholder="Teléfono (ej: 555-1234)"
                        className={`form-input ${errors.telefono ? 'input-error' : ''}`}
                        maxLength={30}
                        value={telefono}
                        onChange={e => setTelefono(e.target.value)}
                    />
                    {errors.telefono && <span className="error-text">{errors.telefono}</span>}
                    <small className="char-count">{telefono.length}/30</small>
                </div>

                {/* Campo: Rol */}
                <div className="form-group">
                    <label htmlFor="rol" className="form-label">Rol *</label>
                    <select
                        id="rol"
                        name="rol"
                        className={`form-select ${errors.rol ? 'input-error' : ''}`}
                        value={rol}
                        onChange={e => setRol(e.target.value)}
                    >
                        <option value="" disabled>
                            Selecciona el Rol
                        </option>
                        <option value="Empleado">Empleado</option>
                        <option value="Administrador">Administrador</option>
                    </select>
                    {errors.rol && <span className="error-text">{errors.rol}</span>}
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
                        min="0"
                        max="99999999.99"
                        className={`form-input ${errors.salario ? 'input-error' : ''}`}
                        value={salario}
                        onChange={e => setSalario(e.target.value)}
                    />
                    {errors.salario && <span className="error-text">{errors.salario}</span>}
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
                <button type="submit" className="form-button">
                    {employee ? 'Actualizar Empleado' : 'REGISTRAR EMPLEADO'}
                </button>
            </form>
        </div>
    );
};

export default FormEmpleado;
