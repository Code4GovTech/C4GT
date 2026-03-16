const TrainingModule = require('../models/TrainingModule');

// Helper function to build search query
const buildSearchQuery = (filters) => {
  const query = { isActive: true };
  
  if (filters.language) {
    query['contents.language'] = filters.language;
  }
  
  if (filters.category) {
    query.category = filters.category;
  }
  
  if (filters.difficultyLevel) {
    query.difficultyLevel = filters.difficultyLevel;
  }
  
  if (filters.keywords) {
    query.$text = { $search: filters.keywords };
  }
  
  if (filters.providerId) {
    query.providerId = filters.providerId;
  }
  
  return query;
};

// Helper function to build sort options
const buildSortOptions = (sortBy) => {
  switch (sortBy) {
    case 'relevance':
      return { score: { $meta: 'textScore' } };
    case 'popularity':
      return { 'telemetry.views': -1 };
    case 'rating':
      return { 'telemetry.averageRating': -1 };
    case 'newest':
      return { createdAt: -1 };
    default:
      return { createdAt: -1 };
  }
};

exports.searchModules = async (req, res) => {
  try {
    const {
      language,
      category,
      difficultyLevel,
      keywords,
      providerId,
      sortBy = 'relevance',
      page = 1,
      limit = 10
    } = req.query;

    const filters = {
      language,
      category,
      difficultyLevel,
      keywords,
      providerId
    };

    const query = buildSearchQuery(filters);
    const sortOptions = buildSortOptions(sortBy);

    // Execute search with pagination
    const modules = await TrainingModule.find(query)
      .sort(sortOptions)
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .select('-contents.content') // Exclude full content from search results
      .lean();

    // Update search hits telemetry
    await TrainingModule.updateMany(
      { _id: { $in: modules.map(m => m._id) } },
      { $inc: { 'telemetry.searchHits': 1 } }
    );

    // Get total count for pagination
    const total = await TrainingModule.countDocuments(query);

    res.json({
      success: true,
      data: modules,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({
      success: false,
      message: 'Error performing search',
      error: error.message
    });
  }
};

exports.getModuleById = async (req, res) => {
  try {
    const { id } = req.params;
    const { language = 'en' } = req.query;

    const module = await TrainingModule.findById(id)
      .select(`+contents.$[elem].content`)
      .populate('providerId', 'name organization')
      .lean();

    if (!module) {
      return res.status(404).json({
        success: false,
        message: 'Module not found'
      });
    }

    // Filter content by requested language
    const content = module.contents.find(c => c.language === language);
    if (!content) {
      return res.status(404).json({
        success: false,
        message: 'Content not available in requested language'
      });
    }

    // Update view count
    await TrainingModule.findByIdAndUpdate(id, {
      $inc: { 'telemetry.views': 1 }
    });

    res.json({
      success: true,
      data: {
        ...module,
        content: content.content
      }
    });
  } catch (error) {
    console.error('Get module error:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving module',
      error: error.message
    });
  }
};

exports.getSearchAnalytics = async (req, res) => {
  try {
    const { timeRange = '7d' } = req.query;
    const startDate = new Date();
    
    switch (timeRange) {
      case '24h':
        startDate.setHours(startDate.getHours() - 24);
        break;
      case '7d':
        startDate.setDate(startDate.getDate() - 7);
        break;
      case '30d':
        startDate.setDate(startDate.getDate() - 30);
        break;
      default:
        startDate.setDate(startDate.getDate() - 7);
    }

    const analytics = await TrainingModule.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate }
        }
      },
      {
        $group: {
          _id: null,
          totalSearches: { $sum: '$telemetry.searchHits' },
          totalViews: { $sum: '$telemetry.views' },
          totalCompletions: { $sum: '$telemetry.completions' },
          averageRating: { $avg: '$telemetry.averageRating' },
          byLanguage: {
            $push: {
              language: '$contents.language',
              count: '$telemetry.searchHits'
            }
          },
          byCategory: {
            $push: {
              category: '$category',
              count: '$telemetry.searchHits'
            }
          }
        }
      }
    ]);

    res.json({
      success: true,
      data: analytics[0] || {
        totalSearches: 0,
        totalViews: 0,
        totalCompletions: 0,
        averageRating: 0,
        byLanguage: [],
        byCategory: []
      }
    });
  } catch (error) {
    console.error('Analytics error:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving analytics',
      error: error.message
    });
  }
}; 