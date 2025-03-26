import axios from 'axios';

// Base API config
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://hypetorch-api.onrender.com/api',
  timeout: 30000, // 30 seconds
});

// Export your API key for debugging purposes only - remove in production
export const API_KEY = process.env.NEXT_PUBLIC_API_KEY || 'your-fallback-api-key';

// Add a request interceptor to include the API key in all requests
api.interceptors.request.use(
  (config) => {
    // Always add the API key to the headers
    config.headers['X-API-Key'] = API_KEY;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle errors consistently
api.interceptors.response.use(
  (response) => {
    // Check if the response has a data property
    if (response.data && response.data.status === 'success' && response.data.data) {
      // If the response is wrapped in a data property, return just the data
      return {
        ...response,
        data: response.data.data
      };
    }
    return response;
  },
  (error) => {
    // Handle 402 Payment Required specifically
    if (error.response && error.response.status === 402) {
      console.error('API Token Error:', error.response.data);
      // You could add custom handling here, like redirecting to a subscription page
    }
    
    return Promise.reject(error);
  }
);


export default api;