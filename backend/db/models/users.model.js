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
    }
  }
  users.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      username: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      planType: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      bio: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      imageURL: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      userAddress: {
        allowNull: false,
        type: Sequelize.STRING,
      },
    },
    {
      sequelize,
      modelName: 'users', // ! model name MUST match table name
    }
  );
  return Class;
};
