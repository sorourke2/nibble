/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return madeUpOf.init(sequelize, DataTypes);
}

class madeUpOf extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  super.init({
    ingredient: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'ingredient',
        key: 'id'
      }
    },
    recipe: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'recipe',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'made_up_of',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ingredient" },
          { name: "recipe" },
        ]
      },
      {
        name: "recipe",
        using: "BTREE",
        fields: [
          { name: "recipe" },
        ]
      },
    ]
  });
  return madeUpOf;
  }
}
