import dotenv from 'dotenv';

dotenv.config();

export const config = {
  db: {
    username: process.env.DB_USERNAME || 'your-username',
    password: process.env.DB_PASSWORD || 'your-password',
    database: process.env.DB_NAME || 'your-database',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
  },
  app: {
    port: process.env.APP_PORT || 3000,
  },
};
