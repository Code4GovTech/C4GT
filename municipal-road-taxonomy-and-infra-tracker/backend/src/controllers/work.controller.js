const { validationResult } = require('express-validator');
const { Op } = require('sequelize');
const { Work, Road } = require('../models');

/**
 * @desc    Get all works
 * @route   GET /api/works
 * @access  Private/Admin
 */
exports.getAllWorks = async (req, res) => {
  try {
    const { status, phase, page = 1, limit = 10 } = req.query;
    
    // Build filter object
    const filter = {};
    if (status) filter.status = status;
    if (phase) filter.phase = phase;
    
    // Calculate pagination
    const offset = (page - 1) * Number(limit);
    
    // Get works with pagination
    const { count, rows: works } = await Work.findAndCountAll({
      where: filter,
      include: [
        {
          model: Road,
          as: 'road',
          attributes: ['id', 'roadId', 'name', 'ward'],
        },
      ],
      offset,
      limit: Number(limit),
      order: [['createdAt', 'DESC']],
    });
    
    // Calculate total pages
    const totalPages = Math.ceil(count / Number(limit));
    
    res.json({
      works,
      pagination: {
        total: count,
        page: Number(page),
        limit: Number(limit),
        totalPages,
      },
    });
  } catch (error) {
    console.error('Get works error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * @desc    Get works for a specific road
 * @route   GET /api/works/road/:roadId
 * @access  Private/Admin
 */
exports.getWorksByRoadId = async (req, res) => {
  try {
    const works = await Work.findAll({
      where: { roadId: req.params.roadId },
      order: [['startDate', 'DESC']],
    });
    
    res.json(works);
  } catch (error) {
    console.error('Get works by road error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * @desc    Get a single work by ID
 * @route   GET /api/works/:id
 * @access  Private/Admin
 */
exports.getWorkById = async (req, res) => {
  try {
    const work = await Work.findByPk(req.params.id, {
      include: [
        {
          model: Road,
          as: 'road',
          attributes: ['id', 'roadId', 'name', 'ward'],
        },
      ],
    });
    
    if (!work) {
      return res.status(404).json({ message: 'Work not found' });
    }
    
    res.json(work);
  } catch (error) {
    console.error('Get work error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * @desc    Create a new work
 * @route   POST /api/works
 * @access  Private/Admin
 */
exports.createWork = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  const { roadId, vendorName, cost, phase, status, startDate, endDate, description } = req.body;
  
  try {
    // Check if road exists
    const roadExists = await Road.findByPk(roadId);
    
    if (!roadExists) {
      return res.status(404).json({ message: 'Road not found' });
    }
    
    // Create work
    const work = await Work.create({
      roadId,
      vendorName,
      cost: Number(cost),
      phase,
      status,
      startDate: new Date(startDate),
      endDate: endDate ? new Date(endDate) : null,
      description,
    });
    
    res.status(201).json(work);
  } catch (error) {
    console.error('Create work error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * @desc    Update a work
 * @route   PUT /api/works/:id
 * @access  Private/Admin
 */
exports.updateWork = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  try {
    // Check if work exists
    const work = await Work.findByPk(req.params.id);
    
    if (!work) {
      return res.status(404).json({ message: 'Work not found' });
    }
    
    // Prepare data for update
    const data = { ...req.body };
    
    // Convert dates if provided
    if (data.startDate) data.startDate = new Date(data.startDate);
    if (data.endDate) data.endDate = new Date(data.endDate);
    if (data.endDate === null) data.endDate = null;
    
    // Convert numeric values
    if (data.cost) data.cost = Number(data.cost);
    
    // Update work
    await work.update(data);
    
    res.json(work);
  } catch (error) {
    console.error('Update work error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * @desc    Delete a work
 * @route   DELETE /api/works/:id
 * @access  Private/Admin
 */
exports.deleteWork = async (req, res) => {
  try {
    // Check if work exists
    const work = await Work.findByPk(req.params.id);
    
    if (!work) {
      return res.status(404).json({ message: 'Work not found' });
    }
    
    // Delete work
    await work.destroy();
    
    res.json({ message: 'Work deleted successfully' });
  } catch (error) {
    console.error('Delete work error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};