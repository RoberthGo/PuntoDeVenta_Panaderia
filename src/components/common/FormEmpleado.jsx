import React, { useState } from 'react';
import '../common/CSS/FormEmpleado.css';

/** Constantes de validación basadas en restricciones de la BD */
const VALIDATION = {
    nombre: { maxLength: 120, required: true },
    telefono: { maxLength: 30, required: false, pattern: /^[0-9\-\+\s\(\)]*$/ },
    rol: { required: true, values: ['Empleado', 'Administrador'] },
    salario: { min: 0, max: 99999999.99, required: false },
    nombreUsuario: { maxLength: 50, required: true, minLength: 3 },
    clave: { minLength: 4, required: true }
};

/**
 * Formulario para crear o editar empleados.
 * En modo creación, también registra las credenciales de acceso.
 * @param {Object} props
 * @param {Object} props.employee - Datos del empleado a editar (null para crear)
 * @param {Function} props.onSubmit - Callback al enviar el formulario
 * @returns {JSX.Element}
 */
const FormEmpleado = ({ employee, onSubmit }) => {
    const [nombre, setNombre] = useState(employee?.nombre ?? '');
    const [telefono, setTelefono] = useState(employee?.telefono ?? '');
    const [rol, setRol] = useState(employee?.rol ?? '');
    const [salario, setSalario] = useState(employee?.salario ?? '');
    const [fechaIngreso, setFechaIngreso] = useState(employee?.fechaIngreso ?? '');
    
    const [nombreUsuario, setNombreUsuario] = useState('');
    const [clave, setClave] = useState('');
    const [confirmarClave, setConfirmarClave] = useState('');
    
    const [errors, setErrors] = useState({});

    const isEditing = !!employee;

    /** Valida todos los campos del formulario @returns {boolean} */
    const validateForm = () => {
        const newErrors = {};
        
        if (!nombre.trim()) {
            newErrors.nombre = 'El nombre es obligatorio';
        } else if (nombre.length > VALIDATION.nombre.maxLength) {
            newErrors.nombre = `Máximo ${VALIDATION.nombre.maxLength} caracteres`;
        }
        
        if (telefono && telefono.length > VALIDATION.telefono.maxLength) {
            newErrors.telefono = `Máximo ${VALIDATION.telefono.maxLength} caracteres`;
        } else if (telefono && !VALIDATION.telefono.pattern.test(telefono)) {
            newErrors.telefono = 'Solo números, guiones, espacios y paréntesis';
        }
        
        if (!rol) {
            newErrors.rol = 'Selecciona un rol';
        } else if (!VALIDATION.rol.values.includes(rol)) {
            newErrors.rol = 'Rol no válido';
        }
        
        if (salario !== '' && salario !== null) {
            const salarioNum = parseFloat(salario);
            if (isNaN(salarioNum) || salarioNum < VALIDATION.salario.min) {
                newErrors.salario = 'El salario debe ser un número positivo';
            } else if (salarioNum > VALIDATION.salario.max) {
                newErrors.salario = 'El salario excede el límite permitido';
            }
        }

        if (!isEditing) {
            if (!nombreUsuario.trim()) {
                newErrors.nombreUsuario = 'El nombre de usuario es obligatorio';
            } else if (nombreUsuario.length < VALIDATION.nombreUsuario.minLength) {
                newErrors.nombreUsuario = `Mínimo ${VALIDATION.nombreUsuario.minLength} caracteres`;
            } else if (nombreUsuario.length > VALIDATION.nombreUsuario.maxLength) {
                newErrors.nombreUsuario = `Máximo ${VALIDATION.nombreUsuario.maxLength} caracteres`;
            } else if (!/^[a-zA-Z0-9_]+$/.test(nombreUsuario)) {
                newErrors.nombreUsuario = 'Solo letras, números y guion bajo';
            }

            if (!clave) {
                newErrors.clave = 'La contraseña es obligatoria';
            } else if (clave.length < VALIDATION.clave.minLength) {
                newErrors.clave = `Mínimo ${VALIDATION.clave.minLength} caracteres`;
            }

            if (clave !== confirmarClave) {
                newErrors.confirmarClave = 'Las contraseñas no coinciden';
            }
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    /** @param {Event} e - Evento del formulario */
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        
        const data = {
            idEmpleado: employee?.idEmpleado,
            nombre: nombre.trim(), 
            telefono: telefono.trim(), 
            rol, 
            salario: parseFloat(salario) || 0 
        };

        if (!isEditing) {
            data.credenciales = {
                nombreUsuario: nombreUsuario.trim(),
                clave: clave
            };
        }

        onSubmit(data);
    };

    return (
        <div className="form-container">
            <header className="form-header">
                <h1 className="form-title">
                    {isEditing ? 'Editar Empleado' : 'Registrar Empleado'}
                </h1>
                <p className="form-subtitle">
                    {isEditing 
                        ? 'Modifica los datos del empleado seleccionado.'
                        : 'Completa los datos para dar de alta a un nuevo miembro del equipo.'}
                </p>
            </header>

            <form id="employee-registration-form" className="employee-form" onSubmit={handleSubmit}>
                <div className="form-section">
                    <h3 className="section-title">📋 Datos del Empleado</h3>
                    
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

                    <div className="form-group">
                        <label htmlFor="rol" className="form-label">Rol *</label>
                        <select
                            id="rol"
                            name="rol"
                            className={`form-select ${errors.rol ? 'input-error' : ''}`}
                            value={rol}
                            onChange={e => setRol(e.target.value)}
                        >
                            <option value="" disabled>Selecciona el Rol</option>
                            <option value="Empleado">Empleado</option>
                            <option value="Administrador">Administrador</option>
                        </select>
                        {errors.rol && <span className="error-text">{errors.rol}</span>}
                    </div>

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
                </div>

                {!isEditing && (
                    <div className="form-section credentials-section">
                        <h3 className="section-title">🔐 Credenciales de Acceso</h3>
                        <p className="section-subtitle">
                            Estos datos se usarán para que el empleado inicie sesión en el sistema.
                        </p>
                        
                        <div className="form-group">
                            <label htmlFor="nombreUsuario" className="form-label">Usuario *</label>
                            <input
                                type="text"
                                id="nombreUsuario"
                                name="nombreUsuario"
                                placeholder="nombre_usuario"
                                className={`form-input ${errors.nombreUsuario ? 'input-error' : ''}`}
                                maxLength={50}
                                value={nombreUsuario}
                                onChange={e => setNombreUsuario(e.target.value.toLowerCase())}
                            />
                            {errors.nombreUsuario && <span className="error-text">{errors.nombreUsuario}</span>}
                            <small className="char-count">{nombreUsuario.length}/50</small>
                        </div>

                        <div className="form-group">
                            <label htmlFor="clave" className="form-label">Contraseña *</label>
                            <input
                                type="password"
                                id="clave"
                                name="clave"
                                placeholder="••••••••"
                                className={`form-input ${errors.clave ? 'input-error' : ''}`}
                                value={clave}
                                onChange={e => setClave(e.target.value)}
                            />
                            {errors.clave && <span className="error-text">{errors.clave}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="confirmarClave" className="form-label">Confirmar Contraseña *</label>
                            <input
                                type="password"
                                id="confirmarClave"
                                name="confirmarClave"
                                placeholder="••••••••"
                                className={`form-input ${errors.confirmarClave ? 'input-error' : ''}`}
                                value={confirmarClave}
                                onChange={e => setConfirmarClave(e.target.value)}
                            />
                            {errors.confirmarClave && <span className="error-text">{errors.confirmarClave}</span>}
                        </div>
                    </div>
                )}

                <button type="submit" className="form-button">
                    {isEditing ? 'Actualizar Empleado' : 'REGISTRAR EMPLEADO Y USUARIO'}
                </button>
            </form>
        </div>
    );
};

export default FormEmpleado;
