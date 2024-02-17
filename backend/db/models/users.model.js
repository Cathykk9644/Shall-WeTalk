const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    static associate(models) {
      // ...associations
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
        allowNull: true, // Allow null for password field
        type: DataTypes.STRING,
        validate: {
          passwordRequired() {
            // Custom validation to enforce password presence if signUpType is not "thirdParty"
            if (this.signUpType !== 'thirdParty' && !this.password) {
              throw new Error('Password is required');
            }
          },
        },
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
      signUpType: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: 'users',
    }
  );
  return user;
};
