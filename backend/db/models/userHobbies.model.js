const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class userHobby extends Model {
    static associate(models) {
      this.belongsTo(models.hobbies, { foreignKey: 'hobbyId' });
      this.belongsTo(models.users, { foreignKey: 'userId' });
    }
  }
  userHobby.init(
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

      hobbyId: {
        allowNull: false,

        type: DataTypes.INTEGER,

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
  return userHobby;
};
