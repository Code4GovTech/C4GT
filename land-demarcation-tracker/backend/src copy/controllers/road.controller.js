const { validationResult } = require('express-validator');
const { Op } = require('sequelize');
const { Road, Work } = require('../models');

/**
 * @desc    Get all roads with optional filtering
 * @route   GET /api/roads
 * @access  Private/Admin
 */
exports.getAllRoads = async (req, res) => {
  try {
    const { ward, name, page = 1, limit = 10 } = req.query;
    
    // Build filter object
    const filter = {};
    if (ward) filter.ward = ward;
    if (name) filter.name = { [Op.iLike]: `%${name}%` };
    
    // Calculate pagination
    const offset = (page - 1) * Number(limit);
    
    // Get roads with pagination
    const { count, rows: roads } = await Road.findAndCountAll({
      where: filter,
      include: [
        {
          model: Work,
          as: 'works',
          attributes: ['id', 'status', 'cost'],
        },
      ],
      offset,
      limit: Number(limit),
      order: [['createdAt', 'DESC']],
    });
    
    // Calculate total pages
    const totalPages = Math.ceil(count / Number(limit));
    
    res.json({
      roads,
      pagination: {
        total: count,
        page: Number(page),
        limit: Number(limit),
        totalPages,
      },
    });
  } catch (error) {
    console.error('Get roads error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * @desc    Get a single road by ID
 * @route   GET /api/roads/:id
 * @access  Private/Admin
 */
exports.getRoadById = async (req, res) => {
  try {
    const road = await Road.findByPk(req.params.id, {
      include: [
        {
          model: Work,
          as: 'works',
          order: [['startDate', 'DESC']],
        },
      ],
    });
    
    if (!road) {
      return res.status(404).json({ message: 'Road not found' });
    }
    
    res.json(road);
  } catch (error) {
    console.error('Get road error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * @desc    Create a new road
 * @route   POST /api/roads
 * @access  Private/Admin
 */
exports.createRoad = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  const { roadId, name, ward, length, description } = req.body;
  
  try {
    // Check if road ID already exists
    const roadExists = await Road.findOne({ where: { roadId } });
    
    if (roadExists) {
      return res.status(400).json({ message: 'Road ID already exists' });
    }
    
    // Create road
    const road = await Road.create({
      roadId,
      name,
      ward,
      length,
      description,
    });
    
    res.status(201).json(road);
  } catch (error) {
    console.error('Create road error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * @desc    Update a road
 * @route   PUT /api/roads/:id
 * @access  Private/Admin
 */
exports.updateRoad = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  try {
    // Check if road exists
    const road = await Road.findByPk(req.params.id);
    
    if (!road) {
      return res.status(404).json({ message: 'Road not found' });
    }
    
    // Update road
    await road.update(req.body);
    
    res.json(road);
  } catch (error) {
    console.error('Update road error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * @desc    Delete a road
 * @route   DELETE /api/roads/:id
 * @access  Private/Admin
 */
exports.deleteRoad = async (req, res) => {
  try {
    // Check if road exists
    const road = await Road.findByPk(req.params.id);
    
    if (!road) {
      return res.status(404).json({ message: 'Road not found' });
    }
    
    // Delete road (associated works will be deleted automatically due to CASCADE)
    await road.destroy();
    
    res.json({ message: 'Road deleted successfully' });
  } catch (error) {
    console.error('Delete road error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};