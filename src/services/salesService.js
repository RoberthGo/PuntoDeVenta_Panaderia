import { api } from './api';

/**
 * Sales Service
 * Handles sales-related API operations
 */
export const salesService = {
  /**
   * Create new sale
   * @param {object} saleData - Sale data including products and customer info
   * @returns {Promise<object>} Created sale
   */
  createSale: async (saleData) => {
    try {
      const response = await api.post('/Ventas/Registrar', saleData);
      return response;
    } catch (error) {
      console.error('Error creating sale:', error);
      throw error;
    }
  },

  /**
   * Obtener todas las ventas
   * @returns {Promise<Array>} Lista de ventas
   */
  getAllSales: async (filters = {}) => {
    try {
      const endpoint = '/Ventas';
      const response = await api.get(endpoint);
      return response;
    } catch (error) {
      console.error('Error fetching sales:', error);
      throw error;
    }
  },

  /**
   * Get sales history
   * @param {string} startDate - Start date (YYYY-MM-DD)
   * @param {string} endDate - End date (YYYY-MM-DD)
   * @returns {Promise<Array>} Sales history
   */
  getSalesHistory: async (startDate, endDate) => {
    try {
      const response = await api.get(`/sales/history?startDate=${startDate}&endDate=${endDate}`);
      return response;
    } catch (error) {
      console.error('Error fetching sales history:', error);
      throw error;
    }
  },

  /**
   * Get sales statistics
   * @returns {Promise<object>} Sales statistics
   */
  getSalesStats: async () => {
    try {
      const response = await api.get('/sales/stats');
      return response;
    } catch (error) {
      console.error('Error fetching sales statistics:', error);
      throw error;
    }
  },

  /**
   * Cancel sale
   * @param {number} id - Sale ID
   * @returns {Promise<object>}
   */
  cancelSale: async (id) => {
    try {
      const response = await api.post(`/sales/${id}/cancel`);
      return response;
    } catch (error) {
      console.error(`Error canceling sale ${id}:`, error);
      throw error;
    }
  },
};

export default salesService;
