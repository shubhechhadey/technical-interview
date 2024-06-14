import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database';
import Dataset from './Dataset';
import User from './User';

class AccessRequest extends Model {
  public id!: string;
  public userId!: string;
  public datasetId!: string;
  public frequencies!: string[];
  public status!: string;
  public requestedAt!: Date;
  public processedAt!: Date | null;
  public expiryDate!: Date;
}

AccessRequest.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: User,
        key: 'apiKey',
      },
    },
    datasetId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: Dataset,
        key: 'id',
      },
    },
    frequencies: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    requestedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    processedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    expiryDate: { 
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'AccessRequest',
  }
);

AccessRequest.belongsTo(Dataset, { foreignKey: 'datasetId' });
AccessRequest.belongsTo(User, { foreignKey: 'userId' });

export default AccessRequest;
