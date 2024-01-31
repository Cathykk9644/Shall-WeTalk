const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    static associate(models) {
      this.hasOne(models.sessions);
      this.hasMany(models.federatedCredentials, { foreignKey: 'userId' });
      this.hasMany(models.userFriends, {
        foreignKey: 'userId',
        as: 'userFriends',
      });
      this.hasMany(models.userFriends, {
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
  user.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      username: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      planType: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      bio: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      imageURL: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      userAddress: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: 'users', // ! model name MUST match table name
    }
  );
  return user;
};
