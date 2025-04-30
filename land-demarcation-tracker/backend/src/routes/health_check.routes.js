import express from 'express';
import { healthCheckController } from '../controllers/health_check.controllers.js';

const router = express.Router();

router.route('/health-check').get(healthCheckController);

export default router;