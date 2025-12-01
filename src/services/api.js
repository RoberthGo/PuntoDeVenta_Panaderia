/**
 * Módulo de comunicación con la API del backend.
 * Proporciona métodos HTTP (GET, POST, PUT, DELETE) con manejo de errores.
 * @module api
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

/**
 * Traduce códigos HTTP a mensajes amigables en español.
 * @param {number} status - Código de estado HTTP
 * @param {string} serverMessage - Mensaje del servidor (opcional)
 * @returns {string} Mensaje de error legible
 */
const getErrorMessage = (status, serverMessage) => {
  if (serverMessage) return serverMessage;

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
 * Realiza una petición HTTP a la API.
 * @param {string} endpoint - Ruta del endpoint (ej: '/productos')
 * @param {Object} options - Opciones de fetch (method, headers, body)
 * @returns {Promise<Object>} Respuesta JSON del servidor
 * @throws {Error} Error con mensaje amigable si la petición falla
 */
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;

  const config = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const serverMessage = errorData.mensaje || errorData.message;
      throw new Error(getErrorMessage(response.status, serverMessage));
    }

    return await response.json();
  } catch (error) {
    if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
      throw new Error('No se puede conectar al servidor. Verifica tu conexión.');
    }
    throw error;
  }
};

/** Objeto con métodos HTTP para comunicarse con la API */
export const api = {
  /** @param {string} endpoint @param {Object} options */
  get: (endpoint, options = {}) =>
    apiRequest(endpoint, { ...options, method: 'GET' }),

  /** @param {string} endpoint @param {Object} body @param {Object} options */
  post: (endpoint, body, options = {}) =>
    apiRequest(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(body)
    }),

  /** @param {string} endpoint @param {Object} body @param {Object} options */
  put: (endpoint, body, options = {}) =>
    apiRequest(endpoint, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(body)
    }),

  /** @param {string} endpoint @param {Object} options */
  delete: (endpoint, options = {}) =>
    apiRequest(endpoint, { ...options, method: 'DELETE' }),

  /** @param {string} endpoint @param {FormData} formData @param {Object} options */
  postFormData: (endpoint, formData, options = {}) => {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      ...options,
      method: 'POST',
      body: formData,
      headers: { ...options.headers },
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

  /** @param {string} endpoint @param {FormData} formData @param {Object} options */
  putFormData: (endpoint, formData, options = {}) => {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      ...options,
      method: 'PUT',
      body: formData,
      headers: { ...options.headers },
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
