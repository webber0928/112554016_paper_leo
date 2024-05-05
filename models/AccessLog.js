// models/xxx.js

module.exports = (sequelize, DataTypes) => {
  const AccessLog = sequelize.define('AccessLog', {
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
    url: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, { timestamps: true })

  return AccessLog
}
