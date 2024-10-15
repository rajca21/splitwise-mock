import { create } from 'zustand';
import axios from 'axios';

const API_URL = 'http://localhost:8000/api/trips';
axios.defaults.withCredentials = true;

export const useTripStore = create((set) => ({
  // State
  error: null,
  isLoading: false,

  // Create Trip
  createTrip: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/`, data);

      set({
        isLoading: false,
      });
      return response.data;
    } catch (error) {
      set({
        error:
          error.response.data.message ||
          'Something went wrong while creating new trip',
        isLoading: false,
      });
      throw error;
    }
  },

  // Get Trips
  getTrips: async ({ ...props }) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(
        `${API_URL}?startIndex=${props.startIndex}&limit=${props.limit}&order=${props.order}&searchTerm=${props.searchTerm}`
      );

      set({
        isLoading: false,
      });
      return response.data;
    } catch (error) {
      set({
        error:
          error.response.data.message ||
          'Something went wrong while fetching trips',
        isLoading: false,
      });
      throw error;
    }
  },

  // Get All Trips
  getAllTrips: async (searchTerm) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(
        `${API_URL}/all?searchTerm=${searchTerm}`
      );

      set({
        isLoading: false,
      });
      return response.data;
    } catch (error) {
      set({
        error:
          error.response.data.message ||
          'Something went wrong while fetching all trips',
        isLoading: false,
      });
      throw error;
    }
  },
}));
