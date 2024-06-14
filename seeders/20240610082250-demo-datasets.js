'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Datasets', [
      {
        id: 'dataset-btc',
        name: 'Bitcoin',
        symbol: 'BTC',
        frequencies: ['1m', '5m', '1h', '1d'],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'dataset-eth',
        name: 'Ethereum',
        symbol: 'ETH',
        frequencies: ['1m', '5m', '1h', '1d'],
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('datasets', null, {});
  }
};
