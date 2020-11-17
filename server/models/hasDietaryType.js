/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return hasDietaryType.init(sequelize, DataTypes);
}

class hasDietaryType extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  super.init({
    recipe: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'recipe',
        key: 'id'
      }
    },
    dietary_type: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'dietary_type',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'has_dietary_type',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "recipe" },
          { name: "dietary_type" },
        ]
      },
      {
        name: "has_dietary_type_1_idx",
        using: "BTREE",
        fields: [
          { name: "dietary_type" },
        ]
      },
    ]
  });
  return hasDietaryType;
  }
}
