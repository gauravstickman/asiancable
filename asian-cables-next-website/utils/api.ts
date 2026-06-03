import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://187.127.133.212:5000/api',
});

export const getBaseUrl = () => process.env.NEXT_PUBLIC_BASE_URL || 'http://187.127.133.212:5000';

export default api;
