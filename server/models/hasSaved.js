/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return hasSaved.init(sequelize, DataTypes);
};

class hasSaved extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    super.init(
      {
        recipe: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          references: {
            model: 'recipe',
            key: 'id',
          },
        },
        user: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          references: {
            model: 'registered_user',
            key: 'id',
          },
        },
      },
      {
        sequelize,
        tableName: 'has_saved',
        timestamps: false,
        indexes: [
          {
            name: 'PRIMARY',
            unique: true,
            using: 'BTREE',
            fields: [{ name: 'recipe' }, { name: 'user' }],
          },
          {
            name: 'specializes_in_ibfk_2_idx',
            using: 'BTREE',
            fields: [{ name: 'user' }],
          },
        ],
      }
    );
    return hasSaved;
  }
}
