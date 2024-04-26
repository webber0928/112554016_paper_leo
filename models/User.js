// models/xxx.js

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    user_no: {
      type: DataTypes.STRING,
      allowNull: false
    },
    grade: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, { timestamps: true })

  return User
}