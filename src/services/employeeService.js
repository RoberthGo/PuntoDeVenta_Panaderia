import { api } from './api';

/**
 * Employee Service
 * Handles employee-related API operations
 */
export const employeeService = {
  /**
   * Get all employees
   * @returns {Promise<Array>} List of employees
   */
  getAllEmployees: async () => {
    try {
      const response = await api.get('/employees');
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
   * @param {object} employeeData - Employee data
   * @returns {Promise<object>} Created employee
   */
  createEmployee: async (employeeData) => {
    try {
      const response = await api.post('/employees', employeeData);
      return response;
    } catch (error) {
      console.error('Error creating employee:', error);
      throw error;
    }
  },

  /**
   * Update employee
   * @param {number} id - Employee ID
   * @param {object} employeeData - Updated employee data
   * @returns {Promise<object>} Updated employee
   */
  updateEmployee: async (id, employeeData) => {
    try {
      const response = await api.put(`/employees/${id}`, employeeData);
      return response;
    } catch (error) {
      console.error(`Error updating employee ${id}:`, error);
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
      const response = await api.delete(`/employees/${id}`);
      return response;
    } catch (error) {
      console.error(`Error deleting employee ${id}:`, error);
      throw error;
    }
  },
};

export default employeeService;
