'use strict';

const bcrypt = require('bcryptjs');

module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash('SecurePass123', 10); // You can change this

    await queryInterface.bulkInsert('users', [
      {
        name: 'Admin User',
        email: 'admin@example.com',
        password: hashedPassword,
        role: 'admin',
        circle_ids: [1, 2, 3], // North, South, East
        refresh_token: null,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Officer One',
        email: 'officer1@example.com',
        password: hashedPassword,
        role: 'officer',
        circle_ids: [1], // North Zone
        refresh_token: null,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Officer Two',
        email: 'officer2@example.com',
        password: hashedPassword,
        role: 'officer',
        circle_ids: [2], // South Zone
        refresh_token: null,
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
