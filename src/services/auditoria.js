import { api } from './api';

/**
 * Servicio de Auditoría.
 * Gestiona operaciones de registros de auditoría con la API.
 * @module auditoriaService
 */
export const auditoriaService = {
  /**
   * Obtiene todos los registros de auditoría.
   * @returns {Promise<Array>} Lista de registros de auditoría
   */
  getAllAudits: async () => {
    try {
      const response = await api.get('/Auditoria');
      return response;
    } catch (error) {
      console.error('Error fetching audit records:', error);
      throw error;
    }
  },
};

export default auditoriaService;
