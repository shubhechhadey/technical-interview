import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database';

class User extends Model {
  public apiKey!: string;
  public role!: string;
}

User.init(
  {
    apiKey: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'User',
  }
);

export default User;
