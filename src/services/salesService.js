import { api } from './api';

/**
 * Servicio de Ventas.
 * Gestiona operaciones de ventas y reportes con la API.
 * @module salesService
 */
export const salesService = {
  /**
   * Registra una nueva venta.
   * @param {Object} saleData - Datos de la venta (idEmpleado, productos)
   * @returns {Promise<Object>} Venta creada
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
   * Obtiene reporte de ventas por rango de fechas.
   * @param {string} inicio - Fecha inicio (YYYY-MM-DD)
   * @param {string} fin - Fecha fin (YYYY-MM-DD)
   * @param {Array<number>} ids - IDs de productos (opcional)
   * @returns {Promise<Array>} Datos del reporte
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
   * Obtiene reporte de ventas mensual.
   * @param {number} month - Número del mes (1-12)
   * @param {number} year - Año
   * @param {Array<number>} ids - IDs de productos (opcional)
   * @returns {Promise<Array>} Datos del reporte mensual
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
