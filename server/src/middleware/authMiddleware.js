const jwt = require('jsonwebtoken');
const Provider = require('../models/Provider');

module.exports = async (req, res, next) => {
  try {
    // Get token from header
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No token, authorization denied'
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get provider from token
    const provider = await Provider.findById(decoded.id).select('-password');

    if (!provider) {
      return res.status(401).json({
        success: false,
        message: 'Token is not valid'
      });
    }

    // Add provider to request object
    req.provider = provider;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(401).json({
      success: false,
      message: 'Token is not valid'
    });
  }
}; 