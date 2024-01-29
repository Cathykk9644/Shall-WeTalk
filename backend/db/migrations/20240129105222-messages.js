'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('messages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      chatroomId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'chatrooms',
          key: 'id',
        },
      },
      senderId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      messageText: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      messageType: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      voiceNoteFileUrl: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      voiceNoteDuration: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      voiceNoteSize: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      timestamp: {
        allowNull: false,
        type: Sequelize.DATE,
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('messages');
  },
};
