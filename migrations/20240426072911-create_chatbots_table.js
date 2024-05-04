'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async(queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      user_no: {
        type: Sequelize.STRING,
        allowNull: false
      },
      grade: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    })
  },

  down: async(queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users')
  }
}
