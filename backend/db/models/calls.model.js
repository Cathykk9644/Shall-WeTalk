const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class call extends Model {
    static associate(models) {
      this.belongsTo(models.chatrooms);
      this.belongsTo(models.users);
      this.belongsTo(models.users);
    }
  }
  call.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      chatroomId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'chatrooms',
          key: 'id',
        },
      },
      callType: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      callDuration: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },

      timestamp: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      callerId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      calleeId: {
        allowNull: false,
        type: DataTypes.INTEGER,
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
  return call;
};
