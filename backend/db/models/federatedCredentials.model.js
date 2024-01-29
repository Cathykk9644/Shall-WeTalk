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
        type: Sequelize.INTEGER,
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      provider: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      providerId: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      accessToken: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      refreshToken: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      expires: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    },
    {
      sequelize,
      modelName: 'federatedCredentials', // ! model name MUST match table name
    }
  );
  return Class;
};
