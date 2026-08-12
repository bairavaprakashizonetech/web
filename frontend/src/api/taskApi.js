import axios from 'axios';

// Create API instance using environment variable or local default
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const taskApi = {
  // Fetch all tasks with optional filters
  getTasks: async (params = {}) => {
    const response = await api.get('/tasks', { params });
    return response.data;
  },

  // Fetch task summary statistics
  getStats: async () => {
    const response = await api.get('/tasks/stats');
    return response.data;
  },

  // Fetch single task by ID
  getTaskById: async (id) => {
    const response = await api.get(`/tasks/${id}`);
    return response.data;
  },

  // Create a new task
  createTask: async (taskData) => {
    const response = await api.post('/tasks', taskData);
    return response.data;
  },

  // Update existing task
  updateTask: async (id, taskData) => {
    const response = await api.put(`/tasks/${id}`, taskData);
    return response.data;
  },

  // Toggle completion status
  toggleTask: async (id) => {
    const response = await api.patch(`/tasks/${id}/toggle`);
    return response.data;
  },

  // Delete a task
  deleteTask: async (id) => {
    const response = await api.delete(`/tasks/${id}`);
    return response.data;
  },
};

export default taskApi;
