import { TrainingModule } from '../models/TrainingModule';
import { User } from '../models/User';
import { IAnalytics } from '../models/Analytics';
import { ONDCProtocol } from '../utils/ondcProtocol';

export class BAPService {
  private ondcProtocol: ONDCProtocol;

  constructor() {
    this.ondcProtocol = new ONDCProtocol();
  }

  async getModuleRecommendations(userId: string) {
    try {
      const user = await User.findById(userId);
      if (!user) {
        throw new Error('User not found');
      }

      // Get recommendations based on user's interests and search history
      const recommendations = await TrainingModule.find({
        'metadata.category': { $in: user.learner?.interests || [] },
        status: 'published'
      })
        .sort({ 'rating.average': -1 })
        .limit(10);

      return recommendations;
    } catch (error) {
      console.error('Error in getModuleRecommendations:', error);
      throw error;
    }
  }

  async trackModuleProgress(moduleId: string, userId: string, progress: number) {
    try {
      const analytics = new IAnalytics({
        moduleId,
        userId,
        timestamp: new Date(),
        engagement: {
          moduleCompletions: progress === 100 ? 1 : 0,
          averageRating: 0,
          comments: 0,
          shares: 0
        }
      });

      await analytics.save();

      // Update user's progress
      await User.findByIdAndUpdate(userId, {
        $addToSet: {
          'learner.inProgressModules': moduleId
        }
      });

      if (progress === 100) {
        await User.findByIdAndUpdate(userId, {
          $pull: {
            'learner.inProgressModules': moduleId
          },
          $addToSet: {
            'learner.completedModules': moduleId
          }
        });
      }

      return { success: true };
    } catch (error) {
      console.error('Error in trackModuleProgress:', error);
      throw error;
    }
  }

  async submitModuleRating(moduleId: string, userId: string, rating: number, review?: string) {
    try {
      const module = await TrainingModule.findById(moduleId);
      if (!module) {
        throw new Error('Module not found');
      }

      // Update module rating
      const newAverage = (module.rating.average * module.rating.count + rating) / (module.rating.count + 1);
      
      await TrainingModule.findByIdAndUpdate(moduleId, {
        $set: {
          'rating.average': newAverage,
          'rating.count': module.rating.count + 1
        }
      });

      // Log rating analytics
      const analytics = new IAnalytics({
        moduleId,
        userId,
        timestamp: new Date(),
        engagement: {
          moduleCompletions: 0,
          averageRating: rating,
          comments: review ? 1 : 0,
          shares: 0
        }
      });

      await analytics.save();

      return { success: true };
    } catch (error) {
      console.error('Error in submitModuleRating:', error);
      throw error;
    }
  }

  async getModuleAnalytics(moduleId: string, timeRange: string) {
    try {
      const startDate = this.getStartDate(timeRange);
      
      const analytics = await IAnalytics.find({
        moduleId,
        timestamp: { $gte: startDate }
      });

      return this.aggregateAnalytics(analytics);
    } catch (error) {
      console.error('Error in getModuleAnalytics:', error);
      throw error;
    }
  }

  private getStartDate(timeRange: string): Date {
    const now = new Date();
    switch (timeRange) {
      case 'day':
        return new Date(now.setDate(now.getDate() - 1));
      case 'week':
        return new Date(now.setDate(now.getDate() - 7));
      case 'month':
        return new Date(now.setMonth(now.getMonth() - 1));
      case 'year':
        return new Date(now.setFullYear(now.getFullYear() - 1));
      default:
        return new Date(now.setDate(now.getDate() - 7)); // Default to week
    }
  }

  private aggregateAnalytics(analytics: any[]) {
    return {
      totalViews: analytics.length,
      averageRating: analytics.reduce((acc, curr) => acc + curr.engagement.averageRating, 0) / analytics.length,
      totalCompletions: analytics.reduce((acc, curr) => acc + curr.engagement.moduleCompletions, 0),
      totalComments: analytics.reduce((acc, curr) => acc + curr.engagement.comments, 0),
      totalShares: analytics.reduce((acc, curr) => acc + curr.engagement.shares, 0)
    };
  }
} 