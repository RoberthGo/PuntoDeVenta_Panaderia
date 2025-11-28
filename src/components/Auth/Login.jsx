import { useState } from 'react';
import './Login.css';

function Login({ onLogin, error }) {
  const [formData, setFormData] = useState({
    nombreUsuario: '',
    clave: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login: ', formData);
    // Call onLogin with form data
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