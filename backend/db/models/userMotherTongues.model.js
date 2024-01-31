const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class userMotherTongue extends Model {
    static associate(models) {
      this.belongsTo(models.users, { foreignKey: 'userId' });
      this.belongsTo(models.languages, { foreignKey: 'languageId' });
    }
  }
  userMotherTongue.init(
    {
      id: {
        allowNull: false,

        autoIncrement: true,

        primaryKey: true,

        type: DataTypes.INTEGER,
      },

      userId: {
        allowNull: false,

        type: DataTypes.INTEGER,

        references: {
          model: 'users',

          key: 'id',
        },
      },

      languageId: {
        allowNull: false,

        type: DataTypes.INTEGER,

        references: {
          model: 'languages',

          key: 'id',
        },
      },

      createdAt: {
        allowNull: false,

        type: DataTypes.DATE,
      },

      updatedAt: {
        allowNull: false,

        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: 'userMotherTongues', // ! model name MUST match table name
    }
  );
  return userMotherTongue;
};
