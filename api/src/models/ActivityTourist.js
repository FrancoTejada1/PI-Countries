const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('activityTourist', {
    name: {
      type: DataTypes.STRING
    },
    dificult: {
      type: DataTypes.INTEGER,
      validate: {
        max: 5,
        min: 1
      }
    },
    duration: {
      type: DataTypes.INTEGER
    },
    season: {
      type: DataTypes.ENUM(['Verano','Otoño','Invierno','Primavera'])
    }
  },
  {
    timestamps: false
  })
}