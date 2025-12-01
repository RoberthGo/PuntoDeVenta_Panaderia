import { api } from './api';

/**
 * Servicio de Empleados.
 * Gestiona operaciones CRUD de empleados con la API.
 * @module employeeService
 */
export const employeeService = {
  /**
   * Obtiene todos los empleados.
   * @returns {Promise<Array>} Lista de empleados
   */
  getAllEmployees: async () => {
    try {
      const response = await api.get('/Empleados');
      return response;
    } catch (error) {
      console.error('Error fetching employees:', error);
      throw error;
    }
  },

  /**
   * Obtiene un empleado por su ID.
   * @param {number} id - ID del empleado
   * @returns {Promise<Object>} Datos del empleado
   */
  getEmployeeById: async (id) => {
    try {
      const response = await api.get(`/employees/${id}`);
      return response;
    } catch (error) {
      console.error(`Error fetching employee ${id}:`, error);
      throw error;
    }
  },

  /**
   * Crea un nuevo empleado junto con sus credenciales de acceso.
   * El backend maneja ambos registros en una sola transacción.
   * @param {Object} employeeData - Datos del empleado y credenciales
   * @param {string} employeeData.nombre - Nombre completo
   * @param {string} employeeData.telefono - Teléfono
   * @param {string} employeeData.rol - 'Empleado' o 'Administrador'
   * @param {number} employeeData.salario - Salario
   * @param {Object} employeeData.credenciales - Credenciales de acceso
   * @param {string} employeeData.credenciales.nombreUsuario - Nombre de usuario
   * @param {string} employeeData.credenciales.clave - Contraseña
   * @returns {Promise<Object>} Respuesta del servidor
   */
  createEmployee: async (employeeData) => {
    try {
      const { nombre, telefono, rol, salario, credenciales } = employeeData;

      // Formato plano que espera EmpleadoRegistro en el backend
      const payload = {
        nombre,
        telefono,
        rol,
        salario,
        nombreUsuario: credenciales.nombreUsuario,
        clave: credenciales.clave
      };

      const response = await api.post('/Empleados', payload);
      return response;
    } catch (error) {
      console.error('Error creating employee:', error);
      throw error;
    }
  },

  /**
   * Actualiza un empleado existente.
   * @param {Object} employeeData - Datos actualizados
   * @param {number} employeeData.idEmpleado - ID del empleado
   * @param {string} employeeData.nombre - Nombre completo
   * @param {string} employeeData.telefono - Teléfono
   * @param {string} employeeData.rol - 'Empleado' o 'Administrador'
   * @param {number} employeeData.salario - Salario
   * @returns {Promise<Object>} Empleado actualizado
   */
  updateEmployee: async (employeeData) => {
    try {
      const { idEmpleado, nombre, telefono, rol, salario } = employeeData;
      const payload = { idEmpleado, nombre, telefono, rol, salario };
      const response = await api.put('/Empleados/', payload);
      return response;
    } catch (error) {
      console.error(`Error updating employee:`, error);
      throw error;
    }
  },

  /**
   * Elimina un empleado.
   * @param {number} id - ID del empleado
   * @returns {Promise<Object>} Respuesta del servidor
   */
  deleteEmployee: async (id) => {
    try {
      const response = await api.delete(`/Empleados/${id}`);
      return response;
    } catch (error) {
      console.error(`Error deleting employee ${id}:`, error);
      throw error;
    }
  },
};

export default employeeService;
