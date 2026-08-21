import axios from 'axios';

// API configuration
//
// This module runs in both environments: server components (app/demo/page.tsx
// reaches it via dataService/verticals) and client components. On the server we
// call the API directly with the server-only key. In the browser we go through
// the same-origin proxy at /api/ht, which attaches the key server-side — so no
// key is ever inlined into the client bundle.
const IS_SERVER = typeof window === 'undefined';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://hypetorch-api.onrender.com/api';
const SERVER_API_KEY = process.env.API_KEY || '';

// Create v2 axios instance
const apiV2 = axios.create({
  baseURL: IS_SERVER ? `${API_URL}/v2` : '/api/ht/v2',
  timeout: 30000,
  headers: IS_SERVER && SERVER_API_KEY ? { 'X-API-Key': SERVER_API_KEY } : {}
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
console.log('V2 API URL:', apiV2.defaults.baseURL);

export default apiV2;