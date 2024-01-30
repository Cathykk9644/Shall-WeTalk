'use strict';
module.exports = {
  async up(queryInterface, sequelize) {
    await queryInterface.createTable('messages', {
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

      createdAt: {
        allowNull: false,
        type: sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: sequelize.DATE,
      },
    });
  },
  async down(queryInterface, sequelize) {
    await queryInterface.dropTable('messages');
  },
};
