const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController');
const authMiddleware = require('../middleware/authMiddleware');

// Public routes
router.get('/search', searchController.searchModules);
router.get('/modules/:id', searchController.getModuleById);

// Protected routes (require authentication)
router.get('/analytics', authMiddleware, searchController.getSearchAnalytics);

module.exports = router; 