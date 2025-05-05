import mongoose, { Schema, Document } from 'mongoose';

interface Content {
  text: string;
  language: string;
  media?: {
    type: 'video' | 'image' | 'document';
    url: string;
    thumbnail?: string;
  }[];
}

interface Metadata {
  level: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  duration: number; // in minutes
  keywords: string[];
  prerequisites: string[];
  targetAudience: string[];
}

interface MultilingualField {
  en: string;
  es?: string;
  fr?: string;
  [key: string]: string | undefined;
}

export interface ITrainingModule extends Document {
  title: MultilingualField;
  description: MultilingualField;
  content: Content[];
  metadata: Metadata;
  provider: mongoose.Types.ObjectId;
  language: string;
  price: {
    amount: number;
    currency: string;
  };
  rating: {
    average: number;
    count: number;
  };
  status: 'draft' | 'published' | 'archived';
  createdAt: Date;
  updatedAt: Date;
}

const TrainingModuleSchema: Schema = new Schema({
  title: {
    en: { type: String, required: true },
    es: { type: String },
    fr: { type: String },
  },
  description: {
    en: { type: String, required: true },
    es: { type: String },
    fr: { type: String },
  },
  content: [{
    text: { type: String, required: true },
    language: { type: String, required: true },
    media: [{
      type: { type: String, enum: ['video', 'image', 'document'] },
      url: { type: String },
      thumbnail: { type: String },
    }],
  }],
  metadata: {
    level: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
    category: { type: String, required: true },
    duration: { type: Number, required: true },
    keywords: [{ type: String }],
    prerequisites: [{ type: String }],
    targetAudience: [{ type: String }],
  },
  provider: { type: Schema.Types.ObjectId, ref: 'Provider', required: true },
  language: { type: String, required: true },
  price: {
    amount: { type: Number, required: true },
    currency: { type: String, required: true },
  },
  rating: {
    average: { type: Number, default: 0 },
    count: { type: Number, default: 0 },
  },
  status: { type: String, enum: ['draft', 'published', 'archived'], default: 'draft' },
}, {
  timestamps: true,
});

// Create indexes for efficient querying
TrainingModuleSchema.index({ 'title.en': 'text', 'description.en': 'text', 'content.text': 'text' });
TrainingModuleSchema.index({ 'metadata.level': 1, 'metadata.category': 1 });
TrainingModuleSchema.index({ provider: 1, status: 1 });
TrainingModuleSchema.index({ language: 1 });

export default mongoose.model<ITrainingModule>('TrainingModule', TrainingModuleSchema); 