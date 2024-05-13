'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async(queryInterface, Sequelize) => {
    await queryInterface.addColumn('Message', 'type', {
      type: Sequelize.STRING,
      allowNull: true,
      after: 'story_id'
    })
  },

  down: async(queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Message', 'type')
  }
}

