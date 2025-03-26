import axios from 'axios';

// API configuration
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://hypetorch-api.onrender.com/api';
export const API_KEY = process.env.NEXT_PUBLIC_API_KEY || '';

// Create a configured axios instance
const api = axios.create({
  baseURL: API_URL,
  timeout: 30000, // 30 seconds
  headers: {
    'X-API-Key': API_KEY
  }
});

// Add response interceptor to normalize data structure
api.interceptors.response.use(
  (response) => {
    // If response is wrapped in success/data structure, unwrap it
    if (response.data && typeof response.data === 'object' && 'status' in response.data && response.data.status === 'success' && 'data' in response.data) {
      return {
        ...response,
        data: response.data.data
      };
    }
    return response;
  },
  (error) => {
    // Handle 402 Payment Required (token issue)
    if (error.response && error.response.status === 402) {
      console.error('API Token Error:', error.response.data);
      // You could redirect to a subscription page or show a message
    }
    
    return Promise.reject(error);
  }
);

// Debug info
console.log('API URL:', API_URL);
console.log('API Key configured:', API_KEY ? 'Yes' : 'No');

export default api;