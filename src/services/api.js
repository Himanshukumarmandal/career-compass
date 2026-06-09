import axios from 'axios';

// Get API URL from env variables (falls back to local relative route proxy in dev)
const API_URL = import.meta.env.VITE_API_URL || '';

const api = axios.create({
  baseURL: `${API_URL}/api`,
});

// Inject JWT token on every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('cc_token') || sessionStorage.getItem('cc_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Globally handle 401 Unauthorized responses
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Clear local auth session info
      localStorage.removeItem('cc_token');
      localStorage.removeItem('cc_admin');
      sessionStorage.removeItem('cc_token');
      sessionStorage.removeItem('cc_admin');
      
      // Redirect to admin login page
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

export default api;
