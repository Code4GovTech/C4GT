import { DataTypes } from 'sequelize';
import { sequelize } from '../database/index.js';
import { PLOT_STATUS } from '../common/enums.js'; // Add ENUM if needed

const Plot = sequelize.define(
  'Plot',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    plot_number: {
      type: DataTypes.STRING,
      allowNull: false
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false
    },
    circle_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM(PLOT_STATUS.PENDING, PLOT_STATUS.RESOLVED, PLOT_STATUS.DISPUTED),
      allowNull: false,
      defaultValue: PLOT_STATUS.PENDING
    },
    is_duplicate: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    no_of_duplicates: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    created_by: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      },
      onDelete: 'CASCADE'
    }
  },
  {
    tableName: 'plots',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
);

export default Plot;
