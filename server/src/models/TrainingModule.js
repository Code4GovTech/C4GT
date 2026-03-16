const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
  language: {
    type: String,
    required: true,
    enum: ['en', 'hi', 'bn', 'te', 'ta', 'mr', 'gu', 'kn', 'ml', 'pa', 'or', 'as', 'ur'],
    index: true
  },
  title: {
    type: String,
    required: true,
    text: true
  },
  description: {
    type: String,
    required: true,
    text: true
  },
  content: {
    type: String,
    required: true,
    text: true
  }
});

const trainingModuleSchema = new mongoose.Schema({
  providerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Provider',
    required: true,
    index: true
  },
  contents: [contentSchema],
  category: {
    type: String,
    required: true,
    index: true
  },
  subCategory: {
    type: String,
    index: true
  },
  difficultyLevel: {
    type: String,
    required: true,
    enum: ['beginner', 'intermediate', 'advanced'],
    index: true
  },
  duration: {
    type: Number, // in minutes
    required: true
  },
  keywords: [{
    type: String,
    index: true
  }],
  prerequisites: [{
    type: String
  }],
  learningOutcomes: [{
    type: String
  }],
  targetAudience: [{
    type: String
  }],
  mediaUrls: [{
    type: String
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  telemetry: {
    views: {
      type: Number,
      default: 0
    },
    completions: {
      type: Number,
      default: 0
    },
    averageRating: {
      type: Number,
      default: 0
    },
    searchHits: {
      type: Number,
      default: 0
    }
  }
});

// Create text indexes for search
trainingModuleSchema.index({ 
  'contents.title': 'text',
  'contents.description': 'text',
  'contents.content': 'text',
  keywords: 'text'
});

// Update the updatedAt timestamp before saving
trainingModuleSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('TrainingModule', trainingModuleSchema); 