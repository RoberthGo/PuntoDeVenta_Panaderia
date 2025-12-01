import { api } from './api';

/**
 * Product Service
 * Handles product-related API operations
 */
export const productService = {
  /**
   * Tomar todos los productos
   * @returns {Promise<Array>} List of products
   */
  getAllProducts: async () => {
    try {
      const response = await api.get('/Productos');
      return response;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },

  /**
   * Get product by ID
   * @param {number} id - Product ID
   * @returns {Promise<object>} Product data
   */
  getProductById: async (id) => {
    try {
      const response = await api.get(`/Productos/${id}`);
      return response;
    } catch (error) {
      console.error(`Error fetching product ${id}:`, error);
      throw error;
    }
  },

  /**
   * Crear nuevo producto
   * @param {FormData} productData - Product data as FormData
   * @returns {Promise<object>} Created product
   */
  createProduct: async (productData) => {
    try {
      const userJson = localStorage.getItem('user');
      let usuario = '';
      
      if (userJson) {
        try {
          usuario = userJson || '';
        } catch (e) {
          console.error('Error parsing user from localStorage:', e);
        }
      }
      
      const response = await api.postFormData('/Productos', productData, {
        headers: {
          'usuario': usuario,
        }
      });
      return response;
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  },

  /**
   * Update product
   * @param {number} id - Product ID
   * @param {FormData} productData - Updated product data as FormData (already includes idProducto)
   * @returns {Promise<object>} Updated product
   */
  updateProduct: async (id, productData) => {
    try {
      const userJson = localStorage.getItem('user');
      let usuario = '';
      
      if (userJson) {
        try {
          usuario = userJson || '';
        } catch (e) {
          console.error('Error parsing user from localStorage:', e);
        }
      }
      
      // Don't use ID in route, backend expects it in FormData only
      const response = await api.putFormData(`/Productos`, productData, {
        headers: {
          'usuario': usuario,
        }
      });
      return response;
    } catch (error) {
      console.error(`Error updating product ${id}:`, error);
      throw error;
    }
  },

  /**
   * Delete product
   * @param {number} id - Product ID
   * @returns {Promise<object>}
   */
  deleteProduct: async (id) => {
    try {
      // Get user from localStorage for audit purposes
      const userJson = localStorage.getItem('user');
      let usuario = '';
      
      if (userJson) {
        try {
          // const user = JSON.parse(userJson);
          usuario = userJson || '';
        } catch (e) {
          console.error('Error parsing user from localStorage:', e);
        }
      }
      
      const response = await api.delete(`/Productos/${id}`, {
        headers: {
          'usuario': usuario,
        }
      });
      return response;
    } catch (error) {
      console.error(`Error deleting product ${id}:`, error);
      throw error;
    }
  },
};

export default productService;
