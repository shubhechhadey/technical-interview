'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('AccessRequests', {
      id: {
        type: Sequelize.STRING,
        primaryKey: true
      },
      userId: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'apiKey'
        }
      },
      datasetId: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'Datasets',
          key: 'id'
        }
      },
      frequencies: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: false
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false
      },
      requestedAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      processedAt: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('AccessRequests');
  }
};