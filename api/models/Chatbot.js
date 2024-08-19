// models/xxx.js

module.exports = (sequelize, DataTypes) => {
  const Chatbot = sequelize.define('Chatbot', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    prompt: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    note: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null
    },
    deleted_at: {
      type: DataTypes.BIGINT,
      allowNull: true
    }
  }, {
    tableName: 'Chatbot',
    timestamps: true
  })

  return Chatbot
}
