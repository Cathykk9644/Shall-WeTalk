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
      senderId: {
        allowNull: false,
        type: sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      messageText: {
        allowNull: false,
        type: sequelize.STRING,
      },
      messageType: {
        allowNull: false,
        type: sequelize.STRING,
      },
      voiceNoteFileUrl: {
        allowNull: true,
        type: sequelize.STRING,
      },
      voiceNoteDuration: {
        allowNull: true,
        type: sequelize.INTEGER,
      },
      voiceNoteSize: {
        allowNull: true,
        type: sequelize.INTEGER,
      },
      timestamp: {
        allowNull: false,
        type: sequelize.DATE,
      },
    },
    {
      sequelize,
      modelName: 'messages', // ! model name MUST match table name
    }
  );
  return Class;
};
