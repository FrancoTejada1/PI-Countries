const sequelize = require('sequelize');
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    
sequelize.define('activityTourist', {
  /* id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  }, */
  name: {
    type: DataTypes.STRING
  },
  dificult: {
    type: DataTypes.ENUM([1,2,3,4,5])
  },
  duration: {
    type: DataTypes.INTEGER
  },
  season: {
    type: DataTypes.ENUM(['Verano','Otoño','Invierno','Primavera'])
  }
})

}