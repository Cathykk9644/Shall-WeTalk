const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class session extends Model {
    static associate(models) {
      this.belongsTo(models.users);
    }
  }
  session.init(
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
      sessionId: {
        allowNull: false,
        type: sequelize.STRING,
      },
      data: {
        allowNull: false,
        type: sequelize.JSON,
      },
      expires: {
        allowNull: false,
        type: sequelize.DATE,
      },
    },
    {
      sequelize,
      modelName: 'sessions', // ! model name MUST match table name
    }
  );
  return Class;
};
