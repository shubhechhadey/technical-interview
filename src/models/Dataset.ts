import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database';

class Dataset extends Model {
  public id!: string;
  public name!: string;
  public symbol!: string;
  public frequencies!: string[];
  public marketCapUsd!: string; 
}

Dataset.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    symbol: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    frequencies: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    marketCapUsd: { 
      type: DataTypes.STRING,
      allowNull: true,
    }
  },
  {
    sequelize,
    modelName: 'Dataset',
  }
);

export default Dataset;
