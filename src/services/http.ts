// src/services/http.ts
import axios from 'axios';

export const API_URL = import.meta.env.VITE_API_URL || '/api'; // Prod = /api
const http = axios.create({
  baseURL: API_URL,
  // withCredentials: false, // JSON Server không cần cookie
});

export default http;
