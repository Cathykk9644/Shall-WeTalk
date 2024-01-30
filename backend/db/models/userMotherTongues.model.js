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

        type: sequelize.INTEGER,
      },

      userId: {
        allowNull: false,

        type: sequelize.INTEGER,

        references: {
          model: 'users',

          key: 'id',
        },
      },

      languageId: {
        allowNull: false,

        type: sequelize.INTEGER,

        references: {
          model: 'languages',

          key: 'id',
        },
      },

      createdAt: {
        allowNull: false,

        type: sequelize.DATE,
      },

      updatedAt: {
        allowNull: false,

        type: sequelize.DATE,
      },
    },
    {
      sequelize,
      modelName: 'userMotherTongues', // ! model name MUST match table name
    }
  );
  return Class;
};
