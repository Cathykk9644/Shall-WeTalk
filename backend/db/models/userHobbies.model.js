const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class userHobbies extends Model {
    static associate(models) {
      this.belongsTo(models.hobbies, { foreignKey: 'hobbyId' });
      this.belongsTo(models.users, { foreignKey: 'userId' });
    }
  }
  userHobbies.init(
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

      hobbyId: {
        allowNull: false,

        type: sequelize.INTEGER,

        references: {
          model: 'hobbies',

          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'userHobbies', // ! model name MUST match table name
    }
  );
  return Class;
};
