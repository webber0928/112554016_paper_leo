// models/xxx.js

module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    teacher_id: {
      type: DataTypes.STRING,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    learning_content: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, { timestamps: true })

  return Task
}
