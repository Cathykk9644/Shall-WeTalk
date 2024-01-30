const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class federatedCredential extends Model {
    static associate(models) {
      this.belongsTo(models.users, { foreignKey: 'userId' });
    }
  }
  federatedCredential.init(
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
      provider: {
        allowNull: false,
        type: sequelize.STRING,
      },
      providerId: {
        allowNull: false,
        type: sequelize.STRING,
      },
      accessToken: {
        allowNull: false,
        type: sequelize.STRING,
      },
      refreshToken: {
        allowNull: false,
        type: sequelize.STRING,
      },
      expires: {
        allowNull: false,
        type: sequelize.DATE,
      },
    },
    {
      sequelize,
      modelName: 'federatedCredentials', // ! model name MUST match table name
    }
  );
  return Class;
};
