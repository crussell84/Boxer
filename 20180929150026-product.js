'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Products', [{
      itemName: 'A pretty pony',
      category: 'animal',
      currentQuantity: 2,
      reorderThreshold: 1,
      sellPrice: 200,
      costToGet: 100,
      currentlyUsed: true,
      userID: 1,
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
      userID: 1,
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
      userID: 1,
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
      userID: 2,
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
      userID: 2,
      createdAt: new Date(), 
      updatedAt: new Date() 
    }], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Products', null, {});
  }
};
