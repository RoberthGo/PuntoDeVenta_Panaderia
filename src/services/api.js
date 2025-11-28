// Base API configuration
// Using relative path to leverage Vite proxy and avoid CORS issues
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

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
      console.error('Request URL:', url);
      console.error('Request Config:', config);
      throw new Error(errorData.message || `HTTP Error: ${response.status}`);
    }

    // Parse JSON response
    const data = await response.json();
    return data;
  } catch (error) {
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
};

export default api;
