import express from 'express';
import { requireRole } from '../middlewares/rbac.middleware.js';
import { verifyJwt } from '../middlewares/auth.middleware.js';
import { getAllCircles, getAllOfficers, getAllPlots, getDashboardSummary, getDuplicatesUnsresolved, registerPlot, updatePlot } from '../controllers/plot.controllers.js';

const router = express.Router();

// protected routes
router.route('/').post(verifyJwt, requireRole('admin'), registerPlot);
router.route('/dashboard-summary').get(verifyJwt, getDashboardSummary);
router.route('/get-plots').get(verifyJwt, getAllPlots);
router.route('/update-plot').patch(verifyJwt, requireRole('officer'), updatePlot);
router.route('/get-duplicates-unresolved').get(verifyJwt, getDuplicatesUnsresolved);
router.route('/get-circles').get(verifyJwt, requireRole('admin'), getAllCircles);
router.route('/get-officers').get(verifyJwt, requireRole('admin'), getAllOfficers);

export default router;