import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

export const api = {
  analyzeResume: async (formData) => {
    // Calling the FastAPI backend analyze endpoint
    return apiClient.post('/api/analyze', formData);
  },
  
  ping: async () => {
    return apiClient.get('/health');
  }
};
