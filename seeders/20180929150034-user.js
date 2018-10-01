'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [{
      username: 'testuser01',
      password: 'testing1',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      username: 'testuser02',
      password: 'testing1',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});

    const users = await queryInterface.sequelize.query(
      `SELECT id from Users;`
    );

    const userRows = users[0];
    return await queryInterface.bulkInsert('Products', [
      {
        itemName: 'A pretty pony',
        category: 'animal',
        currentQuantity: 2,
        reorderThreshold: 1,
        sellPrice: 200,
        costToGet: 100,
        currentlyUsed: true,
        userID: userRows[0].id,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        itemName: 'pile of books',
        category: 'books',
        currentQuantity: 20,
        reorderThreshold: 5,
        sellPrice: 20,
        costToGet: 10,
        currentlyUsed: true,
        userID: userRows[0].id,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        itemName: 'A cask of wine',
        category: 'wine',
        currentQuantity: 5,
        reorderThreshold: 2,
        sellPrice: 200,
        costToGet: 100,
        currentlyUsed: true,
        userID: userRows[0].id,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        itemName: 'iPhone Case',
        category: 'cell phone supplies',
        currentQuantity: 20,
        reorderThreshold: 8,
        sellPrice: 20,
        costToGet: 5,
        currentlyUsed: true,
        userID: userRows[1].id,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        itemName: 'Galaxy Case',
        category: 'cell phone supplies',
        currentQuantity: 12,
        reorderThreshold: 3,
        sellPrice: 10,
        costToGet: 2,
        currentlyUsed: true,
        userID: userRows[1].id,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
    await queryInterface.bulkDelete('Products', null, {});
  }
};
