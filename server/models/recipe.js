const sequelize = require('sequelize')
const Recipe = sequelize.define('Recipe', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
  // And more but I lazy
})
module.exports = Recipe 