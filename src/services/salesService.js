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
   * Get sales report by date range and product IDs
   * @param {string} inicio - Start date (YYYY-MM-DD)
   * @param {string} fin - End date (YYYY-MM-DD)
   * @param {Array<number>} ids - Array of product IDs (optional)
   * @returns {Promise<Array>} Sales report data
   */
  getReporteRango: async (inicio, fin, ids = []) => {
    try {
      let endpoint = `/Ventas/ReporteRango?inicio=${inicio}&fin=${fin}`;

      // Add product IDs as comma-separated string if provided
      if (ids && ids.length > 0) {
        endpoint += `&ids=${ids.join(',')}`;
      }

      const response = await api.get(endpoint);
      return response;
    } catch (error) {
      console.error('Error fetching sales report by range:', error);
      throw error;
    }
  },

  /**
   * Obtener reporte de ventas de un mes
   */
  getReporteMensual: async (month, year, ids = []) => {
    try {
      let endpoint = `/Ventas/ReporteMensual?mes=${month}&anio=${year}`;

      if (ids && ids.length > 0) {
        endpoint += `&ids=${ids.join(',')}`;
      }

      const response = await api.get(endpoint);
      return response;
    } catch (error) {
      console.error('Error fetching monthly sales report:', error);
      throw error;
    }
  },

  /**
   * Obtener detalles de una venta específica
   * @param {number} idVenta - ID de la venta
   * @returns {Promise<Array>} Lista de productos de la venta
   */
  getSaleDetails: async (idVenta) => {
    try {
      const response = await api.get(`/Ventas/Detalle/${idVenta}`);
      return response;
    } catch (error) {
      console.error('Error fetching sale details:', error);
      throw error;
    }
  },
};

export default salesService;
