import { ITrainingModule } from '../models/TrainingModule';
import TrainingModule from '../models/TrainingModule';
import { IUser } from '../models/User';
import User from '../models/User';
import { ISearchHistory } from '../models/SearchHistory';
import SearchHistory from '../models/SearchHistory';
import { IAnalytics } from '../models/Analytics';
import Analytics from '../models/Analytics';
import { ONDCProtocol } from '../utils/ondcProtocol';
import { Types } from 'mongoose';

export class BPPService {
  private ondcProtocol: ONDCProtocol;

  constructor() {
    this.ondcProtocol = new ONDCProtocol();
  }

  async searchModules(query: string, filters: any, userId: string) {
    try {
      // Search modules based on query and filters
      const modules = await TrainingModule.find({
        $text: { $search: query },
        ...filters,
        status: 'published'
      }).populate('provider');

      // Log search analytics
      await this.logSearchAnalytics(query, filters, userId, modules.length);

      // Update search history
      await this.updateSearchHistory(userId, query, filters, modules);

      return modules;
    } catch (error) {
      console.error('Error in searchModules:', error);
      throw error;
    }
  }

  async getModuleDetails(moduleId: string, userId: string) {
    try {
      const module = await TrainingModule.findById(moduleId)
        .populate('provider')
        .populate('rating');

      // Log module view analytics
      await this.logModuleViewAnalytics(moduleId, userId);

      return module;
    } catch (error) {
      console.error('Error in getModuleDetails:', error);
      throw error;
    }
  }

  async initiateOrder(moduleId: string, userId: string) {
    try {
      const module = await TrainingModule.findById(moduleId);
      const user = await User.findById(userId);

      if (!module || !user) {
        throw new Error('Module or user not found');
      }

      // Create ONDC order
      const order = await this.ondcProtocol.createOrder({
        moduleId,
        userId,
        price: module.price,
        providerId: module.provider.toString()
      });

      return order;
    } catch (error) {
      console.error('Error in initiateOrder:', error);
      throw error;
    }
  }

  private async logSearchAnalytics(
    query: string,
    filters: any,
    userId: string,
    resultsCount: number
  ) {
    try {
      const analytics = new Analytics({
        userId,
        timestamp: new Date(),
        searchHistory: [{
          query,
          filters,
          resultsCount,
          clickThroughRate: 0,
          timeSpent: 0
        }]
      });

      await analytics.save();
    } catch (error) {
      console.error('Error in logSearchAnalytics:', error);
    }
  }

  private async logModuleViewAnalytics(moduleId: string, userId: string) {
    try {
      const analytics = new Analytics({
        moduleId,
        userId,
        timestamp: new Date(),
        engagement: {
          moduleCompletions: 0,
          averageRating: 0,
          comments: 0,
          shares: 0
        }
      });

      await analytics.save();
    } catch (error) {
      console.error('Error in logModuleViewAnalytics:', error);
    }
  }

  private async updateSearchHistory(
    userId: string,
    query: string,
    filters: any,
    results: any[]
  ) {
    try {
      const searchHistory = await SearchHistory.findOne({ userId }) || new SearchHistory({ userId });
      
      searchHistory.searches.push({
        query,
        filters,
        timestamp: new Date(),
        results: results.map((result, index) => ({
          moduleId: result._id,
          position: index + 1,
          clicked: false,
          timeSpent: 0
        })),
        sessionId: new Types.ObjectId().toString()
      });

      await searchHistory.save();
    } catch (error) {
      console.error('Error in updateSearchHistory:', error);
    }
  }
} 