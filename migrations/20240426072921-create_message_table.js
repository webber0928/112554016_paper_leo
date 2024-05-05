'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async(queryInterface, Sequelize) => {
    await queryInterface.createTable('Message', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      user: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      isBot: {
        type: Sequelize.BOOLEAN,
        allowNull: true
      },
      message: {
        type: Sequelize.TEXT,
        allowNull: false
      }
    })
  },

  down: async(queryInterface, Sequelize) => {
    await queryInterface.dropTable('Message')
  }
}
