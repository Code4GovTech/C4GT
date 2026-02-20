import mongoose from 'mongoose';
import { Request, Response, NextFunction } from 'express';

interface TelemetryData {
  endpoint: string;
  method: string;
  statusCode: number;
  responseTime: number;
  userId?: string;
  userAgent: string;
  timestamp: Date;
  error?: string;
}

const TelemetrySchema = new mongoose.Schema({
  endpoint: String,
  method: String,
  statusCode: Number,
  responseTime: Number,
  userId: String,
  userAgent: String,
  timestamp: { type: Date, default: Date.now },
  error: String
}, {
  timestamps: true
});

// Create compound index for efficient querying
TelemetrySchema.index({ timestamp: 1, endpoint: 1 });
TelemetrySchema.index({ userId: 1, timestamp: 1 });

const TelemetryModel = mongoose.model('Telemetry', TelemetrySchema);

export const collectTelemetry = async (data: TelemetryData) => {
  try {
    await TelemetryModel.create(data);
  } catch (error) {
    console.error('Error collecting telemetry:', error);
  }
};

export const telemetryMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const startTime = Date.now();

  res.on('finish', async () => {
    const telemetryData: TelemetryData = {
      endpoint: req.path,
      method: req.method,
      statusCode: res.statusCode,
      responseTime: Date.now() - startTime,
      userId: req.user?.userId,
      userAgent: req.headers['user-agent'] || 'unknown',
      timestamp: new Date(),
    };

    if (res.statusCode >= 400) {
      telemetryData.error = res.statusMessage;
    }

    await collectTelemetry(telemetryData);
  });

  next();
};

export const getTelemetryStats = async (startDate: Date, endDate: Date) => {
  try {
    const stats = await TelemetryModel.aggregate([
      {
        $match: {
          timestamp: { $gte: startDate, $lte: endDate }
        }
      },
      {
        $group: {
          _id: '$endpoint',
          totalRequests: { $sum: 1 },
          avgResponseTime: { $avg: '$responseTime' },
          errorCount: {
            $sum: { $cond: [{ $gte: ['$statusCode', 400] }, 1, 0] }
          }
        }
      }
    ]);

    return stats;
  } catch (error) {
    console.error('Error getting telemetry stats:', error);
    throw error;
  }
}; 