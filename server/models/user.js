/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return user.init(sequelize, DataTypes);
}

class user extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: "username"
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    displayName: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    avatarColor: {
      type: DataTypes.STRING(7),
      allowNull: true
    },
    initialsColor: {
      type: DataTypes.STRING(7),
      allowNull: true
    },
    created_recipes: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'recipe',
        key: 'id'
      }
    },
    saved_recipes: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'recipe',
        key: 'id'
      }
    },
    is_admin: {
      type: DataTypes.TINYINT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'user',
    timestamps: true,
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
        name: "username",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "username" },
        ]
      },
      {
        name: "saved_recipes_idx",
        using: "BTREE",
        fields: [
          { name: "saved_recipes" },
        ]
      },
      {
        name: "created_recipes_fk_idx",
        using: "BTREE",
        fields: [
          { name: "created_recipes" },
        ]
      },
    ]
  });
  return user;
  }
}
