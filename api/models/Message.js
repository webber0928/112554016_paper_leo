// models/xxx.js

module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    user: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    tutorial_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    type: {
      type: DataTypes.STRING,
      allowNull: true
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
      get: function() {
        return JSON.parse(this.getDataValue('message'))
      }
    },
    execute_date: {
      type: DataTypes.BIGINT,
      allowNull: false
    }
  }, {
    tableName: 'Message',
    timestamps: true
  })

  return Message
}
