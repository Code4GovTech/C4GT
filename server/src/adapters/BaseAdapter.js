class BaseAdapter {
  constructor(config = {}) {
    this.config = config;
    this.validateConfig();
  }

  validateConfig() {
    // To be implemented by specific adapters
    throw new Error('validateConfig must be implemented by the adapter');
  }

  async searchModules(filters) {
    // To be implemented by specific adapters
    throw new Error('searchModules must be implemented by the adapter');
  }

  async getModuleById(id, options = {}) {
    // To be implemented by specific adapters
    throw new Error('getModuleById must be implemented by the adapter');
  }

  async getProviderInfo(providerId) {
    // To be implemented by specific adapters
    throw new Error('getProviderInfo must be implemented by the adapter');
  }

  async getModuleAnalytics(moduleId) {
    // To be implemented by specific adapters
    throw new Error('getModuleAnalytics must be implemented by the adapter');
  }

  // Helper methods
  formatError(error) {
    return {
      code: error.code || 'INTERNAL_ERROR',
      message: error.message || 'An unexpected error occurred',
      details: error.details || {}
    };
  }

  formatResponse(data, metadata = {}) {
    return {
      success: true,
      data,
      metadata: {
        timestamp: new Date().toISOString(),
        ...metadata
      }
    };
  }
}

module.exports = BaseAdapter; 