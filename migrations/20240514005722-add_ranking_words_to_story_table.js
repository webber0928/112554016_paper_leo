'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async(queryInterface, Sequelize) => {
    await queryInterface.addColumn('Story', 'ranking', {
      type: Sequelize.INTEGER,
      allowNull: false,
      after: 'id'
    })
    await queryInterface.addColumn('Story', 'words', {
      type: Sequelize.TEXT,
      allowNull: true,
      after: 'content'
    })
  },

  down: async(queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Story', 'ranking')
    await queryInterface.removeColumn('Story', 'words')
  }
}

