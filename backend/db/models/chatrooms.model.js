const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class chatroom extends Model {
    static associate(models) {
      // this.belongsTo(models.chatroom, { foreignKey: 'chatroomId' });
      // this.belongsTo(models.User, { foreignKey: 'callerId', as: 'callMaker' });
      // this.belongsTo(models.User, {
      //   foreignKey: 'calleeId',
      //   as: 'callReceiver',
      // });
    }
  }
  chatroom.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: 'chatrooms', // ! model name MUST match table name
    }
  );
  return chatroom;
};
