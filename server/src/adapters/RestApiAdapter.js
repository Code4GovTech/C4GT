const BaseAdapter = require('./BaseAdapter');
const axios = require('axios');

class RestApiAdapter extends BaseAdapter {
  validateConfig() {
    if (!this.config.baseUrl) {
      throw new Error('baseUrl is required in config');
    }
    if (!this.config.apiKey) {
      throw new Error('apiKey is required in config');
    }
  }

  async searchModules(filters) {
    try {
      const response = await axios.get(`${this.config.baseUrl}/api/search`, {
        params: filters,
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
          'Accept': 'application/json'
        }
      });
      return this.formatResponse(response.data);
    } catch (error) {
      throw this.formatError({
        code: 'SEARCH_ERROR',
        message: error.response?.data?.message || 'Error searching modules',
        details: error.response?.data || {}
      });
    }
  }

  async getModuleById(id, options = {}) {
    try {
      const response = await axios.get(`${this.config.baseUrl}/api/modules/${id}`, {
        params: options,
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
          'Accept': 'application/json'
        }
      });
      return this.formatResponse(response.data);
    } catch (error) {
      throw this.formatError({
        code: 'MODULE_FETCH_ERROR',
        message: error.response?.data?.message || 'Error fetching module',
        details: error.response?.data || {}
      });
    }
  }

  async getProviderInfo(providerId) {
    try {
      const response = await axios.get(`${this.config.baseUrl}/api/providers/${providerId}`, {
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
          'Accept': 'application/json'
        }
      });
      return this.formatResponse(response.data);
    } catch (error) {
      throw this.formatError({
        code: 'PROVIDER_FETCH_ERROR',
        message: error.response?.data?.message || 'Error fetching provider info',
        details: error.response?.data || {}
      });
    }
  }

  async getModuleAnalytics(moduleId) {
    try {
      const response = await axios.get(`${this.config.baseUrl}/api/analytics/modules/${moduleId}`, {
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
          'Accept': 'application/json'
        }
      });
      return this.formatResponse(response.data);
    } catch (error) {
      throw this.formatError({
        code: 'ANALYTICS_FETCH_ERROR',
        message: error.response?.data?.message || 'Error fetching module analytics',
        details: error.response?.data || {}
      });
    }
  }
}

module.exports = RestApiAdapter; 