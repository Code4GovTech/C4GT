import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/schemeskill';

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('MongoDB connected successfully');

    // Create indexes for multilingual search
    await mongoose.model('TrainingModule').createIndexes([
      { 
        title: 'text',
        description: 'text',
        'content.text': 'text',
        'metadata.keywords': 'text'
      },
      { language: 1 },
      { 'metadata.level': 1 },
      { 'metadata.category': 1 }
    ]);

    await mongoose.model('Provider').createIndexes([
      { name: 'text', description: 'text' },
      { 'contact.country': 1 },
      { 'contact.language': 1 }
    ]);

  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

export const disconnectDB = async () => {
  try {
    await mongoose.disconnect();
    console.log('MongoDB disconnected successfully');
  } catch (error) {
    console.error('MongoDB disconnection error:', error);
    process.exit(1);
  }
}; 