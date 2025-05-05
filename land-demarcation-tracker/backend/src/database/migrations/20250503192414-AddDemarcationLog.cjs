'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('demarcation_logs', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      plot_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'plots',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      officer_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },

      previous_status: {
        type: Sequelize.ENUM('pending', 'resolved', 'disputed'),
        allowNull: true,
      },

      new_status: {
        type: Sequelize.ENUM('pending', 'resolved', 'disputed'),
        allowNull: false,
      },

      action_type: {
        type: Sequelize.ENUM('create', 'status_update', 'duplicate'),
        allowNull: false,
        defaultValue: 'status_update',
      },

      remarks: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      },

      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('demarcation_logs');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_demarcation_logs_previous_status";');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_demarcation_logs_new_status";');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_demarcation_logs_action_type";');
  },
};
