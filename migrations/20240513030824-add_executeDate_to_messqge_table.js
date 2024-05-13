'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async(queryInterface, Sequelize) => {
    await queryInterface.addColumn('Message', 'execute_date', {
      type: Sequelize.BIGINT,
      allowNull: false,
      after: 'message'
    })
  },

  down: async(queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Message', 'execute_date')
  }
}

