import mongoose, { Schema, Document } from 'mongoose';

export enum UserRole {
  ADMIN = 'admin',
  PROVIDER = 'provider',
  LEARNER = 'learner',
  GUEST = 'guest',
}

export interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  role: UserRole;
  profile: {
    avatar?: string;
    bio?: string;
    location?: string;
    timezone?: string;
    preferences?: {
      language: string;
      theme: 'light' | 'dark';
      notifications: boolean;
    };
  };
  provider?: {
    organization: string;
    website?: string;
    description?: string;
    verified: boolean;
  };
  learner?: {
    interests: string[];
    completedModules: mongoose.Types.ObjectId[];
    inProgressModules: mongoose.Types.ObjectId[];
    certificates: {
      moduleId: mongoose.Types.ObjectId;
      completionDate: Date;
      score: number;
    }[];
  };
  lastLogin: Date;
  status: 'active' | 'suspended' | 'deleted';
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  role: { type: String, enum: Object.values(UserRole), default: UserRole.GUEST },
  profile: {
    avatar: { type: String },
    bio: { type: String },
    location: { type: String },
    timezone: { type: String },
    preferences: {
      language: { type: String, default: 'en' },
      theme: { type: String, enum: ['light', 'dark'], default: 'light' },
      notifications: { type: Boolean, default: true },
    },
  },
  provider: {
    organization: { type: String },
    website: { type: String },
    description: { type: String },
    verified: { type: Boolean, default: false },
  },
  learner: {
    interests: [{ type: String }],
    completedModules: [{ type: Schema.Types.ObjectId, ref: 'TrainingModule' }],
    inProgressModules: [{ type: Schema.Types.ObjectId, ref: 'TrainingModule' }],
    certificates: [{
      moduleId: { type: Schema.Types.ObjectId, ref: 'TrainingModule' },
      completionDate: { type: Date },
      score: { type: Number },
    }],
  },
  lastLogin: { type: Date },
  status: { type: String, enum: ['active', 'suspended', 'deleted'], default: 'active' },
}, {
  timestamps: true,
});

// Create indexes for efficient querying
UserSchema.index({ email: 1 });
UserSchema.index({ role: 1, status: 1 });
UserSchema.index({ 'provider.organization': 1 });
UserSchema.index({ 'learner.interests': 1 });

export default mongoose.model<IUser>('User', UserSchema); 