import { RestApiAdapter } from '../adapters/RestApiAdapter';
import {
  ModuleSearchFilters,
  TrainingModule,
  Provider,
  ModuleAnalytics,
  SDKConfig,
  SDKResponse,
  SDKError
} from './types';

export class SchemeSkillSDK {
  private adapter: RestApiAdapter;

  constructor(config: SDKConfig) {
    this.adapter = new RestApiAdapter(config);
  }

  async searchModules(filters: ModuleSearchFilters): Promise<SDKResponse<TrainingModule[]>> {
    try {
      return await this.adapter.searchModules(filters);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getModuleById(id: string, options: { language?: string } = {}): Promise<SDKResponse<TrainingModule>> {
    try {
      return await this.adapter.getModuleById(id, options);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getProviderInfo(providerId: string): Promise<SDKResponse<Provider>> {
    try {
      return await this.adapter.getProviderInfo(providerId);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getModuleAnalytics(moduleId: string): Promise<SDKResponse<ModuleAnalytics>> {
    try {
      return await this.adapter.getModuleAnalytics(moduleId);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  private handleError(error: any): SDKError {
    if (error.code && error.message) {
      return error as SDKError;
    }
    return {
      code: 'INTERNAL_ERROR',
      message: error.message || 'An unexpected error occurred',
      details: error
    };
  }
}

// Factory function for creating SDK instances
export function createSchemeSkillSDK(config: SDKConfig): SchemeSkillSDK {
  return new SchemeSkillSDK(config);
} 