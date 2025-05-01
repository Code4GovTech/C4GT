'use strict';

const bcrypt = require('bcryptjs');

const now = new Date();

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        name: 'Admin User',
        email: 'admin@example.com',
        password: await bcrypt.hash('Admin@123', 10),
        role: 'admin',
        circle: 'HQ',
        created_at: now,
        updated_at: now,
      },
      {
        name: 'Officer One',
        email: 'officer1@example.com',
        password: await bcrypt.hash('Officer@123', 10),
        role: 'officer',
        circle: 'North Zone',
        created_at: now,
        updated_at: now,
      },
      {
        name: 'Officer Two',
        email: 'officer2@example.com',
        password: await bcrypt.hash('Officer@123', 10),
        role: 'officer',
        circle: 'South Zone',
        created_at: now,
        updated_at: now,
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', {
      email: {
        [Sequelize.Op.in]: [
          'admin@example.com',
          'officer1@example.com',
          'officer2@example.com',
        ]
      }
    });
  }
};
