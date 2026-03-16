const RestApiAdapter = require('../adapters/RestApiAdapter');

class SchemeSkillSDK {
  static createAdapter(type, config) {
    switch (type.toLowerCase()) {
      case 'rest':
        return new RestApiAdapter(config);
      // Add more adapter types here as needed
      default:
        throw new Error(`Unsupported adapter type: ${type}`);
    }
  }

  static async validateConfig(type, config) {
    try {
      const adapter = this.createAdapter(type, config);
      return { valid: true };
    } catch (error) {
      return {
        valid: false,
        error: error.message
      };
    }
  }
}

module.exports = SchemeSkillSDK; 