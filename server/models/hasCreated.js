/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return hasCreated.init(sequelize, DataTypes);
}

class hasCreated extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  super.init({
    recipes: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'recipe',
        key: 'id'
      }
    },
    registered_users: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'registered_user',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'has_created',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "recipes" },
          { name: "registered_users" },
        ]
      },
      {
        name: "has_created_ibfk_2_idx",
        using: "BTREE",
        fields: [
          { name: "registered_users" },
        ]
      },
    ]
  });
  return hasCreated;
  }
}
