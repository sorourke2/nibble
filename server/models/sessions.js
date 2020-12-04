/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return sessions.init(sequelize, DataTypes);
}

class sessions extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  super.init({
    session_id: {
      type: DataTypes.STRING(128),
      allowNull: false,
      primaryKey: true
    },
    expires: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    data: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'sessions',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "session_id" },
        ]
      },
    ]
  });
  return sessions;
  }
}
