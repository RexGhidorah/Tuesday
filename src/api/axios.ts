import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to add the token to the header
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle 401 errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            // Redirect to login or clear token?
            // Let AuthContext handle it if possible, but for now we can clear token
            localStorage.removeItem('token');
            // window.location.href = '/login'; // Use with caution, maybe just let it fail and UI handles it
        }
        return Promise.reject(error);
    }
);

export default api;
