import axios from 'axios';

// API configuration
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://hypetorch-api.onrender.com/api';
const API_KEY = process.env.NEXT_PUBLIC_API_KEY || '';

// Create v2 axios instance
const apiV2 = axios.create({
  baseURL: `${API_URL}/v2`, // Note: v2 baseURL
  timeout: 30000,
  headers: {
    'X-API-Key': API_KEY
  }
});

// Add response interceptor to normalize data structure
apiV2.interceptors.response.use(
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
    }
    
    return Promise.reject(error);
  }
);

// Debug info
console.log('V2 API URL:', `${API_URL}/v2`);
console.log('API Key configured:', API_KEY ? 'Yes' : 'No');

export default apiV2;