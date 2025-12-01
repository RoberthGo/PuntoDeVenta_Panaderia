import { useState } from 'react';
import './Login.css';

/**
 * Componente de inicio de sesión.
 * @param {Object} props
 * @param {Function} props.onLogin - Callback con las credenciales
 * @param {string} props.error - Mensaje de error a mostrar
 * @returns {JSX.Element}
 */
function Login({ onLogin, error }) {
  const [formData, setFormData] = useState({
    nombreUsuario: '',
    clave: ''
  });

  /** @param {Event} e */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  /** @param {Event} e */
  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(formData);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>Panadería</h1>
          <h2>Iniciar Sesión</h2>
        </div>
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="nombreUsuario">Usuario</label>
            <input
              type="text"
              id="nombreUsuario"
              name="nombreUsuario"
              value={formData.nombreUsuario}
              onChange={handleChange}
              placeholder="Usuario"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="clave">Contraseña</label>
            <input
              type="password"
              id="clave"
              name="clave"
              value={formData.clave}
              onChange={handleChange}
              placeholder="********"
              required
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="login-button">
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;