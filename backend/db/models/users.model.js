const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    static associate(models) {
      this.hasOne(models.sessions);
      this.hasMany(models.federatedCredentials, { foreignKey: 'userId' });
      this.hasMany(models.UserFriends, {
        foreignKey: 'userId',
        as: 'userFriends',
      });
      this.hasMany(models.UserFriends, {
        foreignKey: 'friendId',
        as: 'friendsOfUser',
      });

      this.hasMany(models.calls, {
        foreignKey: 'callerId',
        as: 'caller',
      });
      this.hasMany(models.calls, {
        foreignKey: 'calleeId',
        as: 'callee',
      });
      this.hasMany(models.messages, {
        foreignKey: 'senderId',
        as: 'sender',
      });
      this.hasMany(models.userLearningLanguages, {
        foreignKey: 'userId',
      });
    }
  }
  users.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: sequelize.INTEGER,
      },
      username: {
        allowNull: false,
        type: sequelize.STRING,
      },
      email: {
        allowNull: false,
        type: sequelize.STRING,
      },
      password: {
        allowNull: false,
        type: sequelize.STRING,
      },
      planType: {
        allowNull: false,
        type: sequelize.STRING,
      },
      bio: {
        allowNull: false,
        type: sequelize.STRING,
      },
      imageURL: {
        allowNull: false,
        type: sequelize.STRING,
      },
      userAddress: {
        allowNull: false,
        type: sequelize.STRING,
      },
    },
    {
      sequelize,
      modelName: 'users', // ! model name MUST match table name
    }
  );
  return Class;
};
