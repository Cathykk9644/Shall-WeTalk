'use strict';
module.exports = {
  async up(queryInterface, sequelize) {
    await queryInterface.createTable('calls', {
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
    await queryInterface.dropTable('calls');
  },
};
