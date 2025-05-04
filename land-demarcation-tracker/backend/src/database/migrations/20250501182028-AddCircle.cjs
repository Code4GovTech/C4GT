'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('circles', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      }
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('circles');
  }
};
