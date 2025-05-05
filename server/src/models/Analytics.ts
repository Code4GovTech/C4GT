import mongoose, { Schema, Document } from 'mongoose';

interface PerformanceMetrics {
  loadTime: number;
  responseTime: number;
  errorRate: number;
  uptime: number;
}

interface UsageMetrics {
  activeUsers: number;
  pageViews: number;
  sessionDuration: number;
  bounceRate: number;
}

interface EngagementMetrics {
  moduleCompletions: number;
  averageRating: number;
  comments: number;
  shares: number;
}

interface SearchPattern {
  query: string;
  filters: {
    language?: string;
    level?: string;
    category?: string;
  };
  resultsCount: number;
  clickThroughRate: number;
  timeSpent: number;
}

export interface IAnalytics extends Document {
  moduleId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  timestamp: Date;
  performance: PerformanceMetrics;
  usage: UsageMetrics;
  engagement: EngagementMetrics;
  searchHistory: SearchPattern[];
  deviceInfo: {
    type: string;
    browser: string;
    os: string;
    screenResolution: string;
  };
  location: {
    country: string;
    region: string;
    city: string;
  };
  session: {
    id: string;
    startTime: Date;
    endTime: Date;
    duration: number;
  };
}

const AnalyticsSchema: Schema = new Schema({
  moduleId: { type: Schema.Types.ObjectId, ref: 'TrainingModule' },
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  timestamp: { type: Date, default: Date.now },
  performance: {
    loadTime: { type: Number },
    responseTime: { type: Number },
    errorRate: { type: Number },
    uptime: { type: Number },
  },
  usage: {
    activeUsers: { type: Number },
    pageViews: { type: Number },
    sessionDuration: { type: Number },
    bounceRate: { type: Number },
  },
  engagement: {
    moduleCompletions: { type: Number },
    averageRating: { type: Number },
    comments: { type: Number },
    shares: { type: Number },
  },
  searchHistory: [{
    query: { type: String },
    filters: {
      language: { type: String },
      level: { type: String },
      category: { type: String },
    },
    resultsCount: { type: Number },
    clickThroughRate: { type: Number },
    timeSpent: { type: Number },
  }],
  deviceInfo: {
    type: { type: String },
    browser: { type: String },
    os: { type: String },
    screenResolution: { type: String },
  },
  location: {
    country: { type: String },
    region: { type: String },
    city: { type: String },
  },
  session: {
    id: { type: String },
    startTime: { type: Date },
    endTime: { type: Date },
    duration: { type: Number },
  },
}, {
  timestamps: true,
});

// Create indexes for efficient querying and aggregation
AnalyticsSchema.index({ moduleId: 1, timestamp: 1 });
AnalyticsSchema.index({ userId: 1, timestamp: 1 });
AnalyticsSchema.index({ 'location.country': 1, timestamp: 1 });
AnalyticsSchema.index({ 'deviceInfo.type': 1, timestamp: 1 });
AnalyticsSchema.index({ 'searchHistory.query': 'text' });

// Create a TTL index to automatically remove old analytics data
AnalyticsSchema.index({ timestamp: 1 }, { expireAfterSeconds: 60 * 60 * 24 * 90 }); // 90 days

export default mongoose.model<IAnalytics>('Analytics', AnalyticsSchema); 