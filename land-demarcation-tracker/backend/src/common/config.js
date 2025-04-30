import dotenv from 'dotenv';

dotenv.config();

export default {
    development: {
        PORT: process.env.PORT || 3000,
        CORS_ORIGIN: process.env.CORS_ORIGIN || '*',
        JWT_SECRET: process.env.JWT_SECRET,
        JWT_EXPIRATION: process.env.JWT_EXPIRATION || '1h',
        JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
        JWT_REFRESH_EXPIRATION: process.env.JWT_REFRESH_EXPIRATION || '7d',
        DB_USER: process.env.DB_USER,
        DB_PASSWORD: process.env.DB_PASSWORD,
        DB_HOST: process.env.DB_HOST,
        DB_PORT: process.env.DB_PORT,
        DB_NAME: process.env.DB_NAME,
        DB_DIALECT: process.env.DB_DIALECT,
    }
}