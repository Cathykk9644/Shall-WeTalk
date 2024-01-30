const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class userLearningLanguages extends Model {
    static associate(models) {
      this.belongsTo(models.hobbies, { foreignKey: 'hobbyId' });
      this.belongsTo(models.users, { foreignKey: 'userId' });
    }
  }
  userLearningLanguages.init(
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

      proficiency: {
        allowNull: false,

        type: sequelize.STRING,
      },
    },
    {
      sequelize,
      modelName: 'userLearningLanguages', // ! model name MUST match table name
    }
  );
  return Class;
};
