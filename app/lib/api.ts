// lib/api.ts
import axios from 'axios';

// Create a pre-configured axios instance
const api = axios.create({
  baseURL: 'https://hypetorch-api.onrender.com/api',
  headers: {
    'X-API-Key': process.env.NEXT_PUBLIC_API_KEY || '9959cae2d2c8d372f24a7d4e7c2735b0da79ac150d062f8559fb8f5d57bc7232',
  }
});

export default api;