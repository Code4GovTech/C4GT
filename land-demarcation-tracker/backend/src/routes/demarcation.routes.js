import express from 'express';
import { verifyJwt } from '../middlewares/auth.middleware.js';
import { getDemarcationLogs } from '../controllers/demarcation.controllers.js';

const router = express.Router();

// protected routes
router.route('/get-logs').get(verifyJwt, getDemarcationLogs);

export default router;