import { Sequelize, Dialect } from 'sequelize';
import { config } from './config';

export const sequelize = new Sequelize(config.db.database, config.db.username, config.db.password, {
  dialect: config.db.dialect as Dialect,
  host: config.db.host,
});
