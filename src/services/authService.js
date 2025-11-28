import { api } from './api';

/**
 * Authentication Service
 * Para operaciones de autenticacion basicas
 * no JWT
 * login y register
 */
export const authService = {
  /**
   * Login user
   * @param {string} nombreUsuario - Username
   * @param {string} clave - password
   * @returns {Promise<object>} User data
   */
  login: async (nombreUsuario, clave) => {
    try {
      const payload = { 
        "nombreUsuario": nombreUsuario, 
        "clave": clave 
      };
      
      console.log('Sending login request with payload:', payload);
      
      const response = await api.post('/Acceso/Login', payload);
      
      console.log('Login response:', response);
      
      // Store the entire response as user data
      if (response) {
        localStorage.setItem('userData', JSON.stringify(response));
      }
      
      return response;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  /**
   * Logout
   */
  logout: async () => {
    try {
      localStorage.removeItem('userData');
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  },

  /**
   * Obtener usuario desde localStorage
   * @returns {object|null} User data
   */
  getCurrentUser: () => {
    const userData = localStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
  },

  /**
   * Comprobar autenticacion
   * @returns {boolean}
   */
  isAuthenticated: () => {
    return !!localStorage.getItem('userData');
  },

  /**
   * Registrar nuevo usuario
   * @param {object} userData - User registration data
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
