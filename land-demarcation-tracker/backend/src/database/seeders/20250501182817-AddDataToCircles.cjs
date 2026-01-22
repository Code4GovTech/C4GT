'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('circles', [
      { id: 1, name: 'North Zone' },
      { id: 2, name: 'South Zone' },
      { id: 3, name: 'East Zone' },
      { id: 4, name: 'West Zone' },
      { id: 5, name: 'Central Zone' }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('circles', null, {});
  }
};
