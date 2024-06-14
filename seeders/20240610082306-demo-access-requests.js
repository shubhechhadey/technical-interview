'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('AccessRequests', [
      {
        id: 'request-1',
        userId: 'api-key-quant1',
        datasetId: 'dataset-btc',
        frequencies: ['1m', '1h'],
        status: 'Pending',
        requestedAt: new Date('2024-06-05 12:00:00'),
        processedAt: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'request-2',
        userId: 'api-key-quant2',
        datasetId: 'dataset-eth',
        frequencies: ['5m', '1d'],
        status: 'Approved',
        requestedAt: new Date('2024-06-05 13:00:00'),
        processedAt: new Date('2024-06-05 14:00:00'),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('AccessRequests', null, {});
  }
};
