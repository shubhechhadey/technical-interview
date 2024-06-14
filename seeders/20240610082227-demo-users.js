'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [
      {
        apiKey: 'api-key-quant1',
        role: 'Quant',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        apiKey: 'api-key-quant2',
        role: 'Quant',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        apiKey: 'api-key-ops1',
        role: 'Ops',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
