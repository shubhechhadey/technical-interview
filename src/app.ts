import express from 'express';
import bodyParser from 'body-parser';
import { sequelize } from './database';
import routes from './routes';
import { config } from './config';
import './cron/marketCapCron';

export const app = express();
app.use(bodyParser.json());

app.use('/api', routes);

const startServer = async () => {
  try {
    await sequelize.sync();
    app.listen(config.app.port, () => {
      console.log(`Server is running on port ${config.app.port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
  }
};

startServer();
