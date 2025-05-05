const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Work = sequelize.define(
    'Work',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      roadId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Roads',
          key: 'id',
        },
      },
      vendorName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cost: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          min: 0,
        },
      },
      phase: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: [['Pending', 'In Progress', 'Completed']],
        },
      },
      startDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      endDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      timestamps: true,
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    }
  );

  Work.associate = (models) => {
    Work.belongsTo(models.Road, {
      foreignKey: 'roadId',
      as: 'road',
      onDelete: 'CASCADE',
    });
  };

  return Work;
};