// lib/api.ts
import axios from 'axios';

// Define the API key
const API_KEY = process.env.NEXT_PUBLIC_API_KEY || '';

// Create a pre-configured axios instance
const api = axios.create({
    baseURL: 'https://hypetorch-api.onrender.com/api',
    headers: {
      'X-API-Key': API_KEY,
      'Content-Type': 'application/json'
    }
});

export const ADMIN_SECRET = process.env.NEXT_PUBLIC_ADMIN_SECRET;

// Add a request interceptor for admin routes
api.interceptors.request.use(
  config => {
    // Check if this is an admin route
    if (config.url?.includes('/admin/')) {
      // Add admin_key parameter to all admin routes
      config.params = {
        ...config.params,
        admin_key: ADMIN_SECRET
      };
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export { API_KEY };  
export default api;