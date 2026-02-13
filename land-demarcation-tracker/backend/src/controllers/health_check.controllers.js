
const healthCheckController = async (req, res) => {
    try {
        res.status(200).json({
            status: 'success',
            message: 'Land Demarcation Tracker API is healthy 🚀',
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Internal server error',
        });
    }
}

export {
    healthCheckController
}