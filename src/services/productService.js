import { api } from './api';

/**
 * Servicio de Productos.
 * Gestiona operaciones CRUD de productos con la API.
 * @module productService
 */
export const productService = {
  /**
   * Obtiene todos los productos.
   * @returns {Promise<Array>} Lista de productos
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
   * Obtiene un producto por su ID.
   * @param {number} id - ID del producto
   * @returns {Promise<Object>} Datos del producto
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
   * Crea un nuevo producto.
   * @param {FormData} productData - Datos del producto como FormData
   * @returns {Promise<Object>} Producto creado
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
   * Actualiza un producto existente.
   * @param {number} id - ID del producto
   * @param {FormData} productData - Datos actualizados (incluye idProducto)
   * @returns {Promise<Object>} Producto actualizado
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
   * Elimina un producto.
   * @param {number} id - ID del producto
   * @returns {Promise<Object>} Respuesta del servidor
   */
  deleteProduct: async (id) => {
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
