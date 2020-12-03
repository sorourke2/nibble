/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return ingredient.init(sequelize, DataTypes);
}

class ingredient extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(225),
      allowNull: false
    },
    measurement_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'measurement',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'ingredient',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "measurement_fk_idx",
        using: "BTREE",
        fields: [
          { name: "measurement_id" },
        ]
      },
    ]
  });
  return ingredient;
  }
}
