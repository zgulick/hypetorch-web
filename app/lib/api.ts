import axios from 'axios';

// API configuration — see app/lib/api_v2.ts for the isomorphic rationale.
const IS_SERVER = typeof window === 'undefined';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://hypetorch-api.onrender.com/api';

// Server-only, and deliberately not exported. It was previously exported and
// rendered by app/admin/docs — which is statically prerendered, so the build
// baked the live key into public HTML. Keep it module-private.
const API_KEY = process.env.API_KEY || '';

// Create a configured axios instance
const api = axios.create({
  baseURL: IS_SERVER ? API_URL : '/api/ht',
  timeout: 30000, // 30 seconds
  headers: IS_SERVER && API_KEY ? { 'X-API-Key': API_KEY } : {}
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
console.log('API URL:', api.defaults.baseURL);

export default api;