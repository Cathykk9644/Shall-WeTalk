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
      provider: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      providerId: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      accessToken: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      refreshToken: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      expires: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: 'federatedCredentials', // ! model name MUST match table name
    }
  );
  return federatedCredential;
};
