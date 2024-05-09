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
    story_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    isBot: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
      get: function() {
        return JSON.parse(this.getDataValue('message'))
      }
    }
  }, {
    tableName: 'Message',
    timestamps: true
  })

  return Message
}
