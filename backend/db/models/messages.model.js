const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class message extends Model {
    static associate(models) {
      this.belongsTo(models.chatrooms, { foreignKey: 'chatroomId' });
      this.belongsTo(models.users, { foreignKey: 'senderId', as: 'messenger' });
    }
  }
  message.init(
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
      senderId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      messageText: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      messageType: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      voiceNoteFileUrl: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      voiceNoteDuration: {
        allowNull: true,
        type: DataTypes.INTEGER,
      },
      voiceNoteSize: {
        allowNull: true,
        type: DataTypes.INTEGER,
      },
      timestamp: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: 'messages', // ! model name MUST match table name
    }
  );
  return message;
};
