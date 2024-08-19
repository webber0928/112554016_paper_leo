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
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    })

    await queryInterface.addIndex('User', ['user_no', 'deleted_at'], { name: 'user_no_deleted_at_index' })
    await queryInterface.createTable('Role', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      deleted_at: {
        type: Sequelize.BIGINT,
        allowNull: true
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    })

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
      tutorial_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      type: {
        type: Sequelize.STRING,
        allowNull: true
      },
      message: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      execute_date: {
        type: Sequelize.BIGINT,
        allowNull: false
      },
      count: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    })

    await queryInterface.createTable('Chatbot', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false
      },
      prompt: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      note: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null
      },
      deleted_at: {
        type: Sequelize.BIGINT,
        allowNull: true
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    })
    await queryInterface.createTable('AccessLog', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      user: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      url: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    })

    await queryInterface.createTable('Tutorial', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      ranking: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      link: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      promptId: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      deleted_at: {
        type: Sequelize.BIGINT,
        allowNull: true
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    })
  },

  down: async(queryInterface, Sequelize) => {
    await queryInterface.dropTable('User')
    await queryInterface.dropTable('Role')
    await queryInterface.dropTable('Message')
    await queryInterface.dropTable('Chatbot')
    await queryInterface.dropTable('AccessLog')
    await queryInterface.dropTable('Tutorial')
  }
}
