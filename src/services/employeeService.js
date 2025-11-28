import { api } from './api';

/**
 * Servicio de Empleados
 * Handles employee-related API operations
 */
export const employeeService = {
  /**
   * Obtiene todo los empleados
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
   * Get employee by ID
   * @param {number} id - Employee ID
   * @returns {Promise<object>} Employee data
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
   * Create new employee
   * @param {object} employeeData - Employee data (nombre, telefono, rol, salario)
   * @returns {Promise<object>} Created employee
   */
  createEmployee: async (employeeData) => {
    try {
      // Backend expects: nombre, telefono, rol, salario (no fechaIngreso)
      const { nombre, telefono, rol, salario } = employeeData;
      const response = await api.post('/Empleados', { nombre, telefono, rol, salario });
      return response;
    } catch (error) {
      console.error('Error creating employee:', error);
      throw error;
    }
  },

  /**
   * Actualizar empleado
   * @param {object} employeeData - Updated employee data (nombre, telefono, rol, salario)
   * @returns {Promise<object>} Empleado actualizado
   */
  updateEmployee: async (employeeData) => {
    try {
      // Backend endpoint: /Empleados/ (no params in URL)
      // Stored procedure uses: _id, _nombre, _telefono, _rol, _salario
      const { idEmpleado, nombre, telefono, rol, salario } = employeeData;
      const payload = { 
        idEmpleado, 
        nombre, 
        telefono, 
        rol, 
        salario 
      };
      console.log('Update Employee Payload:', JSON.stringify(payload, null, 2));
      const response = await api.put('/Empleados/', payload);
      return response;
    } catch (error) {
      console.error(`Error updating employee:`, error);
      throw error;
    }
  },

  /**
   * Delete employee
   * @param {number} id - Employee ID
   * @returns {Promise<object>}
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
