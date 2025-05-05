export interface ModuleSearchFilters {
  language?: string;
  category?: string;
  difficultyLevel?: 'beginner' | 'intermediate' | 'advanced';
  keywords?: string;
  providerId?: string;
  sortBy?: 'relevance' | 'popularity' | 'rating' | 'newest';
  page?: number;
  limit?: number;
}

export interface ModuleContent {
  language: string;
  title: string;
  description: string;
  content: string;
}

export interface TrainingModule {
  id: string;
  providerId: string;
  contents: ModuleContent[];
  category: string;
  subCategory?: string;
  difficultyLevel: string;
  duration: number;
  keywords: string[];
  prerequisites: string[];
  learningOutcomes: string[];
  targetAudience: string[];
  mediaUrls: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  telemetry: {
    views: number;
    completions: number;
    averageRating: number;
    searchHits: number;
  };
}

export interface Provider {
  id: string;
  name: string;
  email: string;
  organization: string;
  description?: string;
  languages: string[];
  categories: string[];
  contact: {
    phone?: string;
    address?: string;
    website?: string;
  };
  isVerified: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  telemetry: {
    totalModules: number;
    totalViews: number;
    totalCompletions: number;
    averageRating: number;
  };
}

export interface ModuleAnalytics {
  views: number;
  completions: number;
  averageRating: number;
  searchHits: number;
  byLanguage: Array<{
    language: string;
    count: number;
  }>;
  byCategory: Array<{
    category: string;
    count: number;
  }>;
}

export interface SDKConfig {
  baseUrl: string;
  apiKey: string;
}

export interface SDKResponse<T> {
  success: boolean;
  data: T;
  metadata: {
    timestamp: string;
    [key: string]: any;
  };
}

export interface SDKError {
  code: string;
  message: string;
  details: Record<string, any>;
} 