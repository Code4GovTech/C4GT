const { createObjectCsvWriter } = require('csv-writer');
const path = require('path');
const fs = require('fs');
const { Road, Work } = require('../models');

/**
 * @desc    Export all roads data as CSV
 * @route   GET /api/export/roads
 * @access  Private/Admin
 */
exports.exportRoads = async (req, res) => {
  try {
    const roads = await Road.findAll({
      order: [['ward', 'ASC']],
      raw: true,
    });
    
    // Create temp directory if it doesn't exist
    const tempDir = path.join(__dirname, '../../temp');
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir);
    }
    
    const csvFilePath = path.join(tempDir, 'roads.csv');
    
    // Define CSV writer
    const csvWriter = createObjectCsvWriter({
      path: csvFilePath,
      header: [
        { id: 'roadId', title: 'Road ID' },
        { id: 'name', title: 'Name' },
        { id: 'ward', title: 'Ward' },
        { id: 'length', title: 'Length (km)' },
        { id: 'description', title: 'Description' },
        { id: 'createdAt', title: 'Created At' },
      ],
    });
    
    // Format dates
    const formattedRoads = roads.map(road => ({
      ...road,
      createdAt: new Date(road.createdAt).toISOString().split('T')[0],
    }));
    
    // Write to CSV
    await csvWriter.writeRecords(formattedRoads);
    
    // Send file
    res.download(csvFilePath, 'roads.csv', (err) => {
      if (err) {
        console.error('Download error:', err);
        return res.status(500).json({ message: 'Error downloading file' });
      }
      
      // Delete file after download
      fs.unlinkSync(csvFilePath);
    });
  } catch (error) {
    console.error('Export roads error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * @desc    Export works data for a specific road as CSV
 * @route   GET /api/export/works/road/:roadId
 * @access  Private/Admin
 */
exports.exportWorksByRoad = async (req, res) => {
  try {
    // Get road details
    const road = await Road.findByPk(req.params.roadId);
    
    if (!road) {
      return res.status(404).json({ message: 'Road not found' });
    }
    
    // Get works for the road
    const works = await Work.findAll({
      where: { roadId: req.params.roadId },
      order: [['startDate', 'DESC']],
      raw: true,
    });
    
    // Create temp directory if it doesn't exist
    const tempDir = path.join(__dirname, '../../temp');
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir);
    }
    
    const csvFilePath = path.join(tempDir, `works_${road.roadId}.csv`);
    
    // Define CSV writer
    const csvWriter = createObjectCsvWriter({
      path: csvFilePath,
      header: [
        { id: 'id', title: 'ID' },
        { id: 'vendorName', title: 'Vendor Name' },
        { id: 'cost', title: 'Cost (INR)' },
        { id: 'phase', title: 'Phase' },
        { id: 'status', title: 'Status' },
        { id: 'startDate', title: 'Start Date' },
        { id: 'endDate', title: 'End Date' },
        { id: 'description', title: 'Description' },
      ],
    });
    
    // Format dates
    const formattedWorks = works.map(work => ({
      ...work,
      startDate: new Date(work.startDate).toISOString().split('T')[0],
      endDate: work.endDate ? new Date(work.endDate).toISOString().split('T')[0] : '',
    }));
    
    // Write to CSV
    await csvWriter.writeRecords(formattedWorks);
    
    // Send file
    res.download(csvFilePath, `works_${road.roadId}.csv`, (err) => {
      if (err) {
        console.error('Download error:', err);
        return res.status(500).json({ message: 'Error downloading file' });
      }
      
      // Delete file after download
      fs.unlinkSync(csvFilePath);
    });
  } catch (error) {
    console.error('Export works by road error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * @desc    Export works data for a specific ward as CSV
 * @route   GET /api/export/works/ward/:ward
 * @access  Private/Admin
 */
exports.exportWorksByWard = async (req, res) => {
  try {
    const ward = req.params.ward;
    
    // Get roads in the ward
    const roads = await Road.findAll({
      where: { ward },
      include: [
        {
          model: Work,
          as: 'works',
        },
      ],
    });
    
    if (roads.length === 0) {
      return res.status(404).json({ message: 'No roads found in this ward' });
    }
    
    // Prepare data for CSV - flatten the data structure
    const csvData = [];
    
    roads.forEach(road => {
      road.works.forEach(work => {
        csvData.push({
          roadId: road.roadId,
          roadName: road.name,
          ward: road.ward,
          workId: work.id,
          vendorName: work.vendorName,
          cost: work.cost,
          phase: work.phase,
          status: work.status,
          startDate: work.startDate,
          endDate: work.endDate,
          description: work.description,
        });
      });
    });
    
    // Create temp directory if it doesn't exist
    const tempDir = path.join(__dirname, '../../temp');
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir);
    }
    
    const csvFilePath = path.join(tempDir, `works_ward_${ward}.csv`);
    
    // Define CSV writer
    const csvWriter = createObjectCsvWriter({
      path: csvFilePath,
      header: [
        { id: 'roadId', title: 'Road ID' },
        { id: 'roadName', title: 'Road Name' },
        { id: 'ward', title: 'Ward' },
        { id: 'workId', title: 'Work ID' },
        { id: 'vendorName', title: 'Vendor Name' },
        { id: 'cost', title: 'Cost (INR)' },
        { id: 'phase', title: 'Phase' },
        { id: 'status', title: 'Status' },
        { id: 'startDate', title: 'Start Date' },
        { id: 'endDate', title: 'End Date' },
        { id: 'description', title: 'Description' },
      ],
    });
    
    // Format dates
    const formattedData = csvData.map(item => ({
      ...item,
      startDate: new Date(item.startDate).toISOString().split('T')[0],
      endDate: item.endDate ? new Date(item.endDate).toISOString().split('T')[0] : '',
    }));
    
    // Write to CSV
    await csvWriter.writeRecords(formattedData);
    
    // Send file
    res.download(csvFilePath, `works_ward_${ward}.csv`, (err) => {
      if (err) {
        console.error('Download error:', err);
        return res.status(500).json({ message: 'Error downloading file' });
      }
      
      // Delete file after download
      fs.unlinkSync(csvFilePath);
    });
  } catch (error) {
    console.error('Export works by ward error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};