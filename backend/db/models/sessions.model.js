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
      sessionId: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      data: {
        allowNull: false,
        type: Sequelize.JSON,
      },
      expires: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    },
    {
      sequelize,
      modelName: 'sessions', // ! model name MUST match table name
    }
  );
  return Class;
};
