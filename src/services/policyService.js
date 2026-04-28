import axios from "axios";
import { mockPolicies } from "../data/mockPolicies";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Mock API service - can be replaced with real API calls
export const policyService = {
  // Get all policies
  getAllPolicies: async () => {
    try {
      // Replace with real API call when available
      // const response = await apiClient.get('/policies');
      // return response.data;
      return mockPolicies;
    } catch (error) {
      console.error("Error fetching policies:", error);
      throw error;
    }
  },

  // Get policy by ID
  getPolicyById: async (id) => {
    try {
      // Replace with real API call when available
      // const response = await apiClient.get(`/policies/${id}`);
      // return response.data;
      return mockPolicies.find((p) => p.id === id);
    } catch (error) {
      console.error(`Error fetching policy ${id}:`, error);
      throw error;
    }
  },

  // Search policies
  searchPolicies: async (query) => {
    try {
      // Replace with real API call when available
      // const response = await apiClient.get('/policies/search', { params: { q: query } });
      // return response.data;
      const lower = query.toLowerCase();
      return mockPolicies.filter(
        (p) =>
          p.name.toLowerCase().includes(lower) ||
          p.summary.toLowerCase().includes(lower) ||
          p.category.toLowerCase().includes(lower),
      );
    } catch (error) {
      console.error("Error searching policies:", error);
      throw error;
    }
  },

  // Filter policies
  filterPolicies: async (filters) => {
    try {
      // Replace with real API call when available
      // const response = await apiClient.post('/policies/filter', filters);
      // return response.data;
      let result = [...mockPolicies];

      if (filters.category?.length) {
        result = result.filter((p) => filters.category.includes(p.category));
      }
      if (filters.status?.length) {
        result = result.filter((p) => filters.status.includes(p.status));
      }
      if (filters.country?.length) {
        result = result.filter((p) => filters.country.includes(p.country));
      }

      return result;
    } catch (error) {
      console.error("Error filtering policies:", error);
      throw error;
    }
  },

  // Get distinct categories
  getCategories: async () => {
    return [
      "Healthcare",
      "Infrastructure",
      "Education",
      "Environment",
      "Labor",
      "Agriculture",
      "Tax",
    ];
  },

  // Get distinct countries
  getCountries: async () => {
    return ["India"];
  },

  // Get distinct statuses
  getStatuses: async () => {
    return ["Proposed", "Passed", "Repealed", "Amended"];
  },
};

export default policyService;
