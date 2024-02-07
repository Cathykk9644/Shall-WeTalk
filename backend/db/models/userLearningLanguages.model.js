const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class userLearningLanguage extends Model {
    static associate(models) {
      this.belongsTo(models.users, { foreignKey: 'userId' });
      this.belongsTo(models.languages, { foreignKey: 'languageId' });
    }
  }
  userLearningLanguage.init(
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

      proficiency: {
        allowNull: false,

        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: 'userLearningLanguages', // ! model name MUST match table name
    }
  );
  return userLearningLanguage;
};
