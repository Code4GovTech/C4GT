import { Sequelize } from 'sequelize';
import config from '../common/config.js';

const sequelize = new Sequelize(
    config.development.DB_NAME,
    config.development.DB_USER,
    config.development.DB_PASSWORD,
    {
        host: config.development.DB_HOST,
        port: config.development.DB_PORT,
        dialect: config.development.DB_DIALECT,
        logging: false, // Disable logging for cleaner output
    }
);

export const connectToDatabase = async () => {
    try {
        console.log("Connecting with user:", config.development.DB_USER);
        await sequelize.authenticate();
        console.log('Connection to the database has been established successfully.');
    } catch (error) {
        console.error(`Unable to connect to the database: ${error}`);
        process.exit(1);
    }
}