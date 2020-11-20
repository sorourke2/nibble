/* jshint indent: 2 */

const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  return recipe.init(sequelize, DataTypes);
};

class recipe extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    super.init(
      {
        id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING(225),
          allowNull: false,
        },
        difficulty: {
          type: DataTypes.STRING(225),
          allowNull: true,
        },
        cooking_method: {
          type: DataTypes.STRING(225),
          allowNull: true,
        },
        serving_size: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        cuisine: {
          type: DataTypes.STRING(225),
          allowNull: true,
        },
        minutes_to_make: {
          type: DataTypes.STRING(45),
          allowNull: true,
        },
        image_source: {
          type: DataTypes.STRING(45),
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: "recipe",
        freezeTableName: true,
        timestamps: false,
        indexes: [
          {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [{ name: "id" }],
          },
        ],
      }
    );
    return recipe;
  }
}
