import mongoose, { Schema, Document } from 'mongoose';

interface SearchResult {
  moduleId: mongoose.Types.ObjectId;
  position: number;
  clicked: boolean;
  timeSpent: number;
}

interface SearchPattern {
  query: string;
  filters: {
    language?: string;
    level?: string;
    category?: string;
  };
  timestamp: Date;
  results: SearchResult[];
  sessionId: string;
}

interface UserSearchProfile {
  interests: string[];
  preferredLanguages: string[];
  commonFilters: {
    language: string[];
    level: string[];
    category: string[];
  };
  searchPatterns: {
    timeOfDay: string[];
    dayOfWeek: string[];
    frequency: number;
  };
}

export interface ISearchHistory extends Document {
  userId: mongoose.Types.ObjectId;
  searches: SearchPattern[];
  profile: UserSearchProfile;
  recommendations: {
    basedOnHistory: mongoose.Types.ObjectId[];
    basedOnSimilarUsers: mongoose.Types.ObjectId[];
    lastUpdated: Date;
  };
  createdAt: Date;
  updatedAt: Date;
}

const SearchHistorySchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  searches: [{
    query: { type: String, required: true },
    filters: {
      language: { type: String },
      level: { type: String },
      category: { type: String },
    },
    timestamp: { type: Date, default: Date.now },
    results: [{
      moduleId: { type: Schema.Types.ObjectId, ref: 'TrainingModule' },
      position: { type: Number },
      clicked: { type: Boolean, default: false },
      timeSpent: { type: Number },
    }],
    sessionId: { type: String },
  }],
  profile: {
    interests: [{ type: String }],
    preferredLanguages: [{ type: String }],
    commonFilters: {
      language: [{ type: String }],
      level: [{ type: String }],
      category: [{ type: String }],
    },
    searchPatterns: {
      timeOfDay: [{ type: String }],
      dayOfWeek: [{ type: String }],
      frequency: { type: Number, default: 0 },
    },
  },
  recommendations: {
    basedOnHistory: [{ type: Schema.Types.ObjectId, ref: 'TrainingModule' }],
    basedOnSimilarUsers: [{ type: Schema.Types.ObjectId, ref: 'TrainingModule' }],
    lastUpdated: { type: Date },
  },
}, {
  timestamps: true,
});

// Create indexes for efficient querying and pattern analysis
SearchHistorySchema.index({ userId: 1, 'searches.timestamp': -1 });
SearchHistorySchema.index({ 'searches.query': 'text' });
SearchHistorySchema.index({ 'profile.interests': 1 });
SearchHistorySchema.index({ 'profile.preferredLanguages': 1 });
SearchHistorySchema.index({ 'searches.sessionId': 1 });

// Create a compound index for pattern analysis
SearchHistorySchema.index({
  'searches.timestamp': 1,
  'searches.query': 1,
  'searches.filters.language': 1,
  'searches.filters.level': 1,
  'searches.filters.category': 1,
});

export default mongoose.model<ISearchHistory>('SearchHistory', SearchHistorySchema); 