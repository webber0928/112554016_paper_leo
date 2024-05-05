'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async(queryInterface, Sequelize) => {
    await queryInterface.createTable('User', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      user_no: {
        type: Sequelize.STRING,
        allowNull: false
      },
      role_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      group: {
        type: Sequelize.STRING,
        allowNull: false
      },
      deleted_at: {
        type: Sequelize.BIGINT,
        allowNull: true
      }
    })

    await queryInterface.addIndex('User', ['user_no', 'deleted_at'], { name: 'user_no_deleted_at_index' })
  },

  down: async(queryInterface, Sequelize) => {
    await queryInterface.dropTable('User')
  }
}
