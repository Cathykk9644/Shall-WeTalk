'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('calls', {
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
      callType: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      callDuration: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },

      timestamp: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      callerId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      calleeId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
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
    await queryInterface.dropTable('calls');
  },
};
