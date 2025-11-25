import { useState } from 'react';
import './Login.css';

function Login({ onLogin }) {
  const [formData, setFormData] = useState({
    login: '',
    password: ''
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
    // Call onLogin to switch to Main page
    onLogin();
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
            <label htmlFor="login">Usuariox</label>
            <input
              type="text"
              id="login"
              name="login"
              value={formData.login}
              onChange={handleChange}
              placeholder="Usuario"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="********"
              required
            />
          </div>

          <button type="submit" className="login-button">
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;