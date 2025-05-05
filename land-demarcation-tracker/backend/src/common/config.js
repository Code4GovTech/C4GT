import dotenv from 'dotenv';

dotenv.config();

export default {
        PORT: process.env.PORT || 3000,
        CORS_ORIGIN: process.env.CORS_ORIGIN || '*',
        NODE_ENV: process.env.NODE_ENV || 'development',
        ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
        ACCESS_TOKEN_EXPIRATION: process.env.ACCESS_TOKEN_EXPIRATION || '1h',
        REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
        REFRESH_TOKEN_EXPIRATION: process.env.REFRESH_TOKEN_EXPIRATION || '7d',
        DB_USER: process.env.DB_USER,
        DB_PASSWORD: process.env.DB_PASSWORD,
        DB_HOST: process.env.DB_HOST,
        DB_PORT: process.env.DB_PORT,
        DB_NAME: process.env.DB_NAME,
        DB_DIALECT: process.env.DB_DIALECT,
}