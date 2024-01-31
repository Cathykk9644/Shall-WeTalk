const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class userFriend extends Model {
    static associate(models) {
      this.belongsTo(models.users, { foreignKey: 'userId', as: 'user' });
      this.belongsTo(models.users, { foreignKey: 'friendId', as: 'friend' });
    }
  }
  userFriend.init(
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
      friendId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      friendNickname: {
        allowNull: true,
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: 'userFriends', // ! model name MUST match table name
    }
  );
  return userFriend;
};
