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
      sessionId: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      data: {
        allowNull: false,
        type: DataTypes.JSON,
      },
      expires: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: 'sessions', // ! model name MUST match table name
    }
  );
  return session;
};
