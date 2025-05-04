
import axios from 'axios';
import { toast } from 'sonner';

// Create a base axios instance with the MongoDB URI
const api = axios.create({
  baseURL: 'http://localhost:5000/api', // We'll create an Express backend server
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add an interceptor to add auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle network errors (server not running, etc.)
    if (error.code === 'ERR_NETWORK') {
      return Promise.reject({
        message: "Cannot connect to server. Please make sure the backend is running."
      });
    }
    
    // Handle API errors
    const message = 
      error.response?.data?.message || 
      error.message ||
      "An unexpected error occurred. Please try again.";
    
    // Don't toast errors here, let the components handle them
    return Promise.reject({ message });
  }
);

// Auth endpoints
export const authAPI = {
  login: async (email: string, password: string) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      return response.data;
    } catch (error: any) {
      throw error;
    }
  },
  
  register: async (name: string, email: string, password: string) => {
    try {
      const response = await api.post('/auth/register', { name, email, password });
      return response.data;
    } catch (error: any) {
      throw error;
    }
  },
  
  logout: async () => {
    try {
      const response = await api.post('/auth/logout');
      return response.data;
    } catch (error) {
      // For logout, we don't want to prevent the user from logging out
      // even if the server request fails
      console.error('Logout API error:', error);
      return { success: true }; // Return success anyway
    }
  },
  
  getCurrentUser: async () => {
    try {
      const response = await api.get('/auth/user');
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

// Skin disease diagnosis endpoints
export const diagnosisAPI = {
  uploadImage: async (image: File) => {
    const formData = new FormData();
    formData.append('image', image);
    
    const response = await api.post('/diagnosis/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
  
  submitSymptoms: async (diagnosisId: string, symptoms: Record<string, any>) => {
    const response = await api.post(`/diagnosis/${diagnosisId}/symptoms`, symptoms);
    return response.data;
  },
  
  getResults: async (diagnosisId: string) => {
    const response = await api.get(`/diagnosis/${diagnosisId}/results`);
    return response.data;
  },
  
  getUserHistory: async () => {
    const response = await api.get('/diagnosis/history');
    return response.data;
  },
};

export default api;
