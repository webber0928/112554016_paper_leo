// models/xxx.js

module.exports = (sequelize, DataTypes) => {
  const Story = sequelize.define('Story', {
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
    words: {
      type: DataTypes.TEXT,
      allowNull: true,
      get: function() {
        if (!this.getDataValue('words')) return null
        return JSON.parse(this.getDataValue('words'))
      }
    },
    deleted_at: {
      type: DataTypes.BIGINT,
      allowNull: true
    }
  }, {
    tableName: 'Story',
    timestamps: true
  })

  return Story
}
