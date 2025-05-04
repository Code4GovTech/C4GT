import { Op } from 'sequelize';
import { ApiError } from '../../utils/ApiError.js';
import { ApiResponse } from '../../utils/ApiResponse.js';
import { asyncHandler } from '../../utils/async_handler.js';
import Circle from '../models/circle.models.js';
import Plot from '../models/plot.models.js';
import User from '../models/user.models.js';
import { sequelize } from '../database/index.js';
import DemarcationLog from '../models/demarcation.models.js';

const registerPlot = asyncHandler(async (req, res) => {
  const { plot_number, location, circle_id, status } = req.body;

  console.log('Request Body:', req.body); // Log the request body for debugging

  if ([plot_number, location, String(circle_id), status].some((field) => field?.trim() === '')) {
    return res.status(400).json({ message: 'Plot Number, Location and Circle_id fields are required' });
  }

  const user = req.user; // user is attached to req by auth middleware

  console.log('User ID:', user); // Log the user ID for debugging

  const officerOfThisCircle = await User.findOne({
    where: {
      role: 'officer',
      circle_ids: { [Op.contains]: [circle_id] }, // Check if the officer is part of the circle
    }
  });

  const isPlotExists = await Plot.findOne({
    where: { plot_number, location, circle_id },
  });

  if (isPlotExists) {
    let no_of_duplicates = (isPlotExists.no_of_duplicates + 1); // Increment the number of duplicates
    await DemarcationLog.create({
      plot_id: isPlotExists.id,
      officer_id: officerOfThisCircle.id,
      previous_status: isPlotExists.status,
      new_status: status || isPlotExists.status,
      created_by: user.id,
      action_type: 'duplicate',
      remarks: `Duplicate plot detected. Previous status: ${isPlotExists.status}, New status: ${status || isPlotExists.status}`,
    });
    const plot = await Plot.update({ no_of_duplicates, is_duplicate: true, status: status ? status : isPlotExists.status }, { where: { id: isPlotExists.id } });

    if (!plot) {
      return res.status(500).json({ message: 'Failed to register plot' });
    }
    
    return res.status(200).json(new ApiResponse(401, { ...isPlotExists.toJSON(), no_of_duplicates, is_duplicate: true }, 'Duplicate plot detected and updated successfully'));
  }

  const plot = await Plot.create({
    plot_number,
    location,
    circle_id,
    status: status || 'pending',
    created_by: user.id, // Assuming user.id is the ID of the logged-in user
  });

  if (!plot) {
    return res.status(500).json({ message: 'Failed to register plot' });
  }

  await DemarcationLog.create({
    plot_id: plot.id,
    officer_id: officerOfThisCircle.id,
    previous_status: null,
    new_status: plot.status,
    action_type: 'create',
    remarks: `New plot created with status: ${plot.status}`,
  });

  return res.status(201).json(new ApiResponse(201, plot.toJSON(), 'Plot registered successfully'));
});

const getAllPlots = asyncHandler(async (req, res) => {
  const { role, circle_ids } = req.user;
  let { status, page, limit } = req.query;
  page = parseInt(page) || 1;
  limit = parseInt(limit) || 10;
  const offset = (page - 1) * limit;
  const whereClause = {};

  if (status) {
    const validStatuses = ['pending', 'resolved', 'disputed'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }
    whereClause.status = status.toLowerCase();
  }

  if (role === 'officer' || role === 'admin') {
    if (role === 'officer') {
      whereClause.circle_id = circle_ids[0]; // Assuming the officer has only one circle assigned
    } 
  } else {
    return res.status(403).json({ message: 'Unauthorized role' });
  }

  const { count, rows:plots } = await Plot.findAndCountAll({
    where: whereClause,
    limit,
    offset,
    order: [['created_at', 'DESC']],
  });

  return res.status(200).json(
    new ApiResponse(200,
      {
        plots,
        pagination: {
          total: count,
          page,
          limit,
          pages: Math.ceil(count / limit),
        }
      }, "Plots fetched successfully"
    )
  );
});

const updatePlot = asyncHandler(async (req, res) => {
  const { status, remarks, plot_id } = req.body || {};
  const user = req.user; // user is attached to req by auth middleware

  console.log('Request Body:', req.body); // Log the request body for debugging
  console.log('User ID:', user); // Log the user ID for debugging
  
  if (!status || !plot_id) {
    throw new ApiError(400, 'Status and plot_id are required');
  }

  const validStatuses = ['pending', 'resolved', 'disputed'];
  if (!validStatuses.includes(status)) {
    throw new ApiError(400, 'Invalid status');
  }

  console.log(`User ID: ${user.id}, Plot ID: ${plot_id}, Status: ${status}`); // Log the user ID, plot ID, and status for debugging
  
  const plot = await Plot.findByPk(plot_id);
  if (!plot) {
    throw new ApiError(404, 'Plot not found');
  } 

  if (plot.circle_id !== user.circle_ids[0]) {
    throw new ApiError(403, 'You do not have permission to update this plot');
  }

  console.log(`Plot found: ${JSON.stringify(plot)}`); // Log the plot details for debugging

  if (plot.status === status) {
    return res.status(200).json({ message: 'Plot already has the same status' });
  }

  const updatePlot = await Plot.update(
    { status },
    { where: { id: plot_id } }
  );

  console.log("Update Plot:", updatePlot); // Log the result of the update operation for debugging

  if(!updatePlot) {
    return res.status(500).json({ message: 'Failed to update plot' });
  }

  const demarcationLog = await DemarcationLog.create({
    plot_id: plot.id,
    officer_id: user.id,
    previous_status: plot.status,
    new_status: status,
    action_type: 'status_update',
    remarks: remarks || `Status updated to ${status}`,
  });

  console.log(`Demarcation Log Created: ${JSON.stringify(demarcationLog)}`); // Log the demarcation log details for debugging
  
  // 7️⃣ Send success response
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { id: plot.id, status },
        "Plot status updated successfully"
      )
  );
});

const getDashboardSummary = asyncHandler(async (req, res) => {
  const { role, circle_ids } = req.user;
  const { circle, officer } = req.query;
  const whereClause = {};

  // 1️⃣ Scope global stats
  if (role === 'officer') {
    // Officers always scoped to own circle
    whereClause.circle_id = circle_ids[0];
  } else if (role === 'admin') {
    if (circle)      whereClause.circle_id = Number(circle);
    else if (officer) {
      const isOfficerExists = await User.findOne({ where: { id: officer, role: 'officer' } });

      if (!isOfficerExists) {
        throw new ApiError(404, 'Officer not found');
      }

      // Lookup officer’s circle
      const off = await User.findByPk(officer, { attributes: ['circle_ids'] });
      if (!off) throw new ApiError(404, 'Officer not found');
      console.log('Officer:', off); // Log the officer's circle IDs for debugging
      
      whereClause.circle_id = off.circle_ids[0];
    }
  }

  const total    = await Plot.count({ where: whereClause });
  const pending  = await Plot.count({ where: { ...whereClause, status: 'pending' } });
  const resolved = await Plot.count({ where: { ...whereClause, status: 'resolved' } });
  const disputed = await Plot.count({ where: { ...whereClause, status: 'disputed' } });
  const duplicateCount = (await Plot.sum('no_of_duplicates', { where: whereClause })) || 0;

  // 2️⃣ Circle breakdown
  // If admin: filter circles by `circle` param or list all
  // If officer: only their own circle
  let circlesToProcess;
  if (role === 'officer') {
    circlesToProcess = await Circle.findAll({ where: { id: circle_ids[0] } });
  } else {
    if (officer) {
      // admin drilled into one officer → show that officer’s circle
      const off = await User.findByPk(officer, { attributes:['circle_ids'] });
      if (!off) throw new ApiError(404,'Officer not found');
      circlesToProcess = await Circle.findAll({ where: { id: off.circle_ids[0] } });
    } else if (circle) {
      // admin drilled into one circle
      const isCircleExists = await Circle.findOne({ where: { id: circle } });
      if (!isCircleExists) {
        throw new ApiError(404, 'Circle not found');
      }
      circlesToProcess = await Circle.findAll({ where: { id: Number(circle) } });
    } else {
      // admin default → show all circles
      circlesToProcess = await Circle.findAll();
    }
  }

  const byCircle = await Promise.all(circlesToProcess.map(async (c) => {
    const base = { circle_id: c.id };
    const totalC    = await Plot.count({ where: base });
    const pendingC  = await Plot.count({ where: { ...base, status: 'pending' } });
    const resolvedC = await Plot.count({ where: { ...base, status: 'resolved' } });
    const disputedC = await Plot.count({ where: { ...base, status: 'disputed' } });
    const dupCountC = (await Plot.sum('no_of_duplicates', { where: base })) || 0;
    return {
      circle_id:   c.id,
      circle_name: c.name,
      total:       totalC,
      pending:     pendingC,
      resolved:    resolvedC,
      disputed:    disputedC,
      duplicateCount: dupCountC,
    };
  }));

  // 3️⃣ Officer breakdown
  // Admin: all officers, or filtered by circle/officer
  // Officer: only themselves
  let officersToProcess;
  if (role === 'officer') {
    officersToProcess = [ await User.findByPk(req.user.id) ];
  } else {
    const whereOff = { role: 'officer' };
    if (officer)         whereOff.id = Number(officer);
    else if (circle)     whereOff.circle_ids = { [Op.contains]: [Number(circle)] };
    officersToProcess = await User.findAll({ where: whereOff });
  }

  const byOfficer = await Promise.all(officersToProcess.map(async (off) => {
    const cid = off.circle_ids[0];
    const base = { circle_id: cid };
    const totalO    = await Plot.count({ where: base });
    const pendingO  = await Plot.count({ where: { ...base, status: 'pending' } });
    const resolvedO = await Plot.count({ where: { ...base, status: 'resolved' } });
    const disputedO = await Plot.count({ where: { ...base, status: 'disputed' } });
    const dupCountO = (await Plot.sum('no_of_duplicates', { where: base })) || 0;
    return {
      officer_id:     off.id,
      name:           off.name,
      total:          totalO,
      pending:        pendingO,
      resolved:       resolvedO,
      disputed:       disputedO,
      duplicateCount: dupCountO,
    };
  }));

  return res.json(new ApiResponse(200, {
    totalPlots: total,
    pending, resolved, disputed, duplicateCount,
    byCircle,
    byOfficer
  }, 'Dashboard summary fetched'));
});

const getDuplicatesUnsresolved = asyncHandler(async (req, res) => {
  const { role, circle_ids } = req.user;
  const whereClause = {};

  if (role === 'officer') {
    whereClause.circle_id = circle_ids[0];
  } else if (role === 'admin') {
    // Admin can view all unresolved duplicates
  } else {
    return res.status(403).json({ message: 'Unauthorized role' });
  }

  const duplicates = await Plot.findAll({
    where: { ...whereClause, is_duplicate: true },
    order: [['created_at', 'DESC']],
  });

  const disputedPlots = await Plot.findAll({
    where: { 
      ...whereClause,
      status: { [Op.in]: ['pending', 'disputed'] }
    },
    order: [['created_at', 'DESC']],
  });

  return res.status(200).json(new ApiResponse(200, {duplicates, disputedPlots}, 'Unresolved duplicates fetched'));
});

export { registerPlot, getDashboardSummary, getAllPlots, updatePlot, getDuplicatesUnsresolved };
