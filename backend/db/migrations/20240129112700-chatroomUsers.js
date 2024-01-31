'use strict';

module.exports = {
  async up(queryInterface, sequelize) {
    await queryInterface.createTable('chatroomUsers', {
      id: {
        allowNull: false,

        autoIncrement: true,

        primaryKey: true,

        type: sequelize.INTEGER,
      },

      userId: {
        allowNull: true,
        type: sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
      },

      chatroomId: {
        allowNull: false,

        type: sequelize.INTEGER,

        references: {
          model: 'chatrooms',
          key: 'id',
        },
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
    await queryInterface.dropTable('chatroomUsers');
  },
};
