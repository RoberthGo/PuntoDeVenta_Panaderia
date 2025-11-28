import { api } from './api';

/**
 * Auditoria Service
 * Handles audit-related API operations
 */
export const auditoriaService = {
  /**
   * Todas las auditorias
   * @returns {Promise<Array>} List of audit records
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
