import { api } from './api';

/**
 * Category Service
 * Handles category-related API operations
 */
export const categoryService = {
  /**
   * Get all categories
   * @returns {Promise<Array>} List of categories
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
