// models/xxx.js

module.exports = (sequelize, DataTypes) => {
  const Chatbot = sequelize.define('Chatbot', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    init_system: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    init_user: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    story_init: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, { timestamps: true })

  return Chatbot
}
