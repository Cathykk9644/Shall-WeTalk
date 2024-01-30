const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class userFriend extends Model {
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
      this.belongsTo(models.User, { foreignKey: 'friendId', as: 'friend' });
    }
  }
  userFriend.init(
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
      friendId: {
        allowNull: false,
        type: sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      friendNickname: {
        allowNull: true,
        type: sequelize.STRING,
      },
    },
    {
      sequelize,
      modelName: 'userFriends', // ! model name MUST match table name
    }
  );
  return Class;
};
