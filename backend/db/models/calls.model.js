const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class call extends Model {
    static associate(models) {
      this.belongsTo(models.chatrooms, { foreignKey: 'chatroomId' });
      this.belongsTo(models.users, { foreignKey: 'callerId', as: 'callMaker' });
      this.belongsTo(models.users, {
        foreignKey: 'calleeId',
        as: 'callReceiver',
      });
    }
  }
  call.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: sequelize.INTEGER,
      },
      chatroomId: {
        allowNull: false,
        type: sequelize.INTEGER,
        references: {
          model: 'chatrooms',
          key: 'id',
        },
      },
      callType: {
        allowNull: false,
        type: sequelize.STRING,
      },
      callDuration: {
        allowNull: false,
        type: sequelize.INTEGER,
      },

      timestamp: {
        allowNull: false,
        type: sequelize.DATE,
      },
      callerId: {
        allowNull: false,
        type: sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      calleeId: {
        allowNull: false,
        type: sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'calls', // ! model name MUST match table name
    }
  );
  return Class;
};
