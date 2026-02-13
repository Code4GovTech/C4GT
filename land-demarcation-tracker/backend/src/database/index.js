import { Sequelize } from 'sequelize';
import config from '../common/config.js';

export const sequelize = new Sequelize(
    config.DB_NAME,
    config.DB_USER,
    config.DB_PASSWORD,
    {
        host: config.DB_HOST,
        port: config.DB_PORT,
        dialect: config.DB_DIALECT,
        logging: false, // Disable logging for cleaner output
    }
);

export const connectToDatabase = async () => {
    try {
        console.log("Connecting with user:", config.DB_USER);
        await sequelize.authenticate();
        console.log('Connection to the database has been established successfully.');
    } catch (error) {
        console.error(`Unable to connect to the database: ${error}`);
        process.exit(1);
    }
}