const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Road = sequelize.define(
    'Road',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      roadId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ward: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      length: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          min: 0,
        },
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

  Road.associate = (models) => {
    Road.hasMany(models.Work, {
      foreignKey: 'roadId',
      as: 'works',
      onDelete: 'CASCADE',
    });
  };

  return Road;
};