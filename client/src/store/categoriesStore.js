import { create } from 'zustand';
import axios from 'axios';

const API_URL =
  process.env.REACT_APP_MODE === 'development'
    ? 'http://localhost:8000/api/categories'
    : '/api/categories';
axios.defaults.withCredentials = true;

export const useCategoriesStore = create((set) => ({
  // State
  error: null,
  isLoading: false,

  // Create Category
  createCategory: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}`, data);

      set({
        isLoading: false,
      });
      return response.data;
    } catch (error) {
      set({
        error:
          error.response.data.message ||
          'Something went wrong while creating category',
        isLoading: false,
      });
      throw error;
    }
  },

  // Get Categories
  getCategories: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}`);

      set({
        isLoading: false,
      });
      return response.data;
    } catch (error) {
      set({
        error:
          error.response.data.message ||
          'Something went wrong while fetching categories',
        isLoading: false,
      });
      throw error;
    }
  },

  // Update Category
  updateCategory: async (id, data) => {
    set({ isLoading: true, error: null });
    try {
      await axios.put(`${API_URL}/${id}`, data);
      set({
        isLoading: false,
      });
    } catch (error) {
      set({
        error:
          error.response.data.message ||
          'Something went wrong while updating category',
        isLoading: false,
      });
      throw error;
    }
  },

  // Delete Category
  deleteCategory: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await axios.delete(`${API_URL}/${id}`);
      set({
        isLoading: false,
      });
    } catch (error) {
      set({
        error:
          error.response.data.message ||
          'Something went wrong while deleting category',
        isLoading: false,
      });
      throw error;
    }
  },
}));
