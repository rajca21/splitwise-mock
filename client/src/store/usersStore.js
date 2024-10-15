import { create } from 'zustand';
import axios from 'axios';

const API_URL = 'http://localhost:8000/api/users';
axios.defaults.withCredentials = true;

export const useUserStore = create((set) => ({
  // State
  error: null,
  isLoading: false,

  // Get All Users
  getAllUsers: async () => {
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
          'Something went wrong while fetching users',
        isLoading: false,
      });
      throw error;
    }
  },

  // Get Other Users
  getOtherUsers: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/other-users`);

      set({
        isLoading: false,
      });
      return response.data;
    } catch (error) {
      set({
        error:
          error.response.data.message ||
          'Something went wrong while fetching other users',
        isLoading: false,
      });
      throw error;
    }
  },
}));
