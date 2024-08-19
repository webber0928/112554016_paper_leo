// models/xxx.js

module.exports = (sequelize, DataTypes) => {
  const Tutorial = sequelize.define('Tutorial', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    ranking: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    promptId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    deleted_at: {
      type: DataTypes.BIGINT,
      allowNull: true
    }
  }, {
    tableName: 'Tutorial',
    timestamps: true
  })

  return Tutorial
}
