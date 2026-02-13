import { DataTypes } from 'sequelize';
import { sequelize } from '../database/index.js';

const DemarcationLog = sequelize.define(
  'DemarcationLog',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    plot_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'plots',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },

    officer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },

    previous_status: {
      type: DataTypes.ENUM('pending', 'resolved', 'disputed'),
      allowNull: true,
    },

    new_status: {
      type: DataTypes.ENUM('pending', 'resolved', 'disputed'),
      allowNull: false,
    },

    action_type: {
      type: DataTypes.ENUM('create', 'status_update', 'duplicate'),
      allowNull: false,
      defaultValue: 'status_update',
    },

    remarks: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: 'demarcation_logs',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);

export default DemarcationLog;
