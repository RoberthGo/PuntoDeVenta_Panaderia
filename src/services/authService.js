import { api } from './api';

/**
 * Authentication Service
 * Operaciones de autenticación: login, logout, register
 */
export const authService = {
  /**
   * @param {string} nombreUsuario
   * @param {string} clave
   * @returns {Promise<object>}
   */
  login: async (nombreUsuario, clave) => {
    try {
      const payload = { nombreUsuario, clave };
      const response = await api.post('/Acceso/Login', payload);

      if (response && response.usuario) {
        localStorage.setItem('userData', JSON.stringify(response));
        localStorage.setItem('idUsuario', response.usuario.idUsuario);
        localStorage.setItem('user', nombreUsuario);
      }

      return response;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  logout: async () => {
    try {
      localStorage.removeItem('userData');
      localStorage.removeItem('idUsuario');
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  },

  /** @returns {object|null} */
  getCurrentUser: () => {
    const userData = localStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
  },

  /** @returns {number|null} */
  getUserId: () => {
    const idUsuario = localStorage.getItem('idUsuario');
    return idUsuario ? parseInt(idUsuario, 10) : null;
  },

  /** @returns {boolean} */
  isAuthenticated: () => {
    return !!localStorage.getItem('userData');
  },

  /** @returns {string} 'admin' o 'empleado' */
  getUserRole: () => {
    const userData = localStorage.getItem('userData');
    if (userData) {
      const parsed = JSON.parse(userData);
      const rol = parsed?.usuario?.rol;
      if (rol && rol.toLowerCase() === 'administrador') {
        return 'admin';
      }
    }
    return 'empleado';
  },

  /** @returns {boolean} */
  isAdmin: () => {
    const userData = localStorage.getItem('userData');
    if (userData) {
      const parsed = JSON.parse(userData);
      const rol = parsed?.usuario?.rol || parsed?.usuario?.Rol;
      return rol && rol.toLowerCase() === 'administrador';
    }
    return false;
  },

  /**
   * @param {object} userData
   * @returns {Promise<object>}
   */
  register: async (userData) => {
    try {
      const response = await api.post('/Acceso/Registrar', userData);
      return response;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  },
};

export default authService;
