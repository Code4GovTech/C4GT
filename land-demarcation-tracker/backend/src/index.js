import { app } from './app.js';
import config from './common/config.js';
import { connectToDatabase } from './database/index.js';

const startServer = async() => {
    try {
        await connectToDatabase();
        app.listen(config.development.PORT, () =>  {
            console.log(`Server is running on port ${config.development.PORT}`);
        });
    } catch (error) {
        console.error(`Failed to start server: ${error}`);
        process.exit(1); // Exit the process with a failure code    
    }
}

startServer();