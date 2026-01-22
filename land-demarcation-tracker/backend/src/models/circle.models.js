import { DataTypes } from 'sequelize';
import { sequelize } from '../database/index.js';

const Circle = sequelize.define('Circle', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  }
}, {
  tableName: 'circles',
  timestamps: false, // No createdAt/updatedAt needed for master data
});

export default Circle;
