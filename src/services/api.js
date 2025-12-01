// Base API configuration
// Using relative path to leverage Vite proxy and avoid CORS issues
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

/**
 * Mapeo de códigos HTTP a mensajes amigables en español
 */
const getErrorMessage = (status, serverMessage) => {
  // Si el servidor envió un mensaje, usarlo
  if (serverMessage) return serverMessage;

  // Mensajes por defecto según código HTTP
  const errorMessages = {
    400: 'Datos inválidos. Por favor verifica la información.',
    401: 'Usuario o contraseña incorrectos.',
    403: 'No tienes permiso para realizar esta acción.',
    404: 'El recurso solicitado no existe.',
    409: 'Ya existe un registro con estos datos.',
    422: 'Los datos enviados no son válidos.',
    500: 'Error en el servidor. Intenta más tarde.',
    502: 'El servidor no está disponible.',
    503: 'Servicio no disponible. Intenta más tarde.',
  };

  return errorMessages[status] || `Error de conexión (${status})`;
};

/**
 * Generic fetch wrapper with error handling
 * @param {string} endpoint - API endpoint
 * @param {object} options - Fetch options
 * @returns {Promise} - Response data
 */
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;

  const defaultHeaders = {
    'Content-Type': 'application/json',
  };

  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);

    // Handle non-OK responses
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('API Error Response:', errorData);
      // Buscar mensaje en 'mensaje' (español) o 'message' (inglés)
      const serverMessage = errorData.mensaje || errorData.message;
      throw new Error(getErrorMessage(response.status, serverMessage));
    }

    // Parse JSON response
    const data = await response.json();
    return data;
  } catch (error) {
    // Si es un error de red (no de HTTP)
    if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
      throw new Error('No se puede conectar al servidor. Verifica tu conexión.');
    }
    console.error('API Request Error:', error);
    throw error;
  }
};

/**
 * HTTP Methods
 */
export const api = {
  get: (endpoint, options = {}) =>
    apiRequest(endpoint, { ...options, method: 'GET' }),

  post: (endpoint, body, options = {}) =>
    apiRequest(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(body)
    }),

  put: (endpoint, body, options = {}) =>
    apiRequest(endpoint, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(body)
    }),

  delete: (endpoint, options = {}) =>
    apiRequest(endpoint, { ...options, method: 'DELETE' }),

  postFormData: (endpoint, formData, options = {}) => {
    const url = `${API_BASE_URL}${endpoint}`;

    const config = {
      ...options,
      method: 'POST',
      body: formData,
      headers: {
        ...options.headers,
      },
    };

    return fetch(url, config).then(async (response) => {
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const serverMessage = errorData.mensaje || errorData.message;
        throw new Error(getErrorMessage(response.status, serverMessage));
      }
      return response.json();
    }).catch((error) => {
      if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
        throw new Error('No se puede conectar al servidor. Verifica tu conexión.');
      }
      throw error;
    });
  },

  putFormData: (endpoint, formData, options = {}) => {
    const url = `${API_BASE_URL}${endpoint}`;

    const config = {
      ...options,
      method: 'PUT',
      body: formData,
      headers: {
        ...options.headers,
      },
    };

    return fetch(url, config).then(async (response) => {
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const serverMessage = errorData.mensaje || errorData.message;
        throw new Error(getErrorMessage(response.status, serverMessage));
      }
      return response.json();
    }).catch((error) => {
      if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
        throw new Error('No se puede conectar al servidor. Verifica tu conexión.');
      }
      throw error;
    });
  },
};

export default api;
