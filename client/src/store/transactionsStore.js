import { create } from 'zustand';
import axios from 'axios';

const API_URL =
  process.env.REACT_APP_MODE === 'development'
    ? 'http://localhost:8000/api/transactions'
    : '/api/transactions';
axios.defaults.withCredentials = true;

export const useTransactionsStore = create((set) => ({
  // State
  error: null,
  isLoading: false,

  // Create Transaction
  createTransaction: async (data) => {
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
          'Something went wrong while creating transaction',
        isLoading: false,
      });
      throw error;
    }
  },

  // Get My Transaction
  getMyTransactions: async () => {
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
          'Something went wrong while fetching transactions',
        isLoading: false,
      });
      throw error;
    }
  },

  // Get My Transaction
  getAllTransactions: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/all`);

      set({
        isLoading: false,
      });
      return response.data;
    } catch (error) {
      set({
        error:
          error.response.data.message ||
          'Something went wrong while fetching transactions',
        isLoading: false,
      });
      throw error;
    }
  },

  // Get Users Spending Per Trip
  getUsersSpending: async (tripId, userId) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/${tripId}/${userId}`);

      set({
        isLoading: false,
      });
      return response.data;
    } catch (error) {
      set({
        error:
          error.response.data.message ||
          'Something went wrong while fetching users spending',
        isLoading: false,
      });
      throw error;
    }
  },
}));
