import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const apiClient = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor for logging
apiClient.interceptors.request.use(
  (config) => {
    console.log("📤 API Request:", config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error("📤 Request Error:", error);
    return Promise.reject(error);
  },
);

// Add response interceptor for logging
apiClient.interceptors.response.use(
  (response) => {
    console.log("📥 API Response:", response.status, response.data);
    return response;
  },
  (error) => {
    console.error(
      "📥 Response Error:",
      error.response?.status,
      error.response?.data || error.message,
    );
    return Promise.reject(error);
  },
);

const chatService = {
  /**
   * Send a message to the chatbot
   * @param {string} question - User's question
   * @param {array} history - Previous messages for context
   * @returns {Promise} { answer, sources, confidence }
   */
  async sendMessage(question, history = []) {
    try {
      const response = await apiClient.post("/chat", {
        question,
        history,
      });

      // Validate response structure
      if (!response.data.answer) {
        throw new Error("Invalid API response: missing answer field");
      }

      return {
        answer: response.data.answer,
        sources: response.data.sources || [],
        confidence: response.data.confidence || 0.8,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      console.error("Chat service error:", error);

      // Return fallback response if API is down
      if (error.code === "ECONNREFUSED" || error.message.includes("Network")) {
        return {
          answer:
            "I'm currently offline. Showing cached information:\n\nFor the latest policy information, please check back when the service is available.",
          sources: [],
          confidence: 0.5,
          isFallback: true,
        };
      }

      throw error;
    }
  },

  /**
   * Get chat history
   * @returns {Promise} Array of previous chats
   */
  async getChatHistory() {
    try {
      const response = await apiClient.get("/chat/history");
      return response.data.history || [];
    } catch (error) {
      console.error("Failed to get chat history:", error);
      return [];
    }
  },

  /**
   * Clear chat history
   * @returns {Promise}
   */
  async clearChatHistory() {
    try {
      await apiClient.delete("/chat/history");
    } catch (error) {
      console.error("Failed to clear chat history:", error);
      throw error;
    }
  },

  /**
   * Submit feedback for a response
   * @param {string} messageId - ID of the message
   * @param {string} feedback - 'positive' or 'negative'
   * @returns {Promise}
   */
  async submitFeedback(messageId, feedback) {
    try {
      const response = await apiClient.post("/feedback", {
        messageId,
        feedback,
      });
      return response.data;
    } catch (error) {
      console.error("Failed to submit feedback:", error);
      // Don't throw - feedback is optional
      return null;
    }
  },

  /**
   * Search for specific policies
   * @param {string} query - Search query
   * @returns {Promise} Array of matching policies
   */
  async searchPolicies(query) {
    try {
      const response = await apiClient.get("/policies/search", {
        params: { q: query },
      });
      return response.data.policies || [];
    } catch (error) {
      console.error("Failed to search policies:", error);
      return [];
    }
  },

  /**
   * Get policy details by ID
   * @param {string} policyId - Policy ID
   * @returns {Promise} Policy object
   */
  async getPolicyDetails(policyId) {
    try {
      const response = await apiClient.get(`/policies/${policyId}`);
      return response.data;
    } catch (error) {
      console.error("Failed to get policy details:", error);
      throw error;
    }
  },

  /**
   * Get health status of the API
   * @returns {Promise} { status, version }
   */
  async getHealthStatus() {
    try {
      const response = await apiClient.get("/health");
      return response.data;
    } catch (error) {
      console.error("API is offline:", error);
      return { status: "offline", error: error.message };
    }
  },
};

export default chatService;
