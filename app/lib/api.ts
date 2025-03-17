// lib/api.ts
import axios from 'axios';

// Define the API key
const API_KEY = process.env.NEXT_PUBLIC_API_KEY || '9959cae2d2c8d372f24a7d4e7c2735b0da79ac150d062f8559fb8f5d57bc7232';

// Create a pre-configured axios instance
const api = axios.create({
    baseURL: 'https://hypetorch-api.onrender.com/api',
    headers: {
      'X-API-Key': process.env.NEXT_PUBLIC_API_KEY || API_KEY,
      'Content-Type': 'application/json'
    }
  });

// Add a request interceptor to ensure API key is included in every request
api.interceptors.request.use(
    config => {
      console.log('🔍 Interceptor - Current Headers:', config.headers);
      console.log('🔑 Environment API Key:', process.env.NEXT_PUBLIC_API_KEY);
      console.log('🔑 Hardcoded API Key:', API_KEY);
  
      // Always make sure X-API-Key is in the headers, prioritizing environment variable
      if (!config.headers['X-API-Key']) {
        config.headers['X-API-Key'] = process.env.NEXT_PUBLIC_API_KEY || API_KEY;
        console.warn('🚨 API Key was missing, manually added');
      }
      return config;
    },
    error => {
      console.error('❌ Interceptor Error:', error);
      return Promise.reject(error);
    }
  );

export default api;