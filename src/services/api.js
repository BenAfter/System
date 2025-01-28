import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || '/api';

export const api = {
  async getModelData() {
    const response = await axios.get(`${API_BASE_URL}/model-data`);
    return response.data;
  },

  async saveModelConfiguration(config) {
    const response = await axios.post(`${API_BASE_URL}/save-config`, config);
    return response.data;
  },

  async loadModelConfiguration(id) {
    const response = await axios.get(`${API_BASE_URL}/load-config/${id}`);
    return response.data;
  },

  async getMaterialPresets() {
    const response = await axios.get(`${API_BASE_URL}/material-presets`);
    return response.data;
  },

  async exportCostReport(data) {
    const response = await axios.post(`${API_BASE_URL}/export-report`, data);
    return response.data;
  }
};

export default api;
