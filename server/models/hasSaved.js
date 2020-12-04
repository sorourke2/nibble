/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return hasSaved.init(sequelize, DataTypes);
}

class hasSaved extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  super.init({
    user: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'user',
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
    tableName: 'has_saved',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "user" },
          { name: "recipe" },
        ]
      },
      {
        name: "recipe_fk_idx",
        using: "BTREE",
        fields: [
          { name: "recipe" },
        ]
      },
    ]
  });
  return hasSaved;
  }
}
