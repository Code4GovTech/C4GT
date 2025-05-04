import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

app.use(cors({
    origin: config.CORS_ORIGIN || '*',
    credentials: true,
}));

app.use(express.json({
    limit: "16kb"
}));

app.use(cookieParser());
app.use(express.static("public"));
app.use(express.urlencoded( {
    extended: true,
    limit: "16kb"
}));

// Import routes
import healthCheckRoutes from './routes/health_check.routes.js';
import authRoutes from './routes/auth.routes.js';
import plotRoutes from './routes/plot.routes.js';
import demarcationRoutes from './routes/demarcation.routes.js';
import config from './common/config.js';

app.use('/api/v1', healthCheckRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/plots', plotRoutes);
app.use('/api/v1/demarcation', demarcationRoutes);

export { app };
