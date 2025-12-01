import { api } from './api';

/**
 * Servicio de Categorías.
 * Gestiona operaciones de categorías de productos con la API.
 * @module categoryService
 */
export const categoryService = {
  /**
   * Obtiene todas las categorías.
   * @returns {Promise<Array>} Lista de categorías
   */
  getAllCategories: async () => {
    try {
      const response = await api.get('/Categorias');
      return response;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  },
};

export default categoryService;
